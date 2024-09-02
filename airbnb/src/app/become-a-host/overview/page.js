import OverView from "./OverView";

export const metadata = {
  title: "Create your listing - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};

export default async function page() {
  return (
    <div>
      <OverView />
    </div>
  );
}
