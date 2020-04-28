let country = window.localStorage.getItem('clicked');
const main = document.querySelector('.main-content');

let fechCountry;

getSearch(country);

async function getSearch(name) {
    const found = await fetch('https://restcountries.eu/rest/v2/name/' + name)
    .then(res => res.json())
    .then(data => fechCountry = data[0])
    renderInfo(fechCountry)
}

function renderInfo(data) {
    main.innerHTML = 
    `<div class="flag"><img src="${data.flag}" alt=""></div>
        <div class="data-wrapper detail">
            <h3>${data.name}</h3>
        <div class="country-data">
            <span><b>Native Name:</b> ${data.nativeName}</span>
            <span><b>Population:</b> ${new Intl.NumberFormat().format(data.population)}</span>
            <span><b>Region:</b> ${data.region}</span>
            <span><b>Sub Region:</b> ${data.subregion}</span>
            <span><b>Capital:</b> ${data.capital}</span>
        </div>
        <div class="country-data">
            <span><b>Top Level Domain:</b> ${data.topLevelDomain}</span>
            <div id="currencies"><b>Currencies:</b></div>
            <div id="languages"><b>Languages:</b></div>
        </div>
        <h4>Border Countries:</h4>
        <div class="border-countries"></div>
    </div>`;
    let currencies = data.currencies;
    let languages = data.languages;
    let borders = data.borders;
    console.log(languages)
    const spanCurrencies = document.getElementById('currencies');
    const spanLanguages = document.getElementById('languages');
    const bordersCountries = document.querySelector('.border-countries');
    currencies.forEach(elem => spanCurrencies.innerHTML += `<span> ${elem.name}</span>`);
    languages.forEach(elem => spanLanguages.innerHTML += `<span> ${elem.name}</span>`);
    borders.forEach(borders => bordersCountries.innerHTML += 
        `<div class="countries">${borders}</div>`);
}