import { useEffect, useState } from 'react'

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial)
  const initialValues = Object.values(initial).join('')

  // preload form once inital values are loaded
  useEffect(() => {
    setInputs(initial)
    // need to disable exhaustive dependencies linting here
    // in order to avoid object dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues])

  function handleChange(e) {
    const { name, type } = e.target
    let { value } = e.target
    if (type === 'number' && value !== '') {
      value = parseInt(value)
    }
    if (type === 'file') {
      const [first] = e.target.files
      value = first
    }
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  function resetForm() {
    setInputs(initial)
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.keys(inputs).map((key) => [key, ''])
    )

    setInputs(blankState)
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  }
}
