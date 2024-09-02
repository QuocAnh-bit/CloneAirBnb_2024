"use client";
import React from "react";
import { Avatar, Card, CardBody } from "@nextui-org/react";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Item from "../components/Item";
import authApi from "@/api/authApi";
import ArrowIcon from "../components/icons/ArrowIcon";
import UserIcon from "../components/icons/UserIcon";
import SettingIcon from "../components/icons/SettingIcon";

export default function Page() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await authApi.logOut({ access_token: session.accessToken });
    signOut({ callbackUrl: "/", redirect: true });
  };

  return (
    <div>
      <h1 className="px-6 mt-12 mb-9 text-4xl font-bold ">Profile</h1>
      <div className="mx-6 mt-4 mb-16">
        <Link
          href={"#"}
          className=" flex justify-between items-center w-full mb-4"
        >
          <div className="flex gap-5 items-center">
            <Avatar
              name={session?.user?.username}
              size="lg"
              classNames={{
                base: "bg-[#222222]",
              }}
              className="text-white"
            />
            <div>
              <h2 className="text-xl font-medium leading-4">
                {session?.user?.username}
              </h2>
              <div className="font-thin">
                <div>Show profile</div>
              </div>
            </div>
          </div>
          <div>
            <ArrowIcon className={"h-6 w-6"} strokeWidth={2} />
          </div>
        </Link>
        <hr />
        <Card className="my-6 p-6" as={Link} href={"/become-a-host"}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-[18px]">Airbnb your place</h2>
              <p className="text-[14px]">
                It’s simple to get set up and start earning.
              </p>
            </div>
            <div>
              <Image
                src="https://a0.muscache.com/pictures/b0021c55-05a2-4449-998a-5593567220f7.jpg"
                width={104}
                height={88}
                alt="Picture of the author"
              />
            </div>
          </div>
        </Card>
        <div className="pb-4">
          <Item Icon={UserIcon} link={"/"} title={"Personal info"} />
          <Item Icon={SettingIcon} link={"/"} title={"Account"} />
        </div>
        <hr />
        <div className="mt-4 py-6">
          <div className="flex gap-3 mb-6">
            <span>English</span>
            <span>USD</span>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="w-full bg-white border-black border-1 rounded-md  font-bold py-3"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
