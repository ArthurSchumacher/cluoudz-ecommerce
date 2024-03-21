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
  favorites() {
    return "/favoritos";
  },
  product(id: string) {
    return `/produto/${id}`;
  },
  checkout() {
    return `/comprar`;
  },
  whatsApp() {
    return "";
  },
  search(categoryId?: string, productName?: string) {
    return `/procurar?${categoryId ? `category=${categoryId}` : ""}${
      productName ? `&product=${productName}` : ""
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
  orders() {
    return `/perfil/pedidos`;
  },
};
