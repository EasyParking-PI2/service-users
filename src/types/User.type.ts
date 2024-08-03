interface User {
  id ?: string,
  login: string,
  password?: string,
  name: string,
  email: string,
  cpf: string,
  phone: string,
  profile: Profile
}

enum Profile{
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export { User, Profile }