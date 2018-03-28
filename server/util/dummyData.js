import mongoose from 'mongoose';
const objectID = mongoose.Types.ObjectId;

export const stations = {
  time0: [
    {
      _id: objectID('5abbdb2513ec4cbe1171e1e5'),
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
      dataAt: '2018-03-26T23:20:01.508Z',
    },
    {
      _id: objectID('5ab98021d329925fa6ab829a'),
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
      dataAt: '2018-03-26T23:20:01.508Z',
    },
  ],
  time1: [
    {
      _id: objectID('5abbdb2513ec4cbe117ffff5'),
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
      dataAt: '2018-03-28T23:20:01.508Z',
    },
    {
      _id: objectID('5ab98021d329925fa6abeeee'),
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
      dataAt: '2018-03-28T23:20:01.508Z',
    },
  ],
};

export const weathers = [
  {
    _id: objectID('5ab98022d329925fa6ab830d'),
    weather: [
      {
        icon: '02d',
        description: 'few clouds',
        main: 'Clouds',
        id: 801,
      },
    ],
    main: {
      temp_max: 281.15,
      temp_min: 278.15,
      humidity: 33,
      pressure: 1038,
      temp: 279.79,
    },
    wind: {
      deg: 120,
      speed: 4.6,
    },
    clouds: {
      all: 20,
    },
    dataAt: '2018-03-26T23:20:01.508Z',
  },
  {
    _id: objectID('5ab98022d329925fa6aaaaad'),
    weather: [
      {
        icon: '02d',
        description: 'few clouds',
        main: 'Clouds',
        id: 801,
      },
    ],
    main: {
      temp_max: 281.15,
      temp_min: 278.15,
      humidity: 33,
      pressure: 1038,
      temp: 279.79,
    },
    wind: {
      deg: 120,
      speed: 4.6,
    },
    clouds: {
      all: 20,
    },
    dataAt: '2018-03-28T23:20:01.508Z',
  },
];

export const entries = [
  {
    _id: '5ab99bc1edb09d6f44678aba',
    stations: [objectID('5abbdb2513ec4cbe1171e1e5'), objectID('5ab98021d329925fa6ab829a')],
    weather: objectID('5ab98022d329925fa6ab830d'),
    dataAt: '2018-03-26T23:20:01.508Z',
  },
  {
    _id: '5ab99bc1edb09d6f446cccca',
    stations: [objectID('5abbdb2513ec4cbe117ffff5'), objectID('5ab98021d329925fa6abeeee')],
    weather: objectID('5ab98022d329925fa6aaaaad'),
    dataAt: '2018-03-28T23:20:01.508Z',
  },
];
