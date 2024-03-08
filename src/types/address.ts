export type Address = {
  id: string;
  cep: number;
  street: string;
  number: number;
  district: string;
  complement: string;
  city: string;
  uf: string;
};

export type AddressDto = {
  cep: number;
  street: string;
  number: number;
  district: string;
  complement?: string;
  city: string;
  uf: string;
};
