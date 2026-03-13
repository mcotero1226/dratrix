import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UserType } from "./usechatuser"

const usePostChat = () => {
    const queryClient = useQueryClient()

    const chatPost = async (data: UserType) => {
        const dataFetch = await fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!dataFetch.ok) throw new Error("Error al crear usuario")

        return dataFetch.json()
    }

    return useMutation({
        mutationFn: chatPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })
}

export { usePostChat }