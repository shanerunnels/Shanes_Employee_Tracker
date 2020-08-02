const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "shanebogetem",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  inTheBeginning();
});

inTheBeginning = () => {
  return inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What do you want to do?",
      choices: [
        "Add departments",
        "Add roles",
        "Add employees",
        "View departments",
        "View roles",
        "View employees",
        "Update roles",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View employees":
          viewEmployees();
          break;
        case "View departments":
          viewDept();
          break;
        case "View roles":
          viewRole();
          break;
        case "Add employees":
          addEmployees();
          break;
        case "Add departments":
          addDept();
          break;
        case "Add roles":
          addRole();
          break;
        case "Update roles":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          break;  
      }
    });
};


addDept = () => {
    inquirer.prompt([
      {
        name: "department",
        type: "input",
        message: "What department would you like to add?"
      }
    ]).then(function(answer) {
      connection.query(`INSERT INTO department (name) VALUES ('${answer.department}')`, (err, res) => {
        if (err) throw err;
        console.log("1 new department added: " + answer.department);
        viewDept();
        inTheBeginning();
      }) 
    })
  };

addRole = () => {
    let questions = [
        {
            type: "input",
            message: "What role?",
            name: "title"
        },
        {
            type: "input",
            message: "What department is new role in?",
            name: "id"
        },
        {
            type: "input",
            message: "What's the salary?",
            name: "salary"
        }
    ];
    inquirer.prompt(questions).then(answer => {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                department_id: answer.id,
                salary: answer.salary
            },
            function(err, res) {
                if (err) throw err;
                inTheBeginning();
            }
        );
    });
};

function updateEmpManager (empID, roleID){
    connection.query("UPDATE employee SET role_id = ? WHERE employee_id = ?", [roleID, empID])
    };

addEmployees = () => {
  let questions = [
    {
      type: "input",
      message: "First name?",
      name: "first_name",
    },
    {
      type: "input",
      message: "Last name?",
      name: "last_name",
    },
    {
        type: "input",
        message: "What's the employee's title (role_id)?",
        name: "titleID"
      },
      {
        type: "input",
        message: "Who's the employee's manager (employee_id)?",
        name: "managerID"
      }
    ];
    inquirer.prompt(questions).then(function(answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.titleID,
          manager_id: answer.managerID,
        },
        function(error) {
          if (error) throw error;
          updateEmpManager(answer.titleID, answer.managerID);
          viewEmployees();
        }
      );
    });
  };

viewDept = () => {
    connection.query("SELECT * from department", function(err, res) {
        if (err) throw err;
        console.table(res);
        inTheBeginning();
    })
};

viewRole = () => {
    connection.query("SELECT * from role", function(err, res) {
        if (err) throw err;
        console.table(res);
        inTheBeginning();
    })
};

viewEmployees = () => {
    connection.query(
        "SELECT * from employee",
        function(err, res) {
            if (err) throw err;
            console.table(res);
            inTheBeginning();
        }
    )
};

updateEmployeeRole = () => {
    let employees = viewEmployees();
    let empChoices = employees.map(index => {
        id: id;
    })
    inquirer.prompt({
        type: "list",
        name: "role_id",
        message: "What's the employee role?",
        choices: empChoices
    })
    connection.query("UPDATE employee SET role_id = ? WHERE employee_id = ?", [roleID, empID])
};

