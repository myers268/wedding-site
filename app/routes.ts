import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),
  route("/registry", "routes/registry.tsx"),
  // route("/rsvp", "routes/rsvp.tsx"),
  route("/timeline", "routes/timeline.tsx"),
  route("/travel", "routes/travel.tsx"),
] satisfies RouteConfig;
