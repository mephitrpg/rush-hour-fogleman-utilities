function convertToRushSyntax(data){
    if (new RegExp('X').test(data)) {
        // console.log("from rush to rush")
        // from rush to rush
        return data;
    } else if (new RegExp('r').test(data)) {
        // from solver to rush
        // console.log("from solver to rush")
        data = data.replace(/r/g, 'X');
        return data;
    } else {
        // from app to rush
        // console.log("from app to rush")
        data = data.replace(/A/g, 'X');
        const letters = ['B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'];
        letters.forEach(letter => {
            data = data.replace(new RegExp(letter, 'g'), String.fromCharCode(letter.charCodeAt(0) - 1));
        });
        return data;
    }
}

function convertToSolverSyntax(data){
    if (new RegExp('X').test(data)) {
        // from rush to solver
        data = data.replace(/X/g, 'r');
        return data;
    } else if (new RegExp('r').test(data)) {
        // from solver to solver
        return data;
    } else {
        // from app to solver
        data = data.replace(/A/g, 'r').toUpperCase();
        const letters = ['B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'];
        letters.forEach(letter => {
            data = data.replace(new RegExp(letter, 'g'), String.fromCharCode(letter.charCodeAt(0) - 1));
        });
        return data;
    }
}

function convertToAppSyntax(data){
    if (new RegExp('X').test(data)) {
        // from rush to app
        // console.log("from rush to app")
        const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'];
        let i = letters.length;
        while(i--){
            let letter = letters[i];
            data = data.replace(new RegExp(letter, 'g'), String.fromCharCode(letter.charCodeAt(0) + 1));
        }
        data = data.replace(/X/g, 'A');
        return data;
    } else if (new RegExp('r').test(data)) {
        // from solver to app
        // console.log("from solver to app")
        const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'];
        let i = letters.length;
        while(i--)(letter => {
            data = data.replace(new RegExp(letter, 'g'), String.fromCharCode(letter.charCodeAt(0) + 1));
        });
        data = data.replace(/r/g, 'X');
        return data;
    } else {
        // from app to app
        // console.log("app to app")
        return data;
    }
}

function isCarHorizontal(code, letter) {
    const i = code.indexOf(letter);
    if (i === -1) {
        throw new Error('LETTER ' + letter + ' NOT FOUND IN MAP');
    }
    return letter === code[i+1];
}

function fixGoScriptLettersOffset(code, solution) {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const lettersInCode = alphabet.filter(letter => code.includes(letter));
    const lettersInSolution = alphabet.filter(letter => solution.includes(letter));
    let i = lettersInSolution.length;
    while (i--) {
        const index = lettersInSolution[i].charCodeAt() - 65;
        solution = solution.split(lettersInSolution[i]).join(lettersInCode[index]);
    }
    return solution;
}

function parseSolution(solution) {
    if (solution.includes('[')) {
        solution = ((solution.match(/\[[\s\S]+\]/) || [])[0] || '').replace(/[\[\]]/g, '');
    }
    return solution;
}

function convertSolutionSyntax(hash, solution) {
    // ⬅ ⮕ ⬆ ⬇
    // ⭠ ⭢ ⭡ ⭣
    let sol = solution;
    try{
        solution = fixGoScriptLettersOffset(hash, solution);
        solution = parseSolution(solution);

        i = solution.indexOf('+');
        while(i !== -1) {
            const letter = solution[i-1];
            const arrow = isCarHorizontal(hash, letter) ? '⭢' : '⭣';
            solution = solution.slice(0, i) + arrow + solution.slice(i+1);
            i = solution.indexOf('+');
        }

        i = solution.indexOf('-');
        while(i !== -1) {
            const letter = solution[i-1];
            const arrow = isCarHorizontal(hash, letter) ? '⭠' : '⭡';
            solution = solution.slice(0, i) + arrow + solution.slice(i+1);
            i = solution.indexOf('-');
        }

        return solution;
    } catch (e) {
        console.error(e);
        console.log("------------------------------------")    
        console.log(hash)
        console.log("------------------------------------")    
        console.log(hash.substr(0*6,6))
        console.log(hash.substr(1*6,6))
        console.log(hash.substr(2*6,6))
        console.log(hash.substr(3*6,6))
        console.log(hash.substr(4*6,6))
        console.log(hash.substr(5*6,6))
        console.log(parseSolution(sol))
        console.log(parseSolution(fixGoScriptLettersOffset(hash, sol)))
    }
}