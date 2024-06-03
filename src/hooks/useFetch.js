import { useEffect, useState } from "react";

export const useFetch = (url, page = 1) => {
  const urlBase = "https://pokeapi.co/api/v2/";
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    errors: null,
  });

  const getFetch = async () => {
    try {
      const response = await fetch(`${urlBase}${url}?offset=${(page - 1) * 20}&limit=20` );
      const data = await response.json();
      setState({
        data: data,
        isLoading: false,
        errors: null,
      });
    } catch (errors) {
      setState({
        data: null,
        isLoading: false,
        errors: errors,
      });
    }
  };

  useEffect(() => {
    getFetch();
  }, [url, page]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    errors: state.errors,
  };
};
