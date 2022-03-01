import { integer, relationship } from '@keystone-next/fields'
import { list } from '@keystone-next/keystone/schema'

export const CartItem = list({
  // TODO: Add custom label
  ui: {
    listView: {
      initialColumns: ['user', 'product', 'quantity'],
    },
  },
  fields: {
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    product: relationship({ ref: 'Product' }),
    user: relationship({ ref: 'User.cart' }),
  },
})
