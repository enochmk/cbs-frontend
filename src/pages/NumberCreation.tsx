import { useState } from 'react';
import { useSelector } from 'react-redux';

import backendAPI from '../customs/axios';
import downloadOutputFile from '../helpers/downloadOutputFile';

function NumberCreation() {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [message, setMessage] = useState('');
  const user = useSelector((state: any) => state.auth.user);
  const accessToken = useSelector((state: any) => state.auth.accessToken);

  const handleChange = (e: any) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setSelectedFile(fileList[0]);
  };

  const handleDownload = () => {
    downloadOutputFile('public/samples/numberCreation.csv');
  };

  const handleCancel = async () => {
    setMessage('');
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);
    formData.append('agentID', user?.username || '');

    try {
      const response = await backendAPI.post(
        '/batch/number-creation',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const destination = response.data.outputDestination;
      await downloadOutputFile(destination);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error.message;
      setMessage(errorMessage);
    }
  };

  return (
    <section className="flex flex-wrap justify-center mt-24">
      <div className="block rounded-lg shadow-lg bg-white w-1/3 lg:w-3/6">
        <h2 className="py-3 px-6 border-b border-gray-300 font-extrabold uppercase text-lg text-gray-700 text-center">
          Number Creation
        </h2>
        {message && (
          <div className="alert alert-error shadow-lg mt-4 p-2 bg-red-500">
            <div className="w-full justify-center text-white text-lg">
              <svg
                onClick={handleCancel}
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{message}.</span>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <label className="block mb-2" htmlFor="file_input">
              Choose a file
            </label>
            <input
              id="file_input"
              name="file_input"
              type="file"
              onChange={handleChange}
              accept=" text/plain"
              className="block p-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none"
            />
          </div>
          <p className="mb-1">
            <i>
              <button className="text-blue-600" onClick={handleDownload}>
                <i className="mr-1 ml-5 text-sm"> Click Here </i>
              </button>
              to download sample file
            </i>
          </p>

          <div className="py-3 px-6 border-t border-gray-300 text-gray-600 space-y-1">
            <button type="submit" className="btn btn-primary btn-block gap-2">
              <i className="fa-solid fa-upload" />
              Upload
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NumberCreation;
