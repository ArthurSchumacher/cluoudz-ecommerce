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
    return `/enderecos`;
  },
  createAddress() {
    return `/enderecos/novo`;
  },
  updateAddress(addressId: string) {
    return `/enderecos/${addressId}/editar`;
  },
  orders() {
    return `/pedidos`;
  },
  adminProducts() {
    return `/produtos`;
  },
  adminCreateProduct() {
    return `/produtos/novo`;
  },
  adminUpdateProduct(productId: string) {
    return `/produtos/${productId}/editar`;
  },
  adminOrders() {
    return `/vendas`;
  },
  adminCategories() {
    return `/categorias`;
  },
  adminCreateCategory() {
    return `/categorias/novo`;
  },
  adminUpdateCategory(categoryId: string) {
    return `/categorias/${categoryId}/editar`;
  },
};
