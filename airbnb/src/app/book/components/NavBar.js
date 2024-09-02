import Logo from "@/app/components/navbar/Logo";
import React from "react";

export default function NavBar() {
  return (
    <div className="relative border-b-1 left-0 right-0 flex h-20 items-center ">
      <div className="pl-6">
        <Logo full={true} />
      </div>
    </div>
  );
}
