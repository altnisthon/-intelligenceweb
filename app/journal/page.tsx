import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on self-awareness, DMIT and the practice of understanding yourself.",
};

function formatDate(date: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function JournalPage() {
  const [featured, ...rest] = getAllPosts();

  return (
    <section className="px-6 py-24 md:px-10">
      <Container>
        <div className="mb-4 font-sans text-[10.5px] uppercase tracking-[0.18em] text-purple">
          Journal
        </div>
        <h1 className="mb-4 font-serif text-[clamp(30px,4vw,50px)] font-bold leading-[1.08] text-plum">
          Notes on <span className="italic text-purple">understanding</span>.
        </h1>
        <p className="mb-16 max-w-xl font-sans text-base font-light leading-[1.8] text-muted">
          This section is real infrastructure, placeholder content — swap the files in{" "}
          <code className="text-purple">content/journal/</code> for real posts (and their cover
          images) whenever you&apos;re ready.
        </p>

        {featured && (
          <Link
            href={`/journal/${featured.slug}`}
            className="group mb-16 grid grid-cols-1 gap-8 border-b border-lavender pb-16 no-underline md:grid-cols-2 md:items-center md:gap-14"
          >
            <div className="relative aspect-[3/2] overflow-hidden border border-lavender bg-lavender">
              {featured.coverImage && (
                <Image
                  src={featured.coverImage}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  priority
                />
              )}
            </div>
            <div>
              <div className="mb-3 font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
                {formatDate(featured.date)}
              </div>
              <div className="mb-4 font-serif text-3xl font-bold leading-[1.15] text-plum transition-colors group-hover:text-purple md:text-[40px]">
                {featured.title}
              </div>
              <p className="mb-6 max-w-md font-sans text-base font-light leading-[1.75] text-muted">
                {featured.excerpt}
              </p>
              <span className="font-sans text-xs uppercase tracking-[0.1em] text-purple">
                Read the post →
              </span>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="group flex flex-col no-underline"
              >
                <div className="relative mb-5 aspect-[3/2] overflow-hidden border border-lavender bg-lavender">
                  {post.coverImage && (
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="mb-2 font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
                  {formatDate(post.date)}
                </div>
                <div className="mb-2 font-serif text-xl font-bold leading-[1.2] text-plum transition-colors group-hover:text-purple">
                  {post.title}
                </div>
                <p className="font-sans text-sm font-light leading-[1.7] text-muted">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
