/*
 *
 * Library for storing and editing data
 *
 */

 // Dependencies

 const fs = require('fs');
 const path = require('path');




 // Container for the module (to be exported)
 let lib = {};

 // Base directory of the data folder
 lib.baseDir = path.join(__dirname, '/../.data/');

 // Write data to a file
 lib.create = function(dir, file, data, callback){
     // Openthe file for writing
     fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
        if(!err && fileDescriptor){

        } else {
            callback('Could not create new file, it may already exist');
        }
     });
 };



 // Export the module
    module.exports = lib;