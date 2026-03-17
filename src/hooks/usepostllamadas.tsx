import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { UserType } from "./usechatuser";



const usePostLlamadas = () => {
    const queryClient = useQueryClient()

    const postFechLlamadas = async (user: UserType) => {
        if (!user?.id) throw new Error("Usuario sin ID")

        const callPayload = {
            userId: user.id,
            name: user.name,
            phone: (user as any).phone || user.email,
            type: "outgoing",
            duration: "00:00",
          
        }

        // En json-server el POST para crear se hace con /calls, pero el body ahora lleva userId
        const dataLlamadas = await fetch("http://localhost:3001/calls", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(callPayload),
        })

        if (!dataLlamadas.ok) throw new Error("Error al crear llamada")
        return dataLlamadas.json()
    }

    const { mutate } = useMutation({
        mutationFn: postFechLlamadas,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["calls"] })
        },
    })

    return { mutate }
}

export { usePostLlamadas }