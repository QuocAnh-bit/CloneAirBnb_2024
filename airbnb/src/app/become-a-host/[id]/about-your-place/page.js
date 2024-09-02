import React from "react";
import AboutPlace from "./AboutPlace";

export const metadata = {
  title: "Step 1: Tell us about your place - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};

export default function page({ params }) {
  return (
    <div>
      <AboutPlace params={params} />
    </div>
  );
}
