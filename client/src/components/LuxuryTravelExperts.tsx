import { trpc } from '@/lib/trpc';
import type { HomepageIntroContent } from '@shared/homepage';

const DISPLAY_FONT = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const BODY_FONT = "var(--font-travel-sans, 'Cabin', 'Josefin Sans', 'Helvetica Neue', Arial, sans-serif)";
const bodyTextStyle = { color: '#52575c', fontFamily: BODY_FONT, fontSize: 17, lineHeight: 1.6, letterSpacing: '0.04em' } as const;

/** Brand Philosophy introduction section. */
export default function LuxuryTravelExperts({ content }: { content: HomepageIntroContent }) {
  const { data: homepageAssets } = trpc.media.getHomepageAssets.useQuery();
  const pageTexture = (homepageAssets as any)?.pageBg?.url || '';
  const pageTextureOpacity = Math.max(0, Math.min(1, Number((homepageAssets as any)?.pageBg?.opacity ?? 28) / 100));

  return (
    <section className="w-full relative overflow-hidden" style={{ paddingTop: 'clamp(50px, 5vw, 64px)', paddingBottom: 'clamp(50px, 5vw, 64px)', backgroundColor: content.backgroundColor }}>
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
          <div className="text-center" style={{color:content.textColor}}>
            <h2 className="uppercase" style={{ color: '#000', fontFamily: DISPLAY_FONT, fontSize: 'clamp(34px, 3.6vw, 45px)', fontWeight: 400, lineHeight: 1, letterSpacing: '2.25px', margin: '0 0 18px' }}>
              {content.title}
            </h2>
              <div className="max-w-4xl mx-auto mb-8" style={{ ...bodyTextStyle, color:content.textColor, whiteSpace: 'pre-line' }}>
                {content.content}
              </div>
            <a href={content.buttonHref} className="inline-block px-8 py-3 bg-black text-white text-sm font-normal tracking-wider uppercase rounded border-2 border-black hover:bg-white hover:text-black transition-all duration-300 active:scale-95">
              {content.buttonLabel}
            </a>
          </div>
      </div>
    </section>
  );
}
