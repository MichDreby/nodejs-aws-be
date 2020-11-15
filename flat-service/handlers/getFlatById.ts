import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import  { Client } from 'pg';
import { find } from 'lodash';


const {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USERNAME,
  PG_PASSWORD
} = process.env;

const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
}


export const getFlatById: APIGatewayProxyHandler = async (event, _context) => {
  const client = new Client(dbOptions);

  try {
    console.log(
      '**********\n',
      'event',
      event
    );

    await client.connect();

    const { pathParameters } = event;

    console.log(
      '**********\n',
      'pathParameters',
      pathParameters
    );

    const { rows: flats } = await client.query(`
      SELECT id, address, area, district, price, rooms, count
      FROM flats
      inner join stocks
      ON flats.id = stocks.flat_id    
    `);
  
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
  finally {
    await client.end();
  }
}
