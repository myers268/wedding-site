import { isRouteErrorResponse } from "react-router";

import type { Route } from "../routes/+types/rsvp.events";

export default function Events(_props: Route.ComponentProps) {
  return (
    <div className="bg-stone-100 border-2 border-double w-full max-w-[50ch]">
      <div className="grid gap-fluid-xs p-fluid-xs">
        Event
      </div>
    </div>
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
      <div className="grid gap-fluid-xs p-fluid-xs">
        {errorMessage}
      </div>
    </div>
  )
}
