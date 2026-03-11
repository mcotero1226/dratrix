import { useQuery } from "@tanstack/react-query";
import { EditOutlined, EllipsisOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ModalFrom } from "../components/modal-form";
import { usePatchApi } from "../hooks/usepachapi";
import { Loading } from "../components/isloading";
import { Button } from "antd";
import { usePostApi } from "../hooks/usepostapi";
import { useDeleteApi } from "../hooks/usedeletapi";
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { App, Input } from 'antd';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const { Meta } = Card;


export type Product = {
    id: number;
    name: string;
    description: string;
    image: string;
    status: string;
};
type MenuItem = Required<MenuProps>['items'][number];
const eliminar = () => {
    localStorage.removeItem('users')
}
const items: MenuItem[] = [
    {
        key: 'sub1',
        icon: <Avatar
            size={40}
            icon={<UserOutlined />}
        />,
        children: [
            {
                key: 'g1',
                type: 'group',
                children: [
                    { key: '1', label: <Link to='/avatar'>ver</Link>, icon: <EyeOutlined /> },
                ],
            },
            {
                key: 'g2',
                type: 'group',
                children: [
                    { key: '2', label: 'eliminar', icon: <DeleteOutlined />, onClick: eliminar },
                ],
            },
        ],
    },

];




const MainPage: React.FC = () => {


    const { notification } = App.useApp();
    const { mutate: deleteProduct } = useDeleteApi();
    const { mutate: createProduct } = usePostApi()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [buscador, setBuscador] = useState('')


    const { register, handleSubmit, formState: { errors }, reset, trigger } =
        useForm<Product>();

    const { mutate: updateProduct } = usePatchApi()

    const requestGet = async (): Promise<Product[]> => {
        const res = await fetch("http://localhost:3001/products");
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
    };

    const { data, isLoading, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: requestGet,
    });

    const showModal = (id?: number) => {
        if (id !== undefined) {
            setSelectedId(id);
        } else {
            setSelectedId(null);
        }
        setIsModalOpen(true);
    };


    const onSubmit = (formData: Product) => {
        if (selectedId !== null) {
            updateProduct({
                id: selectedId,
                data: formData,
            });
        } else {
            createProduct(formData)
            setIsModalOpen(true);


        }
        reset();
        setIsModalOpen(false)
        notification.success({
            message: 'Notification topLeft',
            description: 'Hello, Ant Design!!',
            placement: 'topLeft',
        });


    };


    if (isLoading) return <Loading message="Cargando datos..." />;
    if (error) return <p>Error</p>;

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };
    const filter = data?.filter((items) => items.name.toLowerCase().includes(buscador.toLowerCase()))




    return (
        <>
            <div className="mb-8 flex justify-center">
                <Input
                    size="large"
                    placeholder="Busca a tu Persona"
                    prefix={<SearchOutlined />}
                    allowClear
                    className="max-w-md rounded-xl shadow-sm"
                    value={buscador}
                    onChange={(e) => setBuscador(e.target.value)}
                />
            </div>
            <div className="min-h-screen flex bg-gray-100">

                <main className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-black text-center">users</h1>
                        <Button type="primary" onClick={() => showModal()}>
                           Añadir una nueva Persona
                        </Button>
                        <Menu className="rounded-t-3xl"
                            onClick={onClick}
                            items={items}
                        />

                    </div>
                    <ModalFrom
                        open={isModalOpen}
                        onOk={handleSubmit(onSubmit)}
                        onCancel={() => setIsModalOpen(false)}
                        register={register}
                        errors={errors}
                        trigger={trigger}

                    />
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filter?.map((product) => (
                            <Card
                                key={product.id}
                                hoverable
                                actions={[
                                    <Link to={`/product/${product.id}`} key="view">
                                        <EllipsisOutlined />
                                    </Link>,
                                    <EditOutlined
                                        key="edit"
                                        onClick={() => showModal(product.id)}
                                    />,
                                    <DeleteOutlined
                                        key="delete"
                                        onClick={() => deleteProduct(product.id)}
                                    />,
                                ]}
                            >
                                <Meta
                                    avatar={
                                        <Avatar
                                            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${product.id}`}
                                        />
                                    }
                                     className='font-medium' title={product.name}
                                    description={product.description}
                                />
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
};

export { MainPage };
