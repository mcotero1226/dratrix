import { useQuery } from "@tanstack/react-query";

type UserType = {
  id: number;
  name: string;
};

const useDataChat = () => {
  const fetchContactos = async (): Promise<UserType[]> => {
    const res = await fetch("http://localhost:3001/users");
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return res.json();
  };

  const { data:contactos, isLoading, error } = useQuery<UserType[], Error>({
    queryKey: ["users"],
    queryFn: fetchContactos,
  });

  return {
    contactos,
    isLoading,
    error,
  };
};

export { useDataChat };
