import { useEffect, useMemo } from 'react';
import { Link, useRoute } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { useMediaObjectPosition } from '@/lib/media-position';
import { fallbackStories, inferStoryCategory, plainExcerpt, type EditorialStory } from '@/lib/story-content';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";

const supplements = {
  'Brand Stories': { label: 'The thought behind the journey', context: 'The ideas behind Tree Thousands are shaped on the road. Each encounter asks us to think again about how stories are shared, how trust is built, and what responsible curiosity can look like.', notes: ['Purpose before itinerary', 'Relationships before reach', 'Curiosity without hurry'], reflection: 'We keep returning to the same belief: travel becomes meaningful when attention turns into understanding.' },
  'Village Notes': { label: 'Observed along the way', context: 'Village life rarely presents itself as a single scene. Meaning accumulates through familiar paths, open courtyards, seasonal work, and conversations that continue while the day moves around them.', notes: ['A path used every morning', 'A door left open', 'A conversation without a schedule'], reflection: 'A village is never a single view. It is a collection of small moments held together by memory and daily use.' },
  'Local Life': { label: 'Details of the everyday', context: 'Daily life carries knowledge in practical forms: a recipe adjusted by season, a tool held in a familiar way, or a custom repeated without needing to be explained.', notes: ['Knowledge carried by hand', 'Food shaped by season', 'Traditions kept through practice'], reflection: 'Culture remains alive when it belongs to everyday life—not behind glass, but in gestures, work, humour, and hospitality.' },
  Journal: { label: 'From the field notebook', context: 'A field journal makes room for what falls between destinations: changing weather, an unexpected stop, a half-finished conversation, or a landscape seen differently on the return journey.', notes: ['Weather changing the route', 'A pause between destinations', 'The detail we nearly passed'], reflection: 'Field notes remind us that the unexpected is not a distraction from the journey. Very often, it is the journey.' },
};

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
  const storyIndex = story ? stories.findIndex((item) => item.slug === story.slug) : -1;
  const previous = storyIndex >= 0 ? stories[(storyIndex - 1 + stories.length) % stories.length] : undefined;
  const next = storyIndex >= 0 ? stories[(storyIndex + 1) % stories.length] : undefined;

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
  const quote = paragraphs.find((paragraph) => paragraph.trim().startsWith('>'))?.replace(/^>\s*/, '') || story.excerpt;
  const prose = paragraphs.filter((paragraph) => !paragraph.trim().startsWith('>'));
  const supplement = supplements[story.category];
  const supportingImages = [related[0]?.coverImage, related[1]?.coverImage, related[2]?.coverImage, ...fallbackStories.map((item) => item.coverImage)].filter((image): image is string => Boolean(image));

  return <div className="story-detail bg-[#f5f1e8] text-[#17251f]" style={{ fontFamily: SANS }}>
    <style>{`.story-detail .wrap{width:min(1320px,calc(100% - 64px));margin:0 auto}.story-detail .display{font-family:${DISPLAY};font-weight:400;letter-spacing:.04em;line-height:.92;text-transform:uppercase}.story-detail .eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}.story-detail .prose p{font-size:18px;line-height:1.85;letter-spacing:.025em;color:#424b45;margin:0 0 32px}.story-detail .opening-grid{display:grid;grid-template-columns:.38fr 1fr;gap:clamp(45px,8vw,130px);align-items:start}.story-detail .magazine-sheet{width:min(1180px,calc(100% - 64px));margin:0 auto}.story-detail .magazine-collage{height:650px;position:relative}.story-detail .magazine-collage .one{position:absolute;left:0;top:0;width:42%;height:520px}.story-detail .magazine-collage .two{position:absolute;right:0;top:150px;width:48%;height:430px}.story-detail .magazine-copy{width:min(880px,82%);margin:70px auto 0}.story-detail .magazine-columns{display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,7vw,95px)}.story-detail .photo-pair{display:grid;grid-template-columns:1.08fr .82fr;gap:22px;align-items:start}.story-detail .quote-notes{display:grid;grid-template-columns:1.15fr .85fr;gap:clamp(55px,8vw,115px);align-items:start}.story-detail .closing-spread{display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(45px,7vw,100px);align-items:center}.story-detail .related{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}.story-detail .adjacent{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,.25)}@media(max-width:767px){.story-detail .wrap,.story-detail .magazine-sheet{width:calc(100% - 40px)}.story-detail .prose p{font-size:17px}.story-detail .opening-grid,.story-detail .magazine-columns,.story-detail .photo-pair,.story-detail .quote-notes,.story-detail .closing-spread,.story-detail .related,.story-detail .adjacent{display:block}.story-detail .magazine-collage{height:auto}.story-detail .magazine-collage .one,.story-detail .magazine-collage .two{position:static;width:100%;height:390px;margin-bottom:20px}.story-detail .magazine-copy{width:100%;margin-top:48px}.story-detail .photo-pair img{height:390px!important;margin-bottom:20px}.story-detail .closing-spread img{height:430px!important;margin-top:40px}.story-detail .related article{margin-bottom:42px}.story-detail .adjacent a{display:block;border-bottom:1px solid rgba(255,255,255,.25)}}`}</style>
    <Navigation />
    <main>
      <header className="wrap text-center" style={{ padding: 'clamp(145px,16vw,210px) 0 clamp(65px,8vw,105px)' }}>
        <p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 28px' }}>{story.category}</p>
        <h1 className="display" style={{ fontSize: 'clamp(62px,9.5vw,132px)', maxWidth: 1120, margin: '0 auto 32px' }}>{story.title}</h1>
        <p className="eyebrow" style={{ margin: 0 }}>{formatDate(story.date)} · {story.location}</p>
      </header>
      <figure className="wrap" style={{ marginBottom: 'clamp(80px,10vw,140px)' }}><img src={story.coverImage} alt={story.title} style={{ width: '100%', height: 'clamp(480px,67vw,850px)', objectFit: 'cover', objectPosition: getObjectPosition(story.coverImage), display: 'block' }} /></figure>

      <section className="wrap opening-grid" style={{ paddingBottom: 'clamp(90px,12vw,170px)' }}>
        <aside><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 28px' }}>Story Context</p><dl style={{ margin: 0 }}><dt className="eyebrow" style={{ opacity: .55, marginBottom: 7 }}>Place</dt><dd style={{ margin: '0 0 24px', fontSize: 16 }}>{story.location}</dd><dt className="eyebrow" style={{ opacity: .55, marginBottom: 7 }}>Chapter</dt><dd style={{ margin: '0 0 24px', fontSize: 16 }}>{story.category}</dd><dt className="eyebrow" style={{ opacity: .55, marginBottom: 7 }}>Recorded</dt><dd style={{ margin: 0, fontSize: 16 }}>{formatDate(story.date)}</dd></dl></aside>
        <div><p style={{ fontSize: 'clamp(27px,3.2vw,44px)', lineHeight: 1.3, letterSpacing: '-.012em', margin: '0 0 55px', maxWidth: 850 }}>{story.excerpt}</p><div className="prose">{prose.slice(0, 2).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div>
      </section>

      <section style={{ background: '#e9e3d7', padding: 'clamp(85px,10vw,145px) 0' }}><div className="magazine-sheet"><div className="magazine-collage"><img className="one" src={supportingImages[0]} alt={`A detail from ${story.location}`} style={{ objectFit: 'cover', display: 'block', objectPosition: getObjectPosition(supportingImages[0]) }} /><img className="two" src={supportingImages[1]} alt={`Life around ${story.location}`} style={{ objectFit: 'cover', display: 'block', objectPosition: getObjectPosition(supportingImages[1]) }} /></div><div className="magazine-copy"><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 22px' }}>Inside the Story</p><h2 className="display" style={{ fontSize: 'clamp(48px,6vw,82px)', margin: '0 0 38px' }}>{supplement.label}</h2><div className="magazine-columns"><p style={{ fontSize: 18, lineHeight: 1.78, letterSpacing: '.025em', color: '#424b45', margin: 0 }}>{supplement.context}</p><p style={{ fontSize: 18, lineHeight: 1.78, letterSpacing: '.025em', color: '#424b45', margin: 0 }}>{prose[2] || story.excerpt}</p></div></div></div></section>

      <section style={{ background: '#f8f5ee', padding: 'clamp(90px,11vw,155px) 0' }}><div className="magazine-sheet"><div className="photo-pair"><img src={supportingImages[2]} alt={`A wider view of ${story.location}`} style={{ width: '100%', height: 560, objectFit: 'cover', display: 'block', objectPosition: getObjectPosition(supportingImages[2]) }} /><img src={supportingImages[3]} alt={`An observed moment in ${story.location}`} style={{ width: '100%', height: 470, objectFit: 'cover', display: 'block', objectPosition: getObjectPosition(supportingImages[3]) }} /></div><div className="quote-notes" style={{ marginTop: 'clamp(55px,7vw,90px)' }}><blockquote style={{ margin: 0 }}><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 22px' }}>A line to remember</p><p style={{ fontSize: 'clamp(31px,4vw,54px)', lineHeight: 1.16, letterSpacing: '-.02em', margin: 0 }}>“{quote}”</p></blockquote><div><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 8px' }}>Field Notes</p>{supplement.notes.map((note, index) => <div key={note} style={{ display: 'grid', gridTemplateColumns: '42px 1fr', gap: 14, borderTop: '1px solid #cfc8bb', padding: '19px 0' }}><span className="eyebrow" style={{ color: '#9b5e3d' }}>0{index + 1}</span><span style={{ fontSize: 18, lineHeight: 1.35 }}>{note}</span></div>)}</div></div></div></section>

      <section style={{ background: '#e9e3d7', padding: 'clamp(90px,11vw,155px) 0' }}><div className="magazine-sheet closing-spread"><div><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 24px' }}>Closing Reflection</p><p style={{ fontSize: 'clamp(28px,3.4vw,47px)', lineHeight: 1.24, letterSpacing: '-.018em', margin: '0 0 38px' }}>{supplement.reflection}</p><div className="prose">{prose.slice(3).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div><img src={supportingImages[4]} alt={`A final view from ${story.location}`} style={{ width: '100%', height: 650, objectFit: 'cover', display: 'block', objectPosition: getObjectPosition(supportingImages[4]) }} /></div></section>

      <section style={{ background: '#e5ddce', padding: 'clamp(85px,10vw,140px) 0' }}><div className="wrap"><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 18px' }}>Continue reading</p><h2 className="display" style={{ fontSize: 'clamp(50px,7vw,88px)', margin: '0 0 52px' }}>Related Stories</h2><div className="related">{related.map((item) => <article key={item.slug}><Link href={`/stories/article/${item.slug}`}><img src={item.coverImage} alt={item.title} style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block', objectPosition: getObjectPosition(item.coverImage) }} /><p className="eyebrow" style={{ color: '#9b5e3d', margin: '20px 0 10px' }}>{item.category}</p><h3 style={{ fontSize: 25, lineHeight: 1.25, fontWeight: 500, margin: 0 }}>{item.title}</h3></Link></article>)}</div></div></section>
      <nav className="adjacent" style={{ background: '#9b5e3d', color: '#fff' }}>{previous && <Link href={`/stories/article/${previous.slug}`} style={{ padding: 'clamp(48px,7vw,95px)' }}><p className="eyebrow" style={{ opacity: .7, margin: '0 0 18px' }}>← Previous Story</p><h3 className="display" style={{ fontSize: 'clamp(35px,4vw,58px)', margin: 0 }}>{previous.title}</h3></Link>}{next && <Link href={`/stories/article/${next.slug}`} style={{ padding: 'clamp(48px,7vw,95px)', textAlign: 'right' }}><p className="eyebrow" style={{ opacity: .7, margin: '0 0 18px' }}>Next Story →</p><h3 className="display" style={{ fontSize: 'clamp(35px,4vw,58px)', margin: 0 }}>{next.title}</h3></Link>}</nav>
    </main>
    <Footer />
  </div>;
}

function relatedFallback(item: EditorialStory, story: EditorialStory) { return Math.abs(String(item.id).length - String(story.id).length) < 3; }
