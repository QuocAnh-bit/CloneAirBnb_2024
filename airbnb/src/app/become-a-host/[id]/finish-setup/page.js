import React from "react";
import FinishSetup from "./FinishSetup";

export const metadata = {
  title: "Step 3: Finish your listing - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};

export default function page({ params }) {
  return (
    <div>
      <FinishSetup params={params} />
    </div>
  );
}
