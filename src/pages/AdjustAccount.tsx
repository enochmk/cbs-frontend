function AdjustAccount() {
  return (
    <section className="flex flex-wrap justify-center mt-24">
      <div className="block rounded-lg shadow-lg bg-white w-1/3">
        <h2 className="py-3 px-6 border-b border-gray-300 font-extrabold uppercase text-lg text-gray-700 text-center">
          Adjust Account
        </h2>
        <div className="p-6">
          <label className="block mb-2" htmlFor="file_input">
            Choose a file
          </label>
          <input
            className="block p-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none"
            id="file_input"
            type="file"
          />
        </div>
        <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
          <button className="btn btn-primary btn-block gap-2">
            <i className="fa-solid fa-upload" />
            Upload
          </button>
        </div>
      </div>
    </section>
  );
}

export default AdjustAccount;
