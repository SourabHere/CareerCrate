import { getCurrencySymbol , extractFormData} from "./utils";
import { jobTemplate } from "./templates";

let arr =["at", "au", "be", "br", "ca", "ch", "de", "es", "fr", "gb", "in", "it", "mx", "nl", "nz", "pl", "ru", "sg", "us", "za"];

export class JobSearch{
    constructor(
        searchFormSelector,
        resultsContainerSelector,
        loadingElementSelector,
        citySelector,
        errorContainer
    ){
        this.searchForm = document.querySelector(searchFormSelector);
        this.resultsContainer = document.querySelector(resultsContainerSelector);
        this.loadingElement = document.querySelector(loadingElementSelector);
        this.citySelector = document.querySelector(citySelector);
        this.errorContainer = document.querySelector(errorContainer);
    }


    setCountryCode(){
        this.countryCodes = 'gb';
        this.setCurrencyCode();
        const loc = this.citySelector.value;
        // console.log(loc,"I reached here");
       

        const endpoint = `https://api.api-ninjas.com/v1/country?name=${loc}`;
        const headers = {
            
            'X-Api-Key': '7UbqgI2qdeOQQB6stFq5bA==L7XPu56NDebo0R4u',
            
        };

        fetch(endpoint, { headers })
        .then(response => response.json())
        .then(data => {
        if (data && data.length > 0) {
            this.countryCodes = data[0].iso2.toLowerCase();
            // console.log(`The country code for ${loc} is ${this.countryCodes}.`);
            
        } 
        })
        .catch(error => {
        console.error(error);
        
        });


    }

    setCurrencyCode(){
        this.currencySymbol = getCurrencySymbol(this.countryCodes);
    }

    configureFormListener(){
        this.searchForm.addEventListener("submit",(e) =>{
            e.preventDefault();
            this.resultsContainer.innerHTML = "";
            const {search, location} = extractFormData(this.searchForm);
    
            let ccode = "";


            const endpoint = `https://api.api-ninjas.com/v1/country?name=${location}`;
            const headers = {
                
                'X-Api-Key': '7UbqgI2qdeOQQB6stFq5bA==L7XPu56NDebo0R4u',
                
            };

            fetch(endpoint, { headers })
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    this.countryCodes = data[0].iso2.toLowerCase();
                    console.log(`The country code for ${location} is ${this.countryCodes}.`);
                    ccode = data[0].iso2.toLowerCase();

                    if(arr.includes(ccode)){
                        this.setCurrencyCode();
            
                        fetch(`https://average-jade-loincloth.cyclic.app/?search=${search}&location=${location}&country=${ccode}`).then(response=> response.json()).then(({results})=>{
                            this.errorContainer.style.display = "none";
                            return results.map(job => jobTemplate(job,this.currencySymbol)).join('');
                        })
                        .then(jobs => this.resultsContainer.innerHTML = jobs);
                    } 
                    
                    else{
                        // this.resultsContainer.innerHTML = "<h1 class='failsearch'> No jobs </h1>";
                        this.resultsContainer.innerHTML = "";
                        this.errorContainer.style.display = "flex";
                    }
    
                    

                } 
                else {
                    // console.log(`No results found for ${location}.`);
                    this.resultsContainer.innerHTML = "";
                    this.errorContainer.style.display = "flex";
                    // console.log(data[0].iso2);
                }
                })
                .catch(error => {
                    console.error(error);
                
                });

        });
    }
}