import { KeystoneContext } from '@keystone-next/types'
import { CartItemCreateInput } from '../.keystone/schema-types'
import { Session } from '../types'

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  const { itemId } = context.session as Session
  if (!itemId) {
    console.log('Must be logged in to do this!')
  }

  const [cartItem] = await context.lists.CartItem.findMany({
    where: {
      user: {
        id: itemId,
      },
      product: {
        id: productId,
      },
    },
    resolveFields: `
      id,
      quantity
    `,
  })

  if (cartItem) {
    console.log(`There are already ${cartItem.quantity}, increment by 1`)

    return await context.lists.CartItem.updateOne({
      id: cartItem.id,
      data: { quantity: cartItem.quantity + 1 },
    })
  }

  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: itemId } },
    },
  })
}
