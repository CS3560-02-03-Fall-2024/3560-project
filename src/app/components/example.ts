/**
 * These are where reusable or clunky components go. For example:
 *
 * /components/product.tsx
 * interface ProductProps {
 *  name: string
 *  price: number
 *  ...
 * }
 *
 * export function Product({...}:{ProductProps}) {
 *  retrun ...
 * }
 *
 * /app/page.tsx
 * <Product name={"my awesome product"} price={100} />
 * 
 *  You can see how this can pair quiet nicely with the hooks, where you just pass the data from the hook to the component, 
 *  so the component can work on ui/ux and the hook and the hook can handle the data fetching and loading states
 */
