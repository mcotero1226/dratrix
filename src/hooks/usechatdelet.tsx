import { useQueryClient,useMutation } from "@tanstack/react-query";

const useChatDelet=()=>{
    const queryClient=useQueryClient()

    const useFechChatDelet=async(id:number)=>{
        const dataChat=await fetch(`http://localhost:3001/users/${id}`,{
            method:'DELETE',
        })        
         if (!dataChat.ok) {
            throw new Error("Error al eliminar producto");
        }
    }
    const {mutate}=useMutation({
        mutationFn:useFechChatDelet,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['users']
            })
        }

    })
    return{mutate}

}
export {useChatDelet}