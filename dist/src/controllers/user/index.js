"use strict";
// import type {
//   IUserRequest,
//   RequestBody
// } from '../interfaces'
// import type { Request, Response } from 'express'
//
// import { POOL } from '../../../db'
//
// Class UserController {
//
//   public async createUser (req: RequestBody<IUserRequest>, res: Response): Promise<void> {
//     const { login, password } = req.body
//
//     const newUser = await POOL.query(
//       'INSERT INTO person (login, password) values ($1, $2) RETURNING *',
//       [login, password]
//     )
//
//     res.json(newUser.rows[0])
//   }
//
//   public async getUsers (req: Request, res: Response): Promise<void> {
//     const users = await POOL.query('SELECT * FROM person ORDER BY id')
//
//     res.json(users.rows)
//   }
//
//   public async getOneUser (req: Request, res: Response): Promise<void> {
//     const id = req.params.id
//
//     const user = await POOL.query('SELECT * FROM person WHERE id = $1', [id])
//
//     res.json(user.rows[0])
//   }
//
//   public async updateUser (req: RequestBody<IUserRequest>, res: Response): Promise<void> {
//     const { id, login, password } = req.body
//
//     const user = await POOL.query(
//       'UPDATE person set login = $1, password = $2 where id = $3 RETURNING *',
//       [login, password, id]
//     )
//
//     res.json(user.rows[0])
//   }
//
//   public async deleteUser (req: Request, res: Response): Promise<void> {
//     const id = req.params.id
//
//     const user = await POOL.query('DELETE FROM person WHERE id = $1', [id])
//
//     res.json(user.rows[0])
//   }
//
// }
//
// export { UserController }
