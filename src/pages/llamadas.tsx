import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Loading } from "../components/isloading"
import { Card, Avatar, Tag } from "antd"
import { PhoneOutlined } from "@ant-design/icons"
import { MyButton } from "../components/button-borrar"

const Llamadas = () => {

  const queryClient = useQueryClient()

  const dataLlamadas = async () => {
    const llamadas = await fetch("http://localhost:3001/calls")
    if (!llamadas.ok) throw new Error("Error al obtener llamadas")
    return llamadas.json()
  }

  const { data: llamadas, isLoading, error } = useQuery({
    queryKey: ["calls"],
    queryFn: dataLlamadas
  })

  const deleteLlamadas = async (id: any) => {
    const res = await fetch(`http://localhost:3001/calls/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) throw new Error("Error al eliminar llamada")
  }

  const mutation = useMutation({
    mutationFn: deleteLlamadas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calls"] })
    }
  })

  if (isLoading) return <Loading message="Cargando..." />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Historial de llamadas
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {llamadas.map((i: any) => (

          <Card key={i.id} className="shadow-lg rounded-xl">

            <div className="items-center gap-4">

              <Avatar size={50}>
                {i.name[0]}
              </Avatar>

              <div>
                <h2 className="text-lg font-semibold">{i.name}</h2>
                <p className="text-gray-500">{i.phone}</p>
              </div>

            </div>

            <div className="flex justify-between mt-[-110px] items-center">
              <Tag color="blue" icon={<PhoneOutlined />}>
                {i.type}
              </Tag>

              <span className="text-gray-400 text-sm">
                {i.duration}
              </span>
              <MyButton
                text="primary"
                significado="borrar"
                onClick={() => mutation.mutate(i.id)}
              />

            </div>


          </Card>

        ))}

      </div>
    </div>
  )
}

export { Llamadas }