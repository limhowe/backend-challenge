import mongoose from 'mongoose';
import Station from '../models/station';
import Weather from '../models/weather';
import Entry from '../models/entry';
import fetch from 'isomorphic-fetch';

const INDEGO_API_URL = 'https://www.rideindego.com/stations/json/';
const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather?q=Philadelphia,us&appid=2aab12b6a9df5520d950952dc0c69c84';

const migrateWeatherData = async (entryId, timeStamp, weatherData) => {
  const newWeather = new Weather({
    _entryId: entryId,
    dataAt: timeStamp,
    ...weatherData,
  });
  return newWeather.save();
};

const migrateIndegoData = async (entryId, timeStamp, indegoFeatures) => {
  const newDataPromises = indegoFeatures.map((item) => {
    const newStation = new Station({
      _entryId: entryId,
      dataAt: timeStamp,
      ...item.properties,
    });
    return newStation.save();
  });
  return Promise.all(newDataPromises);
};

const importJob = async () => {
  try {
    const [indegoData, weatherData] = await Promise.all([
      fetch(INDEGO_API_URL).then((response) => response.json()),
      fetch(WEATHER_API_URL).then((response) => response.json()),
    ]);
    const timeNow = new Date();
    let newEntry = new Entry({
      _id: new mongoose.Types.ObjectId(),
      dataAt: timeNow,
    });
    await newEntry.save();
    const [stationModels, weatherModel] = await Promise.all([
      migrateIndegoData(newEntry._id, timeNow, indegoData.features),
      migrateWeatherData(newEntry._id, timeNow, weatherData),
    ]);
    newEntry.stations = stationModels.map((item) => item._id);
    newEntry.weather = weatherModel._id;
    newEntry = await newEntry.save();
    console.log('New Entry : ', newEntry); // eslint-disable-line
  } catch (err) {
    console.log('error: ', err); // eslint-disable-line
  }
};

export default importJob;
