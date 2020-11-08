import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import flats from '../mocks/flats.json';


export const getFlatList: APIGatewayProxyHandler = async (event, _context) => {
  try {
    console.log(
      '**********\n',
      'event',
      event
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify(flats),
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
