import { Router, Request, Response } from 'express';
import { success, error } from './response';

import { PostgresSqlRepository } from '../../Restaurants/framework/PostgreSqlRepository';
import { ListRestaurants } from '../../Restaurants/application/ListAll/ListRestaurants';

//import { CreatorRestaurant } from '../../Restaurants/application/Create/RestaurantCreator';

const router: Router = Router();

const repository = new PostgresSqlRepository();

//!error encontrado el nombre de la clase, deberia ser RestaurantCreator. De momento funciona
//! por la forma en la que se escribió la clase, sin embargo está mal escrito y relacionado.
//const restaurant = new CreatorRestaurant(repository);
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

  console.log(location, openingTime, urlImage);
  /*
  restaurant
    .create({ restaurantName, location, openingTime, urlImage })
    .then(({ message }) => {
      success(message, 201, res);
    })
    .catch(({ message }) => error(message, 404, message, res));
    */
});

export default router;
