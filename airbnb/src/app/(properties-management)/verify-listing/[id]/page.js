import React from "react";
import VerifyListing from "./VerifyListing";

export default function page({ params }) {
  return (
    <div>
      <VerifyListing params={params} />
    </div>
  );
}
