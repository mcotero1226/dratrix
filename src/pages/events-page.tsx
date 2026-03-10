import { useQuery } from "@tanstack/react-query"
import { Card, Typography, Row, Col, Button } from "antd"
import { Link } from "react-router-dom"

const { Title, Paragraph } = Typography

const EventsPage = () => {
  const dataEvents = async () => {
    const res = await fetch("http://localhost:3001/events")
    if (!res.ok) throw new Error("Error al obtener eventos")
    return res.json()
  }

  const { data: events, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: dataEvents,
  })

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <p className="text-lg">Cargando eventos...</p>
      </div>
    )

  if (error instanceof Error)
    return <p className="text-center mt-20 text-red-500">{error.message}</p>

  const promis = () => {
    return new Promise((resolve, reject) => {
      console.log("calmaa.....");
      setTimeout(() => {
        resolve(events)
        reject('datos fallidos....')
      }, 2000)

    });
  };
  promis().then((event: any) => {
    console.log(event)
  })

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <Row gutter={[24, 24]}>
        {events?.map((event: any) => (
          <Col key={event.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition duration-300 hover:shadow-2xl"
              cover={
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={event.imagen || "https://picsum.photos/800/401"}
                    alt={event.title}
                    className="w-full h-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              }
            >
              <Title level={5} className="!mb-1">
                {event.title}
              </Title>

              <Paragraph className="text-gray-500 text-sm !mb-2">
                {event.date || "Sábado 21 de febrero 2026"}
              </Paragraph>

              <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-lg">
                {event.location || "Medellín, ANT"}
              </span>
              <Button type="primary">
                <Link to={`/events/${event.id}`}>Ver eventos</Link>
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export { EventsPage }
