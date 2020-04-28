window.onload = getCountries;
const main = document.querySelector('.main-content');
const searchBtn = document.getElementById('search');
const searchInput = document.getElementsByTagName('input')[0];
const filterBtn = document.querySelector('.filter');
const filterSelector = document.querySelector('.filter-selector');
const selectRegion = document.querySelectorAll('.select-region');
const themeBtn = document.querySelector('.theme-switcher');

if(window.localStorage.getItem('theme') === 'dark') {
    toggleTheme();
};

filterBtn.addEventListener('click', toggleFilters);
selectRegion.forEach(elem => elem.addEventListener('click', getRegion));

themeBtn.addEventListener('click', toggleTheme);

function toggleTheme() {
    document.getElementsByTagName('body')[0].classList.toggle('dark');
    if(themeBtn.textContent == 'Dark Mode') {
        themeBtn.innerHTML = `<i class="far fa-sun"></i>Light Mode`;
        window.localStorage.setItem('theme', 'dark');
    } else {
        themeBtn.innerHTML = `<i class="far fa-moon"></i>Dark Mode`;
        window.localStorage.setItem('theme', 'light');
    }
}

function getRegion() {
    let region = event.currentTarget.dataset.id;
    toggleFilters();
    main.innerHTML = '';
    getRegionCountries(region);
}

async function getRegionCountries(region) {
    const found = await fetch('https://restcountries.eu/rest/v2/region/' + region)
    .then(res => res.json())
    .then(data => data.forEach(country => { main.innerHTML += 
        `<div class="card" onclick="setCountryName()" data-id="${country.name}">
            <div class="flag"><img src="${country.flag}" alt="${country.name}-flag"/></div>
            <div class="data-wrapper">
                    <h3>${country.name}</h3>
                <div class="country-data">
                    <span><b>Population:</b> ${new Intl.NumberFormat().format(country.population)}</span>
                    <span><b>Region:</b> ${country.region}</span>
                    <span><b>Capital:</b> ${country.capital}</span>
                </div>
            </div>
        </div>`
    }));
}

function toggleFilters() {
    filterSelector.classList.toggle('active');
}


async function getCountries() {
    const found = await fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(data => data.forEach(country => { main.innerHTML += 
        `<div class="card" onclick="setCountryName()" data-id="${country.name}">
            <div class="flag"><img src="${country.flag}" alt="${country.name}-flag"/></div>
            <div class="data-wrapper">
                    <h3>${country.name}</h3>
                <div class="country-data">
                    <span><b>Population:</b> ${new Intl.NumberFormat().format(country.population)}</span>
                    <span><b>Region:</b> ${country.region}</span>
                    <span><b>Capital:</b> ${country.capital}</span>
                </div>
            </div>
        </div>`
    }));
}

searchBtn.addEventListener('click', getSearchName);

function getSearchName() {
    let name =  searchInput.value;
    getSearch(name);
}

function setCountryName() {
    window.localStorage.setItem('clicked', event.currentTarget.dataset.id);
    document.location.pathname = './country.html';
}


async function getSearch(name) {
    const found = await fetch('https://restcountries.eu/rest/v2/name/' + name)
    .then(res => res.json())
    .then(data => data.forEach(country => { main.innerHTML = 
        `<div class="card" onclick="setCountryName()" data-id="${country.name}">
            <div class="flag"><img src="${country.flag}"/></div>
            <div class="data-wrapper">
                    <h3>${country.name}</h3>
                <div class="country-data">
                    <span><b>Population:</b> ${new Intl.NumberFormat().format(country.population)}</span>
                    <span><b>Region:</b> ${country.region}</span>
                    <span><b>Capital:</b> ${country.capital}</span>
                </div>
            </div>
        </div>`
    }));
}