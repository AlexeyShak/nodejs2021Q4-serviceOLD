const {v4: uuidv4} = require('uuid');

const { ERRORS } = require('../constants/errors');
const {STATUS_CODES} = require('../constants/constants');
let {tasks} = require('../repositry/tasks');
let {boards} = require('../repositry/boards');

const getAllTasks = (boardId) => {
    const result = boards.find(el => el.id === boardId);
    console.log ('result:', result)
    if(result === undefined){
        return ERRORS.BOARD_NOT_FOUND;
    }
    tasksFromBoard = tasks.filter(el => el.boardId === boardId);
    return tasksFromBoard;
}

const getTaskById = (boardId, taskId) => {
    let getAllTasksRes = getAllTasks(boardId);
    if(typeof getAllTasksRes === 'string'){
        console.log('sjdbckjdwbkc', getAllTasksRes)
        return getAllTasksRes;
    }
    const result = getAllTasksRes.find(el => el.id === taskId);
    console.log('result: ',result);
    if(result === undefined){
       return ERRORS.TASK_NOT_FOUND;
    }
       return result;
};

const createTask = (taskData, boardId) => {
    let getAllTasksRes = getAllTasks(boardId);
    if(typeof getAllTasksRes === 'string'){
        return getAllTasksRes;
    }
    tasksFromBoard = getAllTasksRes.filter(el => el.boardId === boardId);
    if(tasksFromBoard === undefined){
        return ERRORS.TASK_IN_BOARD_NOT_FOUND;
    };
    taskData.id = uuidv4();
    taskData.boardId = boardId;
    tasks.push(taskData);
    return taskData;
};

const updateTask = (newTaskData, boardId, taskId) => {
    let getAllTasksRes = getAllTasks(boardId);
    if(typeof getAllTasksRes === 'string'){
        return getAllTasksRes;
    }
    tasksFromBoard = getAllTasksRes.filter(el => el.id === taskId);
    if(tasksFromBoard === undefined){
        return ERRORS.TASK_IN_BOARD_NOT_FOUND;
    };
    let result = tasks.findIndex(el => el.id === taskId);
    if(result == -1){
        return ERRORS.BOARD_NOT_FOUND;
    }
    tasks[result].title = newTaskData.title || tasks[result].title;
    tasks[result].order = newTaskData.order || tasks[result].order;
    tasks[result].description = newTaskData.description || tasks[result].description;
    tasks[result].userId = newTaskData.userId || tasks[result].userId;
    tasks[result].columnId = newTaskData.columnId || tasks[result].columnId;
    tasks[result].boardId = newTaskData.boardId || tasks[result].boardId;
    return tasks[result];
};
const deleteTask = (boardId, taskId) => {
    let getAllTasksRes = getAllTasks(boardId);
    if(typeof getAllTasksRes === 'string'){
        return getAllTasksRes;
    }
    let result = getAllTasksRes.filter(el => el.id === taskId);
    console.log('after filter', result);
    if(result === undefined){
        return ERRORS.TASK_NOT_FOUND;
    }
    tasks = tasks.filter(el => el.id !== taskId);
    return STATUS_CODES.NO_CONTENT;
}

const deleteByBoardId = (boardId) => {
    tasks = tasks.filter(el => el.boardId !== boardId);
}


module.exports = {getAllTasks, getTaskById, createTask, updateTask, deleteTask, deleteByBoardId}