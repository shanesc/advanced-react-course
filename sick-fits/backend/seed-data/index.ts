import { KeystoneContext } from '@keystone-next/types'
import { products } from './data'

export async function insertSeedData(ks: KeystoneContext): Promise<null> {
  // Keystone API changed, so we need to check for both versions to get keystone
  const keystone = ks.keystone
  const adapter = keystone.adapter

  console.log(`🌱 Inserting Seed Data: ${products.length} Products`)
  const { mongoose } = adapter
  for (const product of products) {
    console.log(`  🛍️ Adding Product: ${product.name}`)
    const { _id } = await mongoose
      .model('ProductImage')
      .create({ image: product.photo, altText: product.name })
    product.photo = _id
    await mongoose.model('Product').create(product)
  }
  console.log(`✅ Seed Data Inserted: ${products.length} Products`)
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  )
  process.exit()
}
