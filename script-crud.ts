interface Task {
    description: string;
    done: boolean;
}

interface AppState {
    tasks: Task[];
    selectedTask: Task | null;
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
    selectedTask: null
}

const taskSelect = (state: AppState, task: Task) : AppState => {
    return {
        ...state,
        selectedTask: task === state.selectedTask ? null : task
    }
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

    const tasksUL = document.querySelector('#app__section-task-list') as HTMLUListElement;

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

        li.appendChild(svgIcon)
        li.appendChild(paragraph)
        li.appendChild(button)

        tasksUL?.appendChild(li)
    })
    
}