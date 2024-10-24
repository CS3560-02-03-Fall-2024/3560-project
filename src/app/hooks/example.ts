/**
 * This is where our hooks will go eventually. To use these, you will need "use client" at the top of the page/component you want to use them in.
 * Async data fetching sucks on the web, so we are using react-query to make it easier. For example:
 * 
 *  export default function useAllProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`/api/products/`); 
      return response.json() as unknown as GetAllProductsQuery; // this is what I like to call "type gymnastics" - typescript is a superset of js and sometimes you have to tell it its wrong
    },
  });
}

This will return query data, which contains a features like .loading, .success, .error, .data, that help us maange the loading state of the ui.
 */
