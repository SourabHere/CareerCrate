import {JobSearch} from './JobSearch'

const jobSearch = new JobSearch('#search-form','.result-container','.loading-element','#location','.error-container');
jobSearch.setCountryCode();
jobSearch.configureFormListener();

const strt = document.getElementById("strt");


strt.addEventListener("click",() => {
    jobSearch.setCountryCode();
    jobSearch.configureFormListener();
});

