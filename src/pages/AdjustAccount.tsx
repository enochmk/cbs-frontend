import { useState } from 'react';
import { useSelector } from 'react-redux';

import backendAPI from '../customs/axios';
import downloadOutputFile from '../helpers/downloadOutputFile';

function AdjustAccount() {
  const [selectedFile, setSelectedFile] = useState<any>();
  const user = useSelector((state: any) => state.auth.user);

  const handleChange = (e: any) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setSelectedFile(fileList[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);
    formData.append('agentID', user?.username || '');

    try {
      const response = await backendAPI.post('/batch/adjust-account', formData);
      const destination = response.data.outputDestination;
      await downloadOutputFile(destination);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-wrap justify-center mt-24">
      <div className="block rounded-lg shadow-lg bg-white w-1/3">
        <h2 className="py-3 px-6 border-b border-gray-300 font-extrabold uppercase text-lg text-gray-700 text-center">
          Adjust Account
        </h2>
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
              accept="text/plain"
              className="block p-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none"
            />
          </div>
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

export default AdjustAccount;
