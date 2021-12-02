
const {v4: uuidv4} = require('uuid');

let boards = [{
    id: 'c8f746c3-7089-4abc-af07-d66c5548b8f0',
    title: 'Random board',
    columns: []
},
{
    id: uuidv4(),
    title: 'Random board',
    columns: []
}
];

module.exports = {boards};