import { useEffect, useRef, useState } from "react"
import type { FormStore } from "./type"

export function useForm() {
  const store = useRef<FormStore>({ fields: {} })

  const register = (name: string, validate?: (v: any) => string) => {
    if (!store.current.fields[name]) {
      store.current.fields[name] = {
        value: "",
        error: "",
        validate,
        subscribers: new Set()
      }
    }

    return {
      name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const field = store.current.fields[name]
        field.value = e.target.value

        if (field.validate) {
          field.error = field.validate(field.value)
        }

        field.subscribers.forEach(fn => fn())
      }
    }
  }

  const useField = (name: string) => {
    const [, forceRender] = useState({})

    useEffect(() => {
        const field = store.current.fields[name]
        const rerender = () => forceRender({})
        field.subscribers.add(rerender)

        return () => {
            field.subscribers.delete(rerender)
        }
    }, [name])

    return store.current.fields[name] || {}
  }

  return { register, useField }
}