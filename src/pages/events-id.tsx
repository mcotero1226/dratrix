import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import {notification, } from 'antd';


interface Event {
  id: string;
  title: string;
  description: string;
  status: string;
  imagen?: string;
  category?: string;

  contact?: {
    phone?: string;
    email?: string;
  };

  location?: {
    place?: string;
    address?: string;
    city?: string;
    type?: string;
  };

  schedule?: {
    date?: string;
    startTime?: string;
    endTime?: string;
  };

  pricing?: {
    entryFee?: number;
    currency?: string;
  };

  eventDetails?: {
    minimumAge?: string;
    accommodation?: string;
    capacity?: number;
    foodSale?: boolean;
    liquorSale?: boolean;
    accessible?: boolean;
    pregnantAccess?: boolean;
    responsible?: string;
  };
}

const EventsId = () => {
  const { id } = useParams<{ id:any}>();
  const [api, contextHolder] = notification.useNotification();
  const fetchEventById = async (): Promise<Event> => {
    const res = await fetch(`http://localhost:3001/events/${id}`);
    if (!res.ok) throw new Error("Error al obtener evento");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["events", id],
    queryFn: fetchEventById,
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
      </div>
    );

  if (error || !data)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Evento no encontrado
      </div>
    );
     const notificacionDeEvento = () => {

    api.success({
      message: 'Solicitud aceptada',
      description:
        'Aceptaste la solicitud de seguimiento',
    });



  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {data.imagen && (
          <img
            src={data.imagen}
            alt={data.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-8 space-y-6">

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {data.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Categoría: {data.category ?? "General"}
              </p>
            </div>
            <div>
              {contextHolder}
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                data.status === "confirmed"
                  ? "bg-green-100 text-green-600"
                  : data.status === "pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : data.status === "active"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {data.status.toUpperCase()}
            </span>
          </div>

          <p className="text-gray-600">{data.description}</p>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-gray-50 p-4 rounded-xl">
              <h2 className="font-semibold text-gray-700 mb-2">📍 Ubicación</h2>
              <p>{data.location?.place}</p>
              <p className="text-sm text-gray-500">
                {data.location?.address}
              </p>
              <p className="text-sm text-gray-500">
                {data.location?.city} · {data.location?.type}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <h2 className="font-semibold text-gray-700 mb-2">🗓 Fecha y Hora</h2>
              <p>{data.schedule?.date}</p>
              <p className="text-sm text-gray-500">
                {data.schedule?.startTime} - {data.schedule?.endTime}
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-xl">
              <h2 className="font-semibold text-gray-700 mb-2">💰 Precio</h2>
              <p className="text-2xl font-bold text-indigo-600">
                {data.pricing?.entryFee === 0
                  ? "Gratis"
                  : `${data.pricing?.entryFee} ${data.pricing?.currency}`}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <h2 className="font-semibold text-gray-700 mb-2">ℹ Detalles</h2>
              <p>Edad mínima: {data.eventDetails?.minimumAge}</p>
              <p>Aforo: {data.eventDetails?.capacity}</p>
              <p>Responsable: {data.eventDetails?.responsible}</p>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700 mb-3">
              Servicios y Accesibilidad
            </h2>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-100 p-3 rounded-lg">
                🍔 Comida: {data.eventDetails?.foodSale ? 'si' :'n0'}
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                🍺 Licor: {data.eventDetails?.liquorSale ? 'si' :'n0'}
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                ♿ Accesible: {data.eventDetails?.accessible? 'si' :'n0' }
              </div>
              
            </div>
          </div>    

          <div className="border-t pt-6">
            <h2 className="font-semibold text-gray-700 mb-2">📞 Contacto</h2>
            <p>Teléfono: {data.contact?.phone}</p>
            <p>Email: {data.contact?.email}</p>
          </div>
          <div className="flex mt-10">
            <Button type="primary" onClick={notificacionDeEvento}>
              Vamos
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export { EventsId };