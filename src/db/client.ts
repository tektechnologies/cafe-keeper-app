import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL
console.log(connectionString, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

const url = new URL(connectionString)
console.log(`🗄️  Database connected on port ${url.port} — ${url.hostname}/${url.pathname.slice(1)}`)

const client = postgres(connectionString)
export const db = drizzle(client)