import { Form, isRouteErrorResponse, Outlet } from "react-router";

import type { Route } from "../routes/+types/rsvp";

export default function Rsvp() {
  return (
    <>
      <div className="bg-stone-100 border-3 border-double w-full">
        <h1 className="text-fluid-3xl/(--spacing-fluid-3xl) font-cursive flex justify-center">
          RSVP
        </h1>
        <Form
          method="POST"
          action="search"
          className="grid gap-fluid-xs p-fluid-xs"
        >
          <label className="flex gap-fluid-xs whitespace-nowrap font-light">
            Name:
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
            Send
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
