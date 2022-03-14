import { Router, Request, Response } from 'express';
import { success, error } from './response';

import { PostgresSqlRepository } from '../../Restaurants/framework/PostgreSqlRepository';

import { RestaurantCreator } from '../../Restaurants/application/Create/RestaurantCreator';
import { ListRestaurants } from '../../Restaurants/application/List/ListRestaurants';

import { DetailChanger } from '../../Restaurants/application/Modifier/DetailChanger';

const router: Router = Router();

const repository = new PostgresSqlRepository();

const useCaseRegister = new RestaurantCreator(repository);
const useCaseList = new ListRestaurants(repository);
const useCaseModify = new DetailChanger(repository);

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

router.get('/:restaurantName', async (req: Request, res: Response) => {
  let { restaurantName } = req.params;

  console.log(restaurantName);
  useCaseList
    .listOne(restaurantName)
    .then((array) => {
      success(array, 200, res);
    })
    .catch(({ message, details }) => {
      error(message, 404, details, res);
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

router.put('/:restaurantName', async (req: Request, res: Response) => {
  let { restaurantName } = req.params;

  useCaseModify
    .run(req.body, restaurantName)
    .then((message) => success(message, 200, res))
    .catch((reason) => error('Internal error', 404, reason, res));
});

export default router;
