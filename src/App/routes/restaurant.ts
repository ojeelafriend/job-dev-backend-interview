import { Router, Request, Response } from 'express';
import { success, error } from './response';

import { PostgresSqlRepository } from '../../Restaurants/framework/PostgreSqlRepository';

import { RestaurantCreator } from '../../Restaurants/application/Create/RestaurantCreator';
import { ListRestaurants } from '../../Restaurants/application/ListAll/ListRestaurants';

const router: Router = Router();

const repository = new PostgresSqlRepository();

const useCaseRegister = new RestaurantCreator(repository);
const useCaseList = new ListRestaurants(repository);

router.get('/list', async (req: Request, res: Response) => {
  useCaseList
    .listAll()
    .then((array) => {
      success(array, 200, res);
    })
    .catch((details) => {
      error('Internal error', 500, details, res);
    });
});

router.post('/register', async (req: Request, res: Response) => {
  const { restaurantName, location, openingTime, urlImage } = req.body;

  useCaseRegister
    .create({ restaurantName, location, openingTime, urlImage })
    .then(({ message }) => {
      success(message, 201, res);
    })
    .catch(({ message }) => error(message, 404, message, res));
    
});

export default router;
