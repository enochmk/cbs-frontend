import backendAPI from '../customs/axios';
import FileDownload from 'js-file-download';

const downloadOutputFile = async (destination: string) => {
  try {
    // const response = await backendAPI.get(`/download?path=${destination}`);
    // FileDownload(response.data, 'output.log');
    window.location.href = `http://localhost:5000/api/v1/download?path=${destination}`;
  } catch (error) {
    console.error(error);
  }
};

export default downloadOutputFile;
