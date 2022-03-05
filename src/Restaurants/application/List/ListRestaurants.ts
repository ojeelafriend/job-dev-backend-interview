import { Restaurant } from '../../domain/Restaurant';
import { RestaurantRepository } from '../../domain/RestaurantRepository';

export class ListRestaurants {
  private repository: RestaurantRepository;

  public constructor(repository: RestaurantRepository) {
    this.repository = repository;
  }

  public async listAll(): Promise<Restaurant[]> {
    return await this.repository.getAll();
  }

  public async listOne(restaurantName: string): Promise<Restaurant[]> {
    return new Promise(async (resolve, reject) => {
      const restaurant = await this.repository
        .getOne(restaurantName)
        .catch((reason) => reject({ message: `Internal error`, details: `[Internal error]: ${reason}` }));

      if (!restaurant) return reject({ message: `Restaurant not exists`, details: 'Restaurant not exists' });

      resolve(restaurant);
    });
  }
}
