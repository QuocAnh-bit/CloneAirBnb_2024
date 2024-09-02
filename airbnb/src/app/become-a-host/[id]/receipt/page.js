import React from "react";
import Receipt from "./Receipt";

export const metadata = {
  title: "Review and save your listing  - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};

export default function page({ params }) {
  return (
    <div>
      <Receipt params={params} />
    </div>
  );
}
