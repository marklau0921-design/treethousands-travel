import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useMediaObjectPosition } from '@/lib/media-position';
import type { HomepageOurStoryContent } from '@shared/homepage';

const DISPLAY_FONT = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const BODY_FONT = "var(--font-travel-sans, 'Cabin', 'Josefin Sans', 'Helvetica Neue', Arial, sans-serif)";

function normalizeImages(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((url): url is string => typeof url === 'string' && url.length > 0);
  if (typeof value !== 'string' || !value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((url): url is string => typeof url === 'string' && url.length > 0) : [value];
  } catch {
    return [value];
  }
}

export default function HomepageOurStory({ content: settings }: { content: HomepageOurStoryContent }) {
  const [expanded, setExpanded] = useState(false);
  const { data: homepageData } = trpc.homepage.getPublicData.useQuery();
  const { data: cmsSections } = trpc.ourStory.listPublicSections.useQuery();
  const getObjectPosition = useMediaObjectPosition();
  const storyImages = (homepageData?.imageStories ?? []).map((story) => story.image).filter((image): image is string => typeof image === 'string' && image.length > 0);
  const imagePool = [...storyImages, ...normalizeImages(homepageData?.hero?.backgroundImage)];
  const sections = cmsSections !== undefined
    ? cmsSections.map(section => ({
        id: section.slug,
        title: section.title,
        content: section.content,
        eyebrow: section.eyebrow ?? '',
        image: section.image ?? '',
        ctaLabel: 'Discover More',
        ctaBgColor: '#000000',
        ctaTextColor: '#ffffff',
      }))
    : [];
  const visibleSections = expanded ? sections : sections.slice(0, settings.initiallyVisible);

  useEffect(() => {
    const revealHashTarget = () => {
      const targetId = window.location.hash.slice(1);
      if (!targetId) return;
      if (sections.slice(3).some((section) => section.id === targetId)) setExpanded(true);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })));
    };
    revealHashTarget();
    window.addEventListener('hashchange', revealHashTarget);
    window.addEventListener('popstate', revealHashTarget);
    return () => {
      window.removeEventListener('hashchange', revealHashTarget);
      window.removeEventListener('popstate', revealHashTarget);
    };
  }, []);

  if (cmsSections && cmsSections.length === 0) return null;

  return (
    <section id="our-story" className="our-story-home" style={{ background:settings.backgroundColor, scrollMarginTop: 80, paddingTop: 'clamp(64px, 7vw, 96px)', paddingBottom: 'clamp(50px, 6vw, 80px)' }}>
      <style>{`
        .our-story-home .our-story-edge-row{display:flex;flex-direction:row;align-items:stretch;width:100%;margin:0 0 32px}
        .our-story-home .our-story-edge-text,.our-story-home .our-story-edge-image-wrap{flex:0 0 50%;min-width:0}
        .our-story-home .our-story-edge-text{display:flex;align-items:center;justify-content:center;padding:48px;box-sizing:border-box}
        .our-story-home .our-story-edge-image-wrap{display:flex}
        .our-story-home .our-story-edge-image{display:block;width:100%;height:480px;object-fit:cover}
        @media(max-width:767px){
          .our-story-home .our-story-edge-row{flex-direction:column;margin-bottom:28px}
          .our-story-home .our-story-edge-text,.our-story-home .our-story-edge-image-wrap{flex:none;width:100%}
          .our-story-home .our-story-edge-image-wrap{order:1}
          .our-story-home .our-story-edge-text{order:2;padding:32px 24px 20px}
          .our-story-home .our-story-edge-image{height:280px}
        }
      `}</style>
      {visibleSections.map((section, index) => {
        const image = section.image || imagePool[index] || '';
        const text = (
          <div className="our-story-edge-text">
            <div className="tea-detail-text-inner">
              <h3 style={{ fontFamily: DISPLAY_FONT, fontSize: 'clamp(34px, 3.6vw, 45px)', fontWeight: 400, lineHeight: 1, letterSpacing: '2.25px', color: '#000', margin: '0 0 18px', textTransform: 'uppercase' }}>{section.title}</h3>
              <p style={{ fontFamily: BODY_FONT, fontSize: 17, lineHeight: 1.6, letterSpacing: '0.04em', color: '#52575c', margin: 0 }}>{section.content}</p>
              <Link href={`/our-story/${section.id}`}>
                <button
                  type="button"
                  style={{ fontFamily: BODY_FONT, marginTop: 28, backgroundColor: section.ctaBgColor, color: section.ctaTextColor, borderColor: section.ctaBgColor }}
                  className="px-8 py-3 text-sm font-normal tracking-wider uppercase rounded border-2 transition-all duration-300 active:scale-95"
                  onMouseEnter={event => { event.currentTarget.style.backgroundColor = 'transparent'; event.currentTarget.style.color = section.ctaBgColor; }}
                  onMouseLeave={event => { event.currentTarget.style.backgroundColor = section.ctaBgColor; event.currentTarget.style.color = section.ctaTextColor; }}
                >
                  {section.ctaLabel}
                </button>
              </Link>
            </div>
          </div>
        );
        const visual = (
          image ? <div className="our-story-edge-image-wrap">
            <img src={image} alt={section.title} className="our-story-edge-image" style={{ objectPosition: getObjectPosition(image) }} />
          </div> : null
        );
        return (
          <article id={section.id} key={section.id} className="our-story-edge-row" style={{ scrollMarginTop: 80 }}>
            {index % 2 === 0 ? <>{text}{visual}</> : <>{visual}{text}</>}
          </article>
        );
      })}

      <div className="flex justify-center px-6" style={{ marginTop: 18 }}>
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
          className="px-8 py-3 bg-black text-white text-sm font-normal tracking-wider uppercase rounded border-2 border-black hover:bg-[#F5F3EF] hover:text-black transition-all duration-300 active:scale-95"
        >
          {expanded ? settings.showLessLabel : settings.showMoreLabel}
        </button>
      </div>
    </section>
  );
}
