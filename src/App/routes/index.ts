import { Express } from 'express';

import restaurant from './restaurant';

const routes = (server: Express) => {
  server.use('/restaurant', restaurant);
};

export default routes;
