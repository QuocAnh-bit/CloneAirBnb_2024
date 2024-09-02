import Location from "./Location";
export const metadata = {
  title: "Enter the location - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};
export default function page({ params }) {
  return (
    <div>
      <Location params={params} />
    </div>
  );
}
