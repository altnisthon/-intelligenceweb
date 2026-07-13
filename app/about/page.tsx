import type { Metadata } from "next";
import AboutStory from "@/components/AboutStory";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind AND Intelligence, and the person leading the practice.",
};

export default function AboutPage() {
  return <AboutStory />;
}
