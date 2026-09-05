import { useEffect, useMemo } from 'react';
import { Link, useRoute } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { useMediaObjectPosition } from '@/lib/media-position';
import { fallbackStories, inferStoryCategory, plainExcerpt, type EditorialStory } from '@/lib/story-content';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";

function formatDate(value: string | Date) { return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value)); }

export default function StoryDetail() {
  const [, params] = useRoute('/stories/article/:slug');
  const { data = [], isLoading } = trpc.cms.listStories.useQuery();
  const getObjectPosition = useMediaObjectPosition();
  const stories = useMemo<EditorialStory[]>(() => {
    const databaseStories = data.map((item, index) => ({ id: item.id, slug: item.slug, title: item.title, category: inferStoryCategory(item.title, index), date: new Date(item.createdAt).toISOString(), location: 'Rural China', excerpt: plainExcerpt(item.content), content: item.content || '', coverImage: item.coverImage || fallbackStories[index % fallbackStories.length].coverImage }));
    return [...databaseStories, ...fallbackStories.filter((fallback) => !databaseStories.some((item) => item.slug === fallback.slug))];
  }, [data]);
  const story = stories.find((item) => item.slug === params?.slug);
  const related = story ? stories.filter((item) => item.slug !== story.slug && (item.category === story.category || relatedFallback(item, story))).slice(0, 3) : [];

  useEffect(() => {
    if (!story) return;
    document.title = `${story.title} | TreeThousands`;
    const description = story.excerpt || plainExcerpt(story.content);
    const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => { let element = document.querySelector(selector) as HTMLMetaElement | null; if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.appendChild(element); } element.content = content; };
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', story.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:image"]', 'property', 'og:image', story.coverImage);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'article');
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null; if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); } canonical.href = `https://treethousands.com/stories/article/${story.slug}`;
    const script = document.createElement('script'); script.type = 'application/ld+json'; script.dataset.storySchema = 'true'; script.text = JSON.stringify({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: story.title, description, datePublished: story.date, image: story.coverImage, mainEntityOfPage: canonical.href, publisher: { '@type': 'Organization', name: 'TreeThousands' } }); document.head.appendChild(script);
    return () => { script.remove(); };
  }, [story]);

  if (isLoading && !story) return <div style={{ minHeight: '100vh', background: '#f5f1e8' }}><Navigation /></div>;
  if (!story) return <div style={{ minHeight: '100vh', background: '#f5f1e8', paddingTop: 180, textAlign: 'center', fontFamily: SANS }}><Navigation /><h1 style={{ fontFamily: DISPLAY, fontSize: 72, textTransform: 'uppercase' }}>Story not found</h1><Link href="/stories">Return to Stories</Link></div>;
  const paragraphs = story.content.split(/\n\s*\n/).filter(Boolean);

  return <div className="story-detail bg-[#f5f1e8] text-[#17251f]" style={{ fontFamily: SANS }}>
    <style>{`.story-detail .wrap{width:min(1320px,calc(100% - 64px));margin:0 auto}.story-detail .display{font-family:${DISPLAY};font-weight:400;letter-spacing:.04em;line-height:.92;text-transform:uppercase}.story-detail .eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}.story-detail .article-body{width:min(760px,calc(100% - 40px));margin:0 auto}.story-detail .article-body p{font-size:18px;line-height:1.85;letter-spacing:.025em;color:#424b45;margin:0 0 32px}.story-detail .article-body blockquote{width:min(1040px,90vw);margin:90px 50%;transform:translateX(-50%);padding:70px clamp(28px,7vw,100px);background:#17352d;color:#f5f1e8;font-size:clamp(31px,4vw,54px);line-height:1.18;letter-spacing:-.02em}.story-detail .related{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}@media(max-width:767px){.story-detail .wrap{width:calc(100% - 40px)}.story-detail .article-body p{font-size:17px}.story-detail .article-body blockquote{margin-top:60px;margin-bottom:60px}.story-detail .related{display:block}.story-detail .related article{margin-bottom:42px}}`}</style>
    <Navigation />
    <main>
      <header className="wrap text-center" style={{ padding: 'clamp(145px,16vw,210px) 0 clamp(65px,8vw,105px)' }}>
        <p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 28px' }}>{story.category}</p>
        <h1 className="display" style={{ fontSize: 'clamp(62px,9.5vw,132px)', maxWidth: 1120, margin: '0 auto 32px' }}>{story.title}</h1>
        <p className="eyebrow" style={{ margin: 0 }}>{formatDate(story.date)} · {story.location}</p>
      </header>
      <figure className="wrap" style={{ marginBottom: 'clamp(80px,10vw,140px)' }}><img src={story.coverImage} alt={story.title} style={{ width: '100%', height: 'clamp(480px,67vw,850px)', objectFit: 'cover', objectPosition: getObjectPosition(story.coverImage), display: 'block' }} /></figure>
      <article className="article-body" style={{ paddingBottom: 'clamp(95px,12vw,170px)' }}>
        {paragraphs.map((paragraph, index) => paragraph.trim().startsWith('>') ? <blockquote key={index}>{paragraph.replace(/^>\s*/, '')}</blockquote> : <p key={index}>{paragraph}</p>)}
        {paragraphs.length > 2 && <figure style={{ width: 'min(1100px,92vw)', margin: '90px 50%', transform: 'translateX(-50%)' }}><img src={related[0]?.coverImage || fallbackStories[1].coverImage} alt={`A wider view from ${story.location}`} style={{ width: '100%', height: 'clamp(380px,55vw,700px)', objectFit: 'cover', display: 'block', objectPosition: getObjectPosition(related[0]?.coverImage || fallbackStories[1].coverImage) }} /></figure>}
      </article>
      <section style={{ background: '#e5ddce', padding: 'clamp(85px,10vw,140px) 0' }}><div className="wrap"><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 18px' }}>Continue reading</p><h2 className="display" style={{ fontSize: 'clamp(50px,7vw,88px)', margin: '0 0 52px' }}>Related Stories</h2><div className="related">{related.map((item) => <article key={item.slug}><Link href={`/stories/article/${item.slug}`}><img src={item.coverImage} alt={item.title} style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block', objectPosition: getObjectPosition(item.coverImage) }} /><p className="eyebrow" style={{ color: '#9b5e3d', margin: '20px 0 10px' }}>{item.category}</p><h3 style={{ fontSize: 25, lineHeight: 1.25, fontWeight: 500, margin: 0 }}>{item.title}</h3></Link></article>)}</div></div></section>
    </main>
    <Footer />
  </div>;
}

function relatedFallback(item: EditorialStory, story: EditorialStory) { return Math.abs(String(item.id).length - String(story.id).length) < 3; }
