import { href, Link } from "react-router";
import type { Route } from "./+types/home";
import horizontalPostcard from "/postcard-horizontal.svg";
import verticalPostcard from "/postcard-vertical.svg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Zack & Julia" },
    { name: "description", content: "Zack & Julia are getting married!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="h-screen grid grid-rows-[min-content_1fr] p-fluid-xs gap-fluid-xs text-stone-800">
      <div className="@container [--switcher-threshold:60rem] grid grid-cols-1 gap-fluid-xs relative">
        <nav className="text-fluid-lg sticky top-fluid-xs bg-stone-100 p-fluid-xs pt-fluid-sm border-3 border-double">
          <ul className="flex flex-wrap justify-around *:grow *:max-w-min font-light">
            <li>
              <Link to={href("/rsvp")}>RSVP</Link>
            </li>
            {/* <li className="px-fluid-2xs font-light">/</li> */}
            <li>
              <Link to={href("/about")}>About</Link>
            </li>
            {/* <li className="px-fluid-2xs font-light">/</li> */}
            <li>
              <Link to={href("/timeline")}>Timeline</Link>
            </li>
            {/* <li className="px-fluid-2xs font-light">/</li> */}
            <li>
              <Link to={href("/registry")}>Registry</Link>
            </li>
            {/* <li className="px-fluid-2xs font-light">/</li> */}
            <li>
              <Link to={href("/travel")} className="whitespace-nowrap">Travel & Stay</Link>
            </li>
          </ul>
        </nav>
        <img
          src={verticalPostcard}
          alt="Postcard"
          className="border-3 border-double border-white shadow @min-[60rem]:hidden"
        />
        <img
          src={horizontalPostcard}
          alt="Postcard"
          className="border-3 border-double border-white shadow @max-[60rem]:hidden"
        />
      </div>
    </div>
  );
}
