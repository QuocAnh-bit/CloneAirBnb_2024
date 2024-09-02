import React from "react";
import FloorPlan from "./FloorPlan";
export const metadata = {
  title: "Select the total guests - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};

export default function page({ params }) {
  return (
    <div>
      <FloorPlan params={params} />
    </div>
  );
}
