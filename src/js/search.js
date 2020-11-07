import API from "./api-service.js";
import getRefs from "./get-refs.js";
import contriesNameListTpl from '../templates/countries-name-list.hbs';
import cardCountryTmp from "../templates/country-card.hbs";

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const debounce = require('lodash.debounce');
const refs = getRefs();

let searchCountry = '';

refs.inputSearchEl.addEventListener(
    'input',
      debounce(() => {
      onSearchEl();
    }, 500),)

function onSearchEl() {
    searchCountry = refs.inputSearchEl.value;
    console.log(searchCountry);

    if (!searchCountry) {
        clearMarkup();
        return;
    }

    API.fetchCountryByName(searchCountry)
    .then(checkingTheNumberOfCountries)
    .catch(onFetchError)
}


function checkingTheNumberOfCountries(countries) {
     if (countries.length > 10) {
       clearMarkup();
       toMuchCountries();
  
     }
     else if (countries.length <= 10 && countries.length > 1) {
       clearMarkup();
       renderCountryCard(contriesNameListTpl, countries);
  
     }
     else if (countries.length === 1) {
       clearMarkup();
       renderCountryCard(cardCountryTmp, countries[0]);
     }
     else {
      clearMarkup();
      noResult();
     }
}


function renderCountryCard(template ,countries) {
    const markupCountry = template(countries);
    refs.cardCountryBox.insertAdjacentHTML('beforeend', markupCountry);
}

function onFetchError(error) {
    console.log(error, 'Ou :(');
}

function clearMarkup() {
    refs.cardCountryBox.innerHTML = '';
}

function toMuchCountries() {
    info({
        text: "Too many matches found. Please enter a more specific query!'",
        delay: 2000,
    });
}

function noResult() {
    error({
        text: 'No Result!!',
        delay: 2000,
    });
}

