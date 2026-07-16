export type Chip = { label: string; highlight?: boolean };

export type Programme = {
  badge: string;
  name: string;
  dmit: boolean;
  desc: string;
  chips: Chip[];
};

export const individualJourneys: Programme[] = [
  {
    badge: "01",
    name: "Foundations",
    dmit: true,
    desc: "Your DMIT profile decoded — a clear map of your innate intelligence and natural wiring — paired with the first tools of self-regulation, so you can steady yourself and work from a calm, honest baseline.",
    chips: [
      { label: "Regulate", highlight: true },
      { label: "DMIT profiling" },
      { label: "Innate intelligence" },
    ],
  },
  {
    badge: "02",
    name: "Common Ground",
    dmit: false,
    desc: "Turn self-understanding into connection. We work on communication, boundaries and reading others — so you relate from a place of understanding rather than reaction.",
    chips: [
      { label: "Relate", highlight: true },
      { label: "Relationships" },
      { label: "Communication" },
    ],
  },
  {
    badge: "03",
    name: "The Deep Work",
    dmit: false,
    desc: "The long game — gently reshaping the long-standing patterns that have quietly run your life, and rising into a more deliberate, aligned version of yourself.",
    chips: [
      { label: "Rise", highlight: true },
      { label: "Pattern work" },
      { label: "Alignment" },
    ],
  },
];

export const workshops: Programme[] = [
  {
    badge: "01",
    name: "Steady State",
    dmit: false,
    desc: "A hands-on workshop in self-regulation — practical tools for managing stress, exam pressure and big emotions before they take over.",
    chips: [
      { label: "Regulate", highlight: true },
      { label: "Self-regulation" },
      { label: "Stress tools" },
    ],
  },
  {
    badge: "02",
    name: "Reading the Room",
    dmit: false,
    desc: "Emotional intelligence for real life — empathy, communication and social awareness, practised together in a small, supportive group.",
    chips: [
      { label: "Relate", highlight: true },
      { label: "Empathy" },
      { label: "Communication" },
    ],
  },
  {
    badge: "03",
    name: "Aura Farming",
    dmit: false,
    desc: "A playful workshop on presence and confidence — building the steady self-resilience and quiet self-assurance that people read as 'aura'.",
    chips: [
      { label: "Rise", highlight: true },
      { label: "Confidence" },
      { label: "Self-resilience" },
    ],
  },
];

export const seasons = [
  {
    badge: "01",
    label: "Youth · 14–19",
    title: "Finding footing before the world speeds up",
    question: "“Am I good enough?”",
    body: [
      "This is the age of being measured constantly and understood rarely. Grades sort them, peers rank them, and adults ask what they want to be before they've had the chance to find out who they are. Most of that pressure lands as one question they can't answer, and without language for what they feel, it comes out as withdrawal, defiance, anxiety, or a shrug.",
      "What changes things at this age isn't motivation. It's evidence. A teenager who can see their own strengths laid out, not as praise but as something real and observable, has ground to stand on that a bad exam result can't take away. It gently shifts the question from am I smart enough? to how am I smart? And it offers them words for their inner world, which is often the first time anyone has. Self awareness at this age is quietly protective. It's much harder to be defined by other people's yardsticks when you already have a sense of your own shape.",
    ],
    checklist: [
      "Naming what you're feeling instead of shutting down.",
      "Picking subjects and paths that suit how you actually learn, rather than what looks impressive.",
      "Noticing which settings drain you and building your week around that.",
      "Learning to recover from a bad result without letting it decide who you are.",
    ],
  },
  {
    badge: "02",
    label: "Young Adults · 20–35",
    title: "Building a life on your own terms",
    question: "“Is this life actually mine?”",
    body: [
      "The decade where so much gets decided and so little feels certain. Career, partner, city, whether to stay on the track you were placed on. The quiet ache here is borrowed ambition. You realise you've been chasing a life that made sense to your parents, your peers, or your eighteen year old self, and reaching it hasn't felt like much of anything. Add comparison at scale, and it's easy to be busy, capable, successful, and quietly lost.",
      "Self knowledge is what turns that fog into something you can actually decide from. When you understand how you're wired, what genuinely energises you, how you work best, what you need in a relationship rather than what you were told to want, you stop optimising for a life you don't want and start choosing with your eyes open. It doesn't make the choices easy. It makes them yours, and that's the difference between a hard decision and one that haunts you.",
    ],
    checklist: [
      "Saying no to the offer that looks right on paper but doesn't fit how you work.",
      "Asking for what you need in a relationship, in plain words, before resentment does it for you.",
      "Choosing a role for the way it uses your strengths, not just the title.",
      "Setting your own measure of a good year, then actually checking it.",
    ],
  },
  {
    badge: "03",
    label: "Mid-life · 35–55",
    title: "Reassessing without starting over",
    question: "“Is this it?”",
    body: [
      "The successful, restless middle. From the outside it works: the career, the family, the years of competence. Inside there's a low hum you can't quite silence, and it's disorienting precisely because nothing is obviously wrong. This is also the most demanding season structurally, with responsibility at its peak, ageing parents, growing children, and a narrowing sense of time. The usual response is to grit through it or to blow something up. Both cost a great deal.",
      "What's needed here is rarely reinvention. It's realignment, and that begins with knowing which parts of your life are genuinely yours and which are simply momentum. Self knowledge lets you tell the difference. It shows you the strengths you've been running on and the ones you quietly set down twenty years ago, and it gives you a basis for adjusting course deliberately rather than dramatically. Most people at this stage don't need to start over. They need to stop spending their energy against their own grain.",
    ],
    checklist: [
      "Changing how you work rather than walking away from what you built.",
      "Handing back the responsibilities you took on out of habit.",
      "Letting your child be understood on their own terms instead of managed on yours.",
      "Reclaiming one strength you set down years ago and putting it back into use.",
    ],
  },
];

export const steps = [
  {
    n: "1",
    kicker: "Step One",
    title: "Profile",
    desc: "A DMIT scan and intake conversation to map your innate wiring.",
  },
  {
    n: "2",
    kicker: "Step Two",
    title: "Reflect",
    desc: "We read the profile together — what resonates, what surprises, what fits.",
  },
  {
    n: "3",
    kicker: "Step Three",
    title: "Build",
    desc: "Guided sessions to build regulation, confidence and self-awareness.",
  },
  {
    n: "4",
    kicker: "Step Four",
    title: "Rise",
    desc: "Integrate the work into daily life and revisit as new seasons arrive.",
  },
];

export const testimonials = [
  {
    quote:
      "The profile didn't box me in — it gave me permission. I stopped fighting my own instincts.",
    name: "Rachel · Young Adult journey",
  },
  {
    quote: "My son went from shutting down to explaining what he needed. That is not a small thing.",
    name: "Mei Ling · Parent, Youth journey",
  },
  {
    quote: "Honest, warm, and never once made me feel like a project. I felt taken seriously.",
    name: "David · Mid-Life journey",
  },
];

export const dmitPoints = [
  {
    title: "Distribution of intelligences",
    desc: "See where your natural strengths sit across eight intelligence types.",
  },
  {
    title: "Learning & communication style",
    desc: "Understand how you best absorb, process and express information.",
  },
  {
    title: "Innate vs. acquired abilities",
    desc: "Separate what comes naturally from what you've had to work at.",
  },
  {
    title: "A grounded starting point",
    desc: "Begin your self-discovery from evidence about you, not a generic template.",
  },
];

export const faqs = [
  {
    q: "What exactly is DMIT?",
    a: "Dermatoglyphics Multiple Intelligence Test reads the ridge patterns on your fingertips — formed before birth and unchanging — to map your distribution of innate intelligences and natural learning style. We use it as a grounded starting point, never as a verdict.",
  },
  {
    q: "Is this therapy?",
    a: "No. AND is a self-awareness and self-discovery practice, not clinical therapy. We focus on understanding, resilience and forward movement. If something clinical surfaces, we'll help you find the right specialist.",
  },
  {
    q: "How long does a training take?",
    a: "It depends on the path — from a single first conversation to twelve sessions across several months. We'll recommend a pace after your first conversation, and you're never locked in.",
  },
  {
    q: "Do you work with teenagers?",
    a: "Yes. Our Youth workshops are designed for ages 14–19, always with a parent debrief so the whole family benefits from the insight.",
  },
  {
    q: "In person or online?",
    a: "Both. Our studio is located at 8 Burn Rd, Trivex, and we run sessions online for clients across Singapore and beyond. DMIT scans are done in person or via a guided at-home kit.",
  },
];
