"use strict";
let state = {
    tasks: [
        {
            description: 'Tarefa concluída',
            done: true
        },
        {
            description: 'Tarefa pendente 1',
            done: false
        },
        {
            description: 'Tarefa pendente 2',
            done: false
        }
    ],
    selectedTask: null,
    edit: false
};
const taskSelect = (state, task) => {
    return Object.assign(Object.assign({}, state), { selectedTask: task === state.selectedTask ? null : task });
};
const newTask = (state, task) => {
    return Object.assign(Object.assign({}, state), { tasks: [...state.tasks, task] });
};
const deleteTask = (state) => {
    if (state.selectedTask) {
        const tasks = state.tasks.filter(t => t != state.selectedTask);
        return Object.assign(Object.assign({}, state), { tasks, selectedTask: null, edit: false });
    }
    else {
        return state;
    }
};
const deleteAll = (state) => {
    return Object.assign(Object.assign({}, state), { tasks: [], selectedTask: null, edit: false });
};
const deleteAllFinished = (state) => {
    const tasks = state.tasks.filter(t => !t.done);
    return Object.assign(Object.assign({}, state), { tasks, selectedTask: null, edit: false });
};
const editTask = (state, task) => {
    return Object.assign(Object.assign({}, state), { edit: !state.edit, selectedTask: task });
};
const useInterface = () => {
    const taskIconSvg = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF" />
            <path
                d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E" />
        </svg>
    `;
    const tasksUL = document.querySelector('.app__section-task-list');
    const formAddTask = document.querySelector('.app__form-add-task');
    const textArea = document.querySelector('.app__form-textArea');
    const labelActiveTask = document.querySelector('.app__section-active-task-description');
    const btnAddTask = document.querySelector('.app__button--add-task');
    const btnCancel = document.querySelector('.app__form-footer__button--cancel');
    const btnDelete = document.querySelector('.app__form-footer__button--delete');
    const btnDeleteDones = document.querySelector('#btn-remover-concluidas');
    const btnDeleteAll = document.querySelector('#btn-remover-todas');
    labelActiveTask.textContent = state.selectedTask ? state.selectedTask.description : null;
    if (!btnAddTask) {
        throw new Error('Button not found');
    }
    btnAddTask.onclick = () => {
        formAddTask === null || formAddTask === void 0 ? void 0 : formAddTask.classList.toggle('hidden');
    };
    formAddTask.onsubmit = (event) => {
        event.preventDefault();
        const description = textArea.value;
        state = newTask(state, {
            description,
            done: false
        });
        useInterface();
    };
    btnCancel.onclick = () => {
        formAddTask.classList.add('hidden');
    };
    btnDelete.onclick = () => {
        state = deleteTask(state);
        formAddTask.classList.add('hidden');
        useInterface();
    };
    btnDeleteDones.onclick = () => {
        state = deleteAllFinished(state);
        useInterface();
    };
    btnDeleteAll.onclick = () => {
        state = deleteAll(state);
        useInterface();
    };
    if (tasksUL) {
        tasksUL.innerHTML = '';
    }
    state.tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('app__section-task-list-item');
        const svgIcon = document.createElement('svg');
        svgIcon.innerHTML = taskIconSvg;
        const paragraph = document.createElement('p');
        paragraph.classList.add('app__section-task-list-item-description');
        paragraph.textContent = task.description;
        const button = document.createElement('button');
        button.classList.add('app_button-edit');
        const editIcon = document.createElement('img');
        editIcon.setAttribute('src', '/images/edit.png');
        button.appendChild(editIcon);
        if (task.done) {
            button.setAttribute('disabled', 'true');
            li.classList.add('app__section-task-list-item-complete');
        }
        if (task == state.selectedTask) {
            li.classList.add('app__section-task-list-item-active');
        }
        li.appendChild(svgIcon);
        li.appendChild(paragraph);
        li.appendChild(button);
        li.addEventListener('click', () => {
            state = taskSelect(state, task);
            useInterface();
        });
        tasksUL === null || tasksUL === void 0 ? void 0 : tasksUL.appendChild(li);
    });
};
useInterface();
