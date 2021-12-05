const {v4: uuidv4} = require('uuid');

const { ERRORS } = require('../constants/errors');
const {STATUS_CODES} = require('../constants/constants');
let {users} = require('../repositry/users');
const { unassignUserAfterDelete } = require('./taskService');

const getAllUsers =() => {
    return users.map(el => {
        delete el.password;
        return el;
    });
};

const getById = (userId) => {
    const result = users.find(el => el.id === userId);
    if(result === undefined){
       return ERRORS.USER_NOT_FOUND
    }
    delete result.password;
    return result;
};

const createUser = (newUser) =>{
    newUser.id = uuidv4();
    users.push(newUser);
};

const updateUser = (newUserData, userId) => {
    let result = users.findIndex(el => el.id === userId);
    if(result == -1){
        return ERRORS.USER_NOT_FOUND;
    }
    users[result].name = newUserData.name || users[result].name;
    users[result].login = newUserData.login || users[result].login;
    users[result].password = newUserData.password || users[result].password;
    return users[result];
};

const deleteUser = (userId) => {
    let result = users.filter(el => el.id !== userId);
    if(result.length === users.length){
        return ERRORS.USER_NOT_FOUND
    }
    users = result;
    unassignUserAfterDelete(userId);
    return STATUS_CODES.NO_CONTENT;
}




module.exports = {getAllUsers, getById, createUser, updateUser, deleteUser}