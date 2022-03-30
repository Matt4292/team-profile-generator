
const inquirer = require("inquirer");
const fs = require("fs");

const manager = require("./lib/manager");
const emgineer = require("./lib/engineer");
const intern = require("./lib/intern");


//TODO make inquirer to get info for cards
function employeeInfo(){
  return inquirer
    .prompt([
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
        name: "title",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add engineer", "Add intern", "I'm done adding employees"]
      },
  ])
}




//TODO use fs to make an html file 
function makeFile (fileName, data){
  fs.writeFile(fileName, data, (err) =>{
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

// employeeInfo()
employeeInfo()
.then((data)=>{
  console.log(data)
  makeFile("./dist/team-profile.html", )
})
// makeFile();