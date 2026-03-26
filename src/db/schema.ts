import { integer, numeric, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const recipes = pgTable('recipes', {
  id:          serial('id').primaryKey(),
  title:       text('title').notNull(),
  description: text('description'),
  servings:    integer('servings'),
  prep_time:   integer('prep_time'),
  cook_time:   integer('cook_time'),
  created_at:  timestamp('created_at').defaultNow().notNull(),
  updated_at:  timestamp('updated_at').defaultNow().notNull(),
})

export const ingredients = pgTable('ingredients', {
  id:   serial('id').primaryKey(),
  name: text('name').notNull().unique(),
})

export const recipe_ingredients = pgTable('recipe_ingredients', {
  id:            serial('id').primaryKey(),
  recipe_id:     integer('recipe_id').notNull().references(() => recipes.id),
  ingredient_id: integer('ingredient_id').notNull().references(() => ingredients.id),
  quantity:      numeric('quantity'),
  unit:          text('unit'),
  note:          text('note'),
})

export const steps = pgTable('steps', {
  id:          serial('id').primaryKey(),
  recipe_id:   integer('recipe_id').notNull().references(() => recipes.id),
  step_number: integer('step_number').notNull(),
  instruction: text('instruction').notNull(),
})

export const tags = pgTable('tags', {
  id:   serial('id').primaryKey(),
  name: text('name').notNull().unique(),
})

export const recipe_tags = pgTable('recipe_tags', {
  recipe_id: integer('recipe_id').notNull().references(() => recipes.id),
  tag_id:    integer('tag_id').notNull().references(() => tags.id),
})