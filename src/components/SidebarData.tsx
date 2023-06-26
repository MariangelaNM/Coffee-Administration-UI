import {
    AiOutlineHistory,
    AiOutlineHome,
} from 'react-icons/ai';
import { FaCog} from 'react-icons/fa';
import { SidebarItem } from '../models/SidebarItem';

export const SidebarData: SidebarItem[] = [
  /*  {
        title: 'Overview',
        path: '/overview',
        icon: <AiOutlineHome />,
        iconClosed: <AiFillCaretDown />,
        iconOpened: <AiFillCaretUp />,
        subnav: [
            {
                title: 'Users',
                path: '/overview/users',
                icon: <AiOutlineUser />
            },
            {
                title: 'Revenue',
                path: '/overview/revenue',
                icon: <AiOutlineMoneyCollect />
            }
        ]
    },*/
    {
        title: 'Inicio',
        path: '/Inicio',
        icon: <AiOutlineHome />,
    },
    {
        title: 'Mis Fincas',
        path: '/Mis Fincas',
        icon: <AiOutlineHistory />
    },
    {
        title: 'Mis Recolectores',
        path: '/Mis Recolectores',
        icon: <FaCog />
    },
    {
        title: 'Resumen Recolectores',
        path: '/Resumen Recolectores',
        icon: <FaCog />
    },
    {
        title: 'Resumen Fincas',
        path: '/Resumen Fincas',
        icon: <FaCog />
    }
];
