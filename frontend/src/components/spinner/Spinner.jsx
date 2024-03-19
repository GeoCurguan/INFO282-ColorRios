import Image from "next/image";
const Spinner = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        // Spinner BG overlay
        <div className="m-0 fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-25">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center justify-center w-16 h-16 animate-spin">
              <Image src="/images/404.png" alt="spinner" width={50} height={50} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Spinner;
