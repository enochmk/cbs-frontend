function AdjustAccount() {
  return (
    <section className="flex flex-wrap justify-center -m-24">
      <div className="card w-1/2 bg-base-100 shadow-xl">
        <form action="#">
          <div className="card-body">
            <h2 className="card-title uppercase text-center">Adjust Account</h2>
            <hr />
            <label className="block mb-2  font-medium " htmlFor="file_input">Choose a file with content format: MSISDN|ACCOUNT TYPE|REMARK</label>
            <input className="block p-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none" id="file_input" type="file" />

            <div className="card-actions justify-center">
              <button className="btn btn-primary btn-block">Upload</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AdjustAccount;
