// Web API base URL and personal key
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = ',it&appid=6ad6f4e238882457dcb737040cf28fcb';

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
        console.log(date);
        postData('/', {date: date, feelings: feelings, temp: data.main.temp})
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
        console.log(newData);
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
        return data;
    } catch(error) {
        console.log('error', error);
    }
}

// function to convert unix date from API
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}
