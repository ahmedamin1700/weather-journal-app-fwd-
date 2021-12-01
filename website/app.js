// Personal API Key for OpenWeatherMap API
const url = "api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "7ddf1dadaff393025ad1c0eab8445532";

// Event listener to add function to existing HTML DOM element
const button = document.getElementById("generate");
button.addEventListener("click", listener);

/* Function called by event listener */
function listener(event) {
  event.preventDefault();
  const zipCode = document.getElementById("zip");

  getAPIData(zipCode.value);
  zipCode.value = "";
}

/* Function to GET Web API Data*/
const getAPIData = async (code) => {
  let fullURL = `http://${url}${code},us&units=metric&appid=${apiKey}`;
  const response = await fetch(fullURL);
  const data = await response.json();
  const feelings = document.getElementById("feelings");
  let postBody = {
    temp: data.main.temp,
    date: new Date().toLocaleString(),
    content: feelings.value,
  };
  sendData(postBody);
  feelings.value = "";
};

/* Function to POST data */
const sendData = async (data) => {
  let url = "http://localhost:3000/add";
  await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    /* Function to GET Project Data */
  }).then(async () => {
    const response = await fetch("http://localhost:3000/all");
    const data = await response.json();
    console.log("here get", data);
    updateUI(data);
  });
};

/* Function to update the UI with data */
const updateUI = (data) => {
  const date = document.getElementById("date");
  const temp = document.getElementById("temp");
  const content = document.getElementById("content");

  date.innerHTML = data.date;
  temp.innerHTML = data.temp;
  content.innerHTML = data.content;
};
