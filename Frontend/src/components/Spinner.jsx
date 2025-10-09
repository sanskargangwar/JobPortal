const Spinner = () => (
  <>
    {" "}
    <div className="flex justify-center items-center py-10">
      {" "}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>{" "}
    </div>{" "}
    <div className="flex justify-center items-center">
      {" "}
      <p className="ml-4 text-lg text-white">
        Please Wait For a Moment...
      </p>{" "}
    </div>{" "}
  </>
);
export default Spinner;
