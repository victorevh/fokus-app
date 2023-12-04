interface Task {
    description: string;
    done: boolean;
}

interface AppState {
    tasks: Task[];
    selectedTask: Task | null;
    edit: boolean
}

let state: AppState = {
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
}

const taskSelect = (state: AppState, task: Task) : AppState => {
    return {
        ...state,
        selectedTask: task === state.selectedTask ? null : task
    }
}

const newTask = (state: AppState, task: Task) : AppState => {
    return {
        ...state,
        tasks: [...state.tasks, task]
    }
}

const deleteTask = (state: AppState): AppState => {
    if (state.selectedTask) {
        const tasks = state.tasks.filter(t => t != state.selectedTask);
        return { ...state, tasks, selectedTask: null, edit: false };
    } else {
        return state;
    }
}

const deleteAll = (state: AppState): AppState => {
    return { ...state, tasks: [], selectedTask: null, edit: false };
}

const deleteAllFinished = (state: AppState): AppState => {
    const tasks = state.tasks.filter(t => !t.done);
    return { ...state, tasks, selectedTask: null, edit: false };
}

const editTask = (state: AppState, task: Task): AppState => {
    return { ...state, edit: !state.edit, selectedTask: task };
}

const useInterface = () => {
    const taskIconSvg = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF" />
            <path
                d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E" />
        </svg>
    `

    const tasksUL = document.querySelector<HTMLUListElement>('.app__section-task-list');
    const formAddTask = document.querySelector<HTMLFormElement>('.app__form-add-task');
    const textArea = document.querySelector<HTMLTextAreaElement>('.app__form-textArea');
    const labelActiveTask = document.querySelector<HTMLParagraphElement>('.app__section-active-task-description')
    const btnAddTask = document.querySelector<HTMLButtonElement>('.app__button--add-task');
    const btnCancel = document.querySelector<HTMLButtonElement>('.app__form-footer__button--cancel');
    const btnDelete = document.querySelector<HTMLButtonElement>('.app__form-footer__button--delete');
    const btnDeleteDones = document.querySelector<HTMLButtonElement>('#btn-remover-concluidas');
    const btnDeleteAll = document.querySelector<HTMLButtonElement>('#btn-remover-todas');

    labelActiveTask!.textContent = state.selectedTask ? state.selectedTask.description : null

    if (!btnAddTask) {
        throw new Error('Button not found');
    }

    btnAddTask.onclick = () => {
        
        formAddTask?.classList.toggle('hidden');
    }

    formAddTask!.onsubmit = (event) => {
        event.preventDefault();
        const description = textArea!.value;
        state = newTask(state, {
            description,
            done: false
        })
        useInterface()
    }

    btnCancel!.onclick = () => {
        formAddTask!.classList.add('hidden');
    }

    btnDelete!.onclick = () => {
        state = deleteTask(state);
        formAddTask!.classList.add('hidden');
        useInterface();
    }

    btnDeleteDones!.onclick = () => {
        state = deleteAllFinished(state);
        useInterface();
    }

    btnDeleteAll!.onclick = () => {
        state = deleteAll(state);
        useInterface();
    }

    if (tasksUL) {
        tasksUL.innerHTML = '';
    }

    state.tasks.forEach(task => { 
        const li = document.createElement('li');
        li.classList.add('app__section-task-list-item')
        const svgIcon = document.createElement('svg')
        svgIcon.innerHTML = taskIconSvg
        
        const paragraph = document.createElement('p')
        paragraph.classList.add('app__section-task-list-item-description')
        paragraph.textContent = task.description
        
        const button = document.createElement('button')
        button.classList.add('app_button-edit')

        const editIcon = document.createElement('img')
        editIcon.setAttribute('src', '/images/edit.png')
    
        button.appendChild(editIcon)

        if (task.done) {
            button.setAttribute('disabled', 'true')
            li.classList.add('app__section-task-list-item-complete')
        }

        if (task == state.selectedTask) {
            li.classList.add('app__section-task-list-item-active')
        }

        li.appendChild(svgIcon)
        li.appendChild(paragraph)
        li.appendChild(button)
        li.addEventListener('click', () => {
            state = taskSelect(state, task)
            useInterface()
        })
        tasksUL?.appendChild(li)
    })
    
}

useInterface()