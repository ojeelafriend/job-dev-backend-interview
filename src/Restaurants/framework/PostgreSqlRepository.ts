import { QueryResult } from 'pg';
import { pool } from '../../App/database';

import { Restaurant } from '../domain/Restaurant';
import { RestaurantRepository } from '../domain/RestaurantRepository';

export class PostgresSqlRepository implements RestaurantRepository {
  public async save(restaurant: Restaurant): Promise<any> {
    const values: Array<string> = [
      restaurant.urlImage,
      restaurant.restaurantName,
      restaurant.location,
      restaurant.openingTime,
    ];

    const sql: string = `INSERT INTO Restaurant (url_image, name, location, opening_time) VALUES ($1, $2, $3, $4)`;

    if (!(await this.checkRestaurant(restaurant.restaurantName))) {
      return await pool.query(sql, values).catch((reason) => console.log(`[PostgreSqlRepository]: ${reason}`));
    }

    throw new Error('This restaurant already exists').message;
  }

  public async checkRestaurant(restaurantName: string): Promise<boolean> {
    const values: Array<string> = [restaurantName];
    const sql: string = `SELECT * FROM restaurant WHERE name = $1`;

    const queryResult: QueryResult<any> = await pool.query(sql, values);
    let { rows } = queryResult;

    if (rows.length === 0) return false;

    return true;
  }

  public async getAll(): Promise<Restaurant[]> {
    const sql: string = `SELECT * FROM restaurant`;
    const queryResult: QueryResult<any> = await pool.query(sql);

    const { rows } = queryResult;
    console.log(rows);

    return rows;
  }

  public async getOne(restaurantName: string): Promise<Restaurant[]> {
    const values: Array<string> = [restaurantName];
    const sql: string = `SELECT * FROM restaurant WHERE name = $1`;

    const queryResult: QueryResult<any> = await pool.query(sql, values);
    let { rows } = queryResult;

    return rows;
  }
}
