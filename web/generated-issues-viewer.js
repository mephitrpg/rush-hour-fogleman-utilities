function defaultName() {
    const urlParams = new URLSearchParams(location.search);
    const folder = urlParams.get('folder') || '';
    return folder.split('/').slice(-1)[0].replace(/[-_]/g, ' ').toUpperCase();
}
function defaultNameColor() {
    return '#ffffff';
}
function defaultNameBgColor() {
    return '#666666';
}
function defaultRotate() {
    return '0';
}

const urlParams = new URLSearchParams(location.search);
let folder = urlParams.get('folder');
let name = urlParams.get('name') || defaultName();
let nameColor = urlParams.get('nameColor') || defaultNameColor();
let nameBgColor = urlParams.get('nameBgColor') || defaultNameBgColor();
let rotate = urlParams.get('rotate') || defaultRotate();

if (folder[folder.length-1] === "/") folder = folder.slice(0, -1);

function init() {
    const scriptEl = document.createElement('script');
    scriptEl.onload = () => {
            generate();
    }
    scriptEl.onerror = () => {
        document.querySelector('#issuesfilenotfound').classList.remove('hide');
    }
    scriptEl.src = `${folder}/data.js`;
    document.querySelector('head').appendChild(scriptEl);
}

function generate() {
    const appEl = document.querySelector('#app');
    
    const solutionCards = [];
    const issueCards = [];
    issues.forEach((issue, i) => {
        const issueCardEl = document.createElement('div');
        issueCardEl.classList.add('card');
        issueCardEl.classList.add('card-issue');
        /// picture
        const issuePictureEl = document.createElement('div');
        issuePictureEl.classList.add('issue-picture');
        const issuePictureIframe = document.createElement('iframe');
        issuePictureIframe.classList.add('issue-picture-iframe');
        issuePictureIframe.src = `generated-issues-viewer-picture-issue.html#${issue.hash}`;
        issuePictureIframe.scrolling = 'no';
        issuePictureEl.appendChild(issuePictureIframe);
        issueCardEl.appendChild(issuePictureEl);
        /// number
        const issueNumberEl = document.createElement('div');
        issueNumberEl.classList.add('issue-number');
        issueNumberEl.innerHTML = issue.num;
        issueCardEl.appendChild(issueNumberEl);
        /// name
        const issueNameEl = document.createElement('div');
        issueNameEl.classList.add('issue-name');
        issueNameEl.innerHTML = name;
        issueNameEl.style.color = nameColor;
        issueNameEl.style.backgroundColor = nameBgColor;
        issueCardEl.appendChild(issueNameEl);
        ///
        issueCards.push(issueCardEl);
        ///
        const solutionCardEl = document.createElement('div');
        solutionCardEl.classList.add('card');
        solutionCardEl.classList.add('card-solution');
        /// picture
        const solutionPictureEl = document.createElement('div');
        solutionPictureEl.classList.add('solution-picture');
        const solutionPictureIframe = document.createElement('iframe');
        solutionPictureIframe.classList.add('solution-picture-iframe');
        solutionPictureIframe.src = `generated-issues-viewer-picture-solution.html#${issue.hash}`;
        solutionPictureIframe.scrolling = 'no';
        solutionPictureEl.appendChild(solutionPictureIframe);
        solutionCardEl.appendChild(solutionPictureEl);
        /// solutions
        const solutionEl = document.createElement('div');
        solutionEl.classList.add('solution');
        solutionCardEl.appendChild(solutionEl);
        const solution = convertSolutionSyntax(issue.hash, issue.solution);
        if (solution) {
            const splittedSolution = parseSolution(convertToRushSyntax(solution)).split(' ');
            solutionEl.innerHTML += splittedSolution.map(cell => `<div class="solution-cell">${cell}</div>`).join('');
        } else {
            solutionEl.innerHTML = `<div style="color: red">${issue.solution}</div>`;
        }
        ///
        solutionCards.push(solutionCardEl);
    });

    let frontBackCardsPerPage = 4;

    let pageEl;
    for(let i = 0; i < solutionCards.length; i+=4) {
        const pageNumber = Math.floor(i / frontBackCardsPerPage) + 1;

        if (!(i % frontBackCardsPerPage)) {
            pageEl = document.createElement('div');
            pageEl.classList.add('page');
            if (rotate === '180') pageEl.classList.add('page-rotate');
            pageEl.setAttribute('data-page-number', pageNumber);
            appEl.appendChild(pageEl);
        }

        for (let j = 0; j < frontBackCardsPerPage; j++) {
            let issueCardEl = issueCards[i+j];
            if (!issueCardEl) {
                issueCardEl = document.createElement('div');
                issueCardEl.classList.add('card-empty');
                issueCardEl.classList.add('card-issue');
                issueCardEl.innerHTML = '&nbsp;'
            }
            pageEl.appendChild(issueCardEl);
        }
        
        for (let j = 0; j < frontBackCardsPerPage; j++) {
            let solutionCardEl = solutionCards[i+j];
            if (!solutionCardEl) {
                solutionCardEl = document.createElement('div');
                solutionCardEl.classList.add('card-empty');
                solutionCardEl.classList.add('card-solution');
                solutionCardEl.innerHTML = '&nbsp;'
            }
            pageEl.appendChild(solutionCardEl);
        }
        
    }
}

function changeUrlParam(paramName) {
    const params = new URLSearchParams(location.search);
    if (paramName === 'resetter') {
        const sure = confirm('Reset params to default value?');
        if (!sure) return;
        params.set('name', defaultName());
        params.set('nameColor', defaultNameColor());
        params.set('nameBgColor', defaultNameBgColor());
        params.set('rotate', defaultRotate());
        location.replace(`${location.pathname}?${params}`);
        return;
    }
    params.set('name', name);
    params.set('nameColor', nameColor);
    params.set('nameBgColor', nameBgColor);
    params.set('rotate', rotate);
    let data;
    switch(paramName){
        case 'name': {
            data = prompt('Name', name);
            break;
        }
        case 'nameColor': {
            data = prompt('Name color', nameColor);
            break;
        }
        case 'nameBgColor': {
            data = prompt('Name background color', nameBgColor);
            break;
        }
        case 'rotate': {
            data = rotate === '0' ? '180' : '0';
            break;
        }
    }
    if (data) {
        params.set(paramName, data);
        location.replace(`${location.pathname}?${params}`);
    }
}

document.querySelector('#rotator').addEventListener('click', ()=>{
    changeUrlParam('rotate');
});

document.querySelector('#urlencode').addEventListener('click', ()=>{
    changeUrlParam('name');
});

document.querySelector('#namecolor').addEventListener('click', ()=>{
    changeUrlParam('nameColor');
});

document.querySelector('#namebgcolor').addEventListener('click', ()=>{
    changeUrlParam('nameBgColor');
});

document.querySelector('#resetter').addEventListener('click', ()=>{
    changeUrlParam('resetter');
});


init();
