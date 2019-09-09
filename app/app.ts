import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import { createConnection } from 'typeorm';
import * as swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes';

const app = express();

function config(): void {
  app.use(cors());
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static('public'));
  RegisterRoutes(app);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err, req, res, next) => {
    res.status(err.status);
    res.json(err);
  });
  try {
    // eslint-disable-next-line global-require
    const swaggerDocument = require('../swagger.json');
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (err) {
    console.log('Unable to load swagger.json', err);
  }
}

function setupDb() {
  return createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
      `${__dirname}/models/**/*`,
    ],
  });
}

config();
setupDb();

export default app;
