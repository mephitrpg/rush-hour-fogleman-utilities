// DO NOT RUN DIRECTLY: INSTEAD, RUN $ sh ./generate-issues.sh
//$ node generate-issues-data <dir>
const path = require('path');
const fs = require('fs');
const dir = process.argv[2] || '';
const directoryPath = path.join(__dirname, dir);
const content = [];

function getIndex(fileName) {
    const { 0: num } = fileName.match(/\d+/) || [];
    return num - 1;
}

const hashes = [];
const images = [];
const solutions = [];

let fileNames = [];
let fileNamesLen = 0;
let fileNamesCheck = 0;

const issues = [];

fs.readdir(directoryPath, function (err, files) {
    if (err) throw err;
    fileNames = files;
    fileNamesLen = fileNames.length;
    fileNames.forEach(function (fileName) {
        if (fileName.includes('hash_')) {
            const i = getIndex(fileName);
            fs.readFile(path.join(directoryPath, fileName), 'utf8', function (err, data) {
                if (err) throw err;
                hashes[i] = data;
                checkEnd();
            });
            return;
        }
        if (fileName.includes('solution_')) {
            const i = getIndex(fileName);
            fs.readFile(path.join(directoryPath, fileName), 'utf8', function (err, data) {
                if (err) throw err;
                solutions[i] = data;
                checkEnd();
            });
            return;
        }
        if (fileName.includes('image_')) {
            const i = getIndex(fileName);
            images[i] = fileName;
            checkEnd();
            return;
        }
        // console.log('skipped', fileName);
        checkEnd();
    });
});

function checkEnd (err) {
    fileNamesCheck++;
    if (fileNamesCheck !== fileNamesLen) return;
    if (err) throw err;
    hashes.forEach(function (hash, i) {
        issues[i] = {
            num: i + 1,
            hash,
            solution: solutions[i],
            image: images[i],
        };
    });
    const filePath = path.join(directoryPath, 'data.js');
    const content = 'const issues = ' + JSON.stringify(issues);
    fs.writeFile(filePath, content, 'utf8', ()=>{});
}
