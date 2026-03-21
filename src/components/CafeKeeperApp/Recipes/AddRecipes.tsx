import { useForm } from '@tanstack/react-form'

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

const inputClass =
  'mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100'

const labelClass = 'block text-sm font-medium text-neutral-800 dark:text-neutral-200'

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
      const payload = normalizeAddRecipeForm(value)
      if (onSubmitRecipe) {
        await onSubmitRecipe(payload)
      } else {
        console.log('Add recipe (normalized)', payload)
      }
    },
  })

  return (
    <div className="max-w-2xl">
      <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Add recipe
      </h3>
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
      >
        <div className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-4 dark:border-neutral-700 dark:bg-neutral-900/40">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
            recipes
          </p>
          <div className="flex flex-col gap-4">
            <form.Field
              name="title"
              validators={{
                onBlur: ({ value }) =>
                  !value.trim() ? 'Title is required' : undefined,
              }}
            >
              {(field) => (
                <label className={labelClass}>
                  Title
                  <input
                    className={inputClass}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 ? (
                    <span className="mt-1 block text-sm text-red-600">
                      {String(field.state.meta.errors[0])}
                    </span>
                  ) : null}
                </label>
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <label className={labelClass}>
                  Description
                  <textarea
                    className={`${inputClass} min-h-[88px] resize-y`}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </label>
              )}
            </form.Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <form.Field name="servings">
                {(field) => (
                  <label className={labelClass}>
                    Servings
                    <input
                      className={inputClass}
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
                  <label className={labelClass}>
                    Prep (min)
                    <input
                      className={inputClass}
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
                  <label className={labelClass}>
                    Cook (min)
                    <input
                      className={inputClass}
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

        <div className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-4 dark:border-neutral-700 dark:bg-neutral-900/40">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
            ingredients → recipe_ingredients
          </p>
          <form.Field name="ingredients" mode="array">
            {(field) => (
              <div className="flex flex-col gap-3">
                {field.state.value.map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-3 rounded-md border border-neutral-200 bg-white p-3 dark:border-neutral-600 dark:bg-neutral-950"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Ingredient {i + 1}
                      </span>
                      <button
                        type="button"
                        className="text-sm text-red-600 hover:underline"
                        onClick={() => field.removeValue(i)}
                      >
                        Remove
                      </button>
                    </div>
                    <form.Field name={`ingredients[${i}].ingredientName`}>
                      {(sub) => (
                        <label className={labelClass}>
                          Name (ingredients.name)
                          <input
                            className={inputClass}
                            value={sub.state.value}
                            onBlur={sub.handleBlur}
                            onChange={(e) => sub.handleChange(e.target.value)}
                          />
                        </label>
                      )}
                    </form.Field>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <form.Field name={`ingredients[${i}].quantity`}>
                        {(sub) => (
                          <label className={labelClass}>
                            Quantity
                            <input
                              className={inputClass}
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
                          <label className={labelClass}>
                            Unit
                            <input
                              className={inputClass}
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
                          <label className={labelClass}>
                            Note
                            <input
                              className={inputClass}
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
                  className="self-start rounded-md bg-neutral-200 px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600"
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

        <div className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-4 dark:border-neutral-700 dark:bg-neutral-900/40">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
            steps
          </p>
          <form.Field name="steps" mode="array">
            {(field) => (
              <div className="flex flex-col gap-3">
                {field.state.value.map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 rounded-md border border-neutral-200 bg-white p-3 dark:border-neutral-600 dark:bg-neutral-950"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Step {i + 1}
                      </span>
                      <button
                        type="button"
                        className="text-sm text-red-600 hover:underline"
                        onClick={() => field.removeValue(i)}
                      >
                        Remove
                      </button>
                    </div>
                    <form.Field name={`steps[${i}].instruction`}>
                      {(sub) => (
                        <label className={labelClass}>
                          Instruction
                          <textarea
                            className={`${inputClass} min-h-[72px] resize-y`}
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
                  className="self-start rounded-md bg-neutral-200 px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600"
                  onClick={() => field.pushValue({ instruction: '' })}
                >
                  Add step
                </button>
              </div>
            )}
          </form.Field>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-4 dark:border-neutral-700 dark:bg-neutral-900/40">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
            tags → recipe_tags
          </p>
          <form.Field name="tags" mode="array">
            {(field) => (
              <div className="flex flex-col gap-3">
                {field.state.value.map((_, i) => (
                  <div
                    key={i}
                    className="flex w-full min-w-0 items-end gap-2"
                  >
                    <form.Field name={`tags[${i}].name`}>
                      {(sub) => (
                        <label className={`${labelClass} w-full min-w-0`}>
                          Tag
                          <input
                            className={inputClass}
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
                      className="mb-0.5 shrink-0 rounded-md border border-neutral-300 px-3 py-2 text-sm text-red-600 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800"
                      onClick={() => field.removeValue(i)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="self-start rounded-md bg-neutral-200 px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600"
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
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Saving…' : 'Save recipe'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}
