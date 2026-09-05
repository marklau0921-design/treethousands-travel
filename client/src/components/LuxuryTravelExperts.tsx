import { trpc } from '@/lib/trpc';

const DISPLAY_FONT = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const BODY_FONT = "var(--font-travel-sans, 'Cabin', 'Josefin Sans', 'Helvetica Neue', Arial, sans-serif)";
const bodyTextStyle = { color: '#52575c', fontFamily: BODY_FONT, fontSize: 17, lineHeight: 1.6, letterSpacing: '0.04em' } as const;

/** Brand Philosophy introduction section. */
export default function LuxuryTravelExperts() {
  const { data: homepageData } = trpc.homepage.getPublicData.useQuery();
  const { data: homepageAssets } = trpc.media.getHomepageAssets.useQuery();
  const pageTexture = (homepageAssets as any)?.pageBg?.url || '';
  const pageTextureOpacity = Math.max(0, Math.min(1, Number((homepageAssets as any)?.pageBg?.opacity ?? 28) / 100));

  return (
    <section className="w-full bg-[#F5F3EF] relative overflow-hidden" style={{ paddingTop: 'clamp(50px, 5vw, 64px)', paddingBottom: 'clamp(50px, 5vw, 64px)', backgroundColor: '#ffffff' }}>
      {pageTexture && (
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, backgroundImage: `url(${pageTexture})`, backgroundSize: '420px 420px', backgroundRepeat: 'repeat', opacity: pageTextureOpacity, mixBlendMode: 'normal', pointerEvents: 'none', zIndex: 0 }}
        />
      )}

      <div className="absolute left-0 top-0 bottom-0 w-48 pointer-events-none hidden md:flex items-center justify-start overflow-hidden" style={{ zIndex: 1 }}>
        <svg className="w-full h-full" viewBox="0 0 200 800" preserveAspectRatio="none" style={{ opacity: 0.15 }}>
          <path d="M 150 0 Q 100 50 120 150 T 100 300 T 120 450 T 100 600 T 140 800" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 170 20 Q 120 70 140 170 T 120 320 T 140 470 T 120 620 T 160 800" stroke="#d1d5db" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 130 40 Q 80 90 100 190 T 80 340 T 100 490 T 80 640 T 120 800" stroke="#e5e7eb" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 100 60 Q 50 110 70 210 T 50 360 T 70 510 T 50 660 T 100 800" stroke="#f3f4f6" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-48 pointer-events-none hidden md:flex items-center justify-end overflow-hidden" style={{ zIndex: 1 }}>
        <svg className="w-full h-full" viewBox="0 0 200 800" preserveAspectRatio="none" style={{ opacity: 0.15, transform: 'scaleX(-1)' }}>
          <path d="M 150 0 Q 100 50 120 150 T 100 300 T 120 450 T 100 600 T 120 800" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 170 20 Q 120 70 140 170 T 120 320 T 140 470 T 120 620 T 140 800" stroke="#d1d5db" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 130 40 Q 80 90 100 190 T 80 340 T 100 490 T 80 640 T 100 800" stroke="#e5e7eb" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 100 60 Q 50 110 70 210 T 50 360 T 70 510 T 50 660 T 70 800" stroke="#f3f4f6" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 2 }}>
        {(!homepageData?.intro || homepageData.intro.isVisible !== false) && (
          <div className="text-center">
            <h2 className="uppercase" style={{ color: '#000', fontFamily: DISPLAY_FONT, fontSize: 'clamp(34px, 3.6vw, 45px)', fontWeight: 400, lineHeight: 1, letterSpacing: '2.25px', margin: '0 0 18px' }}>
              {homepageData?.intro?.title || 'Tailor-made China journeys'}
            </h2>
            {homepageData?.intro?.content ? (
              <div className="max-w-4xl mx-auto mb-8" style={{ ...bodyTextStyle, whiteSpace: 'pre-line' }}>
                {homepageData.intro.content}
              </div>
            ) : (
              <>
                <p className="max-w-4xl mx-auto mb-4" style={bodyTextStyle}>
                  China is vast, full of wonders. But information engulfs us. See this, do that, don't miss this. It seems that the more choices there are, the more overwhelmed we feel. What's more, you're rarely asked how you want to feel.
                </p>
                <p className="max-w-4xl mx-auto mb-4" style={bodyTextStyle}>
                  That's not us. We are a tailor-made immersive travel company that designs fully personalised itineraries.
                </p>
                <p className="max-w-4xl mx-auto mb-4" style={bodyTextStyle}>
                  For the past five years, we've been exploring China through its people, culture, landscapes, and everyday life — searching for experiences that feel genuine, personal, and deeply connected to the place itself. No rushed tours. No generic itineraries. Just a deeper, more personal way to travel through China.
                </p>
                <p className="max-w-4xl mx-auto mb-8" style={bodyTextStyle}>
                  So let's begin. Let's do something remarkable.
                </p>
              </>
            )}
            <a href="/make-an-enquiry" className="inline-block px-8 py-3 bg-black text-white text-sm font-normal tracking-wider uppercase rounded border-2 border-black hover:bg-white hover:text-black transition-all duration-300 active:scale-95">
              Get In Touch
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
