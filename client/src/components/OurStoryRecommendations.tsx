import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useMediaObjectPosition } from '@/lib/media-position';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";

const fallbackImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&h=900&fit=crop',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=900&fit=crop',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&h=900&fit=crop',
  'https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&h=900&fit=crop',
];

const defaultStories = [
  { slug: 'why-we-started', title: 'Why We Started', eyebrow: 'Our Beginning' },
  { slug: 'what-we-believe', title: 'What We Believe', eyebrow: 'Our Values' },
  { slug: 'our-way-of-travel', title: 'Our Way of Travel', eyebrow: 'Our Approach' },
  { slug: 'why-rural-china', title: 'Why Rural China', eyebrow: 'Our Focus' },
  { slug: 'growing-together', title: 'Growing Together', eyebrow: 'Our Commitment' },
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

export default function OurStoryRecommendations({ currentSlug }: { currentSlug?: string }) {
  const { data: homepageData } = trpc.homepage.getPublicData.useQuery();
  const { data: cmsSections } = trpc.ourStory.listPublicSections.useQuery();
  const getObjectPosition = useMediaObjectPosition();
  const storyImages = (homepageData?.imageStories ?? [])
    .map((story) => story.image)
    .filter((image): image is string => typeof image === 'string' && image.length > 0);
  const imagePool = [...storyImages, ...normalizeImages(homepageData?.hero?.backgroundImage), ...fallbackImages];
  const stories = cmsSections !== undefined
    ? cmsSections.map(section => ({ slug: section.slug, title: section.title, eyebrow: section.eyebrow || 'Our Story', image: section.image ?? '' }))
    : defaultStories.map(story => ({ ...story, image: '' }));
  const currentIndex = stories.findIndex((story) => story.slug === currentSlug);
  const orderedStories = currentIndex < 0
    ? stories
    : [...stories.slice(currentIndex + 1), ...stories.slice(0, currentIndex)];
  const recommendations = orderedStories.slice(0, 3);

  if (stories.length === 0) return null;

  return (
    <section className="our-story-recommendations" style={{ background: '#e8e1d5', padding: 'clamp(78px,9vw,130px) 0' }}>
      <style>{`
        .our-story-recommendations .recommendations-wrap{width:min(1320px,calc(100% - 64px));margin:0 auto}
        .our-story-recommendations .recommendations-heading{display:flex;align-items:end;justify-content:space-between;gap:32px;margin-bottom:clamp(38px,5vw,62px)}
        .our-story-recommendations .recommendations-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .our-story-recommendations .recommendation-card{display:block;color:#17251f;text-decoration:none}
        .our-story-recommendations .recommendation-image{overflow:hidden;background:#d6cdbc;aspect-ratio:4/3}
        .our-story-recommendations .recommendation-image img{width:100%;height:100%;display:block;object-fit:cover;transition:transform .55s cubic-bezier(.2,.7,.2,1)}
        .our-story-recommendations .recommendation-card:hover .recommendation-image img{transform:scale(1.035)}
        .our-story-recommendations .recommendation-link{display:flex;align-items:center;justify-content:space-between;gap:18px;padding-top:20px}
        .our-story-recommendations .recommendation-icon{flex:none;transition:transform .25s ease}
        .our-story-recommendations .recommendation-card:hover .recommendation-icon{transform:translate(4px,-4px)}
        @media(max-width:767px){
          .our-story-recommendations .recommendations-wrap{width:calc(100% - 40px)}
          .our-story-recommendations .recommendations-heading{display:block}
          .our-story-recommendations .recommendations-grid{grid-template-columns:1fr;gap:42px}
        }
      `}</style>

      <div className="recommendations-wrap">
        <div className="recommendations-heading">
          <div>
            <p style={{ fontFamily: SANS, color: '#9b5e3d', fontSize: 11, fontWeight: 700, letterSpacing: '.19em', textTransform: 'uppercase', margin: '0 0 17px' }}>
              Continue exploring
            </p>
            <h2 style={{ fontFamily: DISPLAY, color: '#17352d', fontSize: 'clamp(48px,6vw,82px)', fontWeight: 400, letterSpacing: '.045em', lineHeight: .92, textTransform: 'uppercase', margin: 0 }}>
              More of Our Story
            </h2>
          </div>
          <p style={{ fontFamily: SANS, color: '#59615b', fontSize: 16, lineHeight: 1.65, letterSpacing: '.025em', maxWidth: 390, margin: 0 }}>
            Discover the ideas, people, and places that shape the way we travel.
          </p>
        </div>

        <div className="recommendations-grid">
          {recommendations.map((story) => {
            const originalIndex = stories.findIndex((item) => item.slug === story.slug);
            const image = story.image || imagePool[originalIndex] || fallbackImages[originalIndex % fallbackImages.length];
            return (
              <Link key={story.slug} href={`/our-story/${story.slug}`} className="recommendation-card">
                <div className="recommendation-image">
                  <img src={image} alt={story.title} style={{ objectPosition: getObjectPosition(image) }} />
                </div>
                <div className="recommendation-link">
                  <div>
                    <p style={{ fontFamily: SANS, color: '#9b5e3d', fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', margin: '0 0 9px' }}>{story.eyebrow}</p>
                    <h3 style={{ fontFamily: DISPLAY, fontSize: 'clamp(30px,3vw,42px)', fontWeight: 400, letterSpacing: '.045em', lineHeight: 1, textTransform: 'uppercase', margin: 0 }}>{story.title}</h3>
                  </div>
                  <ArrowUpRight className="recommendation-icon" size={25} strokeWidth={1.5} aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
