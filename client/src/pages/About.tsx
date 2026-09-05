import { useEffect } from 'react';
import { useLocation } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { useMediaObjectPosition } from '@/lib/media-position';

const DISPLAY_FONT = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const BODY_FONT = "var(--font-travel-sans, 'Cabin', 'Josefin Sans', 'Helvetica Neue', Arial, sans-serif)";

const fallbackImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1354&h=900&fit=crop',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1354&h=900&fit=crop',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1354&h=900&fit=crop',
];

const storySections = [
  {
    id: 'why-we-started',
    title: 'Why We Started',
    content: 'TreeThousands began with a simple belief: China is best understood slowly, through the people and places that give it life. We wanted to create journeys that move beyond familiar landmarks and make room for genuine encounters, shared meals, and stories that stay with you.',
  },
  {
    id: 'what-we-believe',
    title: 'What We Believe',
    content: 'We believe meaningful travel begins with curiosity and respect. A journey should feel personal rather than prescribed, connecting travelers with local culture while honoring the communities, traditions, and landscapes that welcome us.',
  },
  {
    id: 'our-way-of-travel',
    title: 'Our Way of Travel',
    content: 'Our journeys are thoughtfully paced and shaped around real human connection. We listen first, travel in small and considered ways, and work with people who know their home deeply. The result is less about covering ground and more about experiencing a place with attention.',
  },
  {
    id: 'why-rural-china',
    title: 'Why Rural China',
    content: 'Beyond the cities is a China of mountain paths, working villages, living traditions, and extraordinary everyday knowledge. Rural China offers a different rhythm and perspective—one that reveals how culture, land, and community remain closely connected.',
  },
  {
    id: 'growing-together',
    title: 'Growing Together',
    content: 'Travel can create value in both directions. We aim to build long-term relationships with local partners, support community-led experiences, and keep learning from every journey. As TreeThousands grows, we want the people and places around us to grow with us.',
  },
];

function normalizeImages(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((url): url is string => typeof url === 'string' && url.length > 0);
  }
  if (typeof value !== 'string' || !value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((url): url is string => typeof url === 'string' && url.length > 0)
      : [value];
  } catch {
    return [value];
  }
}

export default function About() {
  const [location] = useLocation();
  const { data: homepageData } = trpc.homepage.getPublicData.useQuery();
  const getObjectPosition = useMediaObjectPosition();

  const storyImages = (homepageData?.imageStories ?? [])
    .map((story) => story.image)
    .filter((image): image is string => typeof image === 'string' && image.length > 0);
  const heroImages = normalizeImages(homepageData?.hero?.backgroundImage);
  const imagePool = [...storyImages, ...heroImages, ...fallbackImages];

  useEffect(() => {
    const sectionId = location.startsWith('/our-story/') ? location.slice('/our-story/'.length) : '';
    window.requestAnimationFrame(() => {
      if (!sectionId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location]);

  return (
    <div className="our-story-page min-h-screen flex flex-col bg-[#F5F3EF]">
      <Navigation />

      <header className="px-6 text-center" style={{ paddingTop: 'clamp(130px, 14vw, 190px)', paddingBottom: 'clamp(70px, 8vw, 110px)' }}>
        <p style={{ fontFamily: BODY_FONT, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#777', margin: '0 0 18px' }}>
          TreeThousands
        </p>
        <h1 style={{ fontFamily: DISPLAY_FONT, fontSize: 'clamp(52px, 7vw, 82px)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#000', margin: 0 }}>
          Our Story
        </h1>
      </header>

      <main className="tea-body" style={{ paddingBottom: 'clamp(60px, 8vw, 110px)' }}>
        {storySections.map((section, index) => {
          const image = imagePool[index] || fallbackImages[index % fallbackImages.length];
          const text = (
            <div className="tea-detail-text">
              <div className="tea-detail-text-inner">
                <h2 style={{ fontFamily: DISPLAY_FONT, fontSize: 'clamp(34px, 3.6vw, 45px)', fontWeight: 400, lineHeight: 1, letterSpacing: '2.25px', color: '#000', margin: '0 0 18px', textTransform: 'uppercase' }}>
                  {section.title}
                </h2>
                <p style={{ fontFamily: BODY_FONT, fontSize: 17, lineHeight: 1.6, letterSpacing: '0.04em', color: '#52575c', margin: 0 }}>
                  {section.content}
                </p>
              </div>
            </div>
          );
          const visual = (
            <div className="tea-detail-img-wrap">
              <img src={image} alt={section.title} className="tea-detail-img" style={{ objectPosition: getObjectPosition(image) }} />
            </div>
          );

          return (
            <section
              id={section.id}
              key={section.id}
              className={`tea-detail-row${index % 2 === 0 ? '' : ' mirror'}`}
              style={{ scrollMarginTop: 80 }}
            >
              {index % 2 === 0 ? <>{text}{visual}</> : <>{visual}{text}</>}
            </section>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}
