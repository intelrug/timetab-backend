import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import { createConnection } from 'typeorm';
import router from './routes/Routes';

const app: express.Application = express();

function config(): void {
  app.use(cors());
  app.use(router);
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static('public'));
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
