// Web API base URL and personal key
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&appid=6ad6f4e238882457dcb737040cf28fcb&units=imperial';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', makeForecast)
/* Function called by event listener */
function makeForecast() {
    const zipcode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    // console.log(zipcode);
    getForecast(baseURL, apiKey, zipcode)
    .then(function (data) {
        const date = timeConverter(data.dt);
        // console.log(data.main.temp);
        postData('/', {date: date, feelings: feelings, temp: data.main.temp.toFixed(0)});
        update();
    })
}
/* Function to GET Web API Data*/
const getForecast = async (baseURL, apiKey, zipcode) => {
    const res = await fetch(baseURL + zipcode + apiKey);
    try {
        const data = await res.json();
        // console.log(data);
        // console.log(data.dt);
        return data;
    } catch(error) {
        console.log('error', error);
    }
}
/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        // console.log(newData);
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}
/* Function to GET Project Data */
const getData = async (url) => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        // console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
    }
}
// function to update interactively the browser
function update(data) {
    getData('/all')
    .then(function (data) {
        // console.log(data);
        document.getElementById('date').innerHTML = `Today is: ${data.date}`;
        document.getElementById('temp').innerHTML = `The temperature is: ${data.temp}˚F`;
        document.getElementById('content').innerHTML = `Today I'm feeling: ${data.feelings}`;
    })
}
// function to convert unix date from API
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year + ' ';
    return time;
}
