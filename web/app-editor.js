function toggleMenu (view) {
    const $element = $('#editor');
    $element.css({display: $element.css('display') === 'none' ? 'block' : 'none'});
}

function toggleSolutionUtilities() {
    const $element = $('#solution-utilities');
    $element.css({display: $element.css('display') === 'none' ? 'block' : 'none'});
}

$(function() {
    $('.footer .buttons').append(`<button id="editorButton">Editor</button>`);
    $('#editorButton').click(function() {
        toggleMenu();
    });
    $('input[name="syntax"]').click(function() {
        radioClick();
    });
    $('#defaultMap').click(function() {
        location.hash = '';
    });
    $('#emptyMap').click(function() {
        resetMap();
        renderMap();
    });
    $('#renderMap').click(function() {
        renderMap();
    });
    $('#copyHash').click(function() {
        copyDatabaseSyntax();
    });
    console.log(parseHash())
    setMap(parseHash().desc);
});

function radioClick() {
    let data = getMap();
    if (isRushSyntaxChecked()){
        data = convertToRushSyntax(data);
    } else {
        data = convertToAppSyntax(data);
    }
    setMap(data);
}

function copyDatabaseSyntax() {
    // console.log('copyDatabaseSyntax')
    let data = getMap();
    data = textarea2db(data);
    navigator.clipboard.writeText(data);
}

function copySolution() {
    let data = getSolution();
    navigator.clipboard.writeText(data);
}

function getMap() {
    return document.querySelector('#map-textarea').value;
}
function setMap(data) {
    document.querySelector('#map-textarea').value = data;
}
function getSolution() {
    return document.querySelector('#solution-textarea').value;
}
function setSolution(data) {
    document.querySelector('#solution-textarea').value = data;
}

function renderMap(){
    let data = getMap();
    // setMap(db2textarea(joinLines(data)));
    setMap(db2textarea(data));
    data = textarea2db(data);
    data = convertToAppSyntax(data);
    let moves = 0;
    let solution = getSolution();
    if (solution) {
        moves = (parseSolution(solution) || '').split(' ').length;
    }
    location.hash = data + "/" + moves;
}

function resetMap(){
    let data = (
        '......' + 
        '......' + 
        'XX....' + 
        '......' + 
        '......' + 
        '......'
    );
    if (!isRushSyntaxChecked()) {
        data = convertToAppSyntax(data);
    }
    setMap(data);
}

function isRushSyntaxChecked(){
    return document.querySelector("input[name='syntax']:checked").value === 'rush';
}

function db2textarea(data){
    data = data.replace(/o/g, '.');
    if (isRushSyntaxChecked()) {
        data = convertToRushSyntax(data);
    } else {
        data = convertToAppSyntax(data);   
    }
    // data = splitLines(data);
    return data;
}

function textarea2db(data){
    // data = joinLines(data);
    data = convertToAppSyntax(data);
    data = data.replace(/\./g, 'o');
    return data;
}

function splitLines(data) {
    const cols = 6;
    const len = Math.ceil(data.length / cols);
    const result = new Array();
    for (let i = 0; i < len; i++) {
        result[i] = data.slice(i * cols, i * cols + cols);
    }
    return result.join('\n');
}

function joinLines(data) {
    return data.replace(/[^\w\.]+/g, '');
}

function onConvertButtonClick() {
    if (isRushSyntaxChecked()) {
        document.querySelector('input[value="michael"]').click();
    }
    setSolution(convertSolutionSyntax(getMap(), getSolution()));
}

function onCopySolutionClick() {
    copySolution();
}

function onCopySolverSyntaxClick() {
    copySolverSyntax();
}

function parseHash() {
    const defaultDesc = "IBBxooIooLDDJAALooJoKEEMFFKooMGGHHHM";
    const defaultMoves = 60;
    try {
        var hash = location.hash.substring(1);
        if (!hash) {
            return {desc: defaultDesc, moves: defaultMoves};
        }
        var i = hash.indexOf('/');
        if (i < 0) {
            return {desc: hash, moves: 0};
        } else {
            var desc = hash.substring(0, i);
            var movesRequired = parseInt(hash.substring(i+1));
            console.log('B',desc)
            return {desc: desc, moves: movesRequired};
        }
    }
    catch (e) {
        return {desc: defaultDesc, moves: defaultMoves};
    }
}
