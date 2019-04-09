/*
 *
 * Library for storing and rotating logs
 *
 */

 // Dependiences

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Container for the module

let lib = {};

// Base dorectory of the folder
lib.baseDir = path.join(__dirname,'/../.data/');





// Export the module
module.exports = lib;
