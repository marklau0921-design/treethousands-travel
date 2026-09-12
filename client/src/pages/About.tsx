import { useEffect } from 'react';
import { useLocation } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OurStoryRecommendations from '@/components/OurStoryRecommendations';
import { trpc } from '@/lib/trpc';
import { useMediaObjectPosition } from '@/lib/media-position';

const DISPLAY_FONT = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const BODY_FONT = "var(--font-travel-sans, 'Cabin', 'Josefin Sans', 'Helvetica Neue', Arial, sans-serif)";

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
  const currentSlug = location.startsWith('/our-story/') ? location.slice('/our-story/'.length) : undefined;
  const { data: homepageData } = trpc.homepage.getPublicData.useQuery();
  const { data: cmsSections } = trpc.ourStory.listPublicSections.useQuery();
  const getObjectPosition = useMediaObjectPosition();

  const storyImages = (homepageData?.imageStories ?? [])
    .map((story) => story.image)
    .filter((image): image is string => typeof image === 'string' && image.length > 0);
  const heroImages = normalizeImages(homepageData?.hero?.backgroundImage);
  const imagePool = [...storyImages, ...heroImages];
  const storySections = cmsSections !== undefined
    ? cmsSections.map(section => ({ id: section.slug, title: section.title, content: section.content, image: section.image ?? '' }))
    : [];

  useEffect(() => {
    const sectionId = currentSlug ?? '';
    window.requestAnimationFrame(() => {
      if (!sectionId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [currentSlug, cmsSections]);

  if (cmsSections === undefined || homepageData === undefined) return <div className="min-h-screen bg-[#F5F3EF]" />;

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
          const image = section.image || imagePool[index] || '';
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
          const visual = image ? (
            <div className="tea-detail-img-wrap">
              <img src={image} alt={section.title} className="tea-detail-img" style={{ objectPosition: getObjectPosition(image) }} />
            </div>
          ) : null;

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

      <OurStoryRecommendations currentSlug={currentSlug} />

      <Footer />
    </div>
  );
}
