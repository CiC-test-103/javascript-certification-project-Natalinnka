// Necessary Imports, DO NOT REMOVE
const { Console } = require("console");
const { LinkedList } = require("./LinkedList");
const { Student } = require('./Student');
const readline = require('readline');

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - save: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(' ');

  switch (operation) {
    case 'add':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (code is given)
       *   - Use implemented functions in LinkedList to add the Student, and display the updated LinkedList
       */
        console.log('Adding student...');
        const [name, year, email, specialization] = args;
        const newStudent = new Student(name, parseInt(year), email, specialization);
        studentManagementSystem.addStudent(newStudent);
        console.log('Updated list:', studentManagementSystem.displayStudents());
        break;

    case 'remove':
      /**
       * TODO:
       *  Removes a particular student by email
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (removeEmail)
       *   - Use implemented functions in LinkedList to remove the Student, and display the updated LinkedList
       */
      console.log('Removing student...')
      const removeEmail = args[0];
      studentManagementSystem.removeStudent(removeEmail);
      console.log('Updated list:', studentManagementSystem.displayStudents());  
      break;

    case 'display':
       /**
       * TODO:
       *  Displays the students in the Linked List
       *  You will need to do the following:
       *   - Use implemneted functions in LinkedList to display the student
       */
        console.log('Displaying students...');
        const students = studentManagementSystem.displayStudents();
      
        if (!students || students.length === 0) {
          console.log("No students found.");
        } else {
          console.log(students); 
        }
        break;



     
       if (!students || students.length === 0) {
        console.log("No students found.");
    } else {
     console.log("Current students:");
     console.log(`Name: ${Student.name} Year: ${Student.year} Email: ${Student.email} Specialization: ${Student.specialization}`);  
    }
    break;


    case 'find':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (findEmail)
       *   - Use implemented functions in LinkedList to grab the Student
       *   - Use implemented functions in Student to display if found, otherwise, state "Student does not exist"
       */
      console.log('Finding student...')
      const emailToFind = args[0];  
      const foundStudent = studentManagementSystem.findStudent(emailToFind);

       if (foundStudent) {
         console.log(`Student found: ${foundStudent.getName()}, Year: ${foundStudent.getYear()}, Email: ${foundStudent.getEmail()}, Specialization: ${foundStudent.getSpecialization()}`);
       } else {
         console.log("Student not found.");
       }
      break;

    case 'save':
      /**
       * TODO:
       *  Saves the current LinkedList to a specified JSON file
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (saveFileName)
       *   - Use implemented functions in LinkedList to save the data
       */
      console.log('Saving data...');
      const saveFileName = args[0];
      await studentManagementSystem.saveToJson(saveFileName);
      console.log(`Data saved to file: ${saveFileName}`);
      break;

    case "load":
      /**
       * TODO:
       *  Loads data from specified JSON file into current Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (loadFileName)
       *   - Use implemented functions in LinkedList to save the data, and display the updated LinkedList
       */
      console.log('Loading data...');
      const loadFileName = args[0];
      await studentManagementSystem.loadFromJSON(loadFileName);
      console.log(`Data loaded from file: ${loadFileName}`);
      console.log('Updated list:', studentManagementSystem.displayStudents());
      break;

    case 'clear':
      /**
       * TODO:
       *  Clears all data in the Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Use implemented functions in LinkedList to clear the data
       */
      console.log('Clearing data...')
      studentManagementSystem.clearStudents();
      console.log("All student data cleared.");
      break;

    case 'q':
        console.log('Exiting...');
        rl.close();
        break;

    default:
        console.log('Unknown command. Type "help" for a list of commands.');
        break;
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log('Welcome to the Student Management System!');
main();
rl.on('line', async (input) => {
  if (input.trim().toLowerCase() === 'help') {
    main();
  } else {
      await handleCommand(input);
  }
});
rl.on('close', () => {
  console.log('Goodbye!');
});
