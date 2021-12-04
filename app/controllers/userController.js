const {v4: uuidv4} = require('uuid');

const { REQUEST_METHODS, STATUS_CODES} = require('../constants/constants');
const { ERRORS } = require('../constants/errors');

const {sendResponseEnd} = require('../helpers/response');
const {getAllUsers, getById, createUser, updateUser, deleteUser} = require('../services/userService')


const {requestDataExtractor} = require('../helpers/requestExtractor');
const { postObjValidator, putObjValidator } = require('../validators/validators');

const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const urlValidator = /\/users\/.+/;


const usersController = (request, response) =>{
    if(request.method === REQUEST_METHODS.GET && request.url === '/users' ){
        sendResponseEnd(response, STATUS_CODES.OK, getAllUsers());
    }
    else if(request.method === REQUEST_METHODS.GET && urlValidator.test(request.url)){
        const userId = request.url.split('/')[2];
        if(!uuidValidator.test(userId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        }
        else {
            const getResult = getById(userId);
            console.log('user response', getResult);
            if(getResult === ERRORS.USER_NOT_FOUND){
                return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, getResult);
            }
            return sendResponseEnd(response, STATUS_CODES.OK, getResult);
        }
    }
    else if(request.method === REQUEST_METHODS.POST && request.url === '/users'){
        requestDataExtractor(request)
            .then(postData => {
                let dataObj;
                try{
                    dataObj = JSON.parse(postData);
                }
                catch (err){
                    return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
                };
                const validationError = postObjValidator(dataObj);
                if(validationError === undefined){
                    createUser(dataObj);
                    return sendResponseEnd(response, STATUS_CODES.CREATED, dataObj)
                }
                return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, validationError);
            });
    }
    else if(request.method === REQUEST_METHODS.PUT && urlValidator.test(request.url)){
        let userId = request.url.split('/')[2];
        if(!uuidValidator.test(userId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        };
        return requestDataExtractor(request)
        .then(putData => {
            let putDataObj;
            try{
                putDataObj = JSON.parse(putData);
                console.log('Put data obj:', putDataObj);
            }
            catch (err){ 
                return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
            }
            const validationError = putObjValidator(putDataObj);
            console.log('validation error ' ,validationError);
            if(validationError == undefined){
                const updateResult = updateUser(putDataObj, userId);
                if(typeof updateResult === 'string'){
                    return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, updateResult)
                }
                return sendResponseEnd(response, STATUS_CODES.OK, updateResult);
            }
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, validationError);
        })
    }
    else if(request.method === REQUEST_METHODS.DELETE && urlValidator.test(request.url)){
        console.log('delete request URL', request.url)
        let userId = request.url.split('/')[2];
        if(!uuidValidator.test(userId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);
        };
        const deletionResult = deleteUser(userId);
        if(typeof deletionResult === 'string'){
            return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, deletionResult);
        }
        return sendResponseEnd(response, deletionResult);
    }

}

module.exports = {usersController}
//