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
    inquirer.prompt ({
        type: "input",
        message: "New department name?",
        name: "department"
    })
    .then(answer => {
        console.log(answer.department);
        connection.query("INSERT INTO department SET ?", {
            name: answer.department,
        },
        function(err, res) {
            if (err) throw err;
            inTheBeginning();
        });
    });
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
            type: "list",
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
      type: "list",
      message: "What role?",
      name: "role_id",
      validate: (value) => {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      },
    },
    {
      type: "list",
      message: "What manager?",
      name: "manager_id",
      validate: (value) => {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      },
    },
  ];
  inquirer.prompt(questions).then((answer) => {
    connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.titleID,
        manager_id: answer.managerID,
      },
      function (err) {
        if (err) throw err;
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
        "SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.role_id LEFT JOIN department on role.department_id = department.department_id LEFT JOIN employee manager on manager.manager_id = employee.manager_id;",
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

