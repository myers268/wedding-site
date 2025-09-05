import {
  Form,
  isRouteErrorResponse,
  Link,
  redirect,
  useSearchParams,
} from "react-router";

import type { Route } from "./+types/rsvp.search";

import {
  GuestNotFoundError,
  getPrimaryGuestByFullName,
} from "#services/guests";
import { createUserSession } from "#services/session";
import { Button, Dialog, DialogTrigger, Modal } from "react-aria-components";

export async function loader({ request, context }: Route.ActionArgs) {
  const searchParams = new URL(request.url).searchParams;
  if (!searchParams.has("name")) return;
  const name = searchParams.get("name") ?? "";

  const guest = await getPrimaryGuestByFullName(
    context.cloudflare.db,
    name
  ).catch((e) => {
    if (e instanceof GuestNotFoundError) {
      throw new Response(
        "Oops! Make sure you type your name exactly as it is written on your invitation."
      );
    }
    throw e;
  });

  // Create user session with guest identifier
  const sessionCookie = await createUserSession(request, guest.fullName!); // TODO: Handle case where fullName is null

  throw redirect("/rsvp/attendance", {
    headers: {
      "Set-Cookie": sessionCookie,
    },
  });
}

export default function RsvpSearch() {
  return null;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const errorMessage = isRouteErrorResponse(error)
    ? error.data
    : error instanceof Error
      ? error.message
      : error;

  const searchParams = useSearchParams()[0];
  const name = searchParams.get("name");

  return (
    <div
      ref={(node) => {
        node?.scrollIntoView({
          behavior: "smooth",
        });
      }}
      className="bg-stone-100 border-3 border-double w-full"
    >
      <div className="grid gap-fluid-xs p-fluid-xs">{errorMessage}</div>
      {name !== null ? (
        <div className="p-fluid-xs">
          If you're only attending the wedding shower,{" "}
          <ModalDialog value={name}>click here</ModalDialog> to register.
        </div>
      ) : null}
    </div>
  );
}

type ModalDialogProps = {
  children: React.ReactNode;
  value: string;
};

function ModalDialog({ children, value }: ModalDialogProps) {
  return (
    <DialogTrigger>
      <Button className="text-sage-500 inline underline text-fluid-base">
        {children}
      </Button>
      <Modal
        className="fixed top-0 left-0 w-full h-(--visual-viewport-height) isolate z-20 bg-black/[15%] backdrop-blur-xs grid place-items-center p-fluid-sm"
        isDismissable
      >
        <Dialog className="bg-stone-100 border-3 border-double p-fluid-sm max-w-[32rem] w-full text-left">
          <div className="grid gap-fluid-sm text-justify">
            <span>
              Hey! If you've been invited to the wedding, you're in the wrong
              spot! Try searching your name in the{" "}
              <Link className="text-sage-500 underline" to="/rsvp">
                RSVP page
              </Link>{" "}
              again to RSVP for our weddings showers and the main event itself.
            </span>
            Otherwise, please proceed to the next step.
            <Form method="GET" action="/rsvp/attendance">
              <input type="hidden" name="name" value={value} readOnly />
              <button
                type="submit"
                className="bg-sage-500 text-white p-fluid-xs w-full"
              >
                I know what I'm doing!
              </button>
            </Form>
          </div>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
