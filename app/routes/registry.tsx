import { Link } from "react-router";

export default function Registry() {
  return (
    <div className="grid grid-cols-[min-content_1fr] gap-fluid-sm pt-fluid-sm">
      <Link to="https://www.target.com/gift-registry/gift-giver?registryId=804f7ef0-5fdd-11f0-b292-1d3dfaab4bde&type=WEDDING">
        Target
      </Link>
      <Link to="https://www.crateandbarrel.com/gift-registry/julia-wygant/r7363726">Crate & Barrel</Link>
      <Link to="https://www.amazon.com/wedding/registry/23PL3HHJM6V38">Amazon</Link>
    </div>
  );
}
