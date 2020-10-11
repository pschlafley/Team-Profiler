const inquirer = require('inquirer');
const fs = require('fs');
const generateSite = require('./utils/generateSite');

const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');

const employees = [];


const questions = {

    // Manager's questions
    manager: [
        {
            type: 'input',
            name: 'name',
            message: "What is the team Manager's name? \n",  
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log("You need to enter a name.");
                    return false;
                }
            }
        },

        {
            type: "input",
            name: "id",
            message: "What is the team Manager's id number? \n",
            validate: function( value ) {
                var valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number";
            },
            filter: Number
        },

        {
            type: 'input',
            name: 'email',
            message: "What is the team Manager's email address? \n",
            validate: emailInput => {
                if (emailInput.includes('.com') && emailInput.includes('@')) {
                    return true;
                } else {
                    console.log('\n You must enter a valid email address.');
                    return false;
                }
            }
        },

        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the Manager's office number? \n",
            validate: function( value ) {
                var valid = !isNaN(parseFloat(value));
                return valid || "Please enter an office number";
            },
            filter: Number
        }
    ],

    // Engineer questions
    engineer: [
        {
            type: 'input',
            name: 'name',
            message: "What is the Engineer's name? \n",  
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log("You need to enter a name.");
                    return false;
                }
            }
        },

        {
            type: "input",
            name: "id",
            message: "What is the Engineer's id number? \n",
            validate: function( value ) {
                var valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number";
            },
            filter: Number
        },

        {
            type: 'input',
            name: 'email',
            message: "What is the Engineer's email address? \n",
            validate: emailInput => {
                if (emailInput.includes('.com') && emailInput.includes('@')) {
                    return true;
                } else {
                    console.log('\n You must enter a valid email address.');
                    return false;
                }
            }
        },

        {
            type: 'input',
            name: 'github',
            message: "What is the Engineer's GitHub username? \n",
            validate: value => {
                if(value) {
                    return true;
                } else {
                    console.log("Please provide a valid GitHub username.")
                    return false;
                }
            }
        },
    ],

    // Intern questions
    intern: [
        {
            type: 'input',
            name: 'name',
            message: "What is the Intern's name? \n",  
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log("You need to enter a name.");
                    return false;
                }
            }
        },

        {
            type: "input",
            name: "id",
            message: "What is the Intern's id number? \n",
            validate: function( value ) {
                var valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number";
            },
            filter: Number
        },

        {
            type: 'input',
            name: 'email',
            message: "What is the Intern's email address? \n",
            validate: emailInput => {
                if (emailInput.includes('.com') && emailInput.includes('@')) {
                    return true;
                } else {
                    console.log('\n You must enter a valid email address.');
                    return false;
                }
            }
        },

        {
            type: 'input',
            name: 'school',
            message: "What is the Intern's school called? \n",
            validat: value => {
                if(value) {
                    return true;
                } else {
                    console.log("You must enter the name of the school.")
                    return true;
                }
            }
        },
    ]
}

// make functions for each position
// flow on the app will start with manager then go into add another employee
// then either select intern or engineer and run one of those functions
// add employee with an if statement to go to go to engineer intern or quit
// seperate functions for: enginer function, intern function, quit/makeHTML function


const addManager = () => {
    return inquirer.prompt(questions.manager)
    .then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        employees.push(manager);
        addEmployee();
    })
};


const addIntern = () => {
    return inquirer.prompt(questions.intern)
    .then(answers => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        employees.push(intern);
        addEmployee();
    })
};

const addEngineer = () => {
    return inquirer.prompt(questions.engineer)
    .then(answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        employees.push(engineer);
        addEmployee();
    })
};

const addEmployee = () => {
    return inquirer
    .prompt({
            type: 'list',
            name: 'newEmployee',
            message: "Do you want to add another Employee?",
            choices: ['Engineer', 'Intern', 'Complete Profile']
        })
        .then(answers => {
            switch (answers.newEmployee) {
                case 'Engineer': 
                addEngineer();
                break;
                case 'Intern': 
                addIntern();
                break;
                case 'Complete Profile': 
                writeToFile()
            }
        })
};

// function to write README file
function writeToFile(fileName) {
    // creates a html file
    fileName = fs.writeFile('./dist/index.html', generateSite((employees)), (err => {
        if (err) throw err;
    }));
};

addManager();