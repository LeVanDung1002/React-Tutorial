export type Field = {
  value: any
  error: string
  validate?: (v: any) => string
  subscribers: Set<() => void>
}

export type FormStore = {
  fields: Record<string, Field>
}