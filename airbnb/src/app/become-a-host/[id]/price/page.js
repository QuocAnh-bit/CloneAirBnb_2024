import React from "react";
import Price from "./Price";

export const metadata = {
  title: "Set your price - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};

export default function page({ params }) {
  return (
    <div>
      <Price params={params} />
    </div>
  );
}
