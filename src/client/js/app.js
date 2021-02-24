import { getCity, getCountry, getPixabay, getWeather } from './api';

var working = false;

let reqData = {};

async function handleSubmit(e) {
  e.preventDefault();
  const destination = document.getElementById('js--dest').value;
  const departureDate = document.getElementById('js--date').value;
  console.log(destination, departureDate);

  if (!(destination && departureDate)) {
    alert('Please enter your travel destination and departure time');
  } else {
    if (working) return;
    working = true;
    const targetEl = e.target;
    const state = document.querySelector('.form__button > .state');
    targetEl.classList.add('loading');
    state.innerHTML = 'Planning your travel';
    getCity(destination)
      .then(async (res) => {
        console.log(res);
        try {
          const lat = res.geonames[0].lat;
          const long = res.geonames[0].lng;
          const country = res.geonames[0].countryName;

          const weatherData = await getWeather(lat, long);
          console.log(weatherData);
          const pxbayData = await getPixabay(destination);
          console.log(pxbayData);
          const img = pxbayData.hits[0].webformatURL;
          const countryData = await getCountry(country);
          console.log(countryData);
          reqData = {
            place: destination,
            date: departureDate,
            country,
            population: countryData[0].population,
            capital: countryData[0].capital,
            w_temp: weatherData.data[0].temp,
            w_low: weatherData.data[0].low_temp,
            w_high: weatherData.data[0].high_temp,
            w_wind: weatherData.data[0].wind_spd,
            w_humid: weatherData.data[0].rh,
            w_uvi: weatherData.data[0].uv,
            w_icon: weatherData.data[0].weather.icon,
            w_desc: weatherData.data[0].weather.description,
            img,
          };

          await postData('http://localhost:8082/addData', { data: reqData });
        } catch (err) {
          console.log('Error: ', err);
        }
      })
      .then(async () => {
        await updateUI();
      })

      .then(() => {
        targetEl.classList.add('ok');
        state.innerHTML = 'Here you go';
        const res = document.querySelector('.cta');
        res.click();
        state.innerHTML = "Let's GO!!!";
        targetEl.classList.remove('ok', 'loading');
        working = false;
      });
  }

  // check what text was put into the form field
}

const postData = async (url = '', data = {}) => {
  await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  });

  // try {
  //   const data = await req.json();
  //   return data;
  // } catch (err) {
  //   console.log('Error: ', err);
  // }
};

const updateUI = async () => {
  const res = await fetch('http://localhost:8082/travel');

  try {
    const newData = await res.json();
    const today = new Date();
    const depDate = new Date(newData.date);
    const days = Math.round(Math.abs((today - depDate) / 86400000));

    console.log(newData);
    let newHtml = `
    <div class="modal">
    <a href="#close" class="close">&times;</a>
    <h4>Your travel to ${newData.place} is ${
      days >= 1 ? `${days} day(s) away` : 'today'
    } </h4>
    <div class="city-result">
      <div class="city-image">
        <img src="${newData.img}" alt="city image" />
      </div>
      <div class="trip-info">
        <p>
          <i class="fas fa-calendar-day"></i> Departing: ${newData.date}
        </p>
        <p>
          <i class="fas fa-map-marked-alt"></i> Destination: ${newData.place}
        </p>
        <p><i class="fas fa-globe"></i> Country: ${newData.country}</p>
        <p><i class="fas fa-city"></i> Capital of The Country: ${
          newData.capital
        }</p>
        <p>
          <i class="fas fa-users"></i> Population of the Country: ${
            newData.population
          }
        </p>
      </div>
    </div>
    <div class="weather">
      <h4>Weather Forecast for today</h4>
      <div>
        <img
          src="https://www.weatherbit.io/static/img/icons/${newData.w_icon}.png"
          alt="weather icon"
        />
      </div>
      <p>${newData.w_desc}</p>
      <p class="temp">${newData.w_temp} °C</p>

      <ul>
        <li><i class="fas fa-temperature-low"></i> Low: ${newData.w_low} °C</li>
        <li><i class="fas fa-temperature-high"></i> High: ${
          newData.w_high
        } °C</li>
        <li><i class="fas fa-wind"></i> Wind: ${newData.w_wind.toFixed(
          2
        )} m/s</li>
        <li><i class="fas fa-tint"></i> Humidity: ${newData.w_humid}%</li>
        <li><i class="fas fa-sun"></i> UV Index: ${newData.w_uvi.toFixed(
          2
        )}</li>
      </ul>
    </div>
  </div>
    `;
    document.getElementById('result').innerHTML = newHtml;
  } catch (err) {
    console.log('Error: ', err);
  }
};

export { handleSubmit };
