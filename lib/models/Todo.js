const pool = require('../utils/pool');

module.exports = class Todo {
  id;
  todo;
  location;
  description;
  completed;
  user_id;

  constructor(row) {
    this.id = row.id;
    this.todo = row.todo;
    this.location = row.location;
    this.description = row.description;
    this.completed = row.completed;
    this.user_id = row.user_id;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT * FROM todos
        `
    ); return rows.map((row) => new Todo(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT * FROM todos
        WHERE id = $1
        `, [id]
    ); return new Todo(rows[0]);
  }
  
  static async updateById(id, newAttrs) {
    const done = await Todo.getById(id);
    const updatedData = { ...done, ...newAttrs };
    if (!done) return 'false';
    const { rows } = await pool.query(
      `
        UPDATE todos
        SET todo = $2, location = $3, description = $4, completed = $5
        WHERE id = $1
        RETURNING *
        `, [
        id,
        updatedData.todo,
        updatedData.location,
        updatedData.description,
        updatedData.completed,
      ]
    ); return new Todo(rows[0]);
  }

  static async insert({ user_id, todo, location, description }) {
    const { rows } = await pool.query(
      `
        INSERT INTO todos (user_id, todo, location, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [user_id, todo, location, description]
    ); return new Todo(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE from todos
        WHERE id - $1
        RETURNING *
        `, [id]
    ); return new Todo(rows[0]);
  }
};
