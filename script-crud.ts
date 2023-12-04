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