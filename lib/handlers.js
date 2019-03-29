/*
 * Requesr handlers
 *
 */

// Dependiences


// Define handlers
const handlers = {};

// Users
handlers.users = function(data,callback){
    let acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data,callback)
    } else {
        callback(405);
    }
};

// Container for the users submethods
handlers._users = {};


// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function(data, callback){
// Check that all required fields are filled out
let firstName = typeof(data.payload.firstName) == 'string' && data.payloa.firstname.trim().length > 0 ? data.payload.firstName.trim() : false;
let lastName = typeof (data.payload.lastName) == 'string' && data.payloa.lastname.trim().length > 0 ? data.payload.lastName.trim() : false;
let phone = typeof (data.payload.phone) == 'string' && data.paylod.phone.trim().length == 10 ? data.payload.phone.trim() : false;
let password = typeof (data.payload.password) == 'string' && data.paylod.password.trim().length > 0 ? data.payload.password.trim() : false;
let tosAgreement = typeof (data.payload.tosAgreement) == 'boolean' && data.paylod.tosAgreement.trim().length == true ? true: false;

if(firstName && lastName && phone && password && tosAgreement){

}else{

}

};

// Users - get
handlers._users.get = function (data, callback) {

};

// Users - put
handlers._users.put = function (data, callback) {

};

// Users - delete
handlers._users.delete = function (data, callback) {

};

// Ping handler
handlers.ping = function (data, callback) {
    callback(200);
};

// Not found handler
handlers.notFound = function (data, callback) {
    callback(404);
};



// Export the module
module.exports = handlers;




