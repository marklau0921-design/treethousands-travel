import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { useMediaObjectPosition } from '@/lib/media-position';
import { fallbackStories, inferStoryCategory, plainExcerpt, STORY_CATEGORIES, type EditorialStory, type StoryCategory } from '@/lib/story-content';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";
const PAGE_SIZE = 6;

const categorySlug: Record<StoryCategory, string> = {
  'Brand Stories': 'brand-stories', 'Village Notes': 'village-notes', 'Local Life': 'local-life', Journal: 'journal',
};
const slugCategory = Object.fromEntries(Object.entries(categorySlug).map(([name, slug]) => [slug, name])) as Record<string, StoryCategory>;

const categoryIntro: Record<StoryCategory, { kicker: string; description: string; statement: string }> = {
  'Brand Stories': { kicker: 'Ideas / Purpose / The Journey So Far', description: 'Notes on why Tree Thousands began, what guides our work, and how we hope to grow alongside the people and places we encounter.', statement: 'Every journey begins with a reason to look more closely.' },
  'Village Notes': { kicker: 'Places / Encounters / Observations', description: 'Unhurried observations from village lanes, family kitchens, fields, courtyards, and the people who give each place its rhythm.', statement: 'The smallest details often hold the clearest sense of place.' },
  'Local Life': { kicker: 'People / Food / Everyday Culture', description: 'Stories of daily work, shared meals, local knowledge, and living traditions—documented through the people who carry them forward.', statement: 'Culture lives in what people make, remember, and share each day.' },
  Journal: { kicker: 'Field Notes / Reflections / On the Road', description: 'Travel reflections, changing landscapes, and fragments gathered while moving slowly through rural China.', statement: 'A field journal keeps what the itinerary leaves behind.' },
};

function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export default function StoryCategoryTemplate() {
  const [location] = useLocation();
  const { data = [] } = trpc.cms.listStories.useQuery();
  const getObjectPosition = useMediaObjectPosition();
  const pathCategory = slugCategory[location.split('/')[2] || ''];
  const [activeCategory, setActiveCategory] = useState<StoryCategory>(pathCategory || 'Brand Stories');
  const [page, setPage] = useState(1);

  const stories = useMemo<EditorialStory[]>(() => {
    const databaseStories = data.map((story, index) => ({
      id: story.id, slug: story.slug, title: story.title, category: inferStoryCategory(story.title, index),
      date: new Date(story.createdAt).toISOString(), location: 'Rural China',
      excerpt: plainExcerpt(story.content) || 'A story from the people and places that shape rural China.',
      content: story.content || '', coverImage: story.coverImage || fallbackStories[index % fallbackStories.length].coverImage,
    }));
    return [...databaseStories, ...fallbackStories.filter((fallback) => !databaseStories.some((story) => story.slug === fallback.slug))];
  }, [data]);

  useEffect(() => { setActiveCategory(pathCategory || 'Brand Stories'); setPage(1); }, [pathCategory]);
  useEffect(() => {
    document.title = `${activeCategory} | TreeThousands Stories`;
    const description = 'Field notes, documentary stories, and local perspectives from rural China by TreeThousands.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = description;
  }, [activeCategory]);

  const filtered = stories.filter((story) => story.category === activeCategory);
  const featured = filtered[0] || stories[0];
  const latest = filtered.filter((story) => story.slug !== featured?.slug);
  const totalPages = Math.max(1, Math.ceil(latest.length / PAGE_SIZE));
  const visible = latest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const intro = categoryIntro[activeCategory];

  return (
    <div className="stories-page min-h-screen bg-[#f5f1e8] text-[#17251f]" style={{ fontFamily: SANS }}>
      <style>{`
        .stories-page .wrap{width:min(1320px,calc(100% - 64px));margin:0 auto}.stories-page .display{font-family:${DISPLAY};font-weight:400;letter-spacing:.045em;line-height:.92;text-transform:uppercase}.stories-page .eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}.stories-page .summary{font-size:16px;line-height:1.65;letter-spacing:.025em;color:#59605b}.stories-page .feature{display:grid;grid-template-columns:1.45fr .85fr;min-height:620px}.stories-page .latest-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:56px 32px}.stories-page .story-card{grid-column:span 6}.stories-page .story-card:nth-child(3n){grid-column:3/span 8}.stories-page .chapter-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:28px;align-items:start}.stories-page .chapter{grid-column:span 3}.stories-page .chapter:nth-child(even){margin-top:74px}.stories-page .category-row{display:flex;gap:30px;overflow-x:auto;border-bottom:1px solid rgba(23,37,31,.18)}.stories-page .category-button{white-space:nowrap;padding:0 0 14px;border:0;border-bottom:2px solid transparent;background:none;font-size:12px;font-weight:700;letter-spacing:.13em;text-transform:uppercase}.stories-page .category-button.active{border-color:#9b5e3d;color:#9b5e3d}.stories-page .image{display:block;width:100%;height:100%;object-fit:cover}.stories-page a{text-decoration:none;color:inherit}@media(max-width:767px){.stories-page .wrap{width:calc(100% - 40px)}.stories-page .feature,.stories-page .latest-grid,.stories-page .chapter-grid{display:block}.stories-page .feature-image{height:420px!important}.stories-page .feature-copy{padding:38px 24px!important}.stories-page .story-card,.stories-page .chapter{margin:0 0 48px!important}.stories-page .category-row{gap:22px}}
      `}</style>
      <Navigation />
      <main style={{ paddingTop: 'clamp(128px,14vw,190px)' }}>
        <header className="wrap" style={{ paddingBottom: 'clamp(64px,8vw,105px)' }}>
          <p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 22px' }}>Stories / {intro.kicker}</p>
          <div className="grid md:grid-cols-[1.2fr_.8fr] gap-8 items-end">
            <h1 className="display" style={{ fontSize: 'clamp(66px,10vw,142px)', margin: 0 }}>{activeCategory}</h1>
            <p className="summary" style={{ margin: '0 0 10px', maxWidth: 520 }}>{intro.description}</p>
          </div>
        </header>

        <nav className="wrap category-row" aria-label="Story categories">
          {(STORY_CATEGORIES.slice(1) as StoryCategory[]).map((category) => <button key={category} className={`category-button ${activeCategory === category ? 'active' : ''}`} onClick={() => { setActiveCategory(category); setPage(1); window.history.replaceState(null, '', `/stories/${categorySlug[category]}`); }}>{category}</button>)}
        </nav>

        {featured && <section className="wrap" style={{ padding: 'clamp(56px,7vw,96px) 0 clamp(95px,11vw,160px)' }}>
          <Link href={`/stories/article/${featured.slug}`} className="feature" style={{ background: '#e6ddce' }}>
            <div className="feature-image" style={{ minHeight: 620 }}><img src={featured.coverImage} alt={featured.title} className="image" style={{ objectPosition: getObjectPosition(featured.coverImage) }} /></div>
            <div className="feature-copy flex flex-col justify-center" style={{ padding: 'clamp(42px,5vw,78px)' }}>
              <p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 28px' }}>Featured Story / {featured.category}</p>
              <h2 className="display" style={{ fontSize: 'clamp(48px,5.5vw,78px)', margin: '0 0 28px' }}>{featured.title}</h2>
              <p className="summary" style={{ margin: '0 0 30px' }}>{featured.excerpt}</p>
              <p className="eyebrow" style={{ margin: 0 }}>{formatDate(featured.date)} · {featured.location} →</p>
            </div>
          </Link>
        </section>}

        <section style={{ background: '#17352d', color: '#f5f1e8', padding: 'clamp(95px,12vw,170px) 0' }}><div className="wrap grid md:grid-cols-[.45fr_1.55fr] gap-10 md:gap-24 items-start"><p className="eyebrow" style={{ color: '#c79a72', margin: 0 }}>From this chapter</p><p style={{ fontSize: 'clamp(33px,4.6vw,66px)', lineHeight: 1.12, letterSpacing: '-.025em', maxWidth: 1000, margin: 0 }}>{intro.statement}</p></div></section>

        <section style={{ background: '#fff', padding: 'clamp(90px,10vw,145px) 0' }}>
          <div className="wrap">
            <div className="flex justify-between items-end gap-8" style={{ marginBottom: 55 }}><div><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 16px' }}>Recently recorded</p><h2 className="display" style={{ fontSize: 'clamp(52px,7vw,92px)', margin: 0 }}>More {activeCategory}</h2></div><p className="eyebrow hidden md:block" style={{ margin: 0 }}>{filtered.length} stories</p></div>
            <div className="latest-grid">
              {visible.map((story, index) => <article className="story-card" key={story.slug}>
                <Link href={`/stories/article/${story.slug}`}>
                  <img src={story.coverImage} alt={story.title} className="image" style={{ height: index % 3 === 2 ? 520 : 410, objectPosition: getObjectPosition(story.coverImage) }} />
                  <div className="grid md:grid-cols-[.35fr_1fr] gap-5" style={{ paddingTop: 22 }}>
                    <p className="eyebrow" style={{ color: '#9b5e3d', margin: 0 }}>{story.category}</p>
                    <div><h3 style={{ fontSize: 'clamp(24px,2.4vw,34px)', fontWeight: 500, lineHeight: 1.18, margin: '0 0 13px' }}>{story.title}</h3><p className="summary" style={{ margin: '0 0 15px' }}>{story.excerpt}</p><p className="eyebrow" style={{ margin: 0 }}>{formatDate(story.date)} · {story.location}</p></div>
                  </div>
                </Link>
              </article>)}
            </div>
            {totalPages > 1 && <nav className="flex justify-between items-center" style={{ borderTop: '1px solid #d8d2c7', marginTop: 72, paddingTop: 25 }} aria-label="Story pagination"><button className="category-button" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>← Previous</button><span className="eyebrow">{page} / {totalPages}</span><button className="category-button" disabled={page === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>Next →</button></nav>}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
