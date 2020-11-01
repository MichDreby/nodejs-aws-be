import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { find } from 'lodash';
import flats from '../mocks/flats.json';


export const getFlatById: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const { pathParameters } = event;

    console.log(
      '**********\n',
      'pathParameters',
      pathParameters
    );
  
    const flat = find(flats, { id: pathParameters?.flatId });
  
    if (!flat) {
      throw new Error('Flat is not found')
    }
  
    return {
      statusCode: 200,
      body: JSON.stringify(flat),
    };

  } catch(error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: error.message
      })
    };
  }
}
