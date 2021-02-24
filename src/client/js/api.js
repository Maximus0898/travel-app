const GEO_USER = 'sarvar_bek';
const WTB_API = '0d24929b6b0c4420bee34f23b51ef779';
const PXB_API = '20283577-58b3a9d1f0ba50817a092fee6';

const getCity = async (city) => {
  const baseURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${GEO_USER}`;
  const res = await fetch(baseURL);
  try {
    const newData = res.json();
    return newData;
  } catch (err) {
    console.log('Error: ', err);
  }
};

const getWeather = async (lat, long) => {
  const res = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&key=${WTB_API}`
  );
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('Error: ', err);
  }
};

const getPixabay = async (city) => {
  const res = await fetch(
    `https://pixabay.com/api/?key=${PXB_API}&q=${city}&image_type=photo&category=travel&pretty=true`
  );
  try {
    const newData = await res.json();
    return newData;
  } catch (err) {
    console.log(err);
  }
};

const getCountry = async (country) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
  try {
    const newData = await res.json();
    return newData;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCity,
  getCountry,
  getWeather,
  getPixabay,
};
