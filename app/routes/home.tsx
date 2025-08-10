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
      <div className="@container grid grid-cols-1 gap-fluid-xs relative max-w-[60rem] w-full mx-auto">
        <nav className="text-fluid-base sticky top-fluid-xs bg-stone-100 p-fluid-xs pt-fluid-sm border-3 border-double">
          {/* Desktop navigation - visible on larger screens */}
          <ul className="@max-[32rem]:hidden flex flex-wrap justify-around *:grow *:max-w-min font-light">
            <li>
              <Link to={href("/rsvp")}>RSVP</Link>
            </li>
            <li>
              <Link to={href("/about")}>About</Link>
            </li>
            <li>
              <Link to={href("/timeline")}>Timeline</Link>
            </li>
            <li>
              <Link to={href("/registry")}>Registry</Link>
            </li>
            <li>
              <Link to={href("/travel")} className="whitespace-nowrap">
                Travel & Stay
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger menu - visible on smaller screens */}
          <div className="@min-[32rem]:hidden">
            <button
              className="flex items-center gap-fluid-xs font-light pb-1"
              popoverTarget="mobile-menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span className="-mb-1">Menu</span>
            </button>

            <div
              id="mobile-menu"
              popover=""
              className="p-fluid-xs backdrop:bg-black/20 backdrop:backdrop-blur-sm animate-in fade-in w-full bg-transparent"
            >
              <ul className="flex flex-col divide-y font-light border-3 border-double bg-stone-100 shadow-md">
                <li>
                  <Link
                    to={href("/rsvp")}
                    className="block px-fluid-sm py-fluid-xs hover:bg-stone-200 transition-colors"
                    onClick={() =>
                      document.getElementById("mobile-menu")?.hidePopover()
                    }
                  >
                    RSVP
                  </Link>
                </li>
                <li>
                  <Link
                    to={href("/about")}
                    className="block px-fluid-sm py-fluid-xs hover:bg-stone-200 transition-colors"
                    onClick={() =>
                      document.getElementById("mobile-menu")?.hidePopover()
                    }
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to={href("/timeline")}
                    className="block px-fluid-sm py-fluid-xs hover:bg-stone-200 transition-colors"
                    onClick={() =>
                      document.getElementById("mobile-menu")?.hidePopover()
                    }
                  >
                    Timeline
                  </Link>
                </li>
                <li>
                  <Link
                    to={href("/registry")}
                    className="block px-fluid-sm py-fluid-xs hover:bg-stone-200 transition-colors"
                    onClick={() =>
                      document.getElementById("mobile-menu")?.hidePopover()
                    }
                  >
                    Registry
                  </Link>
                </li>
                <li>
                  <Link
                    to={href("/travel")}
                    className="block px-fluid-sm py-fluid-xs hover:bg-stone-200 transition-colors whitespace-nowrap"
                    onClick={() =>
                      document.getElementById("mobile-menu")?.hidePopover()
                    }
                  >
                    Travel & Stay
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <img
          src={verticalPostcard}
          alt="Postcard"
          className="border-3 border-double border-white shadow @min-[32rem]:hidden"
        />
        <img
          src={horizontalPostcard}
          alt="Postcard"
          className="border-3 border-double border-white shadow @max-[32rem]:hidden"
        />
      </div>
    </div>
  );
}
