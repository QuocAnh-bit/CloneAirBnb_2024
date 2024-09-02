import React from "react";

export default function Video({ src }) {
  return (
    <video
      autoPlay="true"
      preload="auto"
      crossOrigin="anonymous"
      muted
      playsInline
      loop
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
