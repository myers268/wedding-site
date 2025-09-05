import type { Route } from "./+types/home";
import landscapeInvite from "/invite-landscape.svg";
import portraitInvite from "/invite-portrait.svg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Zack & Julia" },
    { name: "description", content: "Zack & Julia are getting married!" },
  ];
}

export default function Home() {
  return (
    <div className="pt-fluid-sm">
      <img
        src={portraitInvite}
        alt="Postcard"
        className="border-3 border-double border-white shadow @min-[32rem]:hidden w-full"
      />
      <img
        src={landscapeInvite}
        alt="Postcard"
        className="border-3 border-double border-white shadow @max-[32rem]:hidden w-full"
      />
    </div>
  );
}
