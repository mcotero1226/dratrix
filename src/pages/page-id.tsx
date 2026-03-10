import { useParams } from "react-router-dom";
import { Card, Tag, Avatar, Skeleton, Flex } from "antd";
import { useSeeApi } from "../hooks/useseeapi";
import { Loading } from "../components/isloading";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import { QRCode } from 'antd';



const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
};
const PageId: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useSeeApi(id);


    if (isLoading) return <Loading message="Cargando datos..." />;
    if (error) return <p className="text-center text-red-500">Error al cargar el producto</p>;


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
            <Card className="w-full max-w-lg rounded-3xl shadow-xl border border-gray-100">

                <div className="flex items-center gap-4">
                    <Avatar
                        size={64}
                        className="ring-2 ring-gray-300"
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${data.id}`}
                    />

                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-800">
                            {data.name}
                        </h2>

                        <div className="flex gap-2 mt-2">
                            <Tag color={data.status === "active" ? "green" : "red"}>
                                {data.status}
                            </Tag>

                            <Tag color={data.stock > 10 ? "green" : "red"}>
                                Stock: {data.stock}
                            </Tag>
                        </div>
                    </div>
                </div>

                <p className="mt-5 text-sm text-gray-600 leading-relaxed">
                    {data.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                    <p
                        className={`text-lg font-bold ${data.rating >= 4 ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        ⭐ Rating: {data.rating}
                    </p>

                    <Rate
                        disabled
                        defaultValue={data.rating}
                        character={({ index = 0 }) => customIcons[index + 1]}
                    />
                </div>

                <div className="my-6 h-px bg-gray-200" />
                <div className="text-center">
                    <span className="text-xs text-gray-500">
                        Escanea para ver Instagram
                    </span>

                </div>

                <div className="flex flex-col items-center gap-2 ">
                    <QRCode
                        errorLevel="H"
                        value={data.ig}
                        className="rounded-lg shadow-md"
                    />
                </div>

            </Card>
        </div>
    );
};

export { PageId };
