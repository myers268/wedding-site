export default function Timeline() {
  return (
    <div className="grid grid-cols-[min-content_1fr_1fr] gap-fluid-xs p-fluid-2xs h-full min-h-dvh">
      {/* <div className="py-fluid-xs h-full min-h-dvh flex flex-col items-center gap-fluid-xs"> */}
        <div
          className="text-fluid-3xl font-extralight tracking-[0.5em] text-sage-700 text-shadow-2xs text-shadow-sage-300/50 pr-fluid-2xs pt-fluid-sm"
          style={{ writingMode: "vertical-lr" }}
        >
          TIMELINE
        </div>

        <div className="col-span-2" />

        <div className="flex flex-col items-center relative">
          <div className="absolute w-0.5 bg-sage-500 top-0 bottom-fluid-md" />
          <div className="flex-1" />
          <div className="text-sage-500 sticky bottom-fluid-2xs">
            <svg
              className="size-fluid-xl"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 -1 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      {/* </div> */}

      {/* Empty first row for the right column */}
      {/* <div className="col-span-2" /> */}

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
