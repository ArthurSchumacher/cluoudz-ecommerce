export type User = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  typeUser: number;
};

export type UserDto = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  typeUser: number;
};
