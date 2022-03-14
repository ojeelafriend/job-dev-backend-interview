import { Restaurant } from '../../domain/Restaurant';
import { RestaurantRepository } from '../../domain/RestaurantRepository';

export class DetailChanger {
  private repository: RestaurantRepository;

  public constructor(repository: RestaurantRepository) {
    this.repository = repository;
  }

  public async run(params: Restaurant, identification: string): Promise<string> {
    console.log(params);

    let response = await this.repository.getOne(identification);

    if (response.length === 0) {
      throw new Error('Restaurant not exists').message;
    }

    if (params.urlImage === undefined) {
    }

    await this.repository.update(params, identification);
    return 'Restaurant update';
  }
}
