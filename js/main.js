// Information to reach API
const url = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast";
const queryParams = "?date=";

// Selecting page elements
const inputField = document.querySelector("#date-input");
const submit = document.querySelector("#submit");
const responseField = document.querySelector("#responseField");

// AJAX functio
const getWeather = () => {
    const dateQuery = inputField.value;
    const endpoint = `${url}${queryParams}${dateQuery}`;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            renderResponse(xhr.response);
        }
    }
    xhr.open('GET', endpoint);
    xhr.send();
};

const displayWeather = (event) => {
    event.preventDefault();
    while (responseField.firstChild) {
        responseField.removeChild(responseField.firstChild);
    }
    getWeather();
};

function getLocation() {
    const e = document.getElementById("location");
    const strUser = e.options[e.selectedIndex].text;
}

// Formats response to look presentable on webpage
const renderResponse = (res) => {
    // Handles if res is falsey
    // In case res comes back as a blank array
    if(!res){
        responseField.innerHTML = "<p>Try again!</p><p>There are no UV forecast found for that date!</p>";
    } 

    const responses = res["items"];
    const numResponses = res["items"].length;
    const recentResponse = responses[numResponses - 1];
    
    const dateHeader = parseDate(recentResponse["valid_period"]);
    responseField.innerHTML = dateHeader;
    return
}

function parseDate(dateObject) {
    const validStartRaw = dateObject["start"];
    const validEndRaw = dateObject["end"];
    const validStart = `${validStartRaw.substring(0, 10)} ${validStartRaw.substring(11, 16)}`;
    const validEnd = `${validEndRaw.substring(0, 10)} ${validEndRaw.substring(11, 16)}`;
    const dateHeader = `This weather is valid from ${validStart} to ${validEnd}.`
    return dateHeader;
}

let dropdown = document.getElementById("location");
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose Region';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

    $.getJSON("./locations.json", function (data) {
      console.log(data);
    });

submit.addEventListener("click", displayWeather);

