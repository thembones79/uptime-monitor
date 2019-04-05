/*
 *
 * Worker-related tasks
 *
 */

 // Dependencies
 const path = require('path');
 const fs = require('fs');
 const _data = require('./data');
 const https = require('https');
 const http = require('http');
 const helpers = require('helpers');
 const url = require('url');


 // Instantiate the worker object
 let workers = {};

 // Lookup all checks, get their data, send to a validator
 workers.gatherAllChecks = function(){
     // Get all the checks
     _data.list('checks',function(err,checks){
         if(!err && checks && checks.length > 0){
             checks.forEach(function(check){
                 // Read in the check data
                 _data.read('checks',check,function(err,originalCheckData){
                     if(!err && originalCheckData){
                         // Pass it to the check validator, and let that function continue or log errors as needed
                         workers.validateCheckData(originalCheckData);

                     } else {
                         console.log("Error reading one of the check's data");
                     }

                 });

             });

         } else {
             console.log("Error: Could not find any checks to process");
         }

     })
 };

// Sanity-check the check-data
workers.validateCheckData = function(originalCheckData){
    originalCheckData= typeof(originalCheckData)=='object' && originalCheckData !== null ? originalCheckData : {}

};

 // Timet to execute the worker-process once per minute
workers.loop = function(){
    setInterval(function(){
        workers.gatherAllChecks();

    }, 1000*60)
};



// Init script
workers.init = function(){
    // Execute all the checks immediately
    workers.gatherAllChecks();


    // Call the loop sothe checks will execute later on
    workers.loop();
};


 // Export the module
 module.exports = workers;