import { href, Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
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
      <img src="/cherry-blossoms.jpg" className="stamp justify-self-end" />
      <div className="flex flex-wrap gap-fluid-xs @container [--switcher-threshold:60rem]">
        <div className="py-fluid-md grow-2 text-center grid gap-fluid-lg basis-[calc((var(--switcher-threshold)-100%)*9999)]">
          <div className="font-sans text-pretty text-fluid-lg mt-auto">
            JOIN US FOR THE WEDDING OF
          </div>
          <div className="font-cursive text-fluid-4xl">
            <div>Zackary Myers</div>
            <div>&</div>
            <div>Julia Wygant</div>
          </div>
        </div>
        <div className="bg-stone-50 w-px @max-[60rem]:hidden" />
        <div className="-mx-fluid-xs p-fluid-lg @max-[60rem]:p-fluid-sm place-self-center grid place-items-center basis-[calc((var(--switcher-threshold)-100%)*9999)]">
          <div className="bg-stone-100 p-fluid-xl text-fluid-lg w-full *:min-w-fluid-5xl *:border-b *:border-stone-500 grid gap-fluid-md font-handwritten">
            <Link to={href("/")}>About</Link>
            <Link to={href("/")}>RSVP</Link>
            <Link to={href("/timeline")}>Timeline</Link>
            <Link to={href("/")}>Registry</Link>
            <Link to={href("/")}>Travel & stay</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
