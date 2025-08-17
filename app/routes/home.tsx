import type { Route } from "./+types/home";
import horizontalPostcard from "/postcard-horizontal.svg";
import verticalPostcard from "/postcard-vertical.svg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Zack & Julia" },
    { name: "description", content: "Zack & Julia are getting married!" },
  ];
}

export default function Home() {
  return (
    <>
      <img
        src={verticalPostcard}
        alt="Postcard"
        className="border-3 border-double border-white shadow @min-[32rem]:hidden my-auto"
      />
      <img
        src={horizontalPostcard}
        alt="Postcard"
        className="border-3 border-double border-white shadow @max-[32rem]:hidden my-auto"
      />
    </>
  );
}
