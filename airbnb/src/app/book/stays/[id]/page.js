import Logo from "@/app/components/navbar/Logo";
import React, { Suspense } from "react";

import NavBar from "../../components/NavBar";
import Payment from "../../components/Payment";
import getCurrentUser from "@/app/components/navbar/UserServer";
import Loading from "./loading";

export default async function page({ params, searchParams }) {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <NavBar />
      <Suspense fallback={<Loading />}>
        <Payment
          params={params}
          user={currentUser}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}
