import React, { Suspense } from "react";
import NavBar from "./components/NavBar";
import Loading from "./loading";

import Main from "./components/Main";
export default function LayoutCreate({ children }) {
  return (
    <div className="overflow-y-hidden scrollbar-hide ">
      <NavBar />
      <Main>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </Main>
    </div>
  );
}
