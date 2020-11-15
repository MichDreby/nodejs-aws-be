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


export const postFlat: APIGatewayProxyHandler = async (event, _context) => {
  const client = new Client(dbOptions);

  try {
    await client.connect();

    console.log(
      '**********\n',
      'event',
      event
    );

    const body = JSON.parse(event.body);

    console.log(
      '**********\n',
      'body',
      body
    );

    const {
      address,
      area,
      city,
      district,
      price,
      rooms,
    } = body;

    
    await client.query(`
      INSERT INTO flats(address, area, city, district, price, rooms)
      values('${address}', ${area}, '${city}', '${district}', ${price}, ${rooms})
    `);
    
    await client.query(`
      INSERT INTO stocks (flat_id, count)
      SELECT id, round(random() * 10)
      FROM flats
      LEFT outer JOIN stocks
      ON flats.id = stocks.flat_id
      WHERE flat_id IS NULL
    `);
    
    return {
      statusCode: 200,
      body: JSON.stringify('Flat is successfully added'),
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
