import React, { Suspense } from "react";
import NavBar from "./components/NavBar";
import Loading from "./loading";

export default function LayoutHosting({ children }) {
  return (
    <div>
      <NavBar />
      <main className="px-6 md:px-20 ">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </div>
  );
}
