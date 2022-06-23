import { Link } from 'react-router-dom';

interface SidebarProps {
  name: string;
  layout: string;
  path: string;
}

function SidebarItem(props: SidebarProps) {
  const path = `/${props.layout}/${props.path}`;

  return (
    <li className="items-center">
      <Link
        className={`text-xs uppercase py-3 font-bold block ${
          window.location.href.indexOf(path) !== -1
            ? 'text-lightBlue-500 hover:text-lightBlue-600'
            : 'text-blueGray-700 hover:text-blueGray-500'
        }`}
        to={path}
      >
        <i
          className={`fas fa-tv mr-2 text-sm ${
            window.location.href.indexOf(path) !== -1
              ? 'opacity-75'
              : 'text-blueGray-300'
          }`}
        />
        {' '}
        {props.name}
      </Link>
    </li>
  );
}
export default SidebarItem;
