export default function Timeline() {
  return (
    <div className="grid grid-cols-[min-content_1fr_2fr] gap-fluid-xs p-fluid-2xs h-full min-h-dvh">
      <div
        className="text-fluid-3xl font-extralight tracking-[0.5em] text-sage-700 text-shadow-2xs text-shadow-sage-300/50 pr-fluid-2xs pt-fluid-sm"
        style={{ writingMode: "vertical-lr" }}
      >
        TIMELINE
      </div>

      <div className="col-span-2" />

      {/* Vertical line */}
      <div className="grid *:[grid-area:1/1] relative">
        <div className="absolute w-0.5 bg-sage-500 top-0 bottom-0 justify-self-center" />
      </div>

      {/* Timeline rows */}
      <div className="text-fluid-base grid grid-cols-subgrid col-start-2 col-span-2 gap-fluid-xs justify-start min-h-[calc(100dvh-var(--spacing-fluid-2xs)*2)] auto-rows-min">
        <div className="font-semibold font-handwritten whitespace-nowrap">
          5:30 PM
        </div>
        <div className="">Ceremony begins</div>
        <div className="font-semibold font-handwritten whitespace-nowrap">
          6:00 PM
        </div>
        <div className="">Mocktail Minutes</div>
        <div className="font-semibold font-handwritten whitespace-nowrap">
          6:30 PM
        </div>
        <div className="">Reception begins</div>
        <div className="font-semibold font-handwritten whitespace-nowrap">
          7:00 PM
        </div>
        <div className="">Dinner</div>
        <div className="font-semibold font-handwritten whitespace-nowrap">
          11:00 PM
        </div>
        <div className="">Farewell celebration</div>
      </div>
    </div>
  );
}
