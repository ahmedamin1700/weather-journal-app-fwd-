// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
const cors = require("cors");

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

const port = 3000;

// Callback function to complete GET '/all'
const getAllData = (request, response) => {
  response.send(projectData);
};

// Post Route
const saveData = (request, response) => {
  projectData["temp"] = request.body.temp;
  projectData["date"] = request.body.date;
  projectData["content"] = request.body.content;
  console.log(projectData);
  response.send(projectData);
};

// Initialize all route with a callback function
app.get("/all", getAllData);
app.post("/add", saveData);

// Callback to debug
function listening() {
  console.log(`running on localhost: ${port}`);
}

// Spin up the server
app.listen(port, listening);
