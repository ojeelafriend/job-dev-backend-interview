import { Restaurant } from '../../domain/Restaurant';
import { RestaurantRepository } from '../../domain/RestaurantRepository';
import { Validator, ValidatorState } from './Validator';

export class RestaurantCreator extends Validator {
  private repository: RestaurantRepository;

  public constructor(repository: RestaurantRepository) {
    super();
    this.repository = repository;
  }

  public create(params: Restaurant): Promise<ValidatorState> {
    let validatorState: ValidatorState;

    return new Promise(async (resolve, reject) => {
      validatorState = await this.validateParams(params);

      if (!validatorState.state) reject(validatorState);

      this.repository
        .save(params)
        .then(() => resolve({ message: 'Restaurant created', state: true }))
        .catch((error) => reject({ message: error, state: false }));
    });
  }
}
