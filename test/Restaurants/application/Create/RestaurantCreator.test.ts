import { RestaurantCreator } from '../../../../src/Restaurants/application/Create/RestaurantCreator';
import { Restaurant } from '../../../../src/Restaurants/domain/Restaurant';
import { PostgresSqlRepository } from '../../../../src/Restaurants/framework/PostgreSqlRepository';
import { run, stop } from '../../../../src/App/database';

describe('Create restaurant', () => {
  const repository = new PostgresSqlRepository();
  const useCaseRestaurant = new RestaurantCreator(repository);

  const existParams: Restaurant = {
    urlImage: 'www.vagofacil.com.ar/domado',
    restaurantName: 'Chelo',
    location: 'Guaymallen',
    openingTime: 'De 11 a 12',
  };

  test('return state false, incorrect data', () => {
    const { urlImage, restaurantName } = existParams;

    useCaseRestaurant
      .create({ urlImage, restaurantName, location: '', openingTime: '' })
      .catch(({ state }) => expect(state).toBe(false));
  });

  test('return state false and message error, already exists', () => {
    useCaseRestaurant.create(existParams).catch(({ state, message }) => {
      expect(state).toBe(false);
      expect(message).toBe('This restaurant already exists');
    });
  });

  afterAll(() => {
    stop();
  });
});
