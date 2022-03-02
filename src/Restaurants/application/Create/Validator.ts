import { Restaurant } from '../../domain/Restaurant';

export type ValidatorState = {
  message: string;
  state: boolean;
};

export abstract class Validator {
  protected async validateParams(params: Restaurant): Promise<ValidatorState> {
    const { restaurantName, location, openingTime, urlImage } = params;

    if (!restaurantName || !location || !openingTime || !urlImage) {
      return { message: 'All fields are required', state: false };
    }

    if (!this.isValid(urlImage)) {
      return { message: 'Invalid url address', state: false };
    }

    return { message: 'Valid parameters', state: true };
  }

  private isValid(urlImage: string): boolean {
    let urlRegExp: RegExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    return urlRegExp.test(urlImage);
  }
}
