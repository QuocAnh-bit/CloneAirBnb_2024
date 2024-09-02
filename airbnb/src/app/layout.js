import { Provider } from "react-redux";
import NavBar from "./components/navbar/Navbar";
import "./globals.css";
import { Roboto } from "next/font/google";
import Providers from "@/redux/Providers";
import Navigation from "./components/navigation/Navigation";
import ProvidersAuth from "./components/ProvidersAuth";
import getCurrentUser from "./components/navbar/UserServer";
import { ProvidersUi } from "./components/ProvidersUi";
import View from "./components/View";

const font = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  preload: false,
});
export const metadata = {
  title: "AirBnb",
  description: "Clone AirBnb",
};

export default async function RootLayout({ children, params }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ProvidersAuth>
          <Providers>
            <ProvidersUi>
              <View currentUser={currentUser}>{children}</View>
            </ProvidersUi>
          </Providers>
        </ProvidersAuth>
      </body>
    </html>
  );
}
