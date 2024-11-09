export interface IRegisterProps {

  name: string
  username: string;
  email: string
  password: string
  passwordConfirm: string
  phone: string
  age: number;
  address: string
  offerServices: boolean
}


export interface IRegisterErrors {
  name?: string
  username?: string
  email?: string
  password?: string
  passwordConfirm?: string
  phone?: string
  age?: number
  address?: string
  offerServices?: boolean

}





