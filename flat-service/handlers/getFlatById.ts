import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { find } from 'lodash';


const flats = [
  {
    "id": 1,
    "address": "Ignatovskogo 8",
    "area": 58,
    "city": "Minsk",
    "cost": 320,
    "rooms": 2
  },
  {
    "id": 2,
    "address": "Ignatovskogo 10",
    "area": 60,
    "city": "Minsk",
    "cost": 280,
    "rooms": 2
  },
  {
    "id": 3,
    "address": "Ignatovskogo 12",
    "area": 62,
    "city": "Minsk",
    "cost": 299,
    "rooms": 2
  }
];


export const getFlatById: APIGatewayProxyHandler = async (event, _context) => {
  const { pathParameters } = event;

  console.log(
    '**********\n',
    'pathParameters',
    pathParameters
  );

  const flat = find(flats, { id: Number(pathParameters?.flatId) });

  console.log(
    '**********\n',
    'flat',
    flat
  );

  if (!flat) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Flat is not found'
      })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(flat),
  };

}