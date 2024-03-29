const REQUEST_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};
const STATUS_CODES = {
    NOT_FOUND: 404,
    OK: 200,
    CREATED: 201,
    SERVER_ERROR: 500,
    NO_CONTENT: 204,
    BAD_REQUEST: 400
};
module.exports = {REQUEST_METHODS, STATUS_CODES};
