import React from "react";
import Photos from "./Photos";
export const metadata = {
  title: "Add some photos - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};
export default function page({ params }) {
  return (
    <div>
      <Photos params={params} />
    </div>
  );
}
