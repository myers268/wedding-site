import { Form, isRouteErrorResponse, Outlet } from "react-router";

import type { Route } from "../routes/+types/rsvp";

export default function Rsvp() {
  return (
    <>
      <div className="text-fluid-xl/(--spacing-fluid-xl) font-handwritten">Let us know you're coming!</div>
      <div className="size-16 bg-sage-500 mask-(--curly-arrow) mask-no-repeat mask-contain -rotate-90 -scale-x-100"></div>
      <div className="bg-stone-100 border-3 border-double w-full">
        <Form
          method="POST"
          action="search"
          className="grid gap-fluid-xs p-fluid-xs text-fluid-base"
        >
          <label className="grid gap-fluid-xs whitespace-nowrap font-light">
            <span className="tracking-widest italic">Name:</span>
            <input
              name="name"
              className="outline-none h-fluid-base border-b border-ebony w-full"
              autoComplete="name"
            />
          </label>
          <button
            type="submit"
            className="bg-sage-500 text-white p-fluid-xs font-light"
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
    <div className="bg-stone-100 border-2 border-double w-full max-w-[50ch]">
      <div className="grid gap-fluid-xs p-fluid-xs">{errorMessage}</div>
    </div>
  );
}
