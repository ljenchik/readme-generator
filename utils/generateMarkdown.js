// function to generate markdown for README
const generateMarkdown = (data) => {
  return `
# ${data.title}
## Description
${data.desription}
## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Contribution](#contribution)
* [Tests](#tests)
* [License](#license)
* [Questions](#questions)
## Installation
${data.installation}
## Usage
${data.usage}
## Contribution
${data.contribution}
## License
This project is licensed under the ${data.license} license.
## Tests
${data.tests}
`;
}

export default generateMarkdown;