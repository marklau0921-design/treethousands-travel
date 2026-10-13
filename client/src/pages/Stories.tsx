import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { Link, useLocation } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { useMediaObjectPosition } from '@/lib/media-position';
import { inferStoryCategory, mergePublishedStories, normalizeStoryDetail, plainExcerpt, STORY_CATEGORIES, type EditorialStory, type StoryCategory } from '@/lib/story-content';

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
  const { data, isLoading } = trpc.cms.listStories.useQuery();
  const getObjectPosition = useMediaObjectPosition();
  const selectedCategory = slugCategory[location.split('/')[2] || ''];
  const isOverview = !selectedCategory;
  const [currentSection, setCurrentSection] = useState<StoryCategory>('Brand Stories');
  const [page, setPage] = useState(1);

  const stories = useMemo<EditorialStory[]>(() => {
    const databaseStories = (data ?? []).map((story, index) => {
      const base = { id: story.id, slug: story.slug, title: story.title, category: inferStoryCategory(story.title, index), date: new Date(story.createdAt).toISOString(), location: 'Rural China', excerpt: plainExcerpt(story.content), content: story.content || '', coverImage: story.coverImage || '' };
      const pageContent = normalizeStoryDetail(story.pageContent, base);
      return { ...base, category: pageContent.meta.category, date: pageContent.meta.publishedDate, location: pageContent.meta.location, excerpt: pageContent.meta.excerpt || base.excerpt, pageContent };
    });
    return mergePublishedStories(databaseStories);
  }, [data]);

  useEffect(() => {
    setPage(1);
    document.title = 'TreeThousands';
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

  if (isLoading) return <div className="min-h-screen bg-white" />;

  return <div className="stories-page min-h-screen bg-white text-[#17251f]" style={{ fontFamily: SANS }}>
    <style>{`
      .stories-page .wrap{width:min(1320px,calc(100% - 64px));margin:0 auto}.stories-page .display{font-family:${DISPLAY};font-weight:400;letter-spacing:.045em;line-height:.92;text-transform:uppercase}.stories-page .eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}.stories-page .summary{font-size:16px;line-height:1.65;letter-spacing:.025em;color:#59605b}.stories-page a{text-decoration:none;color:inherit}.stories-page .image{width:100%;height:100%;object-fit:cover;display:block}.stories-page .stories-intro{padding-bottom:clamp(54px,6.5vw,84px)}.stories-page .stories-banner{height:clamp(330px,43vw,570px);margin-top:clamp(42px,5vw,68px);overflow:hidden}.stories-page .section-nav{display:flex;justify-content:center;gap:clamp(26px,5vw,72px);overflow-x:auto;scrollbar-width:none}.stories-page .section-nav::-webkit-scrollbar{display:none}.stories-page .section-tab{white-space:nowrap;padding:0 0 13px;border:0;border-bottom:3px solid transparent;background:none;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.stories-page .section-tab.active{color:#9b5e3d;border-bottom-color:#9b5e3d}.stories-page .category-section{padding:clamp(105px,11vw,150px) 0;scroll-margin-top:70px}.stories-page .category-section:nth-of-type(odd){background:#f4f4f2}.stories-page .category-section:nth-of-type(even){background:#fff}.stories-page .category-head{display:grid;grid-template-columns:1fr .75fr;gap:32px;align-items:end;margin-bottom:58px}.stories-page .story-link{display:block}.stories-page .story-frame{overflow:hidden;background:#e9e9e6}.stories-page .story-frame img{transition:transform .45s ease}.stories-page .story-link:hover .story-frame img{transform:scale(1.02)}.stories-page .story-title{font-size:clamp(26px,3vw,40px);line-height:1.18;font-weight:500;margin:0 0 14px;transition:color .2s ease}.stories-page .story-link:hover .story-title{color:#9b5e3d}.stories-page .story-meta{color:#9b5e3d;margin:21px 0 11px}.stories-page .brand-layout{display:grid;grid-template-columns:minmax(0,1.58fr) minmax(300px,.92fr);gap:32px;align-items:start}.stories-page .brand-main .story-frame{aspect-ratio:1.08/1}.stories-page .brand-side{display:grid;gap:44px}.stories-page .brand-side .story-frame{aspect-ratio:16/9}.stories-page .brand-side .summary{display:none}.stories-page .village-top{display:grid;grid-template-columns:minmax(0,1.58fr) minmax(280px,.92fr);gap:32px;align-items:start}.stories-page .village-top>article:first-child .story-frame{aspect-ratio:4/3}.stories-page .village-top>article:nth-child(2){margin-top:64px}.stories-page .village-top>article:nth-child(2) .story-frame{aspect-ratio:3/4}.stories-page .village-wide{width:79%;margin-top:74px}.stories-page .village-wide .story-frame{aspect-ratio:2/1}.stories-page .local-layout{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;align-items:start}.stories-page .local-layout .story-frame{aspect-ratio:3/4}.stories-page .local-layout>article:nth-child(2){margin-top:92px}.stories-page .local-layout>article:nth-child(3){margin-top:42px}.stories-page .journal-top{display:grid;grid-template-columns:minmax(0,1.56fr) minmax(280px,.9fr);gap:34px;align-items:start}.stories-page .journal-top>article:first-child .story-frame{aspect-ratio:16/10}.stories-page .journal-top>article:nth-child(2){margin-top:68px}.stories-page .journal-top>article:nth-child(2) .story-frame{aspect-ratio:3/4}.stories-page .journal-wide{display:grid;grid-template-columns:.72fr 1.28fr;gap:34px;align-items:center;margin-top:84px}.stories-page .journal-wide .story-frame{aspect-ratio:16/9}.stories-page .journal-wide .story-meta{margin-top:0}.stories-page .view-more{display:inline-flex;align-items:center;gap:9px;margin-top:58px;padding-bottom:7px;border-bottom:1px solid currentColor;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.stories-page .view-more span{transition:transform .2s ease}.stories-page .view-more:hover span{transform:translate(3px,-3px)}.stories-page .archive-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:58px 32px}.stories-page .archive-card{grid-column:span 6}.stories-page .archive-card:nth-child(3n){grid-column:3/span 8}@media(max-width:767px){.stories-page .wrap{width:calc(100% - 40px)}.stories-page .stories-intro{padding-bottom:48px}.stories-page .stories-banner{height:280px;margin-top:38px}.stories-page .section-nav{justify-content:flex-start;gap:27px}.stories-page .category-section{padding:76px 0}.stories-page .category-head{display:block;margin-bottom:42px}.stories-page .category-head .summary{margin-top:24px!important}.stories-page .brand-layout,.stories-page .village-top,.stories-page .local-layout,.stories-page .journal-top,.stories-page .journal-wide,.stories-page .archive-grid{display:block}.stories-page .brand-side{display:block}.stories-page .story-link{margin:0 0 46px}.stories-page .brand-main .story-frame,.stories-page .brand-side .story-frame,.stories-page .village-top>article:first-child .story-frame,.stories-page .village-top>article:nth-child(2) .story-frame,.stories-page .village-wide .story-frame,.stories-page .local-layout .story-frame,.stories-page .journal-top>article:first-child .story-frame,.stories-page .journal-top>article:nth-child(2) .story-frame,.stories-page .journal-wide .story-frame{aspect-ratio:4/3}.stories-page .village-top>article:nth-child(2),.stories-page .local-layout>article:nth-child(2),.stories-page .local-layout>article:nth-child(3),.stories-page .journal-top>article:nth-child(2){margin-top:0}.stories-page .village-wide,.stories-page .journal-wide{width:100%;margin-top:0}.stories-page .journal-wide .journal-copy{margin-bottom:20px}.stories-page .view-more{margin-top:4px}.stories-page .archive-card{margin:0 0 48px!important}}
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
    <header className="wrap stories-intro"><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 22px' }}>Travel Magazine / Field Journal</p><div className="grid md:grid-cols-[1.2fr_.8fr] gap-8 items-end"><h1 className="display" style={{ fontSize: 'clamp(74px,12vw,168px)', margin: 0 }}>Stories</h1><p className="summary" style={{ margin: '0 0 10px', maxWidth: 520 }}>People, places, and everyday moments from across rural China—recorded slowly and shared with care.</p></div><div className="stories-banner"><img src="/images/stories/stories-banner.jpg" alt="Tree Thousands field gathering in a bamboo forest" className="image" style={{ objectPosition: 'center center' }} /></div></header>
    <nav className="wrap section-nav" aria-label="Story sections" style={{ paddingBottom: 34 }}>{CATEGORIES.map((category) => <button key={category} className={`section-tab ${currentSection === category ? 'active' : ''}`} onClick={() => scrollToCategory(category)}>{category}</button>)}</nav>
    {CATEGORIES.map((category, sectionIndex) => {
      const latest = stories.filter((story) => story.category === category).slice(0, 3);
      const intro = categoryIntro[category];
      return <section id={categorySlug[category]} key={category} className="category-section"><div className="wrap"><div className="category-head"><div><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 17px' }}>0{sectionIndex + 1} / {intro.kicker}</p><h2 className="display" style={{ fontSize: 'clamp(54px,8vw,106px)', margin: 0 }}>{category}</h2></div><p className="summary" style={{ margin: '0 0 8px' }}>{intro.description}</p></div><CategoryStoriesLayout category={category} stories={latest} getObjectPosition={getObjectPosition} /><Link href={`/stories/${categorySlug[category]}`} className="view-more">View More {category} <span>↗</span></Link></div></section>;
    })}
  </>;
}

function CategoryStoriesLayout({ category, stories, getObjectPosition }: { category: StoryCategory; stories: EditorialStory[]; getObjectPosition: (url: string) => string }) {
  if (category === 'Brand Stories') return <div className="brand-layout">{stories[0] && <StoryPreview story={stories[0]} className="brand-main" getObjectPosition={getObjectPosition} />}<div className="brand-side">{stories.slice(1).map((story) => <StoryPreview key={story.slug} story={story} getObjectPosition={getObjectPosition} />)}</div></div>;
  if (category === 'Village Notes') return <><div className="village-top">{stories.slice(0, 2).map((story) => <StoryPreview key={story.slug} story={story} getObjectPosition={getObjectPosition} />)}</div>{stories[2] && <StoryPreview story={stories[2]} className="village-wide" getObjectPosition={getObjectPosition} />}</>;
  if (category === 'Local Life') return <div className="local-layout">{stories.map((story) => <StoryPreview key={story.slug} story={story} getObjectPosition={getObjectPosition} />)}</div>;
  return <><div className="journal-top">{stories.slice(0, 2).map((story) => <StoryPreview key={story.slug} story={story} getObjectPosition={getObjectPosition} />)}</div>{stories[2] && <Link href={`/stories/article/${stories[2].slug}`} className="journal-wide story-link" aria-label={`Read ${stories[2].title}`}><div className="journal-copy"><p className="eyebrow story-meta">{formatDate(stories[2].date)} · {stories[2].location}</p><h3 className="story-title">{stories[2].title}</h3><p className="summary" style={{ margin: 0 }}>{stories[2].excerpt}</p></div><div className="story-frame"><img src={stories[2].coverImage} alt={stories[2].title} className="image" style={{ objectPosition: getObjectPosition(stories[2].coverImage) }} /></div></Link>}</>;
}

function StoryPreview({ story, className = '', getObjectPosition }: { story: EditorialStory; className?: string; getObjectPosition: (url: string) => string }) {
  return <article className={className}><Link href={`/stories/article/${story.slug}`} className="story-link"><div className="story-frame"><img src={story.coverImage} alt={story.title} className="image" style={{ objectPosition: getObjectPosition(story.coverImage) }} /></div><p className="eyebrow story-meta">{formatDate(story.date)} · {story.location}</p><h3 className="story-title">{story.title}</h3><p className="summary" style={{ margin: 0, maxWidth: 650 }}>{story.excerpt}</p></Link></article>;
}

function CategoryArchive({ category, stories, page, setPage, getObjectPosition }: { category: StoryCategory; stories: EditorialStory[]; page: number; setPage: Dispatch<SetStateAction<number>>; getObjectPosition: (url: string) => string }) {
  const filtered = stories.filter((story) => story.category === category);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return <><header className="wrap" style={{ paddingBottom: 'clamp(70px,9vw,120px)' }}><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 22px' }}>Stories / {categoryIntro[category].kicker}</p><h1 className="display" style={{ fontSize: 'clamp(66px,10vw,142px)', margin: '0 0 34px' }}>{category}</h1><p className="summary" style={{ maxWidth: 670, margin: 0 }}>{categoryIntro[category].description}</p></header><section style={{ background: '#fff', padding: 'clamp(80px,10vw,140px) 0' }}><div className="wrap"><div className="archive-grid">{visible.map((story, index) => <article className="archive-card" key={story.slug}><Link href={`/stories/article/${story.slug}`}><img src={story.coverImage} alt={story.title} className="image" style={{ height: index % 3 === 2 ? 520 : 410, objectPosition: getObjectPosition(story.coverImage) }} /><div className="grid md:grid-cols-[.35fr_1fr] gap-5" style={{ paddingTop: 22 }}><p className="eyebrow" style={{ color: '#9b5e3d', margin: 0 }}>{formatDate(story.date)}</p><div><h2 style={{ fontSize: 'clamp(25px,2.5vw,36px)', lineHeight: 1.18, fontWeight: 500, margin: '0 0 13px' }}>{story.title}</h2><p className="summary" style={{ margin: '0 0 13px' }}>{story.excerpt}</p><p className="eyebrow" style={{ margin: 0 }}>{story.location}</p></div></div></Link></article>)}</div>{totalPages > 1 && <nav className="flex justify-between items-center" style={{ borderTop: '1px solid #d8d2c7', marginTop: 72, paddingTop: 25 }}><button className="section-tab" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>← Previous</button><span className="eyebrow">{page} / {totalPages}</span><button className="section-tab" disabled={page === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>Next →</button></nav>}</div></section></>;
}
