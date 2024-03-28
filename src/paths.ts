export const paths = {
  instagram() {
    return ``;
  },
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
    return `/?${categoryId ? `category=${categoryId}` : ""}${
      productName ? `&product=${productName}` : ""
    }&size=8&page=1`;
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
  adminUpdateOrder(id: string) {
    return `/vendas/${id}/editar`;
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
