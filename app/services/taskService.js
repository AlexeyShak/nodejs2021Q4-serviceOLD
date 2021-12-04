const {v4: uuidv4} = require('uuid');

const { ERRORS } = require('../constants/errors');
const {STATUS_CODES} = require('../constants/constants');
let {tasks} = require('../repositry/tasks');
let {boards} = require('../repositry/boards');
const { getByID } = require('./boardService');

const getAllTasks = (boardId) => {
    let boardExistence = getByID(boardId);
    if(typeof boardExistence === 'string'){
        return boardExistence;
    }
    tasksFromBoard = tasks.filter(el => el.boardId === boardId);
    return tasksFromBoard ;
}

const getTaskById = (boardId, taskId) => {
    let boardExistence = getByID(boardId);
    if(typeof boardExistence === 'string'){
        return boardExistence;
    }
    const result = tasks.find(el => el.id === taskId);
    if(result === undefined){
       return ERRORS.TASK_NOT_FOUND;
    }
    if(boardExistence.id !== result.boardId){
        return ERRORS.TASK_FROM_ANOTHER_BOARD
    }
       return result;
};

const createTask = (taskData, boardId) => {
    let boardExistence = getByID(boardId);
    if(typeof boardExistence === 'string'){
        return boardExistence;
    }
    taskData.id = uuidv4();
    taskData.boardId = boardId;
    tasks.push(taskData);
    return taskData;
};

const updateTask = (newTaskData, boardId, taskId) => {
    let boardExistence = getByID(boardId);
    if(typeof boardExistence === 'string'){
        return boardExistence;
    }
    let result = tasks.findIndex(el => el.id === taskId);
    if(result == -1){
        return ERRORS.TASK_NOT_FOUND;
    }
    if(boardExistence.id !== newTaskData.boardId){
        return ERRORS.TASK_FROM_ANOTHER_BOARD;
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
    let boardExistence = getByID(boardId);
    if(typeof boardExistence === 'string'){
        return boardExistence;
    }
    result = tasks.filter(el => el.id !== taskId);
    if(result.length === tasks.length){
        return ERRORS.TASK_NOT_FOUND
    }
    const taskTodelete = tasks.find(el => el.id === taskId);
    if(boardExistence.id !== taskTodelete.boardId){
        return ERRORS.TASK_FROM_ANOTHER_BOARD;
    }
    tasks = result;
    return STATUS_CODES.NO_CONTENT;
}

const deleteByBoardId = (boardId) => {
    tasks = tasks.filter(el => el.boardId !== boardId);
}

const unassignUserAfterDelete = (userId) =>{
    result = tasks.map(el => {
         if(el.userId = userId){
             el.userId = null;
         }
    })
    tasks = result;
}



module.exports = {getAllTasks, getTaskById, createTask, updateTask, deleteTask, deleteByBoardId, unassignUserAfterDelete}