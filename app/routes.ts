import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/home.tsx"),
    // route("/about", "routes/about.tsx"),
    layout("routes/_rsvp.tsx", [
      route("/rsvp", "routes/rsvp.tsx", [
        route("search", "routes/rsvp.search.tsx", [
          route("events", "routes/rsvp.events.tsx"),
        ]),
      ]),
      route("/rsvp/attendance", "routes/rsvp.attendance.tsx"),
    ]),
    // route("/timeline", "routes/timeline.tsx"),
    route("/travel", "routes/travel.tsx"),
    route("/faqs", "routes/faqs.tsx"),
  ]),
] satisfies RouteConfig;
