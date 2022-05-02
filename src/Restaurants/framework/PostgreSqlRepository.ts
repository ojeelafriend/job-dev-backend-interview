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

    let { rows } = await pool.query(sql, values);

    if (rows.length === 0) return false;

    return true;
  }

  public async getAll(): Promise<Restaurant[]> {
    const sql: string = `SELECT * FROM restaurant`;
    let { rows } = await pool.query(sql);

    return rows;
  }

  public async getOne(restaurantName: string): Promise<Restaurant[]> {
    const values: Array<string> = [restaurantName];
    const sql: string = `SELECT * FROM restaurant WHERE name = $1`;

    let { rows } = await pool.query(sql, values);

    return rows;
  }

  public async update(restaurantUpdate: Restaurant, identification: string): Promise<any> {
    let setValues: string[] = [];

    let { urlImage, restaurantName, location, openingTime } = restaurantUpdate;

    if (!(await this.checkRestaurant(identification))) return new Error('Restaurant not exists').message;

    const sql: string = `UPDATE restaurant SET url_image=$1, name=$2, location=$3, opening_time=$4 WHERE name = $5;`;
    console.log(sql);

    await pool.query(sql, [urlImage, restaurantName, location, openingTime, identification]).then(() => {
      console.log('Restaurant updated');
    });
  }

  public async delete(identification: string): Promise<any> {
    const sql: string = `DELETE FROM restaurant WHERE name=$1;`;
    await pool.query(sql, [identification]).then(() => console.log('Restaurant delete'));
  }
}
