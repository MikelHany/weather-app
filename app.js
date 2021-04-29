/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//full link and ex of APi 
//https://openweathermap.org/api
let apiKey= '&appid=12bbe43a72956391461f01eeb048b33c';
let apiURL ='http://api.openweathermap.org/data/2.5/weather?zip=';


//Event listener

document.getElementById('generate').addEventListener('click',act);
function act() {
  
  const zipcod = document.getElementById("zip").value;

  action(apiURL, zipcod, apiKey);
}

//function that get API data
const action = async (apiURL, zipcod, apiKey) => {
  const res = await fetch
      (apiURL+zipcod+ apiKey);
   // `${apiURL}${zipcod}&appid=${apiKey}`
  

  try {
    const data = await res.json();
    data.date = newDate;
    data.feelings = document.getElementById("feelings").value;
    //console.log(data);
    postInfo(data);
  } catch (error) {
    console.log(error);
  }
};
// function of POST DATA
      
//function to get project data
const postInfo = async (data) => {
  const res = await fetch('/add', {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (data) => {
    const res = await fetch('/add');
//GET data from APi
//note:fetch #all that you name it in server.js
      try {
     informationOfWearTher = await res.json();
 console.log(informationOfWearTher);
 document.getElementById("date").innerHTML = informationOfWearTher.date;
 document.getElementById("temp").innerHTML = informationOfWearTher.temp;
 document.getElementById("content").innerHTML = informationOfWearTher.feelings;
} catch (error) {
   console.log(error);
    }
  });
};
    