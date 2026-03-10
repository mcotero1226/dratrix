import { useQuery } from "@tanstack/react-query";

export type UserType = {
  id: number;
  name: string;
  email: string;
};

export const useUserById = (id: number | undefined) => {
  return useQuery<UserType, Error>({
    queryKey: ["users", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/users/${id}`);
      if (!res.ok) throw new Error("Error al obtener usuario");
      return res.json();
    },
    enabled: !!id, 
  });
};
