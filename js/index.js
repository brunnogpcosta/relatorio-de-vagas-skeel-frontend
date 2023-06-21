// VARIABLES
let localeFieldset
let localeCheckboxes
let selectedLocales = [];
let positionFieldset
let positionCheckboxes
let selectedPositions = [];
let experienceFieldset;
let experienceCheckboxes;
let selectedExperiences = [];
const API_URL = 'http://localhost:3000/positions'
const API_URL_FILTER = 'http://localhost:3000/positions/filter'


// MAIN FUNCTION
const loadData = async () => {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        drawScreen(data.jobs)

    } catch (error) {
        console.error("Error:", error);
    }
}
loadData()

const drawScreen = (data) => {
    try {
        let titlePositionCount = document.querySelector('.main-top-title p')
        titlePositionCount.innerText = `(${data.length})`
        emptyData(data.length)
        createLocalesInputs(data);
        createPositionsInputs(data);
        createLevelsInputs(data);

        for (const dt of data) {
            createLineTable(dt);
            createCards(dt);
        }

        setLocationFilter();
        setPositionsFilter();
        setExperiencesFilter();
    } catch (error) {
        console.error('Erro:', error);
    }
}


//VIEW MODE DATA
const optionsView = document.querySelector('.position-options')

optionsView.addEventListener('click', (e) => {
    const cards = document.querySelector('.cards')
    const table = document.querySelector('.table')
    const viewModeOptionTable = document.querySelector('#view-mode-table')
    const viewModeOptionCards = document.querySelector('#view-mode-cards')

    const tableType = e.target.innerHTML
    if (tableType === "Tabela") {
        table.style.display = "block"
        cards.style.display = "none"
        viewModeOptionTable.classList.add("selected");
        viewModeOptionCards.classList.remove("selected");
    } else {
        table.style.display = "none"
        cards.style.display = "block"
        viewModeOptionTable.classList.remove("selected");
        viewModeOptionCards.classList.add("selected");
    }
})


//HTML ELEMENTS CREATION
const createLineTable = (dt) => {
    const tbody = document.querySelector('.table tbody');

    const tr = document.createElement('tr');


    const idTd = document.createElement('td');
    idTd.textContent = dt.id;
    tr.appendChild(idTd);

    const positionTd = document.createElement('td');
    positionTd.textContent = dt.position;
    tr.appendChild(positionTd);

    const titleTd = document.createElement('td');
    titleTd.textContent = dt.title;
    tr.appendChild(titleTd);

    const descriptionTd = document.createElement('td');
    descriptionTd.textContent = dt.description;
    tr.appendChild(descriptionTd);

    const levelTd = document.createElement('td');
    levelTd.textContent = dt.level;
    tr.appendChild(levelTd);

    const companyTd = document.createElement('td');
    companyTd.textContent = dt.company;
    tr.appendChild(companyTd);

    const localeTd = document.createElement('td');
    localeTd.textContent = dt.locale;
    tr.appendChild(localeTd);

    const dateTd = document.createElement('td');
    dateTd.textContent = dt.date;
    tr.appendChild(dateTd);

    tbody.appendChild(tr);
}

const createCards = (dt) => {
    const cardsContainer = document.querySelector('.cards');

    const card = document.createElement('div');
    card.classList.add('card');
    card.id = dt.id

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    const topSection = document.createElement('div');
    topSection.classList.add('top');

    const logoImg = document.createElement('img');
    logoImg.src = dt.logo;
    logoImg.width = 40;
    logoImg.height = 40;
    logoImg.alt = 'company_logo';

    const titleP = document.createElement('p');
    titleP.textContent = dt.title;

    topSection.appendChild(logoImg);
    topSection.appendChild(titleP);

    const middleSection = document.createElement('div');
    middleSection.classList.add('middle');

    const descriptionP = document.createElement('p');
    descriptionP.textContent = dt.description;

    middleSection.appendChild(descriptionP);

    const bottomSection = document.createElement('div');
    bottomSection.classList.add('bottom');

    const bottomTagsDiv = document.createElement('div');
    bottomTagsDiv.classList.add('bottom-tags');

    const levelSpan = document.createElement('span');
    levelSpan.textContent = dt.level;

    const localeSpan = document.createElement('span');
    localeSpan.textContent = dt.locale;

    bottomTagsDiv.appendChild(levelSpan);
    bottomTagsDiv.appendChild(localeSpan);

    const dateSpan = document.createElement('span');
    dateSpan.textContent = `Publicada em ${dt.date}`;

    bottomSection.appendChild(bottomTagsDiv);
    bottomSection.appendChild(dateSpan);

    cardContainer.appendChild(topSection);
    cardContainer.appendChild(middleSection);
    cardContainer.appendChild(bottomSection);

    card.appendChild(cardContainer);

    cardsContainer.appendChild(card);
}

const createLocalesInputs = (dt) => {
    const locales = [];

    dt.forEach(job => {
        const locale = job.locale;
        if (!locales.includes(locale)) {
            locales.push(locale);
        }
    });

    const fieldset = document.getElementById('locale');

    locales.forEach(locale => {
        const div = document.createElement('div');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = locale;
        input.name = locale;

        const label = document.createElement('label');
        label.htmlFor = locale;
        label.textContent = locale;

        div.appendChild(input);
        div.appendChild(label);

        fieldset.appendChild(div);
    });
}

const createPositionsInputs = (dt) => {
    const positions = [];

    dt.forEach(job => {
        const position = job.position;
        if (!positions.includes(position)) {
            positions.push(position);
        }
    });

    const fieldset = document.getElementById('position');

    positions.forEach(position => {
        const div = document.createElement('div');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = position;
        input.name = position;

        const label = document.createElement('label');
        label.htmlFor = position;
        label.textContent = position;

        div.appendChild(input);
        div.appendChild(label);

        fieldset.appendChild(div);
    });
}

const createLevelsInputs = (dt) => {
    const levels = [];

    dt.forEach(job => {
        const level = job.level;
        if (!levels.includes(level)) {
            levels.push(level);
        }
    });

    const fieldset = document.getElementById('experience');

    levels.forEach(level => {
        const div = document.createElement('div');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = level;
        input.name = level;

        const label = document.createElement('label');
        label.htmlFor = level;
        label.textContent = level;

        div.appendChild(input);
        div.appendChild(label);

        fieldset.appendChild(div);
    });
}


// LOCATION FILTER
const setLocationFilter = () => {
    localeFieldset = document.getElementById("locale");
    localeCheckboxes = localeFieldset.querySelectorAll("input[type='checkbox']");

    selectedLocales = [];

    localeCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                const selectedLocale = this.nextElementSibling.textContent;
                selectedLocales.push(selectedLocale);
            } else {
                const selectedLocale = this.nextElementSibling.textContent;
                const index = selectedLocales.indexOf(selectedLocale);
                if (index > -1) {
                    selectedLocales.splice(index, 1);
                }
            }
            handleFilter()
        });
    });
}


// POSITIONS INPUTS
const setPositionsFilter = () => {
    positionFieldset = document.getElementById("position");
    positionCheckboxes = positionFieldset.querySelectorAll("input[type='checkbox']");

    selectedPositions = [];

    positionCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                const selectedPosition = this.nextElementSibling.textContent;
                selectedPositions.push(selectedPosition);
            } else {
                const selectedPosition = this.nextElementSibling.textContent;
                const index = selectedPositions.indexOf(selectedPosition);
                if (index > -1) {
                    selectedPositions.splice(index, 1);
                }
            }

            handleFilter()
        });
    });

}


// LEVEL INPUT
const setExperiencesFilter = () => {
    experienceFieldset = document.getElementById("experience");
    experienceCheckboxes = experienceFieldset.querySelectorAll("input[type='checkbox']");

    selectedExperiences = [];

    experienceCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                const selectedExperience = this.nextElementSibling.textContent;
                selectedExperiences.push(selectedExperience);
            } else {
                const selectedExperience = this.nextElementSibling.textContent;
                const index = selectedExperiences.indexOf(selectedExperience);
                if (index > -1) {
                    selectedExperiences.splice(index, 1);
                }
            }
            handleFilter()
        });
    });
}


//SEARCH INPUT
const searchFilter = document.getElementById("search-button")
let searchString = ""

searchFilter.addEventListener("click", (e) => {
    searchString = document.getElementById("searchString").value
    if(searchString.length > 0) handleFilter()
})


// CLEANER FILTER
const removeButton = document.getElementById("remove-filters")

removeButton.addEventListener("click", () => {
    localeCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false
    });

    positionCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false
    });

    experienceCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false
    });

    document.getElementById("searchString").value = ""

    searchString = ""
    selectedLocales = []
    selectedPositions = []
    selectedExperiences = []

    handleFilter()
})


// FILTER
const handleFilter = async () => {
    const payload = {
        searchString,
        selectedLocales,
        selectedPositions,
        selectedExperiences,
    };

    try {
        const response = await fetch(API_URL_FILTER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        const titlePositionCount = document.querySelector('.main-top-title p')
        titlePositionCount.innerText = `(${data.jobs.length})`

        emptyData(data.jobs.length)

        let idsToShow = data.jobs.map(function (obj) {
            return obj.id;
        });

        for (var i = 1; i < table.rows.length; i++) {
            var row = table.rows[i];
            var idCell = row.cells[0];

            if (idsToShow.includes(idCell.textContent)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }



        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const id = card.getAttribute('id');
            if (idsToShow.includes(id)) {
                card.style.display = ''
            } else {
                card.style.display = 'none'
            }
        });


    } catch (error) {
        console.error("Error:", error);
    }
};


// EXPORT TABLE TO EXCEL
const exportToExcel = () => {
    const table = document.getElementById("table");
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "relatorio_de_vagas.xlsx");
}


// WHEN DATA IS EMPTY
const emptyData = (dataLength) => {
    const table = document.getElementById("table");
    const emptyData = document.querySelector(".container-data .no-data-container img")

    const exportButton = document.querySelector(".export-button")


    if (dataLength) {
        table.style.display = 'block'
        emptyData.style.display = 'none'
        exportButton.style.display = 'block'
    } else {
        table.style.display = 'none'
        emptyData.style.display = 'block'
        exportButton.style.display = 'none'
    }
}