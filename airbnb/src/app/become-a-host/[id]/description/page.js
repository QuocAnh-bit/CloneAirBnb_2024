import React from "react";
import Description from "./Description";
export const metadata = {
  title: "Describe your place - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};

export default function page({ params }) {
  return (
    <div>
      <Description params={params} />
    </div>
  );
}
