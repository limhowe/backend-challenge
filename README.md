
## Quickstart

```
  npm install
  npm start
```

## With UI.

```
  http://localhost:8000/?at=2017-11-01T11:00:00
```
Above Url shows result if there's data in the specified time.( within 1 hour range. )
If not, it will be redirected to 404 page.

**Note : Please make sure your MongoDB is running.** For MongoDB installation guide see [this](https://docs.mongodb.org/v3.0/installation/). Also `npm3` is required to install dependencies properly.

## Available Commands

1. `npm run start` - starts the development server with hot reloading enabled

3. `npm run test` - start the test runner

4. `npm run watch:test` - start the test runner with watch mode

## G2i Node challenge (forked from P'unk Avenue Node.js Backend Challenge)

[Indego](https://www.rideindego.com) is Philadelphia's bike-sharing program, with many bike stations in the city.

The [Indego GeoJSON station status API](https://www.rideindego.com/stations/json/) provides a realtime snapshot of the number of bikes available, number of open docks available (not currently containing a bike), and total number of docks at every station. This API is free and requires no API key.

The [Open Weather Map API](https://openweathermap.org/current#name) provides a realtime snapshot of the current weather in a given city. Since Philadelphia is a small geographical area it is sufficient to obtain the weather for a geographical location central to Philadelphia. This API has a free plan, you will need to sign up for an API key.

Using MongoDB, Node.js and Express, create a new API server which accumulates data over time and provides access to historical data for both weather and Indego bike availability, supporting the following queries at minimum. Note that it is sufficient to store data at hourly intervals.

*Please note: historical CSV data downloads are available from Indego, however you should not rely on them.* Instead you should build your own node application that downloads fresh data at least once per hour, stores it and implements the API described below.

## Snapshot of all stations at a specified time

Data for all stations as of 11am Universal Coordinated Time on November 1st, 2017:

`/api/v1/stations?at=2017-11-01T11:00:00`

This API should respond as follows, with the actual time of the first snapshot of data on or after the requested time and the data:

```javascript
{
  at: '2017-11-01:T11:00:01',
  stations: { /* As per the Indego API */ },
  weather: { /* as per the Open Weather Map API response for Philadelphia */ }
}
```

If no suitable data is available a 404 status code should be given.

## Snapshot of one station at a specific time

Data for a specific station (by its `kioskId`) at a specific time:

`/api/v1/stations/KIOSKIDGOESHERE?at=2017-11-01T11:00:00`

The response should be the first available on or after the given time, and should look like:

```javascript
{
  at: '2017-11-01:T11:00:01',
  station: { /* Data just for this one station as per the Indego API */ },
  weather: { /* as per the Open Weather Map API response for Philadelphia */ }
}
```

Include an `at` property in the same format indicating the actual time of the snapshot.

If no suitable data is available a 404 status code should be given.

## Snapshots of one station over a range of times

All historical data for a specific station between two timestamps:

`/api/v1/stations/KIOSKIDGOESHERE?from=2017-11-01T11:00:00&to=2017-12-01T11:00:00&frequency=daily`

For this last response, the returned JSON value should be an array of values in ascending chronological order. **Each element in the array** should look like:

```javascript
{
  at: '2017-11-02T10:00:00',
  station: { /* snapshot in the same format as the other APIs */ },
  weather: { /* as per the Open Weather Map API response for Philadelphia */ }
}
```

The `frequency` query parameter, if present, may be `hourly` or `daily`. The API should respond with only one entry from each hour or day. For `hourly` this should be the first entry on or after the top of the hour. For `daily` it should be the first entry on or after noon, Philadelphia time. If `frequency` is absent, `hourly` is the default.