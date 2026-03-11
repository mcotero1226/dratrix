import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm, Controller } from "react-hook-form"
import { Form, Input, Button, Card, Select, InputNumber, message } from "antd"
import { useNavigate } from "react-router-dom"


type UserForm = {
    name: string
    email: string
    role: string
    status: string
    age: number
    country: string
}

const Login = () => {
    const navegate=useNavigate()
    const queryClient = useQueryClient()
    const [msg, contextHolder] = message.useMessage()

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserForm>()

    const createUser = async (data: UserForm) => {
        const res = await fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!res.ok) throw new Error("Error al crear usuario")
        return res.json()
    }

    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
            reset()
            msg.success("Usuario creado correctamente")
        },
        onError: () => {
            msg.error("Error al crear usuario")
        },
    })

    const onSubmit = (data: UserForm) => {
        mutation.mutate(data)
        navegate('/')
        localStorage.setItem('users',JSON.stringify(data))
    }

    return (
        <>
        
            <h1>{contextHolder}</h1>
            <div className="shadow-lg p-6 bg-white rounded-xl">
                <h1 className="text-center font-black text-4xl">INGRESAR</h1>
            </div>


            <Card

                style={{
                    maxWidth: 420,
                    margin: "60px auto",
                    borderRadius: 16,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                }}
            >
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>  
                    <Form.Item
                        label="Nombre"
                        validateStatus={errors.name ? "error" : ""}
                        help={errors.name && "El nombre es obligatorio"}
                    >
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input {...field} placeholder="Nombre completo" />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        validateStatus={errors.email ? "error" : ""}
                        help={errors.email && "El email es obligatorio"}
                    >
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input {...field} placeholder="correo@ejemplo.com" />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Rol"
                        validateStatus={errors.role ? "error" : ""}
                        help={errors.role && "Selecciona un rol"}
                    >
                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select {...field} placeholder="Selecciona rol">
                                    <Select.Option value="admin">Admin</Select.Option>
                                    <Select.Option value="user">User</Select.Option>
                                    <Select.Option value="Moderador">Moderador</Select.Option>
                                </Select>
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Estado"
                        validateStatus={errors.status ? "error" : ""}
                        help={errors.status && "Selecciona un estado"}
                    >
                        <Controller
                            name="status"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select {...field} placeholder="Estado">
                                    <Select.Option value="active">Activo</Select.Option>
                                    <Select.Option value="inactive">Inactivo</Select.Option>
                                </Select>
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Edad"
                        validateStatus={errors.age ? "error" : ""}
                        help={errors.age && "La edad es obligatoria"}
                    >
                        <Controller
                            name="age"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <InputNumber
                                    {...field}
                                    min={1}
                                    style={{ width: "100%" }}
                                    placeholder="Edad"
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="País"
                        validateStatus={errors.country ? "error" : ""}
                        help={errors.country && "El país es obligatorio"}
                    >
                        <Controller
                            name="country"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input {...field} placeholder="País" />
                            )}
                        />
                    </Form.Item>
                   

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={mutation.isPending}
                        block
                        style={{ borderRadius: 10 }}
                    >
                        Ingresar
                    </Button>
                </Form>
            </Card>
        </>
    )
}

export default Login
