import { useMutation, useQueryClient  } from "@tanstack/react-query";

const useDeleteApi = () => {
    const queryClient = useQueryClient();

    const deleteProduct = async (id: number) => {
        const res = await fetch(`http://localhost:3001/products/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            throw new Error("Error al eliminar producto");
        }
    };

const {mutate}=useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
    return{mutate}
};
export {useDeleteApi}