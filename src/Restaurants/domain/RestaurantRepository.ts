import { Restaurant } from './Restaurant';

export interface RestaurantRepository {
  save(restaurant: Restaurant): Promise<any>;
  checkRestaurant(restaurantName: string): Promise<boolean>;
  getAll(): Promise<Restaurant[]>;
}
