import { useMutation, useQueryClient } from "@tanstack/react-query";

type PatchData = {
    id: number
    data: {
        name?: string;
        description?: string;
        status?: string;
    };

}


const usePatchApi = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ data, id }: PatchData) => {
            const res = await fetch(`http://localhost:3001/products/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
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

export { usePatchApi };
