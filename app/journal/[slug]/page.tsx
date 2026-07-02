import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    return { title: post.title, description: post.excerpt };
  } catch {
    return { title: "Journal" };
  }
}

export default async function JournalPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  if (!post) return notFound();

  return (
    <section className="px-6 py-24 md:px-10">
      <Container size="md">
        <Link
          href="/journal"
          className="mb-10 inline-block font-sans text-xs uppercase tracking-[0.1em] text-purple no-underline"
        >
          ← Back to Journal
        </Link>
        <div className="mb-4 font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
          {post.date}
        </div>
        <h1 className="mb-10 font-serif text-[clamp(28px,4vw,46px)] font-bold leading-[1.1] text-plum">
          {post.title}
        </h1>
        <div
          className="font-sans text-lg font-light leading-[1.85] text-muted [&_p]:mb-5"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </Container>
    </section>
  );
}
