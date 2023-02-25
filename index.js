import fs from "fs";
import inquirer from "inquirer";
//import generateMarkdown from "./utils/generateMarkdown";
import util from "util";
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt( [
    {
      type: "input",
      name: "githubName",
      message: "What is your GitHub name?",
    },
    {
      type: "input",
      message: "What is the title of your project?",
      name: "title",
    },
    {
      type: "input",
      message: "Add description of your project",
      name: "description",
    },
    {
      type: "input",
      message: "Add installation instructions",
      name: "installation",
    },
    {
      type: "input",
      message: "Add installation contributors, links to tutorials and materials you used in your project",
      name: "contribution",
    },
    {
        type: "input",
        message: "Add usage",
        name: "usage",
      },
      {
        type: "list",
        message: "Choose a license",
        name: "license",
        choices: ["1", "2", "3"]
      },
      {
        type: "input",
        message: "Add tests",
        name: "tests",
      },
  ]);
};

const generateHTML = (answers) =>
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
  
  
  <link rel="stylesheet" href="css/style.css">
  <title>Readme-generator</title>
</head>
<body>
  <div class="container">
    <div><i class="fa-regular fa-list"></i> Readme.md</div>
    <hr/>
    <h1 class="display-4" id="title">${answers.title}</h1>
    <hr />
    <h2 id="description">Description</h2>
    <div>${answers.description}</div>
    <hr />
    <h2>Table of Content</h2>
      <ul>
        <li><a href="#title">Title</a></li>
        <li><a href="#description">Description</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#contribution">Contribution</a></li>
        <li><a href="#license">License</a></li>
        <li><a href="#tests">Tests</a></li>
      </ul>
    <hr />
    <h2 id="installation">Installation</h2>
    <div>${answers.installation}</div>
    <hr />
    <h2 id="usage">Usage</h2>
    <div>${answers.usage}</div>
    <hr />
    <h2 id="contribution">Contribution</h2>
    <div>${answers.contribution}</div>
    <hr />
    <h2 id="license">License</h2>
    <div>${answers.license}</div>
    <hr />
    <h2 id="tests">Tests</h2>
    <div>${answers.tests}</div>
    <hr />
    
  </div>
</body>
</html>`;

// Bonus using async/await and try/catch
const init = async () => {
  try {
    const answers = await promptUser();
    const html = generateHTML(answers);
    await writeFileAsync('index.html', html);
    console.log('Successfully wrote to index.html');
  } catch (err) {
    console.log(err);
  }
};

init();




