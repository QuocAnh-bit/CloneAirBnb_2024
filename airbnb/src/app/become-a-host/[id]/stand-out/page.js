import StandOut from "./StandOut";
export const metadata = {
  title: "Step 2: Make your place stand out - Airbnb",
  description:
    "Become a Host and Rent Out Your Room, House or Apartment on Airbnb",
};

export default function page({ params }) {
  return (
    <div>
      <StandOut params={params} />
    </div>
  );
}
