export default function Timeline() {
  return (
    <div className="grid grid-cols-[min-content_1fr_2fr] grid-rows-[min-content_1fr] gap-fluid-sm pt-fluid-sm">
      <div
        className="text-fluid-3xl font-extralight tracking-[0.5em] text-sage-700 text-shadow-2xs text-shadow-sage-300/50"
        style={{ writingMode: "vertical-lr" }}
      >
        TIMELINE
      </div>
      <div className="grid *:[grid-area:1/1] -z-10 isolate col-span-2 place-self-center">

        {/* <div className="w-fluid-5xl blob-1 bg-radial-[at_50%_75%] from-red-100/50 via-rust-300/50 to-rust-700/50 to-90% rotate-90 scale-200 animate-spin duration-40000" /> */}
        {/* <div className="w-fluid-5xl blob-2 bg-radial-[at_50%_75%] bg-green-100/50 via-sage-500/50 to-sage-700/50 to-90% rotate-45 scale-200 animate-spin duration-70000" /> */}
        <div className="w-fluid-5xl blob-1 bg-rust-300/50 rotate-90 scale-200 animate-spin duration-40000" />
        <div className="w-fluid-5xl blob-2 bg-sage-500/50 rotate-45 scale-200 animate-spin duration-70000" />
        <div className="w-fluid-5xl blob-3 bg-sage-300/50 rotate-180 scale-200 animate-spin duration-90000" />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex-1 bg-sage-500 w-[2px]" />
      </div>
      <div className="text-fluid-base font-light grid grid-cols-subgrid col-start-2 col-span-2 gap-fluid-xs justify-start min-h-[calc(100dvh-var(--spacing-fluid-xl)*2)] auto-rows-min">
        <div className="font-semibold font-handwritten whitespace-nowrap">
          4:30 PM
        </div>
        <div className="">Ceremony begins</div>
        <div className="font-semibold font-handwritten whitespace-nowrap">
          5:00 PM
        </div>
        <div className="">Mocktail Minutes</div>
        <div className="font-semibold font-handwritten whitespace-nowrap">
          5:30 PM
        </div>
        <div className="">Reception begins</div>
        <div className="font-semibold font-handwritten whitespace-nowrap">
          6:00 PM
        </div>
        <div className="">Dinner</div>
        <div className="font-semibold font-handwritten whitespace-nowrap">
          10:00 PM
        </div>
        <div className="">Farewell celebration</div>
      </div>
    </div>
  );
}
