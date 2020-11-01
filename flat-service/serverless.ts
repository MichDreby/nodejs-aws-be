import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'flat-service',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    region: 'eu-west-1'
  },
  functions: {
    getFlatList: {
      handler: './handlers/getFlatList.getFlatList',
      events: [
        {
          http: {
            method: 'get',
            path: 'flats',
          }
        }
      ]
    },
    getFlatById: {
      handler: './handlers/getFlatById.getFlatById',
      events: [
        {
          http: {
            method: 'get',
            path: 'flats/{flatId}',
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
