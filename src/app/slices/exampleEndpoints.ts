import { apiSlice as api } from "./apiSlice";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    exampleControllerGetAllProducts: build.query<
      ExampleControllerGetAllProductsApiResponse,
      ExampleControllerGetAllProductsApiArg
    >({
      query: (queryArg) => ({
        url: `/products`,
        params: {
          skip: queryArg.skip,
          limit: queryArg.limit,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as exampleEndpoints };
export type ExampleControllerGetAllProductsApiResponse = /** status 200  */ {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
export type ExampleControllerGetAllProductsApiArg = {
  limit: number;
  skip: number;
};
export type Product = {
  id: number;
  title: string;
  price: number;
};
export const { useExampleControllerGetAllProductsQuery, endpoints } =
  injectedRtkApi;

export default injectedRtkApi;
