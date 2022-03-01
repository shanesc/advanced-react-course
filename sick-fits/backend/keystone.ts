import { createAuth } from '@keystone-next/auth'
import { config, createSchema } from '@keystone-next/keystone/schema'
import {
  statelessSessions,
  // eslint-disable-next-line prettier/prettier
  withItemData
} from '@keystone-next/keystone/session'
import 'dotenv/config'
import { sendPasswordResetEmail } from './lib/mail'
import { CartItem } from './schemas/CartItem'
import { Product } from './schemas/Product'
import { ProductImage } from './schemas/ProductImage'
import { User } from './schemas/User'
import { insertSeedData } from './seed-data'

const databaseURL = process.env.DATABASE_URL

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long will a user stay signed in?
  secret: process.env.COOKIE_SECRET,
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  passwordResetLink: {
    sendToken: async (args) => {
      await sendPasswordResetEmail(args.token, args.identity)
    },
  },
})

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone)
        }
      },
    },
    lists: createSchema({
      // schema items go here
      User,
      Product,
      ProductImage,
      CartItem,
    }),
    ui: {
      // TODO change this for roles
      isAccessAllowed: ({ session }) => {
        return !!session?.data
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id name email',
    }),
  })
)
