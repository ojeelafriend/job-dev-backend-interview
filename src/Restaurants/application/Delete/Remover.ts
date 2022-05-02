import { RestaurantRepository } from '../../domain/RestaurantRepository';

export class Remover {
  private repository: RestaurantRepository;

  public constructor(repository: RestaurantRepository) {
    this.repository = repository;
  }

  public async run(identification: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let value = await this.repository.checkRestaurant(identification);

      if (!value) return reject({ message: 'Restaurant not exist', details: 'Restaurant not exist' });

      await this.repository.delete(identification).catch((reason) => {
        reject({ message: 'Internal error', details: `Internal error ${reason}` });
      });

      resolve({ message: 'Restaurant eliminated' });
    });
  }
}
