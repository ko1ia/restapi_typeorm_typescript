import express, { json } from 'express'

import { config } from 'dotenv'

import type { Express } from 'express'

import { authRouter } from './src/routes'

import { DataBase } from './src/data-access'

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

app .use(json())
app.use('/api', authRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
