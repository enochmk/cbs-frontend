import logoImg from '../assets/img/logo.png';

function AdjustAccount() {
  return (
    <>
      <img className="mx-auto h-12 w-auto" src={logoImg} alt="logo" />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-500">
        AdjustAccount
      </h2>
    </>
  );
}

export default AdjustAccount;
