function Navbar() {
  return (
    <nav className="top-0 w-full bg-slate-700 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 text-white">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <h4 className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 uppercase ">
            AirtelTigo CBS
          </h4>
        </div>
        <div className="lg:flex flex-grow items-center bg-white bg-opacity-0 lg:shadow-none">
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="flex items-center">
              <i className="fas fa-arrow text-blue-500" />
              {' '}
              AirtelTigo Ghana
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
