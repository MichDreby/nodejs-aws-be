import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

const mockedResponse = [
  {
    "id": '1',
    "address": "Ignatovskogo 8",
    "area": 58,
    "city": "Minsk",
    "district": "Frunzenskiy",
    "price": 320,
    "rooms": 2
  },
  {
    "id": '2',
    "address": "Ignatovskogo 10",
    "area": 60,
    "city": "Minsk",
    "district": "Frunzenskiy",
    "price": 280,
    "rooms": 2
  },
  {
    "id": '3',
    "address": "Ignatovskogo 12",
    "area": 62,
    "city": "Minsk",
    "district": "Frunzenskiy",
    "price": 299,
    "rooms": 2
  },
  {
    "id": '4',
    "address": "Ignatovskogo 12",
    "area": 62,
    "city": "Minsk",
    "district": "Frunzenskiy",
    "price": 299,
    "rooms": 2
  },
  {
    "id": '5',
    "address": "Ignatovskogo 12",
    "area": 62,
    "city": "Minsk",
    "district": "Frunzenskiy",
    "price": 299,
    "rooms": 2
  },
  {
    "id": '6',
    "address": "Ignatovskogo 12",
    "area": 62,
    "city": "Minsk",
    "district": "Frunzenskiy",
    "price": 299,
    "rooms": 2
  },
  {
    "id": '7',
    "address": "Ignatovskogo 12",
    "area": 62,
    "city": "Minsk",
    "district": "Frunzenskiy",
    "price": 299,
    "rooms": 2
  },
];

export const getFlatList: APIGatewayProxyHandler = async (event, _context) => {
  try {
    console.log(
      '**********\n',
      'event',
      event
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify(mockedResponse),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch(error) {
    console.log(
      '**********\n',
      'error',
      error
    );

    return {
      statusCode: 405,
      body: JSON.stringify({
        message: 'Something went wrong, please try again later'
      }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }  
}
