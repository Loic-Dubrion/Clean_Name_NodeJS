const fs = require('fs');
const readline = require('readline');

function cleanString(dirtyString) {
  dirtyString = dirtyString.trim();
  dirtyString = dirtyString.replace(/ /g, "-");
  dirtyString = dirtyString.replace(/--/g, "-");
  dirtyString = dirtyString.toLowerCase();
  dirtyString =  dirtyString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return dirtyString;
}

function processLineByLine() {
    const fileStream = fs.createReadStream('dirty.csv');

    const rl = readline.createInterface({
      input: fileStream,
    });
  
    rl.on('line', (line) => {
      const cells = line.split(";");
      let newLine = cells.map(cleanString).join(";");
      fs.appendFileSync("clean.csv", `${newLine}\n`, "utf8");
    });
  }

processLineByLine();
