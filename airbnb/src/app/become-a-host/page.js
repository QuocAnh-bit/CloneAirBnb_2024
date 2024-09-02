import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import BecomeAHost from "./BecomeAHost";

export default async function page() {
  const data = await getServerSession(authOptions);

  return <BecomeAHost user={data} />;
}
