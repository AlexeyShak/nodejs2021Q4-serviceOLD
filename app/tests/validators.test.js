import { postObjValidator, putObjValidator, postBoardObjValidator, putBoardObjValidator, putTaskObjValidator, postTaskObjValidator } from '../validators/validators';
import {ERRORS} from '../constants/errors'

describe('postObjValidator', () => {
    const validUser = {
        name: 'Random Person',
        login: 'login',
        password: '1245'
    };
    const invalidUser = {
        name: 'Random Person',
        login: 'login' 
    };
    test('should return Undefined if all the properties of reqested object are defined and there values of requared types', () => {
        expect(postObjValidator(validUser)).toBeUndefined();
    })
    test('should return error if any of the properties of reqested object is undefined', () => {
        expect(postObjValidator(invalidUser)).toBe(ERRORS.PASSWORD_NOT_ENTERED);
    })
})

describe('putObjValidator', () => {
    const validUser = {
        name: 'Random User',
        login: 'login',
        password: '1245'
    };
    const invalidUser = {
        name: 'Random Person',
        login: 123 
    };
    test('should return Undefined if request object properties values are of requared types', () => {
        expect(putObjValidator(validUser)).toBeUndefined();
    })
    test('should return error if any of the reqested object prorety values has wrong type', () => {
        expect(postObjValidator(invalidUser)).toBe(ERRORS.LOGIN_IS_NOT_A_STRING);
    })
})

describe('postBoardObjValidator', () => {
    const validBoard = {
        title: 'Random board',
        columns: []
    };
    const invalidBoard = {
        title: 'Random',
        columns: 'array' 
    };
    test('should return Undefined if all the properties of reqested object are defined and there values of requared types', () => {
        expect(postBoardObjValidator(validBoard)).toBeUndefined();
    })
    test('should return error if any of the reqested object prorety values has wrong type', () => {
        expect(postBoardObjValidator(invalidBoard)).toBe(ERRORS.COLUMNS_IS_NOT_AN_ARRAY);
    })
})

describe('putBoardObjValidator', () => {
    const validBoard = {
        title: 'Board1'
    };
    const invalidBoard = {
        columns: 'array' 
    };
    test('should return Undefined if request object properties values are of requared types', () => {
        expect(putBoardObjValidator(validBoard)).toBeUndefined();
    })
    test('should return error if any of the reqested object prorety values has wrong type', () => {
        expect(putBoardObjValidator(invalidBoard)).toBe(ERRORS.COLUMNS_IS_NOT_AN_ARRAY);
    })
})

describe('postTaskObjValidator', () => {
    const validBoard = {
        title: 'Random task',
        order: 'Random order',
        description: 'Some description',
        userId: null,
        columnId: '11111111-1111-1111-1111-111111111111',
        boardId: 'c8f746c3-7089-4abc-af07-d66c5548b8f0'
    };
    const invalidBoard = {
        title: 'Random',
        order: 'Random order',
        description: 'Some description',
        userId: null,
        columnId: '11111111',
        boardId: 'c8f746c3-7089-4abc-af07-d66c5548b8f0'
    };
    test('should return Undefined if all the properties of reqested object are defined and there values of requared types', () => {
        expect(postTaskObjValidator(validBoard)).toBeUndefined();
    })
    test('should return error if any of the reqested object prorety values has wrong type', () => {
        expect(postTaskObjValidator(invalidBoard)).toBe(ERRORS.WRONG_ID_FORMAT);
    })
})

describe('putTaskObjValidator', () => {
    const validBoard = {
        title: 'Random task',
        columnId: '11111111-1111-1111-1111-111111111111',
        boardId: 'c8f746c3-7089-4abc-af07-d66c5548b8f0'
    };
    const invalidBoard = {
        title: 'Random',
        columnId: '11111111',
        boardId: 'c8f746c3-7089-4abc-af07-d66c5548b8f0'
    };
    test('should return Undefined if request object properties values are of requared types', () => {
        expect(putTaskObjValidator(validBoard)).toBeUndefined();
    })
    test('should return error if any of the reqested object prorety values has wrong type', () => {
        expect(putTaskObjValidator(invalidBoard)).toBe(ERRORS.WRONG_ID_FORMAT);
    })
})
