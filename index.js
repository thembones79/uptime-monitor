/*
 * Primary file for the api
 *
 *
 *
 *
 */

// Dependiences

const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

// The server should respond to all request wuth a string
const server = http.createServer(function(req, res) {
  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the HTTP Method
  const method = req.method.toLocaleLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  // Get the payload, if any
  let decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", function(data) {
    buffer += decoder.write(data);
  });
  req.on("end", function() {
    buffer += decoder.end();

    // Choose the handler this request should go to. If one is not found, use the notFound handler
    const chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    // Construct the data object to send to the handler

    const data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer
    };

    // Route the request to the hadler specifird in the router
    chosenHandler(data, function(statusCode, payload) {
      // Use the status code called by the handler, or default to 200.
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      // Use the payload called back by the handler, or defaylt to an empty object.
      payload = typeof payload == "object" ? payload : {};

      // Convert the payload to a string
      payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log request path
      console.log("Returning this response: ", statusCode, payloadString);
    });
  });
});

// Start the server, and have it listen on port 3000

server.listen(3000, function() {
  console.log("The server is listening on port 3000 now");
});

// Define handlers
const handlers = {};

// Sample handler
handlers.sample = function(data, callback) {
  // Callback a http status code, and a payload object
  callback(406, { name: "sample handler" });
};

// Not found handler
handlers.notFound = function(data, callback) {
  callback(404);
};

// Define a request router
const router = {
  sample: handlers.sample
};
