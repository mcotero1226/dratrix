import React from 'react'
import {
    AppstoreOutlined,
    UserAddOutlined,
    ContactsOutlined,
    BookOutlined,
    BulbOutlined,
    SendOutlined,
    HeartOutlined,
    PhoneOutlined

} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu, Badge } from 'antd'
import { Link } from "react-router-dom"

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
    {
        key: 'sub-navigation',
        label: 'Navigation One',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: 'group-users',
                type: 'group',
                label: 'Usuarios',
                children: [
                    {
                        key: 'users',
                        label: <Link to="/users">Usuarios</Link>,
                        icon: <UserAddOutlined />,
                    },
                ],
            },
            {
                key: 'group-events',
                type: 'group',
                label: 'Eventos',
                children: [
                    {
                        key: 'events',
                        label: <Link to="/events">Events</Link>,
                        icon: <ContactsOutlined />,
                    },
                ],
            },
            {
                key: 'group-start',
                type: 'group',
                label: 'start',
                children: [
                    {
                        key: 'start',
                        label: <Link to="/">start
                        </Link>,
                        icon: <BookOutlined />,
                    },
                ],
            },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'sub-settings',
        icon: <BulbOutlined />,
        children: [
            {
                key:
                    'option-8',
                label: <Link to={'chat'}>Chat</Link>,
                icon: <SendOutlined />
            },
            {
                key:
                    'option-10',
                label: <Link to={'notificaciones'}>Notificaciones</Link>,
                icon: <Badge count={1}> <HeartOutlined /></Badge>
            },
            {
                key:
                    'option-11',
                label: <Link to={'llamadas'}>llamadas</Link>,
                icon: <PhoneOutlined />
            },
        ],
    },


]

const MenuHome: React.FC = () => {
    return (
        <Menu
            defaultSelectedKeys={['users']}
            defaultOpenKeys={['sub-navigation']}
            items={items}
        />
    )
}

export default MenuHome
