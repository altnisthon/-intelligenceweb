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
    label: "Youth · Ages 14–19",
    title: "Finding footing before the world speeds up",
    desc: "Identity, pressure, and the first real decisions about who to become. We give teenagers language for what they feel and evidence of what they're capable of.",
    quote: '"I didn\'t know I was allowed to be good at this."',
    wide: true,
  },
  {
    badge: "02",
    label: "Young Adults · 20–35",
    title: "Building a life on your own terms",
    desc: "Career, relationships, and the quiet question of whether you're living your own life or someone else's expectations.",
    quote: '"I finally understand why the \'obvious\' path never fit."',
    wide: false,
  },
  {
    badge: "03",
    label: "Mid-Life · 35–55",
    title: "Reassessing without starting over",
    desc: "The successful, restless middle — where the goal shifts from achieving more to living more deliberately with what matters.",
    quote: '"I wasn\'t burnt out. I was misaligned."',
    wide: false,
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
