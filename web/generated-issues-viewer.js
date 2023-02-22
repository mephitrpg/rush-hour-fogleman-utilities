const urlParams = new URLSearchParams(location.search);
const folder = urlParams.get('folder');

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
        /// name
        const issueInputEl = document.createElement('input');
        issueInputEl.classList.add('issue-name');
        issueInputEl.value = folder.split('/').slice(-1)[0];
        issueCardEl.appendChild(issueInputEl);
        /// number
        const issueNumberEl = document.createElement('div');
        issueNumberEl.classList.add('issue-number');
        issueNumberEl.innerHTML = i + 1;
        issueCardEl.appendChild(issueNumberEl);
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
            if (splittedSolution.length >  16 + 45) {
                const cells = solutionEl.querySelectorAll('.solution-cell');
                for (let i = 16 + 45; i < cells.length; i++){
                    const cell = cells[i];
                    cell.classList.add('solution-cell-noborder');
                }
            }
        } else {
            solutionEl.innerHTML = `<div style="color: red">${parseSolution(issue.solution)}</div>`;
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

init();
