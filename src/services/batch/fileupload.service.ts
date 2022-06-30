import axios from '../../customs/axios';

const fileUploadService = async (url: string, data: any) => {
  const response = await axios.post(`/batch/${url}`, data);
};

export default fileUploadService;
