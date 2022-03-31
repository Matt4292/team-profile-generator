// required packages
const inquirer = require("inquirer");
const fs = require("fs");

// links to classes
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

// array that employee objects will go into
const employees = []


inquirer.prompt([
    // Manager questions
    {
      name: "name",
      type: "input",
      message: "What is your manager's name?"
    },
    {
      name: "id",
      type: "input",
      message: "What is your manager's ID?"
    },
    {
      name: "email",
      type: "input",
      message: "What is your manager's email address?"
    },
    {
      name: "office",
      type: "input",
      message: "What is your manager's office number?"
    },
    {
      name: "nextStep",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add engineer", "Add intern", "I'm done adding employees"]
    },

  ]).then( response => {    

    // Makes manager object in the employees array with the data from inputs
    employees.push(new Manager(response.name, response.id, response.email, response.office, "Manager")) 
    
    // Starts new round of questions for new employee or generates html if user is done inputting employees
    if( response.nextStep === "Add engineer") {
      engineerQuestions()
    } else if (response.nextStep === "Add intern"){
      internQuestions()
    } else if (response.nextStep === "I'm done adding employees") {
      makeFile()
    }
  })


// Questions for adding new engineer
function engineerQuestions() {
  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "What is this employee's name?"
    },
    {
      name: "id",
      type: "input",
      message: "What is this employee's ID?"
    },
    {
      name: "email",
      type: "input",
      message: "What is this employee's email address?"
    },
    {
      type: "input",
      message: "What is this employee's GitHub username?",
      name: "github"
    },
    {
      name: "nextStep",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add engineer", "Add intern", "I'm done adding employees"]
    },
  ]).then( response => {    
    // Adds new engineer to employees array
    employees.push(new Engineer(response.name, response.id, response.email, response.github, "Engineer"))

    // Starts new round of questions for new employee or generates html if user is done inputting employees
    if( response.nextStep === "Add engineer") {
      engineerQuestions()
    } else if (response.nextStep === "Add intern"){
      internQuestions()
    } else if (response.nextStep === "I'm done adding employees") {
      makeFile()
    }
  })
}

// Questions for adding intern
function internQuestions() {
  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "What is this employee's name?"
    },
    {
      name: "id",
      type: "input",
      message: "What is this employee's ID?"
    },
    {
      name: "email",
      type: "input",
      message: "What is this employee's email address?"
    },
    {
      type: "input",
      message: "What school does this employee go to?",
      name: "school"
    },
    {
      name: "nextStep",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add engineer", "Add intern", "I'm done adding employees"]
    },
  ]).then( response => {
    // Adds new intern to employees array
    employees.push(new Intern(response.name, response.id, response.email, response.school, "Intern"))
    // Starts new round of questions for new employee or generates html if user is done inputting employees
    if( response.nextStep === "Add engineer") {
      engineerQuestions()
    } else if (response.nextStep === "Add intern"){
      internQuestions()
    } else if (response.nextStep === "I'm done adding employees") {
      makeFile()
    }
  })
}

// Function to generate HTML file
function makeFile(){
  // array to hold html cards made from the employees array
  const cardArr = []

  // Generates card for each item in employees array
  employees.forEach(element => {
    // Lets each role have a special piece of data
    if (element.role==="Manager"){
      specialty = "Office Number: "+`${element.office}`
    } else if (element.role==="Engineer"){
      specialty = "GitHub: "+`<a href= "https://github.com/${element.github}" target="blank">${element.github}</a>`
    } else if (element.role==="Intern"){
      specialty = "School: "+`${element.school}`
    }
    // html template for cards
    newCard = `<div class="card bg-dark" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <p class="card-text">${element.role}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${element.id}</li>
          <li class="list-group-item">Email: <a href = "mailto: ${element.email}" target="blank">${element.email}</a></li>
          <li class="list-group-item">${specialty}</li>
        </ul>
      </div>`;

    // pushes each card to card array
    cardArr.push(newCard)
  });

  // Actually generates the main html file
  fs.writeFile("./dist/team-profile.html", `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Team Profile Generator</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="./style.css">
  </head>
  <body>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-3">My Team</h1>
    </div>
  </div>
  <div class="container card-container">
  ${cardArr}
  </div>
  </body>
  </html>`, (err) =>{
    // logs error if thrown or tells user their file was created
    if (err){
      console.log(err)
    } else console.log("Your HTML file has been created.")
  })
}