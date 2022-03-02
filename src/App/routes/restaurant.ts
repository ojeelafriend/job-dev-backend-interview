import { Router, Request, Response } from 'express';
import { success, error } from './response';

import { PostgresSqlRepository } from '../../Restaurants/framework/PostgreSqlRepository';
import { RestaurantCreator } from '../../Restaurants/application/Create/RestaurantCreator';

const router: Router = Router();

const repository = new PostgresSqlRepository();
const useCaseRegister = new RestaurantCreator(repository);

router.post('/register', async (req: Request, res: Response) => {
  const { restaurantName, location, openingTime, urlImage } = req.body;

  console.log(location, openingTime, urlImage);

  useCaseRegister
    .create({ restaurantName, location, openingTime, urlImage })
    .then(({ message }) => {
      success(message, 201, res);
    })
    .catch(({ message }) => error(message, 404, message, res));
});

export default router;
