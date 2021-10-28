import express, { Express, Request, Response } from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import cors from 'cors'
import { errorHandler } from './middleware/errorHandler'
import db from './database/db'
db.openConnection()

// import db from './database/db'
// const solarDB = new db()
// solarDB.doQuery(sql)

dotenv.config()

const app: Express = express()

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3006']

const options: cors.CorsOptions = { origin: allowedOrigins }

app.use(cors(options))
app.use(helmet())
app.use(express.json())

import users_router from './router/users_router'
import organization_router from './router/organization_router'
import customer_router from './router/customer_router'
import customer_organization_router from './router/customer_organization_router'

app.use('/api/v1/users/', users_router)
app.use('/api/v1/organization/', organization_router)
app.use('/api/v1/customer/', customer_router)
app.use('/api/v1/customer_organization/', customer_organization_router)

app.use(errorHandler)

const PORT = process.env.PORT || 5555
app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`))
