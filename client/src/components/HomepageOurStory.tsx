import { useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useMediaObjectPosition } from '@/lib/media-position';

const DISPLAY_FONT = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const BODY_FONT = "var(--font-travel-sans, 'Cabin', 'Josefin Sans', 'Helvetica Neue', Arial, sans-serif)";

const fallbackImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1354&h=900&fit=crop',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1354&h=900&fit=crop',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1354&h=900&fit=crop',
];

const sections = [
  { id: 'why-we-started', title: 'Why We Started', content: 'TreeThousands began with a simple belief: China is best understood slowly, through the people and places that give it life. We wanted to create journeys that move beyond familiar landmarks and make room for genuine encounters, shared meals, and stories that stay with you.' },
  { id: 'what-we-believe', title: 'What We Believe', content: 'We believe meaningful travel begins with curiosity and respect. A journey should feel personal rather than prescribed, connecting travelers with local culture while honoring the communities, traditions, and landscapes that welcome us.' },
  { id: 'our-way-of-travel', title: 'Our Way of Travel', content: 'Our journeys are thoughtfully paced and shaped around real human connection. We listen first, travel in small and considered ways, and work with people who know their home deeply. The result is less about covering ground and more about experiencing a place with attention.' },
  { id: 'why-rural-china', title: 'Why Rural China', content: 'Beyond the cities is a China of mountain paths, working villages, living traditions, and extraordinary everyday knowledge. Rural China offers a different rhythm and perspective—one that reveals how culture, land, and community remain closely connected.' },
  { id: 'growing-together', title: 'Growing Together', content: 'Travel can create value in both directions. We aim to build long-term relationships with local partners, support community-led experiences, and keep learning from every journey. As TreeThousands grows, we want the people and places around us to grow with us.' },
];

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

export default function HomepageOurStory() {
  const [expanded, setExpanded] = useState(false);
  const { data: homepageData } = trpc.homepage.getPublicData.useQuery();
  const getObjectPosition = useMediaObjectPosition();
  const storyImages = (homepageData?.imageStories ?? []).map((story) => story.image).filter((image): image is string => typeof image === 'string' && image.length > 0);
  const imagePool = [...storyImages, ...normalizeImages(homepageData?.hero?.backgroundImage), ...fallbackImages];
  const visibleSections = expanded ? sections : sections.slice(0, 3);

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

  return (
    <section id="our-story" className="our-story-home bg-[#F5F3EF]" style={{ scrollMarginTop: 80, paddingTop: 'clamp(64px, 7vw, 96px)', paddingBottom: 'clamp(50px, 6vw, 80px)' }}>
      <div className="px-6 text-center" style={{ marginBottom: 'clamp(48px, 6vw, 76px)' }}>
        <h2 style={{ fontFamily: DISPLAY_FONT, fontSize: 'clamp(42px, 5vw, 62px)', fontWeight: 400, lineHeight: 1, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#000', margin: 0 }}>
          Our Story
        </h2>
      </div>

      {visibleSections.map((section, index) => {
        const image = imagePool[index] || fallbackImages[index % fallbackImages.length];
        const text = (
          <div className="our-story-edge-text">
            <div className="tea-detail-text-inner">
              <h3 style={{ fontFamily: DISPLAY_FONT, fontSize: 'clamp(34px, 3.6vw, 45px)', fontWeight: 400, lineHeight: 1, letterSpacing: '2.25px', color: '#000', margin: '0 0 18px', textTransform: 'uppercase' }}>{section.title}</h3>
              <p style={{ fontFamily: BODY_FONT, fontSize: 17, lineHeight: 1.6, letterSpacing: '0.04em', color: '#52575c', margin: 0 }}>{section.content}</p>
            </div>
          </div>
        );
        const visual = (
          <div className="our-story-edge-image-wrap">
            <img src={image} alt={section.title} className="our-story-edge-image" style={{ objectPosition: getObjectPosition(image) }} />
          </div>
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
          {expanded ? 'Show Less' : 'Explore More'}
        </button>
      </div>
    </section>
  );
}
