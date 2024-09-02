import React from "react";
import PrivacyType from "./PrivacyType";
export const metadata = {
  title: "Choose the type of place you have - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};

export default function page({ params }) {
  return (
    <div>
      <PrivacyType params={params} />
    </div>
  );
}
