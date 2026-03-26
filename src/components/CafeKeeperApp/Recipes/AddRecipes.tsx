import { useForm } from '@tanstack/react-form'
import "../../../theme/layout.css"
/**
 * Form shape aligned with Postgres tables:
 * - recipes (title, description, servings, prep_time, cook_time)
 * - ingredients + recipe_ingredients (ingredient name + quantity, unit, note per row)
 * - steps (instruction; step_number is derived from order on submit)
 * - tags + recipe_tags (tag name per row)
 */
export type RecipeIngredientRow = {
  ingredientName: string
  quantity: string
  unit: string
  note: string
}

export type RecipeStepRow = {
  instruction: string
}

export type RecipeTagRow = {
  name: string
}

export type AddRecipeFormValues = {
  title: string
  description: string
  servings: string
  prep_time: string
  cook_time: string
  ingredients: Array<RecipeIngredientRow>
  steps: Array<RecipeStepRow>
  tags: Array<RecipeTagRow>
}

/** Payload you can POST to an API / map to Drizzle inserts */
export type NormalizedRecipePayload = {
  recipe: {
    title: string
    description: string | null
    servings: number | null
    prep_time: number | null
    cook_time: number | null
  }
  ingredients: Array<{
    name: string
    quantity: number | null
    unit: string | null
    note: string | null
  }>
  steps: Array<{ step_number: number; instruction: string }>
  tagNames: Array<string>
}

function parseOptionalPositiveInt(raw: string): number | null {
  const t = raw.trim()
  if (!t) return null
  const n = Number(t)
  if (!Number.isFinite(n) || n <= 0 || !Number.isInteger(n)) return null
  return n
}

function parseOptionalNonNegativeInt(raw: string): number | null {
  const t = raw.trim()
  if (!t) return null
  const n = Number(t)
  if (!Number.isFinite(n) || n < 0 || !Number.isInteger(n)) return null
  return n
}

function parseOptionalPositiveNumber(raw: string): number | null {
  const t = raw.trim()
  if (!t) return null
  const n = Number(t)
  if (!Number.isFinite(n) || n <= 0) return null
  return n
}

export function normalizeAddRecipeForm(
  value: AddRecipeFormValues,
): NormalizedRecipePayload {
  const ingredients = value.ingredients
    .filter((row) => row.ingredientName.trim().length > 0)
    .map((row) => ({
      name: row.ingredientName.trim(),
      quantity: parseOptionalPositiveNumber(row.quantity),
      unit: row.unit.trim() || null,
      note: row.note.trim() || null,
    }))

  const steps = value.steps
    .map((row, i) => ({
      step_number: i + 1,
      instruction: row.instruction.trim(),
    }))
    .filter((row) => row.instruction.length > 0)

  const tagNames = value.tags
    .map((t) => t.name.trim())
    .filter((n) => n.length > 0)

  return {
    recipe: {
      title: value.title.trim(),
      description: value.description.trim() || null,
      servings: parseOptionalPositiveInt(value.servings),
      prep_time: parseOptionalNonNegativeInt(value.prep_time),
      cook_time: parseOptionalNonNegativeInt(value.cook_time),
    },
    ingredients,
    steps,
    tagNames,
  }
}


type AddRecipesProps = {
  /** Called after client-side normalization; wire to API when ready */
  onSubmitRecipe?: (payload: NormalizedRecipePayload) => void | Promise<void>
}

const defaultFormValues: AddRecipeFormValues = {
  title: '',
  description: '',
  servings: '',
  prep_time: '',
  cook_time: '',
  ingredients: [],
  steps: [],
  tags: [],
}

export default function AddRecipes({ onSubmitRecipe }: AddRecipesProps) {
  const form = useForm({
    defaultValues: defaultFormValues,
    onSubmit: async ({ value }) => {
      console.log('Save recipe clicked', value)
      const payload = normalizeAddRecipeForm(value)
      if (onSubmitRecipe) {
        await onSubmitRecipe(payload)
      } else {
        console.log('Add recipe (normalized)', payload)
      }
    },
  })

  return (
    <div className="form-container">
      <h3 className="">
        Add recipe
      </h3>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
      >
        <div className="">
          <div className="">
            <form.Field
              name="title"
              validators={{
                onBlur: ({ value }) =>
                  !value.trim() ? 'Title is required' : undefined,
              }}
            >
              {(field) => (
                <label className="">
                  Title
                  <input
                    className=""
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 ? (
                    <span className="">
                      {String(field.state.meta.errors[0])}
                    </span>
                  ) : null}
                </label>
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <label className="">
                  Description
                  <textarea
                    className=""
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </label>
              )}
            </form.Field>

            <div className="">
              <form.Field name="servings">
                {(field) => (
                  <label className="">
                    Servings
                    <input
                      className=""
                      inputMode="numeric"
                      name={field.name}
                      placeholder="e.g. 4"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </label>
                )}
              </form.Field>
              <form.Field name="prep_time">
                {(field) => (
                  <label className="">
                    Prep (min)
                    <input
                      className=""
                      inputMode="numeric"
                      name={field.name}
                      placeholder="minutes"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </label>
                )}
              </form.Field>
              <form.Field name="cook_time">
                {(field) => (
                  <label className="">
                    Cook (min)
                    <input
                      className=""
                      inputMode="numeric"
                      name={field.name}
                      placeholder="minutes"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </label>
                )}
              </form.Field>
            </div>
          </div>
        </div>

        <div className="">
          <p className="">
            ingredients → recipe_ingredients
          </p>
          <form.Field name="ingredients" mode="array">
            {(field) => (
              <div className="">
                {field.state.value.map((_, i) => (
                  <div
                    key={i}
                    className=""
                  >
                    <div className="">
                      <span className="">
                        Ingredient {i + 1}
                      </span>
                      <button
                        type="button"
                        className=""
                        onClick={() => field.removeValue(i)}
                      >
                        Remove
                      </button>
                    </div>
                    <form.Field name={`ingredients[${i}].ingredientName`}>
                      {(sub) => (
                        <label className="">
                          Name (ingredients.name)
                          <input
                            className=""
                            value={sub.state.value}
                            onBlur={sub.handleBlur}
                            onChange={(e) => sub.handleChange(e.target.value)}
                          />
                        </label>
                      )}
                    </form.Field>
                    <div className="">
                      <form.Field name={`ingredients[${i}].quantity`}>
                        {(sub) => (
                          <label className="">
                            Quantity
                            <input
                              className=""
                              inputMode="decimal"
                              value={sub.state.value}
                              onBlur={sub.handleBlur}
                              onChange={(e) =>
                                sub.handleChange(e.target.value)
                              }
                            />
                          </label>
                        )}
                      </form.Field>
                      <form.Field name={`ingredients[${i}].unit`}>
                        {(sub) => (
                          <label className="">
                            Unit
                            <input
                              className=""
                              placeholder="g, ml, tbsp…"
                              value={sub.state.value}
                              onBlur={sub.handleBlur}
                              onChange={(e) =>
                                sub.handleChange(e.target.value)
                              }
                            />
                          </label>
                        )}
                      </form.Field>
                      <form.Field name={`ingredients[${i}].note`}>
                        {(sub) => (
                          <label className="">
                            Note
                            <input
                              className=""
                              placeholder="chopped, room temp…"
                              value={sub.state.value}
                              onBlur={sub.handleBlur}
                              onChange={(e) =>
                                sub.handleChange(e.target.value)
                              }
                            />
                          </label>
                        )}
                      </form.Field>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className=""
                  onClick={() =>
                    field.pushValue({
                      ingredientName: '',
                      quantity: '',
                      unit: '',
                      note: '',
                    })
                  }
                >
                  Add ingredient
                </button>
              </div>
            )}
          </form.Field>
        </div>

        <div className="">
          <p className="">
            steps
          </p>
          <form.Field name="steps" mode="array">
            {(field) => (
              <div className="">
                {field.state.value.map((_, i) => (
                  <div
                    key={i}
                    className=""
                  >
                    <div className="">
                      <span className="">
                        Step {i + 1}
                      </span>
                      <button
                        type="button"
                        className=""
                        onClick={() => field.removeValue(i)}
                      >
                        Remove
                      </button>
                    </div>
                    <form.Field name={`steps[${i}].instruction`}>
                      {(sub) => (
                        <label className="">
                          Instruction
                          <textarea
                            className=""
                            value={sub.state.value}
                            onBlur={sub.handleBlur}
                            onChange={(e) =>
                              sub.handleChange(e.target.value)
                            }
                          />
                        </label>
                      )}
                    </form.Field>
                  </div>
                ))}
                <button
                  type="button"
                  className=""
                  onClick={() => field.pushValue({ instruction: '' })}
                >
                  Add step
                </button>
              </div>
            )}
          </form.Field>
        </div>

        <div className="">
          <p className="">
            tags → recipe_tags
          </p>
          <form.Field name="tags" mode="array">
            {(field) => (
              <div className="">
                {field.state.value.map((_, i) => (
                  <div
                    key={i}
                    className=""
                  >
                    <form.Field name={`tags[${i}].name`}>
                      {(sub) => (
                        <label className="">
                          Tag
                          <input
                            className=""
                            placeholder="e.g. vegan, seasonal"
                            value={sub.state.value}
                            onBlur={sub.handleBlur}
                            onChange={(e) =>
                              sub.handleChange(e.target.value)
                            }
                          />
                        </label>
                      )}
                    </form.Field>
                    <button
                      type="button"
                      className=""
                      onClick={() => field.removeValue(i)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className=""
                  onClick={() => field.pushValue({ name: '' })}
                >
                  Add tag
                </button>
              </div>
            )}
          </form.Field>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className=""
            >
              {isSubmitting ? 'Saving…' : 'Save recipe'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}
