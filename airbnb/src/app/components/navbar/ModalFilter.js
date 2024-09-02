// import { IoCloseSharp } from "react-icons/io5";

export default function ModalFilter({ open, handleModal }) {
  return (
    <div
      className={`bg-[#717171] absolute bottom-0 left-0 right-0 duration-300 ease-out z-50 ${
        open ? "top-0" : "top-[120%]"
      } `}
    >
      {/* Model Open filters */}
      <div className="bg-white w-full h-full mt-3 rounded-lg">
        <div>
          <header
            className={`border-b-2 px-6 min-h-12 flex items-center justify-between ${
              open ? "" : "hidden"
            }`}
          >
            <button onClick={handleModal}>
              {/* <IoCloseSharp size={20} /> */}
            </button>
            <div>
              <h1 className="text-xl font-semibold">Filters</h1>
            </div>
            <div></div>
          </header>
        </div>
      </div>
    </div>
  );
}
