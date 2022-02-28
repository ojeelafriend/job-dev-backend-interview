import { Express } from 'express';

import restaurant from './restaurant.routes';

const routes = (server: Express) => {
  server.use('/restaurant', restaurant);
};

export default routes;
