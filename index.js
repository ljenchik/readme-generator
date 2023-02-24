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
        message: "Add usage",
        name: "usage",
      },
      {
        type: "list",
        message: "Choose license",
        name: "license",
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
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Username is ${answers.githubName}</h1>
  </div>
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




