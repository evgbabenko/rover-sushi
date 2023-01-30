import blockContent from './blockContent'
import product from './product'
/* import users from './users' */
import category from './category'
import {user, account} from 'next-auth-sanity/schemas'

export const schemaTypes = [
  // Document types
  product,
  category,
  user,
  account,
  // Other types
  blockContent,
]
