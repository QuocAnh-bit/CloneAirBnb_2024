import { BeatLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[10000] flex flex-1 items-center justify-center bg-black/15">
      <BeatLoader color="#000000" />
    </div>
  );
}
