import React from "react";
import Amenities from "./Amenities";
export const metadata = {
  title: "Choose your amenities - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};

export default function page({ params }) {
  return (
    <div>
      <Amenities params={params} />
    </div>
  );
}
