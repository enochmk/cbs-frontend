const downloadOutputFile = async (destination: string) => {
  window.location.href = `${process.env.REACT_APP_BACKEND_URL}/download?path=${destination}`;
};

export default downloadOutputFile;

