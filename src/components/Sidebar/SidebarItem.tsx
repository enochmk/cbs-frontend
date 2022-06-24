import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  name: string;
  layout: string;
  path: string;
  icon: string | null;
}

function SidebarItem(props: SidebarProps) {
  const location = useLocation();
  const { pathname } = location;
  const link = `/${props.layout}/${props.path}`;

  const activeLinkColor =
    pathname === link
      ? 'text-blue-700 hover:text-blue-500'
      : 'text-gray-500 hover:text-gray-600';

  const activeIconColor = pathname === link ? 'text-gray-300' : 'opacity-75';

  return (
    <li className="items-center">
      <Link
        className={`text-xs uppercase py-3 font-bold block ${activeLinkColor}`}
        to={link}
      >
        <i className={`${props.icon} ${activeIconColor} mr-3`} />
        {props.name}
      </Link>
    </li>
  );
}
export default SidebarItem;
