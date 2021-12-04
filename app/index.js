const http = require('http');

const {usersController} = require('./controllers/userController')
const {boardsController} = require('./controllers/boardsController');
const { tasksController } = require('./controllers/tasksController');

http.createServer((request, response) => {
    try{
        const url = request.url;
        if(url.startsWith('/users')){
            return usersController(request, response);
        }
        else if(url.startsWith('/boards')){
            if(url.includes('/tasks')){
                return tasksController(request,response);
            }
            return boardsController(request, response);
        }
    }catch (e){
        console.log('error e:', e)
        response.end(JSON.stringify(e));
    }

}).listen(process.env.PORT)
//