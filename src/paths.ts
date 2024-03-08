export const paths = {
  home() {
    return "/";
  },
  about() {
    return "/sobre";
  },
  contact() {
    return "/contato";
  },
  polices() {
    return "/politica";
  },
  faq() {
    return "/faq";
  },
  cart() {
    return "/carrinho";
  },
  profile() {
    return `/perfil`;
  },
  signIn() {
    return "/login";
  },
  signUp() {
    return "/cadastro";
  },
  product(id: string) {
    return `/produto/${id}`;
  },
  whatsApp() {
    return "";
  },
  search(categoryId?: string, productName?: string) {
    return `/procurar?${categoryId ? `categoria=${categoryId}` : ""}${
      productName ? `&produto=${productName}` : ""
    }`;
  },
  addresses() {
    return `/perfil/enderecos`;
  },
  createAddress() {
    return `/perfil/enderecos/novo`;
  },
  updateAddress(addressId: string) {
    return `/perfil/enderecos/${addressId}/editar`;
  },
};
