import useForm from '../lib/useForm'
import Form from './styles/Form'

export default function CreateProduct() {
  const { inputs, handleChange } = useForm({
    price: '',
  })

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        console.log(inputs)
      }}
    >
      <fieldset>
        <label htmlFor="image">
          Image
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="1000"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="Description..."
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  )
}
