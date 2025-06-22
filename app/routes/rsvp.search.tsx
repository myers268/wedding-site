import { isRouteErrorResponse, redirect } from "react-router";

import type { Route } from "./+types/rsvp.search";

import type { Guest } from "#services/guests";
import { GuestNotFoundError, getGuestByFullName } from "#services/guests";
import { createUserSession } from "#services/session";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString() ?? "";

  const guest = await getGuestByFullName(name).catch((e) => {
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

// export async function loader({ request }: Route.LoaderArgs) {
//   const url = new URL(request.url);
//   const name = url.searchParams.get("name") ?? "";

//   const guest = await getGuestByFullName(name).catch((e) => {
//     if (e instanceof GuestNotFoundError) {
//       // console.log(e);
//       throw new Response(
//         "Oops! Make sure you type your name exactly as it is written on your invitation."
//       );
//     }
//     throw e;
//   });

//   return {
//     guest,
//   };
// }

// export default function Component({ loaderData }: Route.ComponentProps) {
//   return (
//     <>
//       <h2 className="text-fluid-xl/(--spacing-fluid-xl) font-cursive flex justify-center">
//         Guests
//       </h2>
//       <Guest guest={loaderData.guest} type="primary" />
//       {loaderData.guest.additionalGuests.guests.map((guest) => (
//         <Guest key={guest.fullName} guest={guest} type="secondary" />
//       ))}
//       <Outlet />
//     </>
//   );
// }

type GuestProps = {
  guest: Guest;
  type: "primary" | "secondary";
};

function Guest({ guest, type }: GuestProps) {
  return (
    <div className="bg-stone-100 border-2 border-double w-full max-w-[50ch]">
      {type === "primary" ? (
        <div className="grid gap-fluid-xs p-fluid-xs">
          <div className="grid font-handwritten whitespace-nowrap">
            <span>{guest.fullName}</span>
          </div>
        </div>
      ) : (
        <label className="grid font-handwritten whitespace-nowrap">
          <span className="sr-only">Additional guest name</span>
          <input
            className="p-fluid-xs outline-none ring-transparent ring-offset-rust-500 focus-visible:ring-1 focus-visible:ring-offset-2"
            name="guest-name"
            placeholder="Additional guest name"
            defaultValue={guest.fullName}
          />
        </label>
      )}
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
      <div className="grid gap-fluid-xs p-fluid-xs">{errorMessage}</div>
    </div>
  );
}
