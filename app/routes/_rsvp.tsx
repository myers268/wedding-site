import { Outlet } from "react-router";

export default function RsvpLayout() {
  return (
    <div className="grid *:[grid-area:1/1] gap-fluid-sm max-w-[40rem] mx-auto">
      <div className="grid *:[grid-area:1/1] mx-fluid-md">
        <div className="bg-sage-500 w-[2px]" />
        <div className="bg-sage-500 w-[2px] ml-auto" />
      </div>
      <div className="grid place-items-center gap-fluid-sm text-fluid-base pt-fluid-sm">
        <Outlet />
      </div>
    </div>
  );
}
