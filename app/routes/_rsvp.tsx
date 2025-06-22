import { Outlet } from "react-router";

export default function RsvpLayout() {
  return (
    <div className="grid place-items-center p-fluid-sm gap-fluid-sm text-fluid-base">
      <Outlet />
    </div>
  );
}
