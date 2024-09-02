import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NoMatch() {
  return (
    <div className="flex justify-center w-full flex-col items-center">
      <Image
        src="https://a0.muscache.com/pictures/87444596-1857-4437-9667-4f9cb4f5baf2.jpg"
        alt="Example Image"
        width={300}
        height={352}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="font-bold">No matches found</div>
      <div>
        Try changing your search or{" "}
        <Link
          href={"/become-a-host"}
          className="font-medium text-black/85 underline"
        >
          create a new listing.
        </Link>
      </div>
    </div>
  );
}
