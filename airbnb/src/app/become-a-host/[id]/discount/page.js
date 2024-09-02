import React from "react";
import Discount from "./Discount";

export const metadata = {
  title: "Set your discount - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};

export default function page({ params }) {
  return (
    <div>
      <Discount params={params} />
    </div>
  );
}
