import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import { Loading } from "../components/isloading";
import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { NavLink } from "react-router-dom";



const { Meta } = Card;

export type UserType = {
    id: number;
    name: string;
    role: string;


};

const UserPage: React.FC = () => {
    const [open, setOpen] = useState(false);


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const getUsers = async (): Promise<UserType[]> => {
        const res = await fetch("http://localhost:3001/users");
        if (!res.ok) throw new Error("Error al obtener Users");
        return res.json();
    };

    const { isLoading, error, data: users } = useQuery<UserType[]>({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    if (isLoading) return <Loading message="Cargando datos..." />;
    if (error) return <p className="text-red-500">Error al cargar usuarios</p>;

    return (



        <div className="p-4">

            <div className="mb-6 flex justify-end">
                <Button
                    type="primary"
                    className="shadow-md"
                    onClick={showDrawer}
                >
                    Ver usuarios
                </Button>
                <div className="mb-7 flex justify-end w-35">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `
            px-10 py-1 rounded-lg  "
            transition-all duration-200
            ${!isActive
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700 hover:bg-blue-100"}
            `
                        }
                    >
                        Inicio
                    </NavLink>
                </div>

            </div>

            <Drawer
                title={
                    <h2 className="text-lg font-semibold">
                        Usuarios registrados
                    </h2>
                }
                placement="right"
                onClose={onClose}
                open={open}
            >
                <div className="divide-y">
                    {users?.map((user) => (
                        <div
                            key={user.id}
                            className="
                                flex items-center gap-4
                                px-5 py-4
                                hover:bg-gray-50
                                transition
                            "
                        >
                            <img
                                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.id}`}
                                alt={user.name}
                                className="w-10 h-10 rounded-full bg-gray-100"
                            />

                            <div className="flex-1">
                                <p className="font-medium text-gray-800">
                                    {user.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {user.role}
                                </p>
                            </div>

                            <span
                                className="
                                    text-xs px-2 py-1 rounded-full
                                    bg-blue-100 text-blue-600
                                "
                            >
                                activo
                            </span>
                        </div>
                    ))}
                </div>
            </Drawer>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                {users?.map((user) => (
                    <Card
                        key={user.id}
                        hoverable
                        className="
                        flex flex-col items-center
                        rounded-xl shadow-md
                        transition-all duration-300
                        hover:shadow-xl hover:-translate-y-1
                    "
                        cover={
                            <div className="flex justify-center pt-6">
                                <img
                                    draggable={false}
                                    alt={user.name}
                                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.id}`}
                                    className="w-24 h-24 rounded-full bg-gray-100"
                                />
                            </div>
                        }
                    >
                        <Meta
                            title={
                                <p className="text-center font-semibold text-lg">
                                    {user.name}
                                </p>
                            }
                            description={
                                <p className="text-center text-gray-500">
                                    Rol: {user.role}
                                </p>
                            }
                        />
                    </Card>
                ))}
            </div>
        </div >


    );
};

export { UserPage };