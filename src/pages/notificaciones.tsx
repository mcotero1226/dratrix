import { Card, Tag, Avatar, Spin, Empty } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useNotificaciones } from "../hooks/usenotificaciones"
import { useState } from "react"
import { Button, notification, } from 'antd';
import { useEffect } from "react";
import { MyButton } from "../components/button-borrar";
import { useQueryClient, useMutation } from "@tanstack/react-query";


export type typeNotificacion = {
  id: number
  type: string
  status: string
  createdAt: string | number

}

const Notificaciones = () => {
  const [aceptados, setAceptados] = useState<number[]>(() => {
    const estadoAceptado = localStorage.getItem('notificacionesAceptadas')
    return estadoAceptado ? JSON.parse(estadoAceptado) : [];
  })
  const [rechazar, setRechazar] = useState<number[]>(() => {
    const estadoRachar = localStorage.getItem('notificacionesRechazadas')
    return estadoRachar ? JSON.parse(estadoRachar) : [];
  })
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    localStorage.setItem("notificacionesAceptadas", JSON.stringify(aceptados));
    localStorage.setItem("notificacionesRechazadas", JSON.stringify(rechazar));
  }, [aceptados, rechazar]);

  const rechazarLaPeticion = (id: number) => {
    setRechazar((rechazar) => [...rechazar, id])
    api.error({
      message: 'Solicitud Rechazada',
      description:
        'Rechazaste la solicitud de seguimiento',
    });
  }


  const cambio = (id: number) => {
    setAceptados((aceptados) => [...aceptados, id])

    api.success({
      message: 'Solicitud aceptada',
      description:
        'Aceptaste la solicitud de seguimiento',
    });



  }

  const { data, isLoading, error } = useNotificaciones()
  const queryClient = useQueryClient()

  const deletenotificaciones = async (id: number) => {
    const res = await fetch(`http://localhost:3001/notifications/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Error al eliminar notificaciones")
      api.success({
    message:'borraste por exito',
  description:'Bien hermoso mi amor '
    })


  }
  const mutacionesNotificaciones = useMutation({
    mutationFn: deletenotificaciones,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications "] })
    }

  })
  if (error) return <Empty description="Error al cargar notificaciones" />
  if (isLoading)
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    )




  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 grid grid-cols-3 gap-6">
      {data?.map((noti: typeNotificacion) => (
        <Card
          key={noti.id}
          className="shadow-md rounded-xl border border-gray-200 p-36 "
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar icon={<UserOutlined />} />

              <div>
                <p className="font-semibold text-gray-800">
                  {noti.type}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(noti.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div>
              {contextHolder}
            </div>
            {contextHolder}


            <div className="flex gap-2">
              {noti.status === "pending" && (


                <>
                  {aceptados.includes(noti.id) ? (

                    <Button danger size="small" onClick={() => rechazarLaPeticion(noti.id)}>
                      {rechazar.includes(noti.id) ? 'Solicitud Rechazada' : 'rechazar'}
                    </Button>

                  ) : (

                    <Button type="primary" size="small" onClick={() => cambio(noti.id)}>
                      {aceptados.includes(noti.id) ? 'Solicitud aceptada' : 'Aceptar'}
                    </Button>
                  )
                  }

                </>
              )}

              {noti.status === "follow" && (
                <Button size="small">
                  Seguir
                </Button>
              )}

              <Tag color="blue">{noti.status}</Tag>
            </div>
          </div>
          <div className="-mt-36">
            <MyButton text={"primary"} significado={'borrar'} onClick={() => mutacionesNotificaciones.mutate(noti.id)} />

          </div>

        </Card>
      ))}
    </div>
  )
}

export { Notificaciones }
