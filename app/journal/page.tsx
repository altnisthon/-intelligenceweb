import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on self-awareness, DMIT and the practice of understanding yourself.",
};

export default function JournalPage() {
  const posts = getAllPosts();

  return (
    <section className="px-6 py-24 md:px-10">
      <Container size="md">
        <div className="mb-4 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
          Journal
        </div>
        <h1 className="mb-4 font-serif text-[clamp(30px,4vw,50px)] font-bold leading-[1.08] text-plum">
          Notes on <span className="italic text-purple">understanding</span>.
        </h1>
        <p className="mb-14 max-w-xl font-sans text-base font-light leading-[1.8] text-muted">
          This section is real infrastructure, placeholder content — swap the files in{" "}
          <code className="text-purple">content/journal/</code> for real posts whenever
          you&apos;re ready.
        </p>

        <div className="flex flex-col">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group flex flex-col gap-2 border-b border-lavender py-8 no-underline transition-colors hover:bg-mint/20"
            >
              <div className="font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
                {post.date}
              </div>
              <div className="font-serif text-2xl font-bold text-plum transition-colors group-hover:text-purple">
                {post.title}
              </div>
              <p className="max-w-xl font-sans text-sm font-light leading-[1.7] text-muted">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
