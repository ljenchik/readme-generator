import fs from "fs";
import inquirer from "inquirer";
//import generateMarkdown from "./utils/generateMarkdown";
import util from "util";
const writeFileAsync = util.promisify(fs.writeFile);

const licencesAndBadges = {
  Apache: [
    "https://img.shields.io/badge/License-Apache_2.0-blue.svg",
    "https://opensource.org/licenses/Apache-2.0/",
    "Apache 2.0 License",
  ],
  Boost: [
    "https://img.shields.io/badge/License-Boost_1.0-lightblue.svg",
    "https://www.boost.org/LICENSE_1_0.txt",
    "Boost Software License 1.0",
  ],
  Eclipse: [
    "https://img.shields.io/badge/License-EPL_1.0-red.svg",
    "https://opensource.org/licenses/EPL-1.0/",
    "Eclipse Public License 1.0",
  ],
  IBM: [
    "https://img.shields.io/badge/License-IPL_1.0-blue.svg",
    "https://opensource.org/license/ibmpl-php/",
    "IBM Public License Version 1.0",
  ],
  MIT: [
    "https://img.shields.io/badge/License-MIT-yellow.svg",
    "https://opensource.org/license/mit/",
    "The MIT License",
  ],
};

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "githubName",
      message: "What is your GitHub name?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?",
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
      message: "Add usage",
      name: "usage",
    },
    {
      type: "input",
      message:
        "Add installation contributors, links to tutorials and materials you used in your project",
      name: "contribution",
    },

    {
      type: "list",
      message: "Choose a license",
      name: "license",
      choices: Object.keys(licencesAndBadges),
    },
    {
      type: "input",
      message: "Add tests",
      name: "tests",
    },
    {
      type: "input",
      message: "Any questions?",
      name: "questions",
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
  <link 
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css">
  
  
  <link rel="stylesheet" href="css/style.css">
  <title>Readme-generator</title>
</head>
<body>
  <div class="container">
    <div><i class="fa fa-list-ul mx-2"></i> Readme.md</div>
    <hr/>
    <h1 class="display-4" id="title">${answers.title}</h1>
    <a href="${licencesAndBadges[answers.license][1]}"><img src="${
    licencesAndBadges[answers.license][0]
  }"/></a>
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
        <li><a href="#questions">Questions</a></li>
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
    <div>The ${answers.title} is licensed under the terms of the ${
    licencesAndBadges[answers.license][2]
  }.</div>
    <hr />
    <h2 id="tests">Tests</h2>
    <div>${answers.tests}</div>
    <hr />
    <h2 id="questions">Questions</h2>
    <div>My github name is <a href="https://github.com/${answers.githubName}">${answers.githubName}</a></div
    <div>If you have any questions, please <a href = "mailto: ${answers.email}">email me</a></div>
    <hr />
  </div>
  <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
</body>
</html>`;

// Bonus using async/await and try/catch
const init = async () => {
  try {
    const answers = await promptUser();
    const html = generateHTML(answers);
    await writeFileAsync("index.html", html);
    console.log("Successfully wrote to index.html");
  } catch (err) {
    console.log(err);
  }
};

init();
