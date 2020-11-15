import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import  { Client } from 'pg';


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


export const getFlatList: APIGatewayProxyHandler = async (event, _context) => {
  const client = new Client(dbOptions);

  try {
    console.log(
      '**********\n',
      'event',
      event
    );
  
    await client.connect();
  
    const { rows } = await client.query(`
      SELECT id, address, area, district, price, rooms, count
      FROM flats
      inner join stocks
      ON flats.id = stocks.flat_id    
    `);

    console.log(
      '**********\n',
      'rows',
      rows
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
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
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something went wrong, please try again later'
      }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
  finally {
    await client.end();
  }

}
