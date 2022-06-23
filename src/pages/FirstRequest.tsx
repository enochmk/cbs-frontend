import logoImg from '../assets/img/logo.png';

function FirstRequest() {
  return (
    <>
      <img className="mx-auto h-12 w-auto" src={logoImg} alt="logo" />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-500">
        FirstRequest
      </h2>
    </>
  );
}

export default FirstRequest;
