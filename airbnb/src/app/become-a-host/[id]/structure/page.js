import React from "react";
import Structure from "./Structure";
export const metadata = {
  title: "Choose your property type - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};

export default function page({ params }) {
  return (
    <div>
      <Structure params={params} />
    </div>
  );
}
