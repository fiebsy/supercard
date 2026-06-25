/*
 * CARD-2026-05-14-gestalt-principles: deep-dive / XL React render path.
 *
 * Source of truth:  30-CARDS/CARD-2026-05-14-gestalt-principles--draft.md
 * Research report:   60-RESEARCH/BREAKDOWN-gestalt-principles.md
 * HTML twin:         docs/cards/CARD-2026-05-14-gestalt-principles.html
 *
 * This component is a *view* of the markdown card (frozen at v3.0.0), not a
 * source: re-derive it from the markdown, never hand-edit it as canonical.
 * 21 blocks: all 7 beats, 2 section dividers. Single emphasis per block.
 */
import {
  Hero,
  StandardText,
  DataTable,
  Quote,
  SectionDivider,
  Definition,
  NumberedList,
  Equation,
  MarkerList,
  KeyTakeaway,
  Sources,
  Glyph,
} from "../blocks";

export function GestaltPrinciples() {
  return (
    <div className="canvas">
      {/* Beat 1 - Hook */}
      <Hero
        title="Gestalt Principles"
        hook={
          <>
            You never see raw pixels. Before you are aware of looking, your
            visual system has already grouped, split, and completed the scene
            into objects, and the Gestalt principles are{" "}
            <strong>the catalogue of rules it uses</strong>.
          </>
        }
        lede={
          <>
            Three German psychologists asked why a row of dots looks like{" "}
            <em>a row</em> and not like <em>dots</em>. The answer became the
            working grammar of perception, and of design.
          </>
        }
      />

      {/* Beat 2 - Evidence: phi phenomenon */}
      <StandardText beat="Beat 2 · Evidence" eyebrow="The founding experiment">
        <p>
          In 1912, Max Wertheimer flashed two lights in alternation and people
          saw <strong>one light moving</strong>: motion where nothing moved.
          The percept was a whole that existed in no part.
        </p>
        <p>
          That experiment, the <em>phi phenomenon</em>, launched Gestalt
          psychology: the claim that perception builds wholes first, and the
          parts come after.
        </p>
      </StandardText>

      {/* Beat 2 - Evidence: timeline */}
      <DataTable
        beat="Beat 2 · Evidence"
        className="timeline"
        heading="It built, and outlived, a school of psychology"
        rows={[
          {
            cells: [
              "1912",
              "Wertheimer's phi-phenomenon paper: Gestalt psychology begins",
            ],
          },
          {
            cells: [
              "1923",
              "Wertheimer formalizes the laws of perceptual organization",
            ],
          },
          {
            cells: [
              "1935",
              <>
                Koffka's <em>Principles of Gestalt Psychology</em>
              </>,
            ],
          },
          {
            cells: ["1933→", "Founders flee Nazi Germany; the school scatters"],
          },
          {
            cells: [
              "1950s",
              "Köhler's brain-field theory refuted: Gestalt fades as a movement",
            ],
          },
          {
            focal: true,
            cells: [
              "2012",
              <>
                <strong>The principles are vindicated, the theory is not</strong>:{" "}
                <em>Psychological Bulletin</em> centennial review
              </>,
            ],
          },
        ]}
      />

      {/* Beat 2 - Evidence: Koffka quote */}
      <Quote
        beat="Beat 2 · Evidence"
        eyebrow="The canonical formulation"
        variant="evidence"
        quote={
          <>
            "The whole is <strong>other</strong> than the sum of its parts."
          </>
        }
      >
        <>
          Kurt Koffka, <em>Principles of Gestalt Psychology</em>, 1935. Not{" "}
          <em>"greater"</em>. Koffka corrected that himself. The whole is not{" "}
          <em>more</em> of the parts; it is something{" "}
          <em>qualitatively different</em>. "This is not a principle of
          addition."
        </>
      </Quote>

      {/* Section divider - Mechanism */}
      <SectionDivider rule="Mechanism" heading="How it works">
        One master law, the classic grouping principles, the figure/ground act,
        the modern additions, and the one principle turned into math.
      </SectionDivider>

      {/* Beat 3 - Mechanism: Prägnanz */}
      <Definition
        beat="Beat 3 · Mechanism"
        eyebrow="The master law"
        term="Prägnanz:"
      >
        <>
          the law every other Gestalt principle sits under. Given any
          stimulus, perception settles into the{" "}
          <strong>simplest, most regular, most stable</strong> organization the
          conditions allow. Each specific principle is just a particular way the
          visual system pursues that "good form."
        </>
      </Definition>

      {/* Beat 3 - Mechanism: process flow */}
      <NumberedList
        beat="Beat 3 · Mechanism"
        eyebrow="The order of operations"
        steps={[
          {
            body: (
              <>
                <strong>Carve:</strong> the image is first split into uniform,
                connected regions.
              </>
            ),
          },
          {
            body: (
              <>
                <strong>Assign:</strong> each region is judged figure or ground:
                object, or backdrop.
              </>
            ),
          },
          {
            body: (
              <>
                <strong>Group:</strong> the surviving elements are clustered by
                the grouping principles.
              </>
            ),
          },
        ]}
        closer={
          <>
            Palmer &amp; Rock's insight: grouping isn't first. The system{" "}
            <strong>partitions the image before it groups anything</strong>, and
            that partition can override the rest.
          </>
        }
      />

      {/* Beat 3 - Mechanism: classic grouping principles */}
      <NumberedList
        beat="Beat 3 · Mechanism"
        heading="The classic grouping principles"
        steps={[
          {
            body: (
              <>
                <strong>Proximity:</strong> elements close together are read as
                one group.
              </>
            ),
          },
          {
            body: (
              <>
                <strong>Similarity:</strong> elements sharing color, size, or
                shape are grouped.
              </>
            ),
          },
          {
            body: (
              <>
                <strong>Common fate:</strong> elements moving together are
                grouped.
              </>
            ),
          },
          {
            body: (
              <>
                <strong>Good continuation:</strong> elements on a smooth path
                are grouped; the eye prefers continuity over abrupt change.
              </>
            ),
          },
          {
            body: (
              <>
                <strong>Closure:</strong> incomplete figures are perceived as
                whole.
              </>
            ),
          },
          {
            body: (
              <>
                <strong>Symmetry / order:</strong> regular, symmetrical
                arrangements are grouped and preferred.
              </>
            ),
          },
        ]}
        closer={
          <>
            These are tendencies, <strong>not an algorithm</strong>: they
            describe what the system does, not a recipe that yields one answer.
          </>
        }
      />

      {/* Beat 3 - Mechanism: figure/ground */}
      <Definition
        beat="Beat 3 · Mechanism"
        eyebrow="The other organizing act"
        term="Figure/ground:"
      >
        <>
          distinct from grouping. Grouping decides which elements clump;
          figure/ground decides which region is <strong>the object</strong> (it
          owns the contour, has shape, sits in front) and which is mere
          backdrop. Reversible images like Rubin's vase show the assignment is
          an active, unstable <em>decision</em>, not a given.
        </>
      </Definition>

      {/* Beat 3 - Mechanism: modern additions */}
      <DataTable
        beat="Beat 3 · Mechanism"
        heading="The set is open, not fixed"
        head={["Principle", "What it adds", "Added"]}
        rows={[
          {
            cells: [
              "Common region",
              "elements inside a shared boundary group, even against proximity",
              "1992",
            ],
          },
          {
            cells: [
              "Uniform connectedness",
              "a uniform, connected region groups, and can override proximity and similarity",
              "1994",
            ],
          },
          {
            cells: [
              "Element connectedness",
              "physically joined elements group",
              "1994",
            ],
          },
          {
            cells: [
              "Synchrony",
              "elements changing at the same instant group: common fate, generalized",
              "modern",
            ],
          },
        ]}
        closer={
          <>
            There is <strong>no canonical count</strong> of Gestalt principles:
            the set has grown for a century and is still growing.
          </>
        }
      />

      {/* Beat 3 - Mechanism: equation */}
      <Equation
        beat="Beat 3 · Mechanism"
        heading="The one principle turned into math"
        intro={
          <>
            For proximity, grouping is fully predicted by <em>relative</em>{" "}
            distance:
          </>
        }
        formula={"log-odds = k · log(d₁ / d₂)"}
        closer={
          <>
            In an ambiguous dot lattice, the odds of seeing one grouping over a
            competitor depend{" "}
            <strong>only on the ratio of the competing distances</strong>, not
            absolute spacing, not overall symmetry. The vague Victorian "near
            things group" became a precise, fitted law (Kubovy &amp; Wagemans,
            1995).
          </>
        }
      />

      {/* Beat 4 - Comparison: Gestalt vs structuralism */}
      <DataTable
        beat="Beat 4 · Comparison"
        heading="Two accounts of how perception works"
        head={["", "Structuralism", "Gestalt"]}
        rows={[
          { cells: ["Unit of mind", "atomic sensations", "structured wholes"] },
          { cells: ["Perception is", "addition", "organization"] },
          {
            focal: true,
            cells: [
              "The phi test",
              "can't explain it",
              <strong>predicts it</strong>,
            ],
          },
          { cells: ["Determines what", "parts → whole", "whole → parts"] },
        ]}
        closer={
          <>
            The phi phenomenon was the wedge: you{" "}
            <strong>
              cannot build "motion" by adding two static flashes
            </strong>
            . The whole had to come first.
          </>
        }
      />

      {/* Beat 4 - Comparison: principles against principles */}
      <StandardText
        beat="Beat 4 · Comparison"
        eyebrow="Principles against principles"
      >
        <p>
          The principles <strong>compete and combine</strong>: a layout can pit
          proximity against similarity against common region, and the percept is
          whatever organization fits best. For proximity and similarity, that
          combination is quantifiably <em>additive</em>.
        </p>
        <p>
          And mind the name collision: Gestalt <em>therapy</em> (Perls, 1940s)
          borrowed the word but has no line back to this perceptual research:
          different field entirely.
        </p>
      </StandardText>

      {/* Section divider - Counter */}
      <SectionDivider rule="Counter" heading="The honest steelman">
        What failed, what stayed vague, and why "principles" is the right word
        and "theory" is not.
      </SectionDivider>

      {/* Beat 5 - Counter: anti-pattern */}
      <MarkerList
        beat="Beat 5 · Counter"
        heading="Where the Gestalt account is weak"
        marker="✕"
        items={[
          <>
            <strong>The explanatory theory failed.</strong> Köhler claimed
            grouping reflected electrical <em>fields</em> in the brain. Lashley
            (1951) and Sperry (1955) disrupted cortical current flow, and shape
            perception survived.
          </>,
          <>
            <strong>"Mere demonstrations."</strong> The classic principles were
            established by compelling pictures, not measurement: descriptive
            rules with no predictive model for decades.
          </>,
          <>
            <strong>The laws are vague and they conflict.</strong> "Similar
            things group": how similar? on which dimension? against proximity,
            which wins? No joint algorithm.
          </>,
          <>
            <strong>The list just grows.</strong> A set of "laws" that expands
            with every new demo risks being a taxonomy, not a theory.
          </>,
        ]}
        closer={
          <>
            The honest verdict: the Gestalt principles are{" "}
            <strong>robust descriptions, not a finished explanation</strong>,
            and that is still enormously useful.
          </>
        }
      />

      {/* Beat 5 - Counter: the theory that broke */}
      <Quote
        beat="Beat 5 · Counter"
        eyebrow="The theory that broke"
        variant="evidence"
        quote="Disrupt the cortex with gold foil, mica, and wire, and pattern perception still works."
      >
        <>
          That is the gist of Lashley (1951) and Sperry (1955): the experiments
          that <strong>refuted Köhler's brain-field theory</strong> and pushed
          Gestalt psychology out of the mainstream. The phenomena outlived the
          mechanism that was meant to explain them.
        </>
      </Quote>

      {/* Beat 6 - Application: the bridge */}
      <StandardText beat="Beat 6 · Application" heading="Why a designer should care">
        <p>
          Because the principles run pre-attentively and involuntarily, a
          designer who arranges proximity, similarity, common region, and
          continuity isn't decorating: they're supplying inputs to a fixed
          perceptual machine.
        </p>
        <p>
          Layout <em>is</em> applied Gestalt. You are not persuading the viewer;
          you are <strong>programming what they group</strong>.
        </p>
      </StandardText>

      {/* Beat 6 - Application: checklist */}
      <MarkerList
        beat="Beat 6 · Application"
        eyebrow="Using them on purpose"
        marker="☐"
        items={[
          <>
            Group with <strong>whitespace</strong> before you reach for boxes or
            lines: proximity is the cheapest grouping tool
          </>,
          <>
            Use a shared boundary (a card) only when you mean "these are one
            unit": common region is a strong, expensive signal
          </>,
          <>
            Align to a grid: continuity makes the eye follow an invisible line;
            misalignment reads as broken
          </>,
          <>
            Watch for an <em>unintended</em> principle winning: e.g. everything
            one color, and similarity overrides the grouping you wanted
          </>,
          <>
            Don't fight the machine: equal spacing everywhere destroys grouping
            and forces the user to read every element alone
          </>,
        ]}
      />

      {/* Beat 6 - Application: examples table */}
      <DataTable
        beat="Beat 6 · Application"
        heading="The principles, already everywhere"
        head={["You see", "The principle at work"]}
        rows={[
          {
            cells: [
              "The FedEx arrow in the negative space",
              "closure + figure/ground",
            ],
          },
          {
            cells: ["The WWF panda built from incomplete shapes", "closure"],
          },
          {
            cells: [
              "A card making scattered elements read as one",
              "common region",
            ],
          },
          { cells: ["A grid that feels ordered", "good continuation"] },
          {
            cells: [
              "A row of items sliding away together on delete",
              "common fate",
            ],
          },
        ]}
      />

      {/* Beat 7 - Close: key takeaway */}
      <KeyTakeaway
        eyebrow="Bottom line"
        takeaway={
          <strong>
            The Gestalt principles aren't design tips: they're the perceptual
            machine design runs on.
          </strong>
        }
      >
        Perception organizes before you do; the principles are the rules of that
        organization: descriptive, replicable, and yours to design with.
      </KeyTakeaway>

      {/* Beat 7 - Close: pull-quote */}
      <Quote
        beat="Beat 7 · Close"
        eyebrow="The closer"
        variant="pull"
        quote={
          <>
            "The whole is <strong>other</strong> than the sum of its parts."
          </>
        }
      >
        <>
          The school that proved it is gone. The phenomenon it named is in
          everything you've ever looked at, and the designer's job is to choose{" "}
          <em>which whole</em>.
        </>
      </Quote>

      {/* Sources */}
      <Sources
        items={[
          <>
            Wagemans, J. et al. "A century of Gestalt psychology in visual
            perception: I." <em>Psychological Bulletin</em>, 2012
          </>,
          <>
            Wertheimer, M. "Laws of organization in perceptual forms," 1923
          </>,
          <>
            Wertheimer, M. "Experimental studies on the seeing of motion" (the
            phi phenomenon), 1912
          </>,
          <>
            Koffka, K. <em>Principles of Gestalt Psychology</em>, 1935
          </>,
          <>
            Kubovy, M. &amp; Wagemans, J. "Grouping by proximity and
            multistability in dot lattices," 1995
          </>,
          <>
            Palmer, S.E. &amp; Rock, I. "Rethinking perceptual organization:
            uniform connectedness," 1994
          </>,
        ]}
      />

      <Glyph />
    </div>
  );
}
