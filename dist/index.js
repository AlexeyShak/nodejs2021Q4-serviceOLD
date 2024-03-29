/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/constants/constants.js":
/*!************************************!*\
  !*** ./app/constants/constants.js ***!
  \************************************/
/***/ ((module) => {

eval("const REQUEST_METHODS = {\r\n    GET: 'GET',\r\n    POST: 'POST',\r\n    PUT: 'PUT',\r\n    DELETE: 'DELETE'\r\n};\r\nconst STATUS_CODES = {\r\n    NOT_FOUND: 404,\r\n    OK: 200,\r\n    CREATED: 201,\r\n    SERVER_ERROR: 500,\r\n    NO_CONTENT: 204,\r\n    BAD_REQUEST: 400\r\n};\r\nmodule.exports = {REQUEST_METHODS, STATUS_CODES};\r\n\n\n//# sourceURL=webpack:///./app/constants/constants.js?");

/***/ }),

/***/ "./app/constants/errors.js":
/*!*********************************!*\
  !*** ./app/constants/errors.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ERRORS\": () => (/* binding */ ERRORS)\n/* harmony export */ });\nconst ERRORS = {\r\n    NOT_AN_OBJECT: 'Request data is not an object',\r\n    NAME_NOT_A_STRING: 'Name is not a string',\r\n    NAME_NOT_ENTERED: 'User property \"name\" not entered or spelled incorrectly',\r\n    LOGIN_NOT_ENTERED: 'User property \"login\" not entered or spelled incorrectly',\r\n    PASSWORD_NOT_ENTERED: 'User property \"password\" not entered or spelled incorrectly',\r\n    AGE_NOT_NUMBER: 'Age is not a number',\r\n    PASSWORD_NOT_STRING: 'Password is not a string',\r\n    USER_NOT_FOUND: 'User with requested ID not found. Please check ID input',\r\n    WRONG_ID_FORMAT: 'User ID format is not the format that the UUID suggests (XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX)',\r\n    ENDPOINT_NOT_FOUND: 'End point not found',\r\n    JSON_PARSE_ERR: 'JSON parse error',\r\n    LOGIN_IS_NOT_A_STRING: 'Login is not a string',\r\n    TITLE_NOT_ENTERED: 'Board property \"title\" not entered or spelled incorrectly',\r\n    TITLE_NOT_A_STRING: 'Title is not a string',\r\n    COLUMNS_IS_NOT_AN_ARRAY: 'Columns arrnt an array'\r\n\r\n}\n\n//# sourceURL=webpack:///./app/constants/errors.js?");

/***/ }),

/***/ "./app/controllers/boardsController.js":
/*!*********************************************!*\
  !*** ./app/controllers/boardsController.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {v4: uuidv4} = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-node/index.js\");\r\n\r\nconst { REQUEST_METHODS, STATUS_CODES} = __webpack_require__(/*! ../constants/constants */ \"./app/constants/constants.js\");\r\nconst { ERRORS } = __webpack_require__(/*! ../constants/errors */ \"./app/constants/errors.js\");\r\n\r\nconst {sendResponseEnd} = __webpack_require__(/*! ../helpers/response */ \"./app/helpers/response.js\");\r\nconst {getByID} = __webpack_require__(/*! ../services/boardService */ \"./app/services/boardService.js\")\r\nconst {boards} = __webpack_require__(/*! ../repositry/boards */ \"./app/repositry/boards.js\");\r\n\r\nconst {requestDataExtractor} = __webpack_require__(/*! ../helpers/requestExtractor */ \"./app/helpers/requestExtractor.js\");\r\nconst {postBoardObjValidator, putBoardObjValidator} = __webpack_require__(/*! ../validators/validators */ \"./app/validators/validators.js\");\r\n\r\nconst uuidValidator = /(\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b)/;\r\nconst urlValidator = /\\/boards\\/.+/;\r\n\r\n\r\nconst boardsController = (request, response) =>{\r\n    if(request.method === REQUEST_METHODS.GET && request.url === '/boards' ){\r\n        sendResponseEnd(response, STATUS_CODES.OK, boards);\r\n    }\r\n    else if(request.method === REQUEST_METHODS.GET && urlValidator.test(request.url)){\r\n        let boardId = request.url.split('/')[2];\r\n        if(!uuidValidator.test(boardId)){\r\n            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  \r\n        }\r\n        else {\r\n            let getResult = getByID(boardId);\r\n            console.log('user response', getResult);\r\n            if(getResult === ERRORS.USER_NOT_FOUND){\r\n                return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, getResult)\r\n            }\r\n            else {\r\n                return sendResponseEnd(response, STATUS_CODES.OK, getResult)\r\n            };\r\n        }\r\n    }\r\n    else if(request.method === REQUEST_METHODS.POST && request.url === '/boards'){\r\n        requestDataExtractor(request)\r\n            .then(postBoard => {\r\n                let boardObj;\r\n                try{\r\n                    boardObj = JSON.parse(postBoard);\r\n                }\r\n                catch (err){\r\n                    return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);\r\n                };\r\n                const validationError = postBoardObjValidator(boardObj)\r\n                if(validationError === undefined){\r\n                    boardObj.id = uuidv4();\r\n                    boards.push(boardObj);\r\n                    sendResponseEnd(response, STATUS_CODES.CREATED, boardObj)\r\n                }\r\n                else{\r\n                    sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, validationError);\r\n                };\r\n            });\r\n    }\r\n    else if(request.method === REQUEST_METHODS.PUT && urlValidator.test(request.url)){\r\n        let boardId = request.url.split('/')[2];\r\n        if(!uuidValidator.test(boardId)){\r\n            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  \r\n        };\r\n        let result = boards.findIndex(el => el.id === boardId);\r\n        console.log(result);\r\n        if(result == -1){\r\n            sendResponseEnd(response, STATUS_CODES.NOT_FOUND, ERRORS.USER_NOT_FOUND);\r\n        }\r\n        else{\r\n            requestDataExtractor(request)\r\n            .then(putBoard => {\r\n                let putBoardObj;\r\n                try{\r\n                    putBoardObj = JSON.parse(putBoard);\r\n                    console.log(putBoardObj);\r\n                }\r\n                catch (err){ \r\n                    return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);\r\n                }\r\n                const validationError = putBoardObjValidator(putBoardObj);\r\n                console.log('validation error ' ,validationError);\r\n                if(validationError == undefined){\r\n                    boards[result].title = putBoardObj.title || boards[result].title;\r\n                    if(putBoardObj.hasOwnProperty('columns')){\r\n                        boards[result].columns = putBoardObj.columns || boards[result].columns;\r\n                    }\r\n                    sendResponseEnd(response, STATUS_CODES.OK, boards[result]) \r\n                }\r\n                else{\r\n                    sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, validationError);\r\n                }\r\n\r\n            })\r\n        }\r\n    }\r\n    else if(request.method === REQUEST_METHODS.DELETE && urlValidator.test(request.url)){\r\n        console.log('delete request URL', request.url)\r\n        let boardID = request.url.split('/')[2];\r\n        if(!uuidValidator.test(boardID)){\r\n            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);\r\n        };\r\n        function elementValidator(element){\r\n            return element.id !== boardID;\r\n        };\r\n        let result = boards.filter(elementValidator);\r\n        console.log('result: ',result)\r\n        if(result.length === boards.length){\r\n            sendResponseEnd(response, STATUS_CODES.NOT_FOUND, ERRORS.USER_NOT_FOUND)\r\n        }\r\n        else{\r\n            console.log('else checkout'); \r\n            console.log('boards before', boards);\r\n            boards = result; // ?????????????????????????????????????????????????????????????\r\n            console.log('checkout');\r\n            sendResponseEnd(response, STATUS_CODES.NO_CONTENT)\r\n        } \r\n    }\r\n\r\n}\r\n\r\nmodule.exports = {boardsController}\n\n//# sourceURL=webpack:///./app/controllers/boardsController.js?");

/***/ }),

/***/ "./app/controllers/userController.js":
/*!*******************************************!*\
  !*** ./app/controllers/userController.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {v4: uuidv4} = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-node/index.js\");\r\n\r\nconst { REQUEST_METHODS, STATUS_CODES} = __webpack_require__(/*! ../constants/constants */ \"./app/constants/constants.js\");\r\nconst { ERRORS } = __webpack_require__(/*! ../constants/errors */ \"./app/constants/errors.js\");\r\n\r\nconst {sendResponseEnd} = __webpack_require__(/*! ../helpers/response */ \"./app/helpers/response.js\");\r\nconst {getByID, createUser} = __webpack_require__(/*! ../services/userService */ \"./app/services/userService.js\")\r\nconst {users} = __webpack_require__(/*! ../repositry/users */ \"./app/repositry/users.js\");\r\n\r\nconst {requestDataExtractor} = __webpack_require__(/*! ../helpers/requestExtractor */ \"./app/helpers/requestExtractor.js\");\r\nconst { postObjValidator, putObjValidator } = __webpack_require__(/*! ../validators/validators */ \"./app/validators/validators.js\");\r\n\r\nconst uuidValidator = /(\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b)/;\r\nconst urlValidator = /\\/users\\/.+/;\r\n\r\n\r\nconst usersController = (request, response) =>{\r\n    if(request.method === REQUEST_METHODS.GET && request.url === '/users' ){\r\n        users.forEach(el => delete el.password);\r\n        sendResponseEnd(response, STATUS_CODES.OK, users);\r\n    }\r\n    else if(request.method === REQUEST_METHODS.GET && urlValidator.test(request.url)){\r\n        let userId = request.url.split('/')[2];\r\n        if(!uuidValidator.test(userId)){\r\n            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  \r\n        }\r\n        else {\r\n            let getResult = getByID(userId);\r\n            console.log('user response', getResult);\r\n            if(getResult === ERRORS.USER_NOT_FOUND){\r\n                return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, getResult)\r\n            }\r\n            else {\r\n                return sendResponseEnd(response, STATUS_CODES.OK, getResult)\r\n            };\r\n        }\r\n    }\r\n    else if(request.method === REQUEST_METHODS.POST && request.url === '/users'){\r\n        requestDataExtractor(request)\r\n            .then(postData => {\r\n                let dataObj;\r\n                try{\r\n                    dataObj = JSON.parse(postData);\r\n                }\r\n                catch (err){\r\n                    return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);\r\n                };\r\n                const validationError = postObjValidator(dataObj)\r\n                if(validationError === undefined){\r\n                    dataObj.id = uuidv4();\r\n                    users.push(dataObj);\r\n                    sendResponseEnd(response, STATUS_CODES.CREATED, dataObj)\r\n                }\r\n                else{\r\n                    sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, validationError);\r\n                };\r\n            });\r\n    }\r\n    else if(request.method === REQUEST_METHODS.PUT && urlValidator.test(request.url)){\r\n        let userID = request.url.split('/')[2];\r\n        if(!uuidValidator.test(userId)){\r\n            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  \r\n        };\r\n        let result = users.findIndex(el => el.id === userId);\r\n        console.log(result);\r\n        if(result == -1){\r\n            sendResponseEnd(response, STATUS_CODES.NOT_FOUND, ERRORS.USER_NOT_FOUND);\r\n        }\r\n        else{\r\n            requestDataExtractor(request)\r\n            .then(putData => {\r\n                let putDataObj;\r\n                try{\r\n                    putDataObj = JSON.parse(putData);\r\n                    console.log(putDataObj);\r\n                }\r\n                catch (err){ \r\n                    return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);\r\n                }\r\n                const validationError = putObjValidator(putDataObj);\r\n                console.log('validation error ' ,validationError);\r\n                if(validationError == undefined){\r\n                    users[result].name = putDataObj.name || users[result].name;\r\n                    users[result].login = putDataObj.login || users[result].login;\r\n                    users[result].password = putDataObj.password || users[result].password;\r\n                    sendResponseEnd(response, STATUS_CODES.OK, users[result]) \r\n                }\r\n                else{\r\n                    sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, validationError);\r\n                }\r\n\r\n            })\r\n        }\r\n    }\r\n    else if(request.method === REQUEST_METHODS.DELETE && urlValidator.test(request.url)){\r\n        console.log('delete request URL', request.url)\r\n        let userID = request.url.split('/')[2];\r\n        if(!uuidValidator.test(userID)){\r\n            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);\r\n        };\r\n        function elementValidator(element){\r\n            return element.id !== userID;\r\n        };\r\n        let result = users.filter(elementValidator);\r\n        console.log('result: ',result)\r\n        if(result.length === users.length){\r\n            sendResponseEnd(response, STATUS_CODES.NOT_FOUND, ERRORS.USER_NOT_FOUND)\r\n        }\r\n        else{\r\n            console.log('else checkout');\r\n            console.log('users before', users);\r\n            users = result; // ?????????????????????????????????????????????????????????????\r\n            console.log('checkout');\r\n            sendResponseEnd(response, STATUS_CODES.NO_CONTENT)\r\n        } \r\n    }\r\n\r\n}\r\n\r\nmodule.exports = {usersController}\n\n//# sourceURL=webpack:///./app/controllers/userController.js?");

/***/ }),

/***/ "./app/helpers/requestExtractor.js":
/*!*****************************************!*\
  !*** ./app/helpers/requestExtractor.js ***!
  \*****************************************/
/***/ ((module) => {

eval("const requestDataExtractor = (req) => {\r\n    return new Promise((resolve, reject) => {\r\n        let body = '';\r\n        req.on('data', (chunk) => {\r\n            body = body + chunk.toString();\r\n        });\r\n        req.on('end', () => {\r\n            resolve(body);\r\n        });\r\n\r\n    });\r\n}\r\nmodule.exports = {requestDataExtractor}\n\n//# sourceURL=webpack:///./app/helpers/requestExtractor.js?");

/***/ }),

/***/ "./app/helpers/response.js":
/*!*********************************!*\
  !*** ./app/helpers/response.js ***!
  \*********************************/
/***/ ((module) => {

eval("const sendResponseEnd = (res, status, data) => {\r\n    res.writeHeader(status);\r\n    res.end(JSON.stringify(data));\r\n};\r\n\r\n\r\n module.exports = {sendResponseEnd};\n\n//# sourceURL=webpack:///./app/helpers/response.js?");

/***/ }),

/***/ "./app/indexNew.js":
/*!*************************!*\
  !*** ./app/indexNew.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { error } = __webpack_require__(/*! console */ \"console\");\r\nconst http = __webpack_require__(/*! http */ \"http\");\r\n\r\nconst { REQUEST_METHODS, STATUS_CODES} = __webpack_require__(/*! ./constants/constants */ \"./app/constants/constants.js\");\r\nconst { ERRORS } = __webpack_require__(/*! ./constants/errors */ \"./app/constants/errors.js\");\r\nconst requestExtractor = __webpack_require__(/*! ./helpers/requestExtractor */ \"./app/helpers/requestExtractor.js\");\r\n\r\nconst {usersController} = __webpack_require__(/*! ./controllers/userController */ \"./app/controllers/userController.js\")\r\nconst {boardsController} = __webpack_require__(/*! ./controllers/boardsController */ \"./app/controllers/boardsController.js\")\r\n\r\nhttp.createServer((request, response) => {\r\n    try{\r\n        const url = request.url;\r\n        if(url.startsWith('/users')){\r\n            return usersController(request, response);\r\n        }\r\n        else if(url.startsWith('/boards')){\r\n            return boardsController(request, response);\r\n        }\r\n    }catch (e){\r\n        response.end('no url argument');\r\n    }\r\n\r\n}).listen(\"3000\")\n\n//# sourceURL=webpack:///./app/indexNew.js?");

/***/ }),

/***/ "./app/repositry/boards.js":
/*!*********************************!*\
  !*** ./app/repositry/boards.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\nconst {v4: uuidv4} = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-node/index.js\");\r\n\r\nconst boards = [{\r\n    id: uuidv4(),\r\n    title: 'Random board',\r\n    columns: []\r\n}];\r\n\r\nmodule.exports = {boards};\n\n//# sourceURL=webpack:///./app/repositry/boards.js?");

/***/ }),

/***/ "./app/repositry/users.js":
/*!********************************!*\
  !*** ./app/repositry/users.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\nconst {v4: uuidv4} = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-node/index.js\");\r\n\r\nconst users = [{\r\n    id: uuidv4(),\r\n    name: 'Random Person',\r\n    login: 'login',\r\n    password: 'password'\r\n},\r\n{\r\n    id: uuidv4(),\r\n    name: 'Alesha',\r\n    login: 'login',\r\n    password: 'password'  \r\n}];\r\n\r\nmodule.exports = {users};\n\n//# sourceURL=webpack:///./app/repositry/users.js?");

/***/ }),

/***/ "./app/services/boardService.js":
/*!**************************************!*\
  !*** ./app/services/boardService.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {v4: uuidv4} = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-node/index.js\");\r\n\r\nconst { ERRORS } = __webpack_require__(/*! ../constants/errors */ \"./app/constants/errors.js\");\r\nconst {boards} = __webpack_require__(/*! ../repositry/boards */ \"./app/repositry/boards.js\");\r\n\r\nconst {requestDataExtractor} = __webpack_require__(/*! ../helpers/requestExtractor */ \"./app/helpers/requestExtractor.js\");\r\nconst { postObjValidator, putObjValidator } = __webpack_require__(/*! ../validators/validators */ \"./app/validators/validators.js\");\r\n\r\n\r\nconst getByID = (boardId) => {\r\n    console.log('board ID: ',boardId)\r\n    const result = boards.find(el => el.id === boardId);\r\n    console.log('result: ',result);\r\n    if(result === undefined){\r\n        console.log('result after undefined',result)\r\n       return ERRORS.USER_NOT_FOUND\r\n    }\r\n    else{\r\n       return result;\r\n    } ;\r\n};\r\n\r\n\r\n\r\nmodule.exports = {getByID}\n\n//# sourceURL=webpack:///./app/services/boardService.js?");

/***/ }),

/***/ "./app/services/userService.js":
/*!*************************************!*\
  !*** ./app/services/userService.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {v4: uuidv4} = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-node/index.js\");\r\n\r\nconst { ERRORS } = __webpack_require__(/*! ../constants/errors */ \"./app/constants/errors.js\");\r\nconst {users} = __webpack_require__(/*! ../repositry/users */ \"./app/repositry/users.js\");\r\nconst {requestDataExtractor} = __webpack_require__(/*! ../helpers/requestExtractor */ \"./app/helpers/requestExtractor.js\");\r\nconst { postObjValidator, putObjValidator } = __webpack_require__(/*! ../validators/validators */ \"./app/validators/validators.js\");\r\n\r\n\r\nconst getByID = (userId) => {\r\n    console.log('user ID: ',userId)\r\n    const result = users.find(el => el.id === userId);\r\n    console.log('result: ',result);\r\n    if(result === undefined){\r\n        console.log('result after undefined',result)\r\n       return ERRORS.USER_NOT_FOUND\r\n    }\r\n    else{\r\n        delete result.password;\r\n       return result;\r\n    } ;\r\n};\r\n\r\n\r\n\r\nmodule.exports = {getByID}\n\n//# sourceURL=webpack:///./app/services/userService.js?");

/***/ }),

/***/ "./app/validators/validators.js":
/*!**************************************!*\
  !*** ./app/validators/validators.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { ERRORS } = __webpack_require__(/*! ../constants/errors */ \"./app/constants/errors.js\");\r\n\r\npostObjValidator = (obj) => {\r\n    if(typeof obj !== 'object'){\r\n        return ERRORS.NOT_AN_OBJECT;\r\n    }\r\n    else{\r\n        if(!obj.hasOwnProperty('name')){\r\n            return ERRORS.NAME_NOT_ENTERED;\r\n        }\r\n        if(typeof obj.name !== 'string'){\r\n            return ERRORS.NAME_NOT_A_STRING;\r\n        };\r\n        if(!obj.hasOwnProperty('login')){\r\n            return ERRORS.LOGIN_NOT_ENTERED;\r\n        }\r\n        if(typeof obj.login !== 'string'){\r\n            return ERRORS.LOGIN_IS_NOT_A_STRING;\r\n        };\r\n        if(!obj.hasOwnProperty('password')){\r\n            return ERRORS.PASSWORD_NOT_ENTERED;\r\n        }\r\n        if(typeof obj.password !== 'string'){\r\n            return ERRORS.PASSWORD_NOT_STRING;\r\n        };\r\n    };  \r\n};\r\n\r\n\r\nputObjValidator = (obj) => {\r\n    if(typeof obj !== 'object'){\r\n        return ERRORS.NOT_AN_OBJECT;\r\n    }\r\n    if(obj.hasOwnProperty('name') && typeof obj.name !== 'string'){\r\n        return ERRORS.NAME_NOT_A_STRING;\r\n    };\r\n    if(obj.hasOwnProperty('login') && typeof obj.login !== 'string'){\r\n        return  ERRORS.LOGIN_IS_NOT_A_STRING;\r\n    };\r\n    if(obj.hasOwnProperty('password') && typeof obj.password !== 'string'){\r\n        return ERRORS.PASSWORD_NOT_STRING;\r\n    };\r\n\r\n};\r\npostBoardObjValidator = (obj) => {\r\n    if(typeof obj !== 'object'){\r\n        return ERRORS.NOT_AN_OBJECT;\r\n    }\r\n    else{\r\n        if(!obj.hasOwnProperty('title')){\r\n            return ERRORS.TITLE_NOT_ENTERED;\r\n        }\r\n        if(typeof obj.title !== 'string'){\r\n            return ERRORS.TITLE_NOT_A_STRING;\r\n        };\r\n        if(obj.hasOwnProperty('columns') && !Array.isArray(obj.columns)){\r\n            return ERRORS.COLUMNS_IS_NOT_AN_ARRAY;\r\n        }\r\n\r\n    };  \r\n};\r\nputBoardObjValidator = (obj) => {\r\n    if(typeof obj !== 'object'){\r\n        return ERRORS.NOT_AN_OBJECT;\r\n    }\r\n    else{\r\n        if(obj.hasOwnProperty('title') && typeof obj.title !== 'string'){\r\n            return ERRORS.TITLE_NOT_A_STRING;\r\n        };\r\n        if(obj.hasOwnProperty('columns') && !Array.isArray(obj.columns)){\r\n            return ERRORS.COLUMNS_IS_NOT_AN_ARRAY;\r\n        }\r\n\r\n    };  \r\n};\r\nmodule.exports = {postObjValidator, putObjValidator, postBoardObjValidator, putBoardObjValidator};\n\n//# sourceURL=webpack:///./app/validators/validators.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/index.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"v1\": () => (/* reexport safe */ _v1_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"v3\": () => (/* reexport safe */ _v3_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   \"v4\": () => (/* reexport safe */ _v4_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   \"v5\": () => (/* reexport safe */ _v5_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   \"NIL\": () => (/* reexport safe */ _nil_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   \"version\": () => (/* reexport safe */ _version_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n/* harmony export */   \"validate\": () => (/* reexport safe */ _validate_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]),\n/* harmony export */   \"stringify\": () => (/* reexport safe */ _stringify_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]),\n/* harmony export */   \"parse\": () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ \"./node_modules/uuid/dist/esm-node/v1.js\");\n/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3.js */ \"./node_modules/uuid/dist/esm-node/v3.js\");\n/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v4.js */ \"./node_modules/uuid/dist/esm-node/v4.js\");\n/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v5.js */ \"./node_modules/uuid/dist/esm-node/v5.js\");\n/* harmony import */ var _nil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nil.js */ \"./node_modules/uuid/dist/esm-node/nil.js\");\n/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./version.js */ \"./node_modules/uuid/dist/esm-node/version.js\");\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-node/validate.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-node/stringify.js\");\n/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parse.js */ \"./node_modules/uuid/dist/esm-node/parse.js\");\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/index.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/md5.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/md5.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction md5(bytes) {\n  if (Array.isArray(bytes)) {\n    bytes = Buffer.from(bytes);\n  } else if (typeof bytes === 'string') {\n    bytes = Buffer.from(bytes, 'utf8');\n  }\n\n  return crypto__WEBPACK_IMPORTED_MODULE_0___default().createHash('md5').update(bytes).digest();\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (md5);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/md5.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/nil.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/nil.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('00000000-0000-0000-0000-000000000000');\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/nil.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/parse.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/parse.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-node/validate.js\");\n\n\nfunction parse(uuid) {\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Invalid UUID');\n  }\n\n  let v;\n  const arr = new Uint8Array(16); // Parse ########-....-....-....-............\n\n  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;\n  arr[1] = v >>> 16 & 0xff;\n  arr[2] = v >>> 8 & 0xff;\n  arr[3] = v & 0xff; // Parse ........-####-....-....-............\n\n  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;\n  arr[5] = v & 0xff; // Parse ........-....-####-....-............\n\n  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;\n  arr[7] = v & 0xff; // Parse ........-....-....-####-............\n\n  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;\n  arr[9] = v & 0xff; // Parse ........-....-....-....-############\n  // (Use \"/\" to avoid 32-bit truncation when bit-shifting high-order bytes)\n\n  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;\n  arr[11] = v / 0x100000000 & 0xff;\n  arr[12] = v >>> 24 & 0xff;\n  arr[13] = v >>> 16 & 0xff;\n  arr[14] = v >>> 8 & 0xff;\n  arr[15] = v & 0xff;\n  return arr;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parse);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/parse.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/regex.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/regex.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/rng.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/rng.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rng)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n\nconst rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate\n\nlet poolPtr = rnds8Pool.length;\nfunction rng() {\n  if (poolPtr > rnds8Pool.length - 16) {\n    crypto__WEBPACK_IMPORTED_MODULE_0___default().randomFillSync(rnds8Pool);\n    poolPtr = 0;\n  }\n\n  return rnds8Pool.slice(poolPtr, poolPtr += 16);\n}\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/sha1.js":
/*!*************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/sha1.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction sha1(bytes) {\n  if (Array.isArray(bytes)) {\n    bytes = Buffer.from(bytes);\n  } else if (typeof bytes === 'string') {\n    bytes = Buffer.from(bytes, 'utf8');\n  }\n\n  return crypto__WEBPACK_IMPORTED_MODULE_0___default().createHash('sha1').update(bytes).digest();\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sha1);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/sha1.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/stringify.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/stringify.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-node/validate.js\");\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\n\nconst byteToHex = [];\n\nfor (let i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).substr(1));\n}\n\nfunction stringify(arr, offset = 0) {\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n\n  return uuid;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v1.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v1.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-node/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-node/stringify.js\");\n\n // **`v1()` - Generate time-based UUID**\n//\n// Inspired by https://github.com/LiosK/UUID.js\n// and http://docs.python.org/library/uuid.html\n\nlet _nodeId;\n\nlet _clockseq; // Previous uuid creation time\n\n\nlet _lastMSecs = 0;\nlet _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details\n\nfunction v1(options, buf, offset) {\n  let i = buf && offset || 0;\n  const b = buf || new Array(16);\n  options = options || {};\n  let node = options.node || _nodeId;\n  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not\n  // specified.  We do this lazily to minimize issues related to insufficient\n  // system entropy.  See #189\n\n  if (node == null || clockseq == null) {\n    const seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n    if (node == null) {\n      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)\n      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];\n    }\n\n    if (clockseq == null) {\n      // Per 4.2.2, randomize (14 bit) clockseq\n      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;\n    }\n  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,\n  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so\n  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'\n  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.\n\n\n  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock\n  // cycle to simulate higher resolution clock\n\n  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)\n\n  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression\n\n  if (dt < 0 && options.clockseq === undefined) {\n    clockseq = clockseq + 1 & 0x3fff;\n  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new\n  // time interval\n\n\n  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {\n    nsecs = 0;\n  } // Per 4.2.1.2 Throw error if too many uuids are requested\n\n\n  if (nsecs >= 10000) {\n    throw new Error(\"uuid.v1(): Can't create more than 10M uuids/sec\");\n  }\n\n  _lastMSecs = msecs;\n  _lastNSecs = nsecs;\n  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch\n\n  msecs += 12219292800000; // `time_low`\n\n  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;\n  b[i++] = tl >>> 24 & 0xff;\n  b[i++] = tl >>> 16 & 0xff;\n  b[i++] = tl >>> 8 & 0xff;\n  b[i++] = tl & 0xff; // `time_mid`\n\n  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;\n  b[i++] = tmh >>> 8 & 0xff;\n  b[i++] = tmh & 0xff; // `time_high_and_version`\n\n  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version\n\n  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)\n\n  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`\n\n  b[i++] = clockseq & 0xff; // `node`\n\n  for (let n = 0; n < 6; ++n) {\n    b[i + n] = node[n];\n  }\n\n  return buf || (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(b);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v1);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/v1.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v3.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v3.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ \"./node_modules/uuid/dist/esm-node/v35.js\");\n/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ \"./node_modules/uuid/dist/esm-node/md5.js\");\n\n\nconst v3 = (0,_v35_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v3);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/v3.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v35.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v35.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DNS\": () => (/* binding */ DNS),\n/* harmony export */   \"URL\": () => (/* binding */ URL),\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-node/stringify.js\");\n/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse.js */ \"./node_modules/uuid/dist/esm-node/parse.js\");\n\n\n\nfunction stringToBytes(str) {\n  str = unescape(encodeURIComponent(str)); // UTF8 escape\n\n  const bytes = [];\n\n  for (let i = 0; i < str.length; ++i) {\n    bytes.push(str.charCodeAt(i));\n  }\n\n  return bytes;\n}\n\nconst DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';\nconst URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, version, hashfunc) {\n  function generateUUID(value, namespace, buf, offset) {\n    if (typeof value === 'string') {\n      value = stringToBytes(value);\n    }\n\n    if (typeof namespace === 'string') {\n      namespace = (0,_parse_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(namespace);\n    }\n\n    if (namespace.length !== 16) {\n      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');\n    } // Compute hash of namespace and value, Per 4.3\n    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =\n    // hashfunc([...namespace, ... value])`\n\n\n    let bytes = new Uint8Array(16 + value.length);\n    bytes.set(namespace);\n    bytes.set(value, namespace.length);\n    bytes = hashfunc(bytes);\n    bytes[6] = bytes[6] & 0x0f | version;\n    bytes[8] = bytes[8] & 0x3f | 0x80;\n\n    if (buf) {\n      offset = offset || 0;\n\n      for (let i = 0; i < 16; ++i) {\n        buf[offset + i] = bytes[i];\n      }\n\n      return buf;\n    }\n\n    return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(bytes);\n  } // Function#name is not settable on some platforms (#270)\n\n\n  try {\n    generateUUID.name = name; // eslint-disable-next-line no-empty\n  } catch (err) {} // For CommonJS default export support\n\n\n  generateUUID.DNS = DNS;\n  generateUUID.URL = URL;\n  return generateUUID;\n}\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/v35.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v4.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v4.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-node/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-node/stringify.js\");\n\n\n\nfunction v4(options, buf, offset) {\n  options = options || {};\n  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided\n\n  if (buf) {\n    offset = offset || 0;\n\n    for (let i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n\n    return buf;\n  }\n\n  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(rnds);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v5.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v5.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ \"./node_modules/uuid/dist/esm-node/v35.js\");\n/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ \"./node_modules/uuid/dist/esm-node/sha1.js\");\n\n\nconst v5 = (0,_v35_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v5);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/v5.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/validate.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/validate.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-node/regex.js\");\n\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/validate.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/version.js":
/*!****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/version.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-node/validate.js\");\n\n\nfunction version(uuid) {\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Invalid UUID');\n  }\n\n  return parseInt(uuid.substr(14, 1), 16);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (version);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-node/version.js?");

/***/ }),

/***/ "console":
/*!**************************!*\
  !*** external "console" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("console");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app/indexNew.js");
/******/ 	
/******/ })()
;