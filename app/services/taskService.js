const {v4: uuidv4} = require('uuid');

const { ERRORS } = require('../constants/errors');
const {STATUS_CODES} = require('../constants/constants');
let {tasks} = require('../repositry/tasks');

const getAllTasks = (boardId) => {
   tasksFromBoard = tasks.filter(el => el.boardId === boardId);
    if(tasksFromBoard === undefined){
        return ERRORS.TASK_IN_BOARD_NOT_FOUND;
    };
    return tasksFromBoard;
}
const getTaskByID = (taskId, boardId) => {
    const result = getAllTasks(boardId).find(el => el.id === taskId);
    console.log('result: ',result);
    if(result === undefined){
       return ERRORS.TASK_NOT_FOUND;
    }
    else{
       return result;
    };
};
const createTask = (taskData, boardId) => {
    tasksFromBoard = tasks.filter(el => el.boardId === boardId);
    if(tasksFromBoard === undefined){
        return ERRORS.TASK_IN_BOARD_NOT_FOUND;
    };
    taskData.id = uuidv4();
    taskData.boardId = boardId;
    tasksFromBoard.push(taskData);
};

const updateTask = (newTaskData, taskId, boardId) => {
    tasksFromBoard = tasks.filter(el => el.boardId === boardId);
    if(tasksFromBoard === undefined){
        return ERRORS.TASK_IN_BOARD_NOT_FOUND;
    };
    let result = boards.findIndex(el => el.id === taskId);
    if(result == -1){
        return ERRORS.BOARD_NOT_FOUND;
    }
    boards[result].title = newTaskData.title || boards[result].title;
    if(newBoardData.hasOwnProperty('columns')){
        boards[result].columns = newBoardData.columns || boards[result].columns;
    }
    return boards[result];
};
const deleteTask = (boardId) => {
    let result = boards.filter(el => el.id !== boardId);
        if(result.length === boards.length){
            return ERRORS.BOARD_NOT_FOUND
        }
        boards = result;
        return STATUS_CODES.NO_CONTENT;
}




module.exports = {getAllTasks, getTaskByID, createTask, updateTask, deleteTask}