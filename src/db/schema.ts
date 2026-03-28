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




// Core tables
// recipes
// CREATE TABLE recipes (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   title TEXT NOT NULL,
//   description TEXT,
//   servings INT,
//   prep_time INT, -- minutes
//   cook_time INT,
//   created_at TIMESTAMP DEFAULT NOW(),
//   updated_at TIMESTAMP DEFAULT NOW()
// );
// ingredients

// Reusable ingredient list (so you don’t duplicate “salt” 1000 times)

// CREATE TABLE ingredients (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   name TEXT NOT NULL UNIQUE
// );
// recipe_ingredients (join table)

// This is where the real magic happens.

// CREATE TABLE recipe_ingredients (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
//   ingredient_id UUID REFERENCES ingredients(id),
//   quantity NUMERIC,
//   unit TEXT,
//   note TEXT -- e.g. "chopped", "room temp"
// );
// steps
// CREATE TABLE steps (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
//   step_number INT NOT NULL,
//   instruction TEXT NOT NULL
// );
// Optional (but very useful)
// tags
// CREATE TABLE tags (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   name TEXT UNIQUE
// );

// CREATE TABLE recipe_tags (
//   recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
//   tag_id UUID REFERENCES tags(id),
//   PRIMARY KEY (recipe_id, tag_id)
// );
// images
// CREATE TABLE recipe_images (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
//   url TEXT NOT NULL
// );