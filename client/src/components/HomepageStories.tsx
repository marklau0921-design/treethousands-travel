import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useMediaObjectPosition } from '@/lib/media-position';

const DISPLAY_FONT = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const BODY_FONT = "var(--font-travel-sans, 'Cabin', 'Josefin Sans', 'Helvetica Neue', Arial, sans-serif)";

const fallbackImages = [
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1354&h=900&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=700&fit=crop',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&h=700&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=700&fit=crop',
];

const storyCategories = [
  { title: 'Brand Stories', description: 'The ideas, people, and purpose behind TreeThousands—and the journeys that continue to shape who we are.', href: '/stories/brand-stories' },
  { title: 'Village Notes', description: 'Observations and encounters from villages across China, recorded with time, curiosity, and care.', href: '/stories/village-notes' },
  { title: 'Local Life', description: 'Everyday traditions, shared meals, working landscapes, and the people who keep local culture alive.', href: '/stories/local-life' },
  { title: 'Journal', description: 'Field notes, travel reflections, and practical inspiration for seeing a different side of China.', href: '/stories/journal' },
];

export default function HomepageStories() {
  const { data: homepageData } = trpc.homepage.getPublicData.useQuery();
  const getObjectPosition = useMediaObjectPosition();
  const uploadedImages = (homepageData?.imageStories ?? [])
    .map((story) => story.image)
    .filter((image): image is string => typeof image === 'string' && image.length > 0);
  const images = [...uploadedImages, ...fallbackImages];
  const featured = storyCategories[0];

  const action = (label: string) => (
    <span
      className="hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
      style={{ display: 'inline-block', marginTop: 24, background: '#111', color: '#fff', border: '2px solid #111', borderRadius: 4, padding: '12px 28px', fontFamily: BODY_FONT, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}
    >
      {label}
    </span>
  );

  return (
    <section id="stories" className="w-full bg-white" style={{ paddingTop: 100, paddingBottom: 80, scrollMarginTop: 80 }}>
      <h2 className="text-center uppercase px-4" style={{ fontFamily: DISPLAY_FONT, fontSize: 'clamp(36px, 4vw, 45px)', fontWeight: 400, letterSpacing: '2.25px', lineHeight: 1, color: '#000', margin: '0 0 64px' }}>
        Stories
      </h2>

      <div className="mx-auto px-4 md:px-8 mb-12" style={{ maxWidth: 1320 }}>
        <div className="hidden xl:flex items-center bg-gray-100" style={{ height: 640 }}>
          <div style={{ width: '60%', height: 640, flex: '0 0 auto' }}>
            <img src={images[0]} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: getObjectPosition(images[0]) }} />
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-100 px-8" style={{ width: '40%', height: 640 }}>
            <div className="max-w-md">
              <h3 style={{ fontFamily: BODY_FONT, fontSize: 18, fontWeight: 700, letterSpacing: '1.8px', lineHeight: 1.28, color: '#000', textTransform: 'uppercase', margin: '0 0 24px' }}>{featured.title}</h3>
              <p style={{ fontFamily: BODY_FONT, fontSize: 17, fontWeight: 400, letterSpacing: '0.85px', lineHeight: 1.5, color: '#52575c', margin: 0 }}>{featured.description}</p>
              <Link href={featured.href}>{action('Discover More')}</Link>
            </div>
          </div>
        </div>

        <div className="xl:hidden w-full bg-gray-100">
          <img src={images[0]} alt={featured.title} className="w-full object-cover" style={{ height: 375, objectPosition: getObjectPosition(images[0]) }} />
          <div className="p-6">
            <h3 style={{ fontFamily: BODY_FONT, fontSize: 18, fontWeight: 700, letterSpacing: '1.8px', lineHeight: 1.28, color: '#000', textTransform: 'uppercase', margin: '0 0 24px' }}>{featured.title}</h3>
            <p style={{ fontFamily: BODY_FONT, fontSize: 17, fontWeight: 400, letterSpacing: '0.85px', lineHeight: 1.5, color: '#52575c', margin: 0 }}>{featured.description}</p>
            <Link href={featured.href}>{action('Discover More')}</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 md:px-8" style={{ maxWidth: 1320 }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {storyCategories.slice(1).map((category, index) => {
            const image = images[index + 1] || fallbackImages[(index + 1) % fallbackImages.length];
            return (
              <article key={category.href} className="flex flex-col bg-gray-100" style={{ minHeight: 560 }}>
                <img src={image} alt={category.title} className="w-full object-cover" style={{ height: 340, objectPosition: getObjectPosition(image) }} />
                <div className="p-6 flex flex-col items-start" style={{ minHeight: 220 }}>
                  <h3 style={{ fontFamily: BODY_FONT, fontSize: 18, fontWeight: 700, letterSpacing: '1.8px', lineHeight: 1.28, color: '#000', textTransform: 'uppercase', margin: '0 0 16px' }}>{category.title}</h3>
                  <p style={{ fontFamily: BODY_FONT, fontSize: 17, fontWeight: 400, letterSpacing: '0.85px', lineHeight: 1.5, color: '#52575c', margin: 0 }}>{category.description}</p>
                  <Link href={category.href}>{action('Read More')}</Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
