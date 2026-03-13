import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../pages/home-page";

const usePostApi = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dataProduct: Product) => {
            const res = await fetch(`http://localhost:3001/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataProduct),
            });

            if (!res.ok) throw new Error("Error al actualizar producto");
            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
};

export { usePostApi };
