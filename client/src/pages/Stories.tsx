import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { Link, useLocation } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { useMediaObjectPosition } from '@/lib/media-position';
import { fallbackStories, inferStoryCategory, plainExcerpt, STORY_CATEGORIES, type EditorialStory, type StoryCategory } from '@/lib/story-content';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";
const PAGE_SIZE = 6;
const CATEGORIES = STORY_CATEGORIES.slice(1) as StoryCategory[];
const categorySlug: Record<StoryCategory, string> = { 'Brand Stories': 'brand-stories', 'Village Notes': 'village-notes', 'Local Life': 'local-life', Journal: 'journal' };
const slugCategory = Object.fromEntries(Object.entries(categorySlug).map(([name, slug]) => [slug, name])) as Record<string, StoryCategory>;
const categoryIntro: Record<StoryCategory, { kicker: string; description: string }> = {
  'Brand Stories': { kicker: 'Ideas / Purpose / The Journey So Far', description: 'Why Tree Thousands began, what guides our work, and how we hope to grow alongside the people and places we encounter.' },
  'Village Notes': { kicker: 'Places / Encounters / Observations', description: 'Unhurried observations from village lanes, family kitchens, fields, courtyards, and the people who give each place its rhythm.' },
  'Local Life': { kicker: 'People / Food / Everyday Culture', description: 'Stories of daily work, shared meals, local knowledge, and living traditions carried forward through everyday life.' },
  Journal: { kicker: 'Field Notes / Reflections / On the Road', description: 'Travel reflections, changing landscapes, and fragments gathered while moving slowly through rural China.' },
};

function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export default function Stories() {
  const [location] = useLocation();
  const { data = [] } = trpc.cms.listStories.useQuery();
  const getObjectPosition = useMediaObjectPosition();
  const selectedCategory = slugCategory[location.split('/')[2] || ''];
  const isOverview = !selectedCategory;
  const [currentSection, setCurrentSection] = useState<StoryCategory>('Brand Stories');
  const [page, setPage] = useState(1);

  const stories = useMemo<EditorialStory[]>(() => {
    const databaseStories = data.map((story, index) => ({ id: story.id, slug: story.slug, title: story.title, category: inferStoryCategory(story.title, index), date: new Date(story.createdAt).toISOString(), location: 'Rural China', excerpt: plainExcerpt(story.content) || 'A story from the people and places that shape rural China.', content: story.content || '', coverImage: story.coverImage || fallbackStories[index % fallbackStories.length].coverImage }));
    return [...databaseStories, ...fallbackStories.filter((fallback) => !databaseStories.some((story) => story.slug === fallback.slug))];
  }, [data]);

  useEffect(() => {
    setPage(1);
    document.title = selectedCategory ? `${selectedCategory} | TreeThousands Stories` : 'Stories | TreeThousands';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = selectedCategory ? categoryIntro[selectedCategory].description : 'Field notes, documentary stories, and local perspectives from rural China by TreeThousands.';
  }, [selectedCategory]);

  useEffect(() => {
    if (!isOverview) return;
    const sections = CATEGORIES.map((category) => document.getElementById(categorySlug[category])).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrentSection(slugCategory[visible.target.id]);
    }, { rootMargin: '-28% 0px -55% 0px', threshold: [0, .2, .5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isOverview]);

  const scrollToCategory = (category: StoryCategory) => {
    setCurrentSection(category);
    document.getElementById(categorySlug[category])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return <div className="stories-page min-h-screen bg-[#f5f1e8] text-[#17251f]" style={{ fontFamily: SANS }}>
    <style>{`
      .stories-page .wrap{width:min(1320px,calc(100% - 64px));margin:0 auto}.stories-page .display{font-family:${DISPLAY};font-weight:400;letter-spacing:.045em;line-height:.92;text-transform:uppercase}.stories-page .eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}.stories-page .summary{font-size:16px;line-height:1.65;letter-spacing:.025em;color:#59605b}.stories-page a{text-decoration:none;color:inherit}.stories-page .image{width:100%;height:100%;object-fit:cover;display:block}.stories-page .section-nav{display:flex;justify-content:center;gap:clamp(26px,5vw,72px);overflow-x:auto}.stories-page .section-tab{white-space:nowrap;padding:0 0 13px;border:0;border-bottom:3px solid transparent;background:none;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.stories-page .section-tab.active{color:#9b5e3d;border-bottom-color:#9b5e3d}.stories-page .preview-grid{display:grid;grid-template-columns:1.22fr .78fr;gap:32px;align-items:start}.stories-page .preview-grid article:nth-child(2){margin-top:105px}.stories-page .archive-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:58px 32px}.stories-page .archive-card{grid-column:span 6}.stories-page .archive-card:nth-child(3n){grid-column:3/span 8}.stories-page .button{display:inline-block;background:#111;color:#fff!important;border:2px solid #111;border-radius:3px;padding:13px 30px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;transition:background .2s,color .2s}.stories-page .button:hover{background:transparent;color:#111!important}@media(max-width:767px){.stories-page .wrap{width:calc(100% - 40px)}.stories-page .section-nav{justify-content:flex-start;gap:27px}.stories-page .preview-grid,.stories-page .archive-grid{display:block}.stories-page .preview-grid article,.stories-page .archive-card{margin:0 0 48px!important}}
    `}</style>
    <Navigation />
    <main style={{ paddingTop: 'clamp(128px,14vw,190px)' }}>
      {isOverview ? <StoriesOverview stories={stories} currentSection={currentSection} scrollToCategory={scrollToCategory} getObjectPosition={getObjectPosition} /> : <CategoryArchive category={selectedCategory} stories={stories} page={page} setPage={setPage} getObjectPosition={getObjectPosition} />}
    </main>
    <Footer />
  </div>;
}

function StoriesOverview({ stories, currentSection, scrollToCategory, getObjectPosition }: { stories: EditorialStory[]; currentSection: StoryCategory; scrollToCategory: (category: StoryCategory) => void; getObjectPosition: (url: string) => string }) {
  return <>
    <header className="wrap" style={{ paddingBottom: 'clamp(55px,7vw,88px)' }}><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 22px' }}>Travel Magazine / Field Journal</p><div className="grid md:grid-cols-[1.2fr_.8fr] gap-8 items-end"><h1 className="display" style={{ fontSize: 'clamp(74px,12vw,168px)', margin: 0 }}>Stories</h1><p className="summary" style={{ margin: '0 0 10px', maxWidth: 520 }}>People, places, and everyday moments from across rural China—recorded slowly and shared with care.</p></div></header>
    <nav className="wrap section-nav" aria-label="Story sections" style={{ paddingBottom: 34 }}>{CATEGORIES.map((category) => <button key={category} className={`section-tab ${currentSection === category ? 'active' : ''}`} onClick={() => scrollToCategory(category)}>{category}</button>)}</nav>
    {CATEGORIES.map((category, sectionIndex) => {
      const latest = stories.filter((story) => story.category === category).slice(0, 2);
      const intro = categoryIntro[category];
      const dark = sectionIndex === 2;
      return <section id={categorySlug[category]} key={category} style={{ scrollMarginTop: 70, padding: 'clamp(90px,11vw,155px) 0', background: sectionIndex % 2 ? '#e7dfd1' : dark ? '#17352d' : '#fff', color: dark ? '#f5f1e8' : '#17251f' }}><div className="wrap"><div className="grid md:grid-cols-[1fr_.75fr] gap-8 items-end" style={{ marginBottom: 54 }}><div><p className="eyebrow" style={{ color: dark ? '#c79a72' : '#9b5e3d', margin: '0 0 17px' }}>0{sectionIndex + 1} / {intro.kicker}</p><h2 className="display" style={{ fontSize: 'clamp(54px,8vw,106px)', margin: 0 }}>{category}</h2></div><p className="summary" style={{ color: dark ? 'rgba(245,241,232,.72)' : '#59605b', margin: '0 0 8px' }}>{intro.description}</p></div><div className="preview-grid">{latest.map((story, index) => <StoryPreview key={story.slug} story={story} index={index} dark={dark} getObjectPosition={getObjectPosition} />)}</div><div style={{ marginTop: 56 }}><Link href={`/stories/${categorySlug[category]}`} className="button">View More</Link></div></div></section>;
    })}
  </>;
}

function StoryPreview({ story, index, dark, getObjectPosition }: { story: EditorialStory; index: number; dark: boolean; getObjectPosition: (url: string) => string }) {
  return <article><Link href={`/stories/article/${story.slug}`}><img src={story.coverImage} alt={story.title} className="image" style={{ height: index ? 430 : 570, objectPosition: getObjectPosition(story.coverImage) }} /><p className="eyebrow" style={{ color: dark ? '#c79a72' : '#9b5e3d', margin: '21px 0 11px' }}>{formatDate(story.date)} · {story.location}</p><h3 style={{ fontSize: 'clamp(26px,3vw,40px)', lineHeight: 1.18, fontWeight: 500, margin: '0 0 14px' }}>{story.title}</h3><p className="summary" style={{ color: dark ? 'rgba(245,241,232,.7)' : '#59605b', margin: 0, maxWidth: 650 }}>{story.excerpt}</p></Link></article>;
}

function CategoryArchive({ category, stories, page, setPage, getObjectPosition }: { category: StoryCategory; stories: EditorialStory[]; page: number; setPage: Dispatch<SetStateAction<number>>; getObjectPosition: (url: string) => string }) {
  const filtered = stories.filter((story) => story.category === category);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return <><header className="wrap" style={{ paddingBottom: 'clamp(70px,9vw,120px)' }}><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 22px' }}>Stories / {categoryIntro[category].kicker}</p><h1 className="display" style={{ fontSize: 'clamp(66px,10vw,142px)', margin: '0 0 34px' }}>{category}</h1><p className="summary" style={{ maxWidth: 670, margin: 0 }}>{categoryIntro[category].description}</p></header><section style={{ background: '#fff', padding: 'clamp(80px,10vw,140px) 0' }}><div className="wrap"><div className="archive-grid">{visible.map((story, index) => <article className="archive-card" key={story.slug}><Link href={`/stories/article/${story.slug}`}><img src={story.coverImage} alt={story.title} className="image" style={{ height: index % 3 === 2 ? 520 : 410, objectPosition: getObjectPosition(story.coverImage) }} /><div className="grid md:grid-cols-[.35fr_1fr] gap-5" style={{ paddingTop: 22 }}><p className="eyebrow" style={{ color: '#9b5e3d', margin: 0 }}>{formatDate(story.date)}</p><div><h2 style={{ fontSize: 'clamp(25px,2.5vw,36px)', lineHeight: 1.18, fontWeight: 500, margin: '0 0 13px' }}>{story.title}</h2><p className="summary" style={{ margin: '0 0 13px' }}>{story.excerpt}</p><p className="eyebrow" style={{ margin: 0 }}>{story.location}</p></div></div></Link></article>)}</div>{totalPages > 1 && <nav className="flex justify-between items-center" style={{ borderTop: '1px solid #d8d2c7', marginTop: 72, paddingTop: 25 }}><button className="section-tab" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>← Previous</button><span className="eyebrow">{page} / {totalPages}</span><button className="section-tab" disabled={page === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>Next →</button></nav>}</div></section></>;
}
