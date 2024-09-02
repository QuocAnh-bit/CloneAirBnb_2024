import React from "react";
import Title from "./Title";

export const metadata = {
  title: "Give your place title - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};

export default function page({ params }) {
  return (
    <div>
      <Title params={params} />
    </div>
  );
}
