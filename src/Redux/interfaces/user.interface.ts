export interface User {
  _id: string | ""
  role: string | ""
  login: string | ""
  firstName: string | ""
  lastName: string | ""
  email: string | ""
  phone: string | ""
  avatar: string | ""
  subscriptions: string | ""
  countPage?: number
  countUsers?: number
}
