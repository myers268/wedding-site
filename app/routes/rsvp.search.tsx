import { isRouteErrorResponse, redirect } from "react-router";

import type { Route } from "./+types/rsvp.search";

import { GuestNotFoundError, getGuestByFullName } from "#services/guests";
import { createUserSession } from "#services/session";

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString() ?? "";

  const guest = await getGuestByFullName(context.cloudflare.db, name).catch((e) => {
    if (e instanceof GuestNotFoundError) {
      // console.log(e);
      throw new Response(
        "Oops! Make sure you type your name exactly as it is written on your invitation."
      );
    }
    throw e;
  });

  // Create user session with guest identifier
  const sessionCookie = await createUserSession(request, guest.fullName);

  throw redirect("/rsvp/attendance", {
    headers: {
      "Set-Cookie": sessionCookie,
    }
  });
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
