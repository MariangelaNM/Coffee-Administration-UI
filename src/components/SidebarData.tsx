
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
        icon: null,
    },
    {
        title: 'Mis Fincas',
        path: '/fincas',
        icon: null
    },
    {
        title: 'Mis Recolectores',
        path: '/Recolectores',
        icon: null
    },
 
    {
        title: 'Salir',
        path: '/Login',
        icon: null
    }
];
