import { Outlet } from "react-router";

export default function RsvpLayout() {
  return (
    <div className="grid place-items-center gap-fluid-sm text-fluid-base pt-fluid-sm max-w-[40rem] mx-auto">
      <Outlet />
    </div>
  );
}
