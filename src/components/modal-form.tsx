import { Modal } from "antd";
import { Button, Steps } from "antd";
import React, { useState } from 'react';

const steps = [
    {
        title: 'First',
    },
    {
        title: 'Second'
    },
]

const ModalFrom: React.FC = ({ open, onOk, onCancel, register, errors }: any) => {
    const [current, setCurrent] = useState(0);

    const next = () => {
        onOk()
     
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    return (
        <>
            <Modal
                open={open}
                onOk={onOk}
                onCancel={onCancel}
                footer={null}
                centered
                width={420}
            >
                <Steps current={current} items={items} />
                {current === 0 && (
                    <>

                        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                            Editar producto
                        </h2>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">
                                Nombre
                            </label>
                            <input
                                {...register("name", { required: true })}
                                className={`w-full px-4 py-3 rounded-lg border transition
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${errors.name ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Nombre de la persona"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">
                                    El nombre es obligatorio
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">
                                Description
                            </label>
                            <input
                                {...register("description", {
                                    required: true,
                                })}
                                className={`w-full px-4 py-3 rounded-lg border transition
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${errors.description ? "border-red-500" : "border-gray-300"}`}
                                placeholder='Describete'
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs mt-1">La URL de ig es obligatoria</p>
                            )}
                            <label className="block text-sm font-semibold text-gray-600 mb-1">
                                ig
                            </label>
                            <input
                                {...register("ig", {
                                    required: true,
                                })}
                                className={`w-full px-4 py-3 rounded-lg border transition
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${errors.ig ? "border-red-500" : "border-gray-300"}`}
                                placeholder='Url de tu ig'
                            />
                            {errors.ig && (
                                <p className="text-red-500 text-xs mt-1">Ig inválido</p>
                            )}
                        </div>

                    </>
                )}
                {current === 1 && (
                    <p className="text-center font-semibold">
                        ¿Deseas guardar el producto?
                    </p>
                )}
                <div className="flex justify-between mt-6">
                    {current > 0 && <Button onClick={prev}>Anterior</Button>}
                    {current < steps.length - 1 ? (
                        <Button type="primary" onClick={() => setCurrent(current + 1)} disabled={Object.keys(errors).length > 0}>
                            Siguiente
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            onClick={next}
                        >
                            Guardar
                        </Button>
                    )}
                </div>

            </Modal >
        </>

    );
};

export { ModalFrom };
