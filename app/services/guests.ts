import { guests } from "../data/guests";

export type { Guest } from "../data/guests";

export interface GuestNotFoundError {
  name: "guest_not_found",
  message: "Guest not found.",
}

export class GuestNotFoundError extends Error {
  constructor() {
    super();
    this.name = "guest_not_found";
    this.message = "Guest not found."
  }
}

export async function getGuestByFullName(name: string) {
  const guest = guests.find(x => x.fullName === name);

  if (typeof guest === "undefined") {
    throw new GuestNotFoundError();
  }

  return guest;
}
