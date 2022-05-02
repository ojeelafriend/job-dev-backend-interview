import { Restaurant } from './Restaurant';

export interface RestaurantRepository {
  save(restaurant: Restaurant): Promise<any>;
  checkRestaurant(restaurantName: string): Promise<boolean>;

  getAll(): Promise<Restaurant[]>;
  getOne(restaurantName: string): Promise<Restaurant[]>;

  update(restaurant: Restaurant, identification: string): Promise<any>;

  delete(identification: string): Promise<any>;
}
