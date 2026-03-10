import { useQuery } from "@tanstack/react-query";

const useSeeApi = (id: number) => {
  const see = async (): Promise<any> => {
    const res = await fetch(`http://localhost:3001/products/${id}`);
    if (!res.ok) throw new Error("Error al obtener producto");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: see,
    enabled: !!id, 
  });

  return { data, isLoading, error };
};

export { useSeeApi };
