import {
  integer,
  numeric,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const recipes = pgTable('recipes', {
  id:          uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  title:       text('title').notNull(),
  description: text('description'),
  servings:    integer('servings'),
  prep_time:   integer('prep_time'),
  cook_time:   integer('cook_time'),
  created_at:  timestamp('created_at').defaultNow(),
  updated_at:  timestamp('updated_at').defaultNow(),
})

export const ingredients = pgTable('ingredients', {
  id:   uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: text('name').notNull().unique(),
})

export const recipe_ingredients = pgTable('recipe_ingredients', {
  id:            uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  recipe_id:     uuid('recipe_id').notNull().references(() => recipes.id, { onDelete: 'cascade' }),
  ingredient_id: uuid('ingredient_id').notNull().references(() => ingredients.id),
  quantity:      numeric('quantity'),
  unit:          text('unit'),
  note:          text('note'),
})

export const steps = pgTable('steps', {
  id:          uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  recipe_id:   uuid('recipe_id').notNull().references(() => recipes.id, { onDelete: 'cascade' }),
  step_number: integer('step_number').notNull(),
  instruction: text('instruction').notNull(),
})

export const tags = pgTable('tags', {
  id:   uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: text('name').notNull().unique(),
})

export const recipe_tags = pgTable('recipe_tags', {
  recipe_id: uuid('recipe_id').notNull().references(() => recipes.id, { onDelete: 'cascade' }),
  tag_id:    uuid('tag_id').notNull().references(() => tags.id),
}, (t) => [
  primaryKey({ columns: [t.recipe_id, t.tag_id] }),
])

export const recipe_images = pgTable('recipe_images', {
  id:        uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  recipe_id: uuid('recipe_id').notNull().references(() => recipes.id, { onDelete: 'cascade' }),
  url:       text('url').notNull(),
})
