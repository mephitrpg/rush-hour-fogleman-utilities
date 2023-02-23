//$ node run generate-issues.js <folderPath>
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const dir = process.argv[2] || '';
const directoryPath = path.join(__dirname, dir);

function getIndex(fileName) {
    const { 0: num } = fileName.match(/\d+/) || [];
    return num - 1;
}

const issues = [];
let fileNames = [];
let fileNamesLen = 0;
let fileNamesCheck = 0;

function generateSolutions () {
    fs.readdir(directoryPath, function (err, files) {
        if (err) throw err;
        fileNames = files;
        fileNames.forEach(function (fileName) {
            if (!fileName.includes('hash_')) return;
            fileNamesLen++;
        });
        fileNames.forEach(function (fileName) {
            if (!fileName.includes('hash_')) return;
            const i = getIndex(fileName);
            fs.readFile(path.join(directoryPath, fileName), 'utf8', function (err, hash) {
                if (err) throw err;
                // console.log('Hash', i+1, fileNamesLen);
                exec(`go run cmd/solve/main.go ${hash}`, (err, stdout, stderr) => {
                    if (err) throw err;
                    issues.push({
                        num: i + 1,
                        hash,
                        solution: stdout,
                    });
                    checkEnd();
                });
            });
        });
    });
}

function checkEnd () {
    fileNamesCheck++;
    // console.log("Solution",fileNamesCheck,'/',fileNamesLen)
    if (fileNamesCheck !== fileNamesLen) return;
    const filePath = path.join(directoryPath, 'data.js');
    const content = 'const issues = ' + JSON.stringify(issues);
    console.log(``);
    console.log(`View print preview in browser:`);
    console.log(``);
    console.log(`file://${__dirname}/web/generated-issues-viewer.html?folder=../${dir}`);
    console.log(``);    
    fs.writeFile(filePath, content, 'utf8', ()=>{});
}

exec('go mod init example.com/m/v2', (err, stdout, stderr) => {
    if (err) {
        if (!err.message.includes(' already exists')) throw err;
    }
    exec('go get github.com/fogleman/rush', (err, stdout, stderr) => {
        if (err) throw err;
        generateSolutions();
    });
});
