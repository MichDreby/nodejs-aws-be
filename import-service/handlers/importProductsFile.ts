import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import 'source-map-support/register';
import {find} from 'lodash'


const BUCKET_NAME = 'rs-task-5-bucket';
const FOLDER_NAME = 'uploaded';


export const importProductsFile: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const fileName = event?.queryStringParameters?.name;

    const s3 = new AWS.S3({region: 'eu-west-1'});

    const params = {
      Bucket: BUCKET_NAME,
      Prefix: `${FOLDER_NAME}/`
    }

    const { Contents: files } = await s3.listObjectsV2(params).promise();

    const requestedFile = find(
      files,
      ({Key: key}) => {
        const regExp = new RegExp(`${FOLDER_NAME}\/${fileName}\..*$`, 'igm');
        return regExp.test(key);
      }
    );

    if (!requestedFile) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'File doesn\'t exist'
        })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(
        `https://${BUCKET_NAME}.s3.amazonaws.com/${requestedFile.Key}`,
        null,
        2
      ),
    };

  } catch(error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
  
}
