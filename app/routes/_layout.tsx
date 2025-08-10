import { href, Link, Outlet } from "react-router";

const navigationLinks: Array<{
  href: Parameters<typeof href>[0];
  label: string;
}> = [
  // { href: "/", label: "Home" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/about", label: "About" },
  { href: "/timeline", label: "Timeline" },
  { href: "/registry", label: "Registry" },
  { href: "/travel", label: "Travel & Stay" },
];

export default function Layout() {
  return (
    <div className="@container grid p-fluid-xs gap-fluid-xs max-w-[60rem] w-full mx-auto relative text-stone-800">
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
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
