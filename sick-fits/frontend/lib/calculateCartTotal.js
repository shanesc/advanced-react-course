export function calculateCartTotal(cart) {
  return cart.reduce((total, item) => {
    if (!item.product) return total

    return total + item.product.price * item.quantity
  }, 0)
}
