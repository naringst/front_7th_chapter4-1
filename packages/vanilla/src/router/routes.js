// src/router/routes.js
import { HomePage, ProductDetailPage } from "../pages";
import { getProducts, getProduct, getCategories } from "../api/productApi";

export const routes = [
  {
    path: "/",
    component: HomePage,
    // SSR 데이터 프리패칭
    getServerSideProps: async ({ query }) => {
      const [productsData, categories] = await Promise.all([getProducts(query), getCategories()]);
      return {
        products: productsData.products,
        totalCount: productsData.pagination.total,
        categories,
        loading: false,
        error: null,
      };
    },
  },
  {
    path: "/product/:id",
    component: ProductDetailPage,
    getServerSideProps: async ({ params }) => {
      const product = await getProduct(params.id);
      return { product };
    },
  },
];
