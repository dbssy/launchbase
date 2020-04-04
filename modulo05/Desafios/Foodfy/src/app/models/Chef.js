const db = require('../../config/db');

module.exports = {
  all(callback) {
    db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      GROUP BY chefs.id`, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      callback(results.rows);
    });
  },

  create(data, callback) {
    const query = `
      INSERT INTO chefs (
        name,
        avatar_url
      ) VALUES ($1, $2)
      RETURNING id
    `;

    const values = [
      data.name,
      data.avatar_url
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      callback(results.rows[0]);
    });
  },

  find(id, callback) {
    db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = $1
      GROUP BY chefs.id`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;
      callback(results.rows[0]);
    });
  },

  findChefRecipes(id, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE chefs.id = $1`, [id], (err, results) => {
      if(err) throw `Database error! + ${err}`
      callback(results.rows)
    });
  },

  update(data, callback) {
    const query = `
      UPDATE chefs SET
        name=($1),
        avatar_url=($2)
      WHERE id = $3
    `;

    const values = [
      data.name,
      data.avatar_url,
      data.id
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      callback();
    });
  },

  delete(id, callback) {
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;
      callback();
    });
  }
}