export default function About() {
  const col = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  return (
    <article className="grid gap-fluid-xs">
      <section>
        <h2 className="font-cursive text-fluid-2xl leading-fluid-3xl text-center">
          Us
        </h2>
        {/* <div className="px-fluid-xs"> */}
        <div className="grid *:[grid-area:1/1] place-items-center *:first:rotate-1 p-fluid-xs">
          <div className="bg-white max-w-md p-fluid-xs pb-fluid-xl shadow">
            <img
              src="/hero.jpeg"
              className="aspect-[4/3] object-cover size-full border border-stone-900/5"
              // className="aspect-[4/3] object-cover size-full border border-stone-900/5 mask-radial-[100%_100%] mask-radial-from-85% mask-radial-to-120% mask-radial-at-bottom-right"
            />
          </div>
        </div>
        <div className="p-fluid-xs max-w-[100ch] mx-auto text-lg text-justify">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
          Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
          hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
          per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet
          consectetur adipiscing elit. Quisque faucibus ex sapien vitae
          pellentesque sem placerat. In id cursus mi pretium tellus duis
          convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
          fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
          malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class
          aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos
          himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit.
          Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
          cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
          urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
          egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
          hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
          per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet
          consectetur adipiscing elit. Quisque faucibus ex sapien vitae
          pellentesque sem placerat. In id cursus mi pretium tellus duis
          convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
          fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
          malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class
          aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos
          himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit.
          Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
          cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
          urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
          egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
          hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
          per conubia nostra inceptos himenaeos.
        </div>
      </section>

      <section className="bg-sage-300 @container">
        <h2 className="font-cursive text-fluid-2xl leading-fluid-3xl text-center">
          The Wedding Party
        </h2>
        <div className="grid grid-cols-3 p-fluid-xs max-w-[100ch] mx-auto text-lg">
          {col.map((x) => {
            return (
              <div
                key={x.id}
                className="group col-span-3 grid grid-cols-subgrid grid-rows-[min-content_1fr] *:row-span-2 @max-[70rem]:*:row-span-1 grid-flow-col py-fluid-xs gap-fluid-xs"
              >
                <div className="frame before:bg-white group-even:-col-end-1 @max-[70rem]:col-span-3 drop-shadow-sm drop-shadow-sage-700/20 @max-[70rem]:max-w-[30ch] mx-auto">
                  <img
                    src="/mirage.jpg"
                    className="aspect-square object-cover"
                  />
                </div>
                <div className="col-span-2 @max-[70rem]:col-span-3 @max-[70rem]:max-w-[70ch] mx-auto">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  Quisque faucibus ex sapien vitae pellentesque sem placerat. In
                  id cursus mi pretium tellus duis convallis. Tempus leo eu
                  aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus
                  nec metus bibendum egestas. Iaculis massa nisl malesuada
                  lacinia integer nunc posuere. Ut hendrerit semper vel class
                  aptent taciti sociosqu. Ad litora torquent per conubia nostra
                  inceptos himenaeos. Lorem ipsum dolor sit amet consectetur
                  adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                  sem placerat. In id cursus mi pretium tellus duis convallis.
                  Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
                  fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
                  malesuada lacinia integer nunc posuere. Ut hendrerit semper
                  vel class aptent taciti sociosqu. Ad litora torquent per
                  conubia nostra inceptos himenaeos.
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}
