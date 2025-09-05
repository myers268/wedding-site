import { Form, isRouteErrorResponse, Link, Outlet } from "react-router";

import type { Route } from "../routes/+types/rsvp";

export default function Rsvp() {
  return (
    <>
      <div className="grid gap-fluid-sm w-full">
        <div className="relative isolate mx-auto mt-fluid-2xs">
          <div className="-z-10 absolute inset-0 blob-2 bg-rust-300/35 -scale-100 -translate-y-12 -translate-x-14" />
          <div className="-z-10 absolute inset-0 blob-3 bg-stone-100/60 -scale-100 -translate-y-6 translate-x-14" />
          <h1 className="font-cursive text-fluid-2xl/(--spacing-fluid-3xl) text-balance text-center">
            Gift Registries
          </h1>
        </div>

        <ul className="text-fluid-base italic font-light sm:font-extralight grid gap-fluid-2xs">
          <li className="bg-stone-100 border-3 border-double p-fluid-2xs">
            <Link to="https://www.target.com/gift-registry/gift-giver?registryId=804f7ef0-5fdd-11f0-b292-1d3dfaab4bde&type=WEDDING">
              Target
            </Link>
          </li>
          <li className="bg-stone-100 border-3 border-double p-fluid-2xs">
            <Link to="https://www.crateandbarrel.com/gift-registry/julia-wygant/r7363726">
              Crate & Barrel
            </Link>
          </li>
          <li className="bg-stone-100 border-3 border-double p-fluid-2xs">
            <Link to="https://www.amazon.com/wedding/registry/23PL3HHJM6V38">
              Amazon
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="grid grid-flow-col place-items-center gap-fluid-sm mx-auto">
        <span className="text-balance text-fluid-xl/(--spacing-fluid-xl) font-handwritten">
          Let us know you're coming!
        </span>
        <div className="size-16 bg-sage-700 mask-(--curly-arrow) mask-no-repeat mask-contain -rotate-90 -scale-x-100"></div>
      </div>
      <div className="bg-stone-100 border-3 border-double w-full">
        <Form
          method="POST"
          action="search"
          className="grid gap-fluid-xs p-fluid-xs text-fluid-base font-light sm:font-extralight"
        >
          <label className="grid gap-fluid-xs whitespace-nowrap">
            <span className="tracking-widest italic">Name:</span>
            <input
              name="name"
              className="outline-none h-fluid-base border-b border-ebony w-full"
              autoComplete="name"
            />
          </label>
          <button
            type="submit"
            className="bg-sage-500 text-white p-fluid-xs"
          >
            Search
          </button>
        </Form>
      </div>
      <Outlet />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const errorMessage = isRouteErrorResponse(error)
    ? error.data
    : error instanceof Error
      ? error.message
      : error;

  return (
    <div className="bg-stone-100 border-3 border-double w-full">
      <div className="grid gap-fluid-xs p-fluid-xs">{errorMessage}</div>
    </div>
  );
}
