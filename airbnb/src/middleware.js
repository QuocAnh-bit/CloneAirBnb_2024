import { getSession, signOut } from "next-auth/react";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { encode, getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

import authApi from "./api/authApi";
import { notFound } from "next/navigation";

const secret = process.env.NEXTAUTH_SECRET;
const urlApi = process.env.NEXT_PUBLIC_API_URL;

const getNavigate = async (propertyId, token) => {
  const navigate = await fetch(urlApi + `/properties/${propertyId}/navigate`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const response = await navigate.json();
  return response.data;
};

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
  const url = req?.nextUrl;
  console.log(url, "url");
  const session = await getToken({ req });

  const regex = regexId(url);
  if (regex) {
    try {
      const propertyId = regex.id;
      const data = await getNavigate(propertyId, session.accessToken);

      if (regex.type) {
        const {
          addStructure,
          category,
          addLocation,
          placeType,
          addFloorPlan,
          location,
          addAmenities,
          floorPlan,
          addPhotos,
          amenities,
          addTitle,
          photos,
          addDesc,
          title,
          addPrice,
          desc,
          addDiscount,
          price,
          addReceipt,
          addFinish,
        } = data;
        let check = false;

        switch (regex.type) {
          case "/privacy-type":
            if (!category || !addStructure) {
              return navigate(data, regex.id, req);
            }
            break;
          case "/location":
            if (!placeType || !addLocation) {
              return navigate(data, regex.id, req);
            }
            break;
          case "/floor-plan":
            if (!location || !addFloorPlan) {
              return navigate(data, regex.id, req);
            }
            break;
          case "/amenities":
            if (!floorPlan || !addAmenities) {
              return navigate(data, regex.id, req);
            }
            break;
          case "/photos":
            if (!amenities || !addPhotos) {
              return navigate(data, regex.id, req);
            }
            break;
          case "/title":
            if (!photos || !addTitle) {
              return navigate(data, regex.id, req);
            }
            break;
          case "/description":
            if (!title || !addDesc) {
              return navigate(data, regex.id, req);
            }
            break;
          case "/price":
            if (!desc || !addPrice) {
              return navigate(data, regex.id, req);
            }
            break;
          case "/discount":
            if (!price || !addDiscount) {
              return navigate(data, regex.id, req);
            }
            break;
          case "/receipt":
            if (!addReceipt) {
              return navigate(data, regex.id, req);
            }
            break;
          case "/publish-celebration":
            if (!addFinish) {
              return navigate(data, regex.id, req);
            }
            break;
          default:
            return notFound();
        }
      } else {
        return navigate(data, regex.id, req);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (url.pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const response = NextResponse.next();

  return response;
}

const navigate = (data, id, req) => {
  const routes = [
    { condition: data.addReceipt, path: "receipt" },
    { condition: data.addDiscount, path: "discount" },
    { condition: data.addPrice, path: "price" },
    { condition: data.addDesc, path: "description" },
    { condition: data.addTitle, path: "title" },
    { condition: data.addPhotos, path: "photos" },
    { condition: data.addAmenities, path: "amenities" },
    { condition: data.addFloorPlan, path: "floor-plan" },
    { condition: data.addLocation, path: "location" },
    { condition: data.addPrivacy, path: "privacy-type" },
    { condition: data.addStructure, path: "structure" },
  ];

  // Find the first matching condition
  const matchedRoute = routes.find((route) => route.condition);

  // Determine the redirect path, defaulting to 'structure' if no condition matches
  const redirectPath = matchedRoute ? matchedRoute.path : "about-your-place";

  // Perform the redirect
  return NextResponse.redirect(
    new URL(`/become-a-host/${id}/${redirectPath}`, req.url)
  );
};

const regexId = (url) => {
  const pattern = /\/become-a-host\/([0-9a-fA-F-]{36})(\/.*)?/;

  const pathname = url.pathname;

  const match = pathname.match(pattern);

  if (match) {
    if (match[2]) {
      return {
        id: match[1],
        type: match[2],
      };
    } else {
      return {
        id: match[1],
        type: "",
      };
    }
  } else {
    return null;
  }
};

export const config = {
  matcher: ["/", "/become-a-host/:path*", "/login", "/rooms/:path*"],
};
