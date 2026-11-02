import { useEffect, useMemo } from 'react';
import { Link, useRoute } from 'wouter';
import Navigation from '@/components/Navigation';
import { trpc } from '@/lib/trpc';
import { inferStoryCategory, mergePublishedStories, normalizeStoryDetail, plainExcerpt, type EditorialStory } from '@/lib/story-content';
import OurStoryEditorialTemplate from '@/components/OurStoryEditorialTemplate';
import { ourStoryEditorialPages, type OurStoryEditorialContent } from '@/content/ourStoryEditorialPages';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";

function legacyStoryToSharedTemplate(story:EditorialStory,page:ReturnType<typeof normalizeStoryDetail>):OurStoryEditorialContent {
  const blockImages=page.contentBlocks.flatMap(block=>block.images||[]);
  const pool=[story.coverImage,...blockImages,...page.inside.images,...page.quote.images,page.closing.image].filter(Boolean);
  const image=(index:number)=>({src:pool[index%Math.max(pool.length,1)]||story.coverImage,alt:story.title});
  const opening=page.opening.paragraphs.length?page.opening.paragraphs:[story.excerpt];
  return {
    hero:{image:story.coverImage,alt:story.title,metaLeft:`TREE THOUSANDS / ${page.meta.category.toUpperCase()}`,metaRight:'',title:story.title,subtitle:page.meta.excerpt},
    beginning:{eyebrow:'01 / THE BEGINNING',title:page.inside.title||story.title,paragraphs:opening,images:[image(1),image(2),image(3),image(4)]},
    turning:{eyebrow:'02 / THE TURNING POINT',title:page.inside.title||'A Different Way of Seeing.',leftParagraphs:[page.inside.context].filter(Boolean),rightParagraphs:[page.inside.body].filter(Boolean),images:[image(5),image(6),image(7)],captions:['','']},
    action:{eyebrow:'03 / TAKING PART',title:page.quote.eyebrow||'What Happened Next.',paragraphs:[page.quote.body].filter(Boolean),images:[image(8),image(9),image(10)]},
    belief:{eyebrow:'04 / WHAT IT MEANS',title:page.closing.eyebrow||'What Stayed With Us.',paragraphs:page.closing.paragraphs.length?page.closing.paragraphs:[story.excerpt],sideParagraphs:[page.inside.context].filter(Boolean),quote:page.quote.quote,images:[image(11),image(12),image(13)]},
    closing:{eyebrow:'THE STORY CONTINUES',title:page.closing.title,paragraph:page.closing.paragraphs.join(' '),image:image(14)},
    recommendations:{title:page.related.title||'What We Are Explore',description:'Ongoing ways to take part with care.',backgroundImage:image(15).src},
    cta:{title:'So, Ready to Take Part?',buttonLabel:'Explore Activities',buttonHref:'/explore',image:image(16).src},
  };
}

export default function StoryDetail() {
  const [, params] = useRoute('/stories/article/:slug');
  const { data = [], isLoading } = trpc.cms.listStories.useQuery();
  const stories = useMemo<EditorialStory[]>(() => {
    const databaseStories = data.map((item, index) => { const detail = item.pageContent; return { id: item.id, slug: item.slug, title: item.title, category: detail.meta.category || inferStoryCategory(item.title, index), date: detail.meta.publishedDate || new Date(item.createdAt).toISOString(), location: detail.meta.location, excerpt: detail.meta.excerpt || plainExcerpt(item.content), content: item.content || '', coverImage: item.coverImage || '', pageContent: detail }; });
    return mergePublishedStories(databaseStories);
  }, [data]);
  const story = stories.find((item) => item.slug === params?.slug);

  useEffect(() => {
    if (!story) return;
    document.title = 'TreeThousands';
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

  if (isLoading && !story) return <div style={{ minHeight: '100vh', background: '#fff' }}><Navigation /></div>;
  if (!story) return <div style={{ minHeight: '100vh', background: '#f5f1e8', paddingTop: 180, textAlign: 'center', fontFamily: SANS }}><Navigation /><h1 style={{ fontFamily: DISPLAY, fontSize: 72, textTransform: 'uppercase' }}>Story not found</h1><Link href="/stories">Return to Stories</Link></div>;
  const page = normalizeStoryDetail(story.pageContent, story);
  const sharedTemplate = (page.editorialTemplate as OurStoryEditorialContent | undefined) || ourStoryEditorialPages[story.slug] || legacyStoryToSharedTemplate(story,page);
  return <OurStoryEditorialTemplate content={sharedTemplate} />;

}
