
const inquirer = require("inquirer");
const fs = require("fs");


const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const employees = []
//TODO make inquirer to get info for cards

inquirer.prompt([
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
    employees.push(new Manager(response.name, response.id, response.email, response.office, "Manager")) 
    console.log(employees)
    if( response.nextStep === "Add engineer") {
      engineerQuestions()
    } else if (response.nextStep === "Add intern"){
      internQuestions()
    } else if (response.nextStep === "I'm done adding employees") {
      makeFile()
    }
  })

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
    employees.push(new Engineer(response.name, response.id, response.email, response.github, "Engineer"))
    console.log(employees)
    if( response.nextStep === "Add engineer") {
      engineerQuestions()
    } else if (response.nextStep === "Add intern"){
      internQuestions()
    } else if (response.nextStep === "I'm done adding employees") {
      makeFile()
    }
  })
}
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
    employees.push(new Intern(response.name, response.id, response.email, response.school, "Intern"))
    console.log(employees)
    if( response.nextStep === "Add engineer") {
      engineerQuestions()
    } else if (response.nextStep === "Add intern"){
      internQuestions()
    } else if (response.nextStep === "I'm done adding employees") {
      makeFile()
    }
  })
}












//TODO use fs to make an html file 
function makeFile(){
  const cardArr = []
  employees.forEach(element => {
    if (element.role==="Manager"){
      specialty = "Office Number: "+`${element.office}`
    } else if (element.role==="Engineer"){
      specialty = "GitHub: "+`${element.github}`
    } else if (element.role==="Intern"){
      specialty = "School: "+`${element.school}`
    }
    newCard = `<div class="card bg-dark" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <p class="card-text">${element.role}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${element.id}</li>
          <li class="list-group-item">Email: ${element.email}</li>
          <li class="list-group-item">${specialty}</li>
        </ul>
      </div>`;

    
    cardArr.push(newCard)
  });
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
    if (err){
      console.log(err)
    }
  })
}

//TODO make inquirer responses into cards in the html file


//TODO 
//TODO 
//TODO 
//TODO 