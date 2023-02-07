const requestToServer = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const createElement = ({ data }) =>
  [
    `<tbody>`,
    `<tr><td>日付</td><td>${data.weatherData.time}</td></tr>`,
    `<tr><td>最高気温</td><td>${data.weatherData.temperature_2m_max}</td></tr>`,
    `<tr><td>最低気温</td><td>${data.weatherData.temperature_2m_min}</td></tr>`,
    `<tr><td>今日のクレド（ja）</td><td>${data.credoData.text_ja}</td></tr>`,
    `</tbody>`,
  ].join("");

const requestWithGeolocation = async (position) => {
  const { latitude, longitude } = position.coords;
  const url = "http://localhost:3001/today";
  const json = await requestToServer(
    `${url}?latitude=${latitude}&longitude=${longitude}`
  );
  console.log(json);
  document.getElementById("output").innerHTML = createElement(json);
};

const requestWithOutGeolocation = async (error) => {
  const url = "http://localhost:3001/today";
  const json = await requestToServer(url);
  console.log(json);
  document.getElementById("output").innerHTML = createElement(json);
};

const options = {
  maximumAge: 30000,
  timeout: 10000,
  enableHighAccuracy: true,
};

navigator.geolocation.getCurrentPosition(
  requestWithGeolocation,
  requestWithOutGeolocation,
  options
);
