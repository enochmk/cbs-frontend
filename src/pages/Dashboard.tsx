import logoImg from '../assets/img/logo.png';

function Dashboard() {
  return (
    <>
      <img className="mx-auto h-12 w-auto" src={logoImg} alt="logo" />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-500">
        Dashboard
      </h2>
    </>
  );
}

export default Dashboard;
