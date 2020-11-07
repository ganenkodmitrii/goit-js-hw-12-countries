const BASE_URL = 'https://restcountries.eu/rest/v2/name';

function fetchCountryByName(countryName) {
    return fetch(`${BASE_URL}/${countryName}`).then(response => response.json() ) 
}

export default { fetchCountryByName };