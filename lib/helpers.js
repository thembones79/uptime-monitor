/*
 *
 * Helper for various tasks
 *
 */


// Dependencies
const crypto = require('crypto');
const config = require('./config');
const https = require('https');
const querystring = require('querystring');



// Container for all the helpers
 let helpers = {};

 // Create a SH256 hash
 helpers.hash = function(str){
     if(typeof(str)== 'string' && str.length > 0){
let hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
return hash;
     } else {
         return false;
     }
 };


 // Parse a JSON string to an object in all cases, without throwing
 helpers.parseJsonToObject = function(str){
     try{
         let obj = JSON.parse(str);
         return obj;

     } catch(e){
         return {};
     }

 };


// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = function(strLength){
    strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
    if(strLength){
        // Define all the possible characters that could go into a string
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

        // Start the final string
        let str = '';
        for(i = 1; i <= strLength; i++){
            // Get a random character from the possibleCharacters string
            let randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            // Append this character to the final string
            str+=randomCharacter;
        }

        // Return the final string
        return str;

    } else {
        return false;
    }
};


// Send an SMS message via Twilio
helpers.sendTwilioSms - function(phone,msg,callback){
    // Validate parameters
    phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
    msg = typeof(msg == 'string') && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;
if(phone && msg){
// Configure the request payload
const payload = {
    'From': config.twilio.fromPhone,
    'To': '+1' +phone,
    'Body': msg
};


// Stringify the payload
const stringPayload = querystring.stringify(payload);

// Configure the request details
const requestDetails = {
    'protocol' : 'https',
    'hostname' : 'api.twilio.com',
    'method' : 'POST',
    'path' : '/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
    'auth': config.twilio.accountSid+':'+config.twilio.authToken,
    'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(stringPayload)
    }
};

// Instantiate the request object
const req =

} else {
    callback('Given parameters were missig or invalid');


}


};













 // Export the module
 module.exports = helpers;