import { QueryResult } from 'pg';
import { pool } from '../../App/database';

import { Restaurant } from '../domain/Restaurant';
import { RestaurantRepository } from '../domain/RestaurantRepository';

export class PostgresSqlRepository implements RestaurantRepository {
  async save(restaurant: Restaurant): Promise<any> {
    const values: Array<string> = [
      restaurant.urlImage,
      restaurant.restaurantName,
      restaurant.location,
      restaurant.openingTime,
    ];

    //!code smell - else line 22
    const sql: string = `INSERT INTO Restaurant (url_image, name, location, opening_time) VALUES ($1, $2, $3, $4)`;

    if (!(await this.checkRestaurant(restaurant.restaurantName))) {
      return await pool.query(sql, values).catch((reason) => console.log(`[PostgreSqlRepository]: ${reason}`));
    }

    throw new Error('This restaurant already exists').message;
  }

  async checkRestaurant(restaurantName: string): Promise<boolean> {
    const values: Array<string> = [restaurantName];

    //Mejorar la consulta
    const sql: string = `SELECT * FROM restaurant WHERE name = $1`;

    const queryResult: QueryResult<any> = await pool.query(sql, values);
    let { rows } = queryResult;

    if (rows.length === 0) return false;

    return true;
  }
}
