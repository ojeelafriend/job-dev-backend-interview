import { Express } from 'express';

import restaurant from './restaurant.routes';

//localhost:3000/restaurant/register

const routes = (server: Express) => {
  server.use('/restaurant', restaurant);
};

export default routes;
