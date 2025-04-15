const vehicles = [
    {
      brand: 'Maruti Suzuki',
      model: 'Swift',
      year: 2023,
      vehicleType: 'hatchback',
      fuelType: 'petrol',
      transmission: 'manual',
      engineCapacity: 1197,
      mileage: 23.2,
      exShowroomPrice: 599000,
      colors: ['Red', 'White', 'Blue', 'Silver', 'Grey'],
      images: [
        '/images/maruti/swift/swift1.jpg',
        '/images/maruti/swift/swift2.jpg',
        '/images/maruti/swift/swift3.jpg'
      ],
      specifications: {
        dimensions: {
          length: 3845,
          width: 1735,
          height: 1530,
          wheelbase: 2450,
          groundClearance: 170
        },
        engine: {
          type: 'K-Series Petrol Engine',
          displacement: 1197,
          maxPower: '89 bhp @ 6000 rpm',
          maxTorque: '113 Nm @ 4400 rpm',
          cylinder: 4,
          valvesPerCylinder: 4
        },
        safety: [
          'Dual Front Airbags',
          'ABS with EBD',
          'Reverse Parking Sensors',
          'Seat Belt Reminder',
          'High Speed Alert System'
        ],
        features: [
          'Touchscreen Infotainment System',
          'Automatic Climate Control',
          'Keyless Entry',
          'Push Button Start',
          'LED DRLs'
        ]
      },
      variants: [
        {
          name: 'LXi',
          exShowroomPrice: 599000,
          features: ['Power Windows', 'Manual AC']
        },
        {
          name: 'VXi',
          exShowroomPrice: 699000,
          features: ['Power Windows', 'Power Steering', 'Central Locking']
        },
        {
          name: 'ZXi',
          exShowroomPrice: 799000,
          features: ['Touchscreen Infotainment', 'Alloy Wheels', 'Fog Lamps']
        }
      ]
    },
    {
      brand: 'Hyundai',
      model: 'Creta',
      year: 2023,
      vehicleType: 'suv',
      fuelType: 'diesel',
      transmission: 'automatic',
      engineCapacity: 1493,
      mileage: 18.5,
      exShowroomPrice: 1249000,
      colors: ['Phantom Black', 'Polar White', 'Lava Red', 'Typhoon Silver'],
      images: [
        '/images/hyundai/creta/creta1.jpg',
        '/images/hyundai/creta/creta2.jpg',
        '/images/hyundai/creta/creta3.jpg'
      ],
      specifications: {
        dimensions: {
          length: 4300,
          width: 1790,
          height: 1635,
          wheelbase: 2610,
          groundClearance: 190
        },
        engine: {
          type: 'U2 CRDi Diesel Engine',
          displacement: 1493,
          maxPower: '113 bhp @ 4000 rpm',
          maxTorque: '250 Nm @ 1500-2750 rpm',
          cylinder: 4,
          valvesPerCylinder: 4
        },
        safety: [
          'Six Airbags',
          'ABS with EBD',
          'Electronic Stability Control',
          'Vehicle Stability Management',
          'Hill Assist Control'
        ],
        features: [
          'Panoramic Sunroof',
          'Ventilated Front Seats',
          'Wireless Phone Charger',
          'BlueLink Connected Car Technology',
          'Bose Premium Sound System'
        ]
    },
    variants: [
      {
        name: 'E',
        exShowroomPrice: 1249000,
        features: ['Power Windows', 'Power Steering', 'Central Locking']
      },
      {
        name: 'S',
        exShowroomPrice: 1399000,
        features: ['Touchscreen Infotainment', 'Alloy Wheels', 'Rear AC Vents']
      },
      {
        name: 'SX',
        exShowroomPrice: 1599000,
        features: ['Sunroof', 'Cruise Control', 'Connected Car Features']
      },
      {
        name: 'SX(O)',
        exShowroomPrice: 1799000,
        features: ['BOSE Sound System', 'Ventilated Seats', 'Panoramic Sunroof']
      }
    ]
  },
  {
    brand: 'Tata',
    model: 'Nexon',
    year: 2023,
    vehicleType: 'suv',
    fuelType: 'petrol',
    transmission: 'manual',
    engineCapacity: 1199,
    mileage: 17.4,
    exShowroomPrice: 799000,
    colors: ['Calgary White', 'Foliage Green', 'Flame Red', 'Daytona Grey'],
    images: [
      '/images/tata/nexon/nexon1.jpg',
      '/images/tata/nexon/nexon2.jpg',
      '/images/tata/nexon/nexon3.jpg'
    ],
    specifications: {
      dimensions: {
        length: 3993,
        width: 1811,
        height: 1606,
        wheelbase: 2498,
        groundClearance: 209
      },
      engine: {
        type: 'Revotron 1.2L Turbocharged Engine',
        displacement: 1199,
        maxPower: '118 bhp @ 5500 rpm',
        maxTorque: '170 Nm @ 1750-4000 rpm',
        cylinder: 3,
        valvesPerCylinder: 4
      },
      safety: [
        'Five Star NCAP Rating',
        'Dual Airbags',
        'ABS with EBD',
        'Electronic Stability Program',
        'Roll-Over Mitigation'
      ],
      features: [
        'iRA Connected Car Technology',
        'Electric Sunroof',
        'Auto Headlamps',
        'Rain Sensing Wipers',
        'Xpress Cool'
      ]
    },
    variants: [
      {
        name: 'XE',
        exShowroomPrice: 799000,
        features: ['Power Windows', 'Central Locking', 'Dual Airbags']
      },
      {
        name: 'XM',
        exShowroomPrice: 899000,
        features: ['Harman Infotainment', 'Steering Mounted Controls', 'Cooled Glove Box']
      },
      {
        name: 'XZ',
        exShowroomPrice: 1099000,
        features: ['Projector Headlamps', 'Alloy Wheels', 'Rear AC Vents']
      },
      {
        name: 'XZ+',
        exShowroomPrice: 1299000,
        features: ['Sunroof', 'Connected Car Features', 'Leatherette Seats']
      }
    ]
  },
  {
    brand: 'Mahindra',
    model: 'XUV700',
    year: 2023,
    vehicleType: 'suv',
    fuelType: 'diesel',
    transmission: 'automatic',
    engineCapacity: 2198,
    mileage: 16.5,
    exShowroomPrice: 1349000,
    colors: ['Red Rage', 'Midnight Black', 'Electric Blue', 'Everest White'],
    images: [
      '/images/mahindra/xuv700/xuv700_1.jpg',
      '/images/mahindra/xuv700/xuv700_2.jpg',
      '/images/mahindra/xuv700/xuv700_3.jpg'
    ],
    specifications: {
      dimensions: {
        length: 4695,
        width: 1890,
        height: 1755,
        wheelbase: 2750,
        groundClearance: 200
      },
      engine: {
        type: 'mHawk Diesel Engine',
        displacement: 2198,
        maxPower: '182 bhp @ 3500 rpm',
        maxTorque: '420 Nm @ 1600-2800 rpm',
        cylinder: 4,
        valvesPerCylinder: 4
      },
      safety: [
        'Seven Airbags',
        'ABS with EBD',
        'Electronic Stability Program',
        'Driver Drowsiness Detection',
        'ADAS (Advanced Driver Assistance Systems)'
      ],
      features: [
        'Panoramic Sunroof',
        'AdrenoX Connected Car Technology',
        'Dual 10.25 inch Screens',
        'Sony 3D Sound System',
        'Alexa Built-in'
      ]
    },
    variants: [
      {
        name: 'MX',
        exShowroomPrice: 1349000,
        features: ['LED Headlamps', 'Power Windows', '8-inch Touchscreen']
      },
      {
        name: 'AX3',
        exShowroomPrice: 1549000,
        features: ['10.25-inch Touchscreen', 'AdrenoX Connected Car Tech', 'Wireless Android Auto & Apple CarPlay']
      },
      {
        name: 'AX5',
        exShowroomPrice: 1749000,
        features: ['Panoramic Sunroof', 'LED Clear-view Headlamps', 'Diamond Cut Alloy Wheels']
      },
      {
        name: 'AX7',
        exShowroomPrice: 1999000,
        features: ['ADAS Features', 'Dual 10.25-inch Screens', 'Wireless Charging']
      }
    ]
  },
  {
    brand: 'Toyota',
    model: 'Fortuner',
    year: 2023,
    vehicleType: 'suv',
    fuelType: 'diesel',
    transmission: 'automatic',
    engineCapacity: 2755,
    mileage: 12.9,
    exShowroomPrice: 3299000,
    colors: ['Super White', 'Phantom Brown', 'Attitude Black', 'Grey Metallic'],
    images: [
      '/images/toyota/fortuner/fortuner1.jpg',
      '/images/toyota/fortuner/fortuner2.jpg',
      '/images/toyota/fortuner/fortuner3.jpg'
    ],
    specifications: {
      dimensions: {
        length: 4795,
        width: 1855,
        height: 1835,
        wheelbase: 2745,
        groundClearance: 225
      },
      engine: {
        type: 'GD Series Diesel Engine',
        displacement: 2755,
        maxPower: '201 bhp @ 3400 rpm',
        maxTorque: '500 Nm @ 1600-2800 rpm',
        cylinder: 4,
        valvesPerCylinder: 4
      },
      safety: [
        'Seven Airbags',
        'ABS with EBD',
        'Vehicle Stability Control',
        'Hill Assist Control',
        'Downhill Assist Control'
      ],
      features: [
        'Power Tailgate',
        'Ventilated Seats',
        'JBL Premium Audio',
        'Connected Car Features',
        'Multi-terrain Select'
      ]
    },
    variants: [
      {
        name: '4x2 MT',
        exShowroomPrice: 3299000,
        features: ['LED Headlamps', 'Power Windows', 'Touchscreen Infotainment']
      },
      {
        name: '4x2 AT',
        exShowroomPrice: 3499000,
        features: ['Paddle Shifters', 'Leather Seats', 'Push Button Start']
      },
      {
        name: '4x4 MT',
        exShowroomPrice: 3799000,
        features: ['4WD with Differential Lock', 'Multi-terrain Select', 'Downhill Assist Control']
      },
      {
        name: 'Legender',
        exShowroomPrice: 4199000,
        features: ['Distinctive Front Grille', 'Sequential Turn Indicators', 'Kick Sensor Power Tailgate']
      }
    ]
  }
];

module.exports = vehicles;