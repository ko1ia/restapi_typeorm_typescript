import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import express, { json } from 'express'

import { DataBase } from './src/data-access'
import { ErrorMiddleware } from './src/middlewares/error'
import { authRouter } from './src/routes'

import type { Express } from 'express'

config()
const app: Express = express()
const port = process.env.PORT ?? 8080
DataBase.
  initialize().
  then(() => {
    console.log('Data Source has been initialized!')
  }).
  catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })
app.use(json())

app.use(cookieParser())
app.use('/api', authRouter)
app.use(ErrorMiddleware)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
