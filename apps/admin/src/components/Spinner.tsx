const Spinner = () => {
  return (
    <div className="w-full content-center align-middle">
      <div className="flex h-screen items-center justify-center">
        <div className="relative">
          <div className="h-32 w-32 rounded-full border-b-8 border-t-8 border-[#F9F9F9]"></div>
          <div className="absolute left-0 top-0 h-32 w-32 animate-spin rounded-full border-b-8 border-t-8 border-[#44AF96]"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
