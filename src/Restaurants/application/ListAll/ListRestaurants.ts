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
}
