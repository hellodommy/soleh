// Information to reach API
const url = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast";
const queryParams = "?date=";

// Selecting page elements
const inputField = document.querySelector("#date-input");
const submit = document.querySelector("#submit");
const responseField = document.querySelector("#responseField");

populateLocation();

const getWeather = () => {
    const dateQuery = inputField.value;
    const endpoint = `${url}${queryParams}${dateQuery}`;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            renderResponse(xhr.response, dateQuery);
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

const renderResponse = (res, userDate) => {
    // Handles if res is falsey
    // In case res comes back as a blank array
    if (res["message"] === "Internal Server Error") {
      responseField.innerHTML =
        "<p>aiyo, how come like that?</p><p>that day got no forecast leh...</p>";
    } else if (res["message"] === "invalid date format") {
        responseField.innerHTML =
          "<p>oi, don't anyhow!</p><p>enter correct date ok?</p>";
    } else if (res["api_info"]["status"] === "healthy") {
        const locationName = getLocation();
        responseField.innerHTML = `Displaying results on ${userDate} for ${locationName}:`;
        const responses = res["items"];
        const numResponses = res["items"].length;
        const divisor = calcDivisor(numResponses);
        let counter = 1;
        for (let i = 0; i < numResponses; i = i + divisor) {
            const currResponse = responses[i];
            getColWeather(counter, currResponse, locationName);
            counter++;
        }
    } else {
        responseField.innerHTML = "<p>alamak! don't know what happen leh, never kena this before.</p><p>Help me feedback can?</p>"
    }

    return
}

function getColWeather(colIndex, response, location) {
    const dateHeader = parseDate(response["valid_period"]);
    let imgsrc;
    let forecastHeader;
    let forecast;
    for (let i = 0; i < response["forecasts"].length; i++) {
        if (response["forecasts"][i]["area"] === location) {
            forecast = response["forecasts"][i]["forecast"];
            forecastHeader = `${forecast}`
        }
    }

    imgsrc = assignImg(forecast);

    const column = document.querySelector(`#col-${colIndex}`);
    column.innerHTML = `<div class="sgds-card">
                        <div class="sgds-card-header">
                            <p class="sgds-card-header-title"><i class="far fa-clock" id="clock-icon"></i>${dateHeader}</p>
                        </div>
                        <div class="sgds-card-content">
                            ${forecastHeader}<br>
                            ${imgsrc}
                        </div>
                    </div>
    `;

}

function assignImg(forecast) {
    let imgsrc;
    if (forecast.includes("Heavy Thundery Showers with Gusty Winds")) {
        imgsrc = generateImg("036-storm-1.png");
    } else if (forecast.includes("Thundery Showers")) {
        imgsrc = generateImg("040-storm.png");
    } else if (forecast.includes("Fair (Night)")) {
        imgsrc = generateImg("2007907.png");
    } else if (forecast.includes("Partly Cloudy (Night)")) {
        imgsrc = generateImg("031-fog.png");
    } else if (forecast.includes("Fair & Warm")) {
        imgsrc = generateImg("027-rainbow-4.png");
    } else if (forecast.includes("Partly Cloudy (Day)")) {
        imgsrc = generateImg("032-sunny.png");
    } else if (forecast.includes("Showers") || forecast.includes("Moderate Rain")) {
        imgsrc = generateImg("042-rainbow-1.png");
    } else if (forecast.includes("Cloudy")) {
        imgsrc = generateImg("039-cloudy-1.png");
    } else {
        imgsrc = generateImg("039-cloudy-1.png");
    }
    return imgsrc;
}

function generateImg(src) {
    return `<img src="img/weather/${src}" height="64px" width="64px" class="weather-icon">`;
}

function calcDivisor(numResponses) {
    return Math.floor(numResponses / 6);
}

function getLocation() {
    const e = document.getElementById("location");
    const strUser = e.options[e.selectedIndex].text;
    return strUser;
}

function parseDate(dateObject) {
    const validStartRaw = dateObject["start"];
    const validEndRaw = dateObject["end"];
    const validStart = `${validStartRaw.substring(11, 16)}`;
    const validEnd = `${validEndRaw.substring(11, 16)}`;
    const dateHeader = `${validStart} to ${validEnd}`
    return dateHeader;
}

function populateLocation() {
    const locationObjects = {
    area_metadata: [
        {
        name: "Ang Mo Kio",
        label_location: {
            latitude: 1.375,
            longitude: 103.839,
        },
        },
        {
        name: "Bedok",
        label_location: {
            latitude: 1.321,
            longitude: 103.924,
        },
        },
        {
        name: "Bishan",
        label_location: {
            latitude: 1.350772,
            longitude: 103.839,
        },
        },
        {
        name: "Boon Lay",
        label_location: {
            latitude: 1.304,
            longitude: 103.701,
        },
        },
        {
        name: "Bukit Batok",
        label_location: {
            latitude: 1.353,
            longitude: 103.754,
        },
        },
        {
        name: "Bukit Merah",
        label_location: {
            latitude: 1.277,
            longitude: 103.819,
        },
        },
        {
        name: "Bukit Panjang",
        label_location: {
            latitude: 1.362,
            longitude: 103.77195,
        },
        },
        {
        name: "Bukit Timah",
        label_location: {
            latitude: 1.325,
            longitude: 103.791,
        },
        },
        {
        name: "Central Water Catchment",
        label_location: {
            latitude: 1.38,
            longitude: 103.805,
        },
        },
        {
        name: "Changi",
        label_location: {
            latitude: 1.357,
            longitude: 103.987,
        },
        },
        {
        name: "Choa Chu Kang",
        label_location: {
            latitude: 1.377,
            longitude: 103.745,
        },
        },
        {
        name: "Clementi",
        label_location: {
            latitude: 1.315,
            longitude: 103.76,
        },
        },
        {
        name: "City",
        label_location: {
            latitude: 1.292,
            longitude: 103.844,
        },
        },
        {
        name: "Geylang",
        label_location: {
            latitude: 1.318,
            longitude: 103.884,
        },
        },
        {
        name: "Hougang",
        label_location: {
            latitude: 1.361218,
            longitude: 103.886,
        },
        },
        {
        name: "Jalan Bahar",
        label_location: {
            latitude: 1.347,
            longitude: 103.67,
        },
        },
        {
        name: "Jurong East",
        label_location: {
            latitude: 1.326,
            longitude: 103.737,
        },
        },
        {
        name: "Jurong Island",
        label_location: {
            latitude: 1.266,
            longitude: 103.699,
        },
        },
        {
        name: "Jurong West",
        label_location: {
            latitude: 1.34039,
            longitude: 103.705,
        },
        },
        {
        name: "Kallang",
        label_location: {
            latitude: 1.312,
            longitude: 103.862,
        },
        },
        {
        name: "Lim Chu Kang",
        label_location: {
            latitude: 1.423,
            longitude: 103.717332,
        },
        },
        {
        name: "Mandai",
        label_location: {
            latitude: 1.419,
            longitude: 103.812,
        },
        },
        {
        name: "Marine Parade",
        label_location: {
            latitude: 1.297,
            longitude: 103.891,
        },
        },
        {
        name: "Novena",
        label_location: {
            latitude: 1.327,
            longitude: 103.826,
        },
        },
        {
        name: "Pasir Ris",
        label_location: {
            latitude: 1.37,
            longitude: 103.948,
        },
        },
        {
        name: "Paya Lebar",
        label_location: {
            latitude: 1.358,
            longitude: 103.914,
        },
        },
        {
        name: "Pioneer",
        label_location: {
            latitude: 1.315,
            longitude: 103.675,
        },
        },
        {
        name: "Pulau Tekong",
        label_location: {
            latitude: 1.403,
            longitude: 104.053,
        },
        },
        {
        name: "Pulau Ubin",
        label_location: {
            latitude: 1.404,
            longitude: 103.96,
        },
        },
        {
        name: "Punggol",
        label_location: {
            latitude: 1.401,
            longitude: 103.904,
        },
        },
        {
        name: "Queenstown",
        label_location: {
            latitude: 1.291,
            longitude: 103.78576,
        },
        },
        {
        name: "Seletar",
        label_location: {
            latitude: 1.404,
            longitude: 103.869,
        },
        },
        {
        name: "Sembawang",
        label_location: {
            latitude: 1.445,
            longitude: 103.818495,
        },
        },
        {
        name: "Sengkang",
        label_location: {
            latitude: 1.384,
            longitude: 103.891443,
        },
        },
        {
        name: "Sentosa",
        label_location: {
            latitude: 1.243,
            longitude: 103.832,
        },
        },
        {
        name: "Serangoon",
        label_location: {
            latitude: 1.357,
            longitude: 103.865,
        },
        },
        {
        name: "Southern Islands",
        label_location: {
            latitude: 1.208,
            longitude: 103.842,
        },
        },
        {
        name: "Sungei Kadut",
        label_location: {
            latitude: 1.413,
            longitude: 103.756,
        },
        },
        {
        name: "Tampines",
        label_location: {
            latitude: 1.345,
            longitude: 103.944,
        },
        },
        {
        name: "Tanglin",
        label_location: {
            latitude: 1.308,
            longitude: 103.813,
        },
        },
        {
        name: "Tengah",
        label_location: {
            latitude: 1.374,
            longitude: 103.715,
        },
        },
        {
        name: "Toa Payoh",
        label_location: {
            latitude: 1.334304,
            longitude: 103.856327,
        },
        },
        {
        name: "Tuas",
        label_location: {
            latitude: 1.294947,
            longitude: 103.635,
        },
        },
        {
        name: "Western Islands",
        label_location: {
            latitude: 1.205926,
            longitude: 103.746,
        },
        },
        {
        name: "Western Water Catchment",
        label_location: {
            latitude: 1.405,
            longitude: 103.689,
        },
        },
        {
        name: "Woodlands",
        label_location: {
            latitude: 1.432,
            longitude: 103.786528,
        },
        },
        {
        name: "Yishun",
        label_location: {
            latitude: 1.418,
            longitude: 103.839,
        },
        },
    ],
    };

    let dropdown = document.getElementById("location");
    dropdown.length = 0;

    let defaultOption = document.createElement("option");
    defaultOption.text = "choose region";

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const data = locationObjects["area_metadata"];

    let option;
    for (let i = 0; i < data.length; i++) {
        option = document.createElement("option");
        option.text = data[i]["name"];
        dropdown.add(option);
    }
}

submit.addEventListener("click", displayWeather);
