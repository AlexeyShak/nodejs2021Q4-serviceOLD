const app = require('../index');
const supertest = require('supertest');

const request = supertest(app);

describe('users GET', () => {
    it("Gets the test endpoint", async () => {
        const res = await request.get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
    });
})
describe('users POST', () => {
    it("should create new user", async () => {
        const res = await request
        .post('/users')
        .send({
            name: 'Eric',
            login:'login',
            password: '12345'
        })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('name');
        expect(res.body).not.toHaveProperty('age')
    });
})
describe('users PUT', () => {
    it("should update user", async () => {
        const res = await request
        .put('/users/73dfa0d7-e233-4762-9037-5ac8f433c971')
        .send({
            name: 'Eric',
        })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('login');
        expect(res.body).toEqual({"id": "73dfa0d7-e233-4762-9037-5ac8f433c971", "login": "login", "name": "Eric"});
    });
})

describe('users DETETE', () => {
    it("should delete user", async () => {
        const res = await request
        .delete('/users/73dfa0d7-e233-4762-9037-5ac8f433c971');
        expect(res.body).toEqual({});
    });
})
describe('users DETETE', () => {
    it("should delete user", async () => {
        const res = await request
        .delete('/users/73dfa0d7-e233-4762-9037-5ac8f433c970');
        expect(res.body).toEqual("User with requested ID not found. Please check ID input");
    });
})


describe('boatds GET', () => {
    it("Gets the test endpoint", async () => {
        const res = await request.get('/boards');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
    });
})

describe('boards POST', () => {
    it("should create new board", async () => {
        const res = await request
        .post('/boards')
        .send({
            title: 'Random board',
            columns: []
        })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('title');
        expect(res.body).not.toHaveProperty('age')
    });
})

describe('boards DETETE', () => {
    it("should delete board", async () => {
        const res = await request
        .delete('/boards/00000000-0000-0000-0000-000000000000');
        expect(res.body).toEqual({});
    });
})