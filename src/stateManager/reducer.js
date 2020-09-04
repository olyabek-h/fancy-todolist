import { ACTIONS } from './actionCreator'

export const INIT_STATE = {
    title: '',
    taskList: [
        {
            id: '1',
            title: 'Hit the gym',
            checked: false,
        },
        {
            id: '2',
            title: 'Pay bills',
            checked: true,
        },
        {
            id: '3',
            title: 'Meet George',
            checked: false,
        },
        {
            id: '4',
            title: 'Buy eggs',
            checked: false,
        },
        {
            id: '5',
            title: 'Read a book',
            checked: false,
        },
        {
            id: '6',
            title: 'Organize office',
            checked: false,
        },
    ]
}

export function reducer(state, action) {
    return (ACTION_HANDLERS[action.type] || (() => state))(state, action.payload)
}

const ACTION_HANDLERS = {
    [ACTIONS.TITLE_CHANGED]: handleTitleChanged,
    [ACTIONS.TASK_ADDED]: handleTaskAdded,
    [ACTIONS.TASK_DONE]: handleTaskDone,
    [ACTIONS.TASK_DELETED]: handleTaskDeleted,
}

function handleTitleChanged(state, payload) {
    return {
        ...state,
        title: payload,
    }
}

function handleTaskAdded(state, payload) {
    return {
        title: '',
        taskList: [
            ...state.taskList,
            {
                id: Math.random().toString(),
                title: payload,
                checked: false
            }
        ]
    }
}

function handleTaskDone(state, payload) {
    const taskIndex = state.taskList.findIndex(task => task.id === payload);
    const newTask = {
        ...state.taskList[taskIndex],
        checked: !state.taskList[taskIndex].checked,
    }
    const newTaskList = [...state.taskList];
    newTaskList.splice(taskIndex, 1, newTask);
    return {
        ...state,
        taskList: newTaskList
    }
}

function handleTaskDeleted(state, payload) {
    const taskIndex = state.taskList.findIndex(task => task.id === payload);
    const newTaskList = [...state.taskList];
    newTaskList.splice(taskIndex, 1);
    return {
        ...state,
        taskList: newTaskList
    }
}