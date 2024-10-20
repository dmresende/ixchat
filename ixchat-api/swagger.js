import swaggerAutogen from 'swagger-autogen';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import fs from 'fs';

const app = express();

const doc = {
  info: {
    title: 'IXChat-API',
    description: 'API para o IXChat',
  },
  host: 'localhost:3333',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./src/app.js'];

swaggerAutogen()(outputFile, routes, doc).then(() => {
  const swaggerFile = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));

  app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.listen(3333, () => {
    console.log('Swagger Docs available at http://localhost:3333/api-docs');
  });
});