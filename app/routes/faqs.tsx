export default function Faqs() {
  return (
    <div className="grid gap-fluid-2xs text-fluid-base">
      <div className="relative isolate mx-auto mt-fluid-2xs">
        {/* <div className="-z-10 absolute inset-0 blob-2 bg-rust-300/30 -scale-120 -translate-y-6 translate-x-4" /> */}
        <div className="-z-10 absolute inset-0 blob-1 bg-stone-100/60 scale-150 -rotate-45 -translate-x-4" />
        <div className="-z-10 absolute inset-0 blob-3 bg-sage-500/35 scale-150 rotate-12 translate-x-8" />
        <div className="-z-10 absolute inset-0 blob-2 bg-rust-500/35 scale-150 translate-y-12" />
        <h1 className="font-cursive text-fluid-2xl/(--spacing-fluid-3xl) text-balance text-center">
          FAQs
        </h1>
      </div>
      <dl className="grid gap-fluid-lg max-w-[40rem] mx-auto font-light">
        <div className="grid gap-fluid-2xs">
          <dt>When do I need to RSVP by?</dt>
          <dd className="border-l pl-fluid-xs italic">
            Please RSVP by November 2nd, 2025.
          </dd>
        </div>

        <div className="grid gap-fluid-2xs">
          <dt>Will there be a reception?</dt>
          <dd className="border-l pl-fluid-xs italic">
            Yes, there will be a brief evening social after the ceremony
            followed by a reception at St. Francis Hall. We'll bring the dinner,
            you bring the dancing!
          </dd>
        </div>

        <div className="grid gap-fluid-2xs">
          <dt>Is there parking at the venue?</dt>
          <dd className="border-l pl-fluid-xs italic">
            Yes, there is plenty of free parking at the venue. But if you don't
            have a car, don't fret! You can easily get to St. Francis Hall via
            metro, bus, or — if you're daring — by bike! Uber/Lyft is also
            available.
          </dd>
        </div>

        <div className="grid gap-fluid-2xs">
          <dt>What is the dress code?</dt>
          <dd className="border-l pl-fluid-xs italic">
            Since we're ringing in the new year with a celebration of love, we'd
            love for you to join us in your cocktail best. You might find D.C.
            winter to be bitterly cold if you're from the PNW or rather mild if
            you're from the Midwest; play it safe and pack a big coat and some
            dancing shoes!
          </dd>
        </div>

        <div className="grid gap-fluid-2xs">
          <dt>Can I bring my children?</dt>
          <dd className="border-l pl-fluid-xs italic">
            Yes! We would love to see your little ones making moves on the dance
            floor! Please make sure to include them in your RSVP so we can
            accomodate accordingly.
          </dd>
        </div>

        <div className="grid gap-fluid-2xs">
          <dt>Can I bring a plus one?</dt>
          <dd className="border-l pl-fluid-xs italic">
            Although we would love to offer a plus-one to all of our guests, we
            have a limited guest list. We appreciate your understanding and
            can't wait to celebrate with you.
          </dd>
        </div>

        <div className="grid gap-fluid-2xs">
          <dt>What time should I arrive at the ceremony?</dt>
          <dd className="border-l pl-fluid-xs italic">
            Please arrive no later than 4:15 p.m. so that we can get started
            promptly at 4:30 p.m.
          </dd>
        </div>
      </dl>
    </div>
  );
}
