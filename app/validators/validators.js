const { ERRORS } = require("../constants/errors");

postObjValidator = (obj) => {
    if(typeof obj !== 'object'){
        return ERRORS.NOT_AN_OBJECT;
    }
    else{
        if(!obj.hasOwnProperty('name')){
            return ERRORS.NAME_NOT_ENTERED;
        }
        if(typeof obj.name !== 'string'){
            return ERRORS.NAME_NOT_A_STRING;
        };
        if(!obj.hasOwnProperty('login')){
            return ERRORS.LOGIN_NOT_ENTERED;
        }
        if(typeof obj.login !== 'string'){
            return ERRORS.LOGIN_IS_NOT_A_STRING;
        };
        if(!obj.hasOwnProperty('password')){
            return ERRORS.PASSWORD_NOT_ENTERED;
        }
        if(typeof obj.password !== 'string'){
            return ERRORS.PASSWORD_NOT_STRING;
        };
    };  
};


putObjValidator = (obj) => {
    if(typeof obj !== 'object'){
        return ERRORS.NOT_AN_OBJECT;
    }
    if(obj.hasOwnProperty('name') && typeof obj.name !== 'string'){
        return ERRORS.NAME_NOT_A_STRING;
    };
    if(obj.hasOwnProperty('login') && typeof obj.login !== 'string'){
        return  ERRORS.LOGIN_IS_NOT_A_STRING;
    };
    if(obj.hasOwnProperty('password') && typeof obj.password !== 'string'){
        return ERRORS.PASSWORD_NOT_STRING;
    };

};
postBoardObjValidator = (obj) => {
    if(typeof obj !== 'object'){
        return ERRORS.NOT_AN_OBJECT;
    }
    else{
        if(!obj.hasOwnProperty('title')){
            return ERRORS.TITLE_NOT_ENTERED;
        }
        if(typeof obj.title !== 'string'){
            return ERRORS.TITLE_NOT_A_STRING;
        };
        if(obj.hasOwnProperty('columns') && !Array.isArray(obj.columns)){
            return ERRORS.COLUMNS_IS_NOT_AN_ARRAY;
        }

    };  
};
putBoardObjValidator = (obj) => {
    if(typeof obj !== 'object'){
        return ERRORS.NOT_AN_OBJECT;
    }
    else{
        if(obj.hasOwnProperty('title') && typeof obj.title !== 'string'){
            return ERRORS.TITLE_NOT_A_STRING;
        };
        if(obj.hasOwnProperty('columns') && !Array.isArray(obj.columns)){
            return ERRORS.COLUMNS_IS_NOT_AN_ARRAY;
        }

    };  
};

postTaskObjValidator = (obj) => {
    if(typeof obj !== 'object'){
        return ERRORS.NOT_AN_OBJECT;
    }
    else{
        if(!obj.hasOwnProperty('title')){
            return ERRORS.TITLE_NOT_ENTERED;
        }
        if(typeof obj.title !== 'string'){
            return ERRORS.TITLE_NOT_A_STRING;
        };
        if(!obj.hasOwnProperty('order')){
            return ERRORS.ORDER_NOT_ENTERED;
        }
        if(typeof obj.order !== 'string'){
            return ERRORS.ORDER_IS_NOT_A_STRING;
        };
        if(!obj.hasOwnProperty('description')){
            return ERRORS.DESCRIPTION_NOT_ENTERED;
        }
        if(typeof obj.description !== 'string'){
            return ERRORS.DESCRIPTION_IS_NOT_A_STRING;
        };
        if(!obj.hasOwnProperty('userId')){
            return ERRORS.USERID_NOT_ENTERED;
        }
        if(typeof obj.userId !== 'string'){
            return ERRORS.USERID_IS_NOT_A_STRING_OR_NULL;
        };
        if(!obj.hasOwnProperty('columnId')){
            return ERRORS.COLUMN_NOT_ENTERED;
        }
        if(typeof obj.columnId !== 'string'){
            return ERRORS.COLUMN_IS_NOT_A_STRING;
        };
    };  
};

putTaskObjValidator = (obj) => {
    if(typeof obj !== 'object'){
        return ERRORS.NOT_AN_OBJECT;
    }
    else{
        if(obj.hasOwnProperty('title') && typeof obj.title !== 'string'){
            return ERRORS.TITLE_NOT_A_STRING;
        }
        if(!obj.hasOwnProperty('order') && typeof obj.order !== 'string'){
            return ERRORS.ORDER_IS_NOT_A_STRING;
        }
        if(!obj.hasOwnProperty('description') && typeof obj.description !== 'string'){
            return ERRORS.DESCRIPTION_IS_NOT_A_STRING;
        }
        if(!obj.hasOwnProperty('userId') && typeof obj.userId !== 'string'){
            return ERRORS.USERID_IS_NOT_A_STRING_OR_NULL;
        }
        if(!obj.hasOwnProperty('columnId') && typeof obj.columnId !== 'string'){
            return ERRORS.COLUMN_IS_NOT_A_STRING;
        }
        if(!obj.hasOwnProperty('boardId') && !uuidValidator.test(obj.boardId)){
            return ERRORS.WRONG_ID_FORMAT;
        }
    }
};



module.exports = {postObjValidator, putObjValidator, postBoardObjValidator, putBoardObjValidator, postTaskObjValidator};