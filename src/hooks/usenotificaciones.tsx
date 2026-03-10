import { useQuery } from "@tanstack/react-query"


const useNotificaciones = () => {
    const apiNotificacion = async () => {
        const data = await fetch('http://localhost:3001/notifications')
        if (!data.ok) throw new Error('error')
        return data.json()
    }
    const { data, isLoading, error } = useQuery({
        queryKey: ['notifications'],
        queryFn: apiNotificacion,
    })

    return {data,isLoading,error}
}
export { useNotificaciones }