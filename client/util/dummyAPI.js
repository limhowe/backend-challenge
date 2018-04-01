export const dummyStations = {
  at: '2018-03-26T22:40:00.508Z',
  stations: [
    {
      addressCity: 'Philadelphia',
      addressState: 'PA',
      addressZipCode: '19102',
      bikesAvailable: 7,
      kioskId: '3010',
      kioskPublicStatus: 'Active',
      kioskStatus: 'FullService',
      name: '15th & Spruce',
      totalDocks: 19,
      kioskType: 1,
    },
    {
      addressCity: 'Philadelphia',
      addressState: 'PA',
      addressZipCode: '19104',
      bikesAvailable: 4,
      kioskId: '3011',
      kioskPublicStatus: 'Active',
      kioskStatus: 'FullService',
      name: '38th & Lancaster',
      totalDocks: 8,
      kioskType: 1,
    },
  ],
  weather: {
    weather: [
      { icon: '02d', description: 'few clouds', main: 'Clouds', id: 801 },
    ],
    main: {
      temp_max: 281.15,
      temp_min: 278.15,
      humidity: 33,
      pressure: 1038,
      temp: 279.79,
    },
    wind: { deg: 120, speed: 4.6 },
    clouds: { all: 20 },
  },
};
