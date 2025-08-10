import { href, Link } from "react-router";
import type { Route } from "./+types/home";
import horizontalPostcard from "/postcard-horizontal.svg";
import verticalPostcard from "/postcard-vertical.svg";

const navigationLinks: Array<{
  href: Parameters<typeof href>[0];
  label: string;
}> = [
  { href: "/rsvp", label: "RSVP" },
  { href: "/about", label: "About" },
  { href: "/timeline", label: "Timeline" },
  { href: "/registry", label: "Registry" },
  { href: "/travel", label: "Travel & Stay" },
];

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
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="whitespace-nowrap">
                  {link.label}
                </Link>
              </li>
            ))}
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
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="block px-fluid-sm py-fluid-xs hover:bg-stone-200 transition-colors whitespace-nowrap"
                      onClick={() =>
                        document.getElementById("mobile-menu")?.hidePopover()
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
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
