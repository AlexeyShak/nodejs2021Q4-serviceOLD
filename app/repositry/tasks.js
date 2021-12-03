const {v4: uuidv4} = require('uuid');

let tasks = [{
    id: 'c8f746c3-7089-4abc-af07-000000000000',
    title: 'Random task',
    order: 'Random order',
    description: 'Some description',
    userId: null,
    boardId: 'c8f746c3-7089-4abc-af07-d66c5548b8f0',
    columnId: uuidv4()
},
{
    id: uuidv4(),
    title: 'Task 2',
    order: 'Order 2',
    description: 'Some other description',
    userId: '73dfa0d7-e233-4762-9037-5ac8f433c971',
    boardId: 'c8f746c3-7089-4abc-af07-d66c5548b8f0',
    columnId: uuidv4()
}
];

module.exports = {tasks};