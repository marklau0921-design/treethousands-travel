import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import type { OurStoryEditorialContent } from '@/content/ourStoryEditorialPages';

const SERIF = `var(--font-travel-condensed, "League Gothic", "Arial Narrow", Impact, sans-serif)`;
const SANS = `var(--font-travel-sans, "Helvetica Neue", Arial, sans-serif)`;
const ASSET = '/images/why-we-started-editorial';

type StoryImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function StoryImage({ src, alt, className = '', priority = false }: StoryImageProps) {
  return (
    <div className={`wys-image ${className}`} data-reveal="image">
      <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding={priority ? 'sync' : 'async'} />
    </div>
  );
}

function StoryTitle({ text }: { text: string }) {
  const lines = text.split('\n');
  return <>{lines.map((line, index) => <span key={`${line}-${index}`}>{line}{index < lines.length - 1 && <br />}</span>)}</>;
}

function StoryHero({ content }: { content: OurStoryEditorialContent['hero'] }) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(hero.offsetHeight, 1)));
      hero.style.setProperty('--hero-image-y', `${progress * 42}px`);
      hero.style.setProperty('--hero-copy-y', `${progress * 28}px`);
      hero.style.setProperty('--hero-copy-opacity', `${1 - progress * 1.15}`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="wys-hero" ref={heroRef}>
      <img className="wys-hero-image" src={content.image} alt={content.alt} />
      <div className="wys-hero-shade" />
      <div className="wys-hero-meta wys-hero-animate">
        <span>{content.metaLeft}</span>
      </div>
      <div className="wys-hero-copy">
        <h1 className="wys-hero-animate">{content.title}</h1>
        <p className="wys-hero-animate">{content.subtitle}</p>
      </div>
    </header>
  );
}

function EditorialPhotoCollage({ content }: { content: OurStoryEditorialContent['beginning'] }) {
  return (
    <section className="wys-section wys-beginning" aria-labelledby="wys-beginning-title">
      <div className="wys-shell">
        <div className="wys-beginning-copy">
          <h2 id="wys-beginning-title" data-reveal><StoryTitle text={content.title} /></h2>
          <div className="wys-copy" data-reveal>
            {content.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </div>
        <StoryImage className="wys-beginning-person" {...content.images[0]} />
        <StoryImage className="wys-beginning-village" {...content.images[1]} />
        <StoryImage className="wys-beginning-life" {...content.images[2]} />
        <StoryImage className="wys-beginning-detail" {...content.images[3]} />
      </div>
    </section>
  );
}

function DocumentarySpread({ content }: { content: OurStoryEditorialContent['turning'] }) {
  return (
    <section className="wys-section wys-turning" aria-labelledby="wys-turning-title">
      <div className="wys-shell wys-turning-grid">
        <div className="wys-turning-heading">
          <h2 id="wys-turning-title" data-reveal><StoryTitle text={content.title} /></h2>
        </div>
        <div className="wys-turning-left-copy wys-copy" data-reveal>
          {content.leftParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <figure className="wys-turning-main">
          <StoryImage {...content.images[0]} />
          <figcaption>{content.captions[0]}</figcaption>
        </figure>
        <figure className="wys-turning-place">
          <StoryImage {...content.images[1]} />
          <figcaption>{content.captions[1]}</figcaption>
        </figure>
        <StoryImage className="wys-turning-detail" {...content.images[2]} />
        <div className="wys-turning-side-copy wys-copy" data-reveal>
          {content.rightParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  );
}

function ActionPhotoSequence({ content }: { content: OurStoryEditorialContent['action'] }) {
  return (
    <section className="wys-section wys-action" aria-labelledby="wys-action-title">
      <div className="wys-shell wys-action-grid">
        <div className="wys-action-intro">
          <StoryImage {...content.images[0]} />
          <h2 id="wys-action-title" data-reveal><StoryTitle text={content.title} /></h2>
          <div className="wys-copy" data-reveal>
            {content.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </div>
        <StoryImage className="wys-action-work" {...content.images[1]} />
      </div>
      <div className="wys-action-landscape" data-reveal="wide">
        <img src={content.images[2].src} alt={content.images[2].alt} loading="lazy" decoding="async" />
      </div>
    </section>
  );
}

function EditorialPhotoEssay({ content }: { content: OurStoryEditorialContent['belief'] }) {
  return (
    <section className="wys-section wys-belief" aria-labelledby="wys-belief-title">
      <div className="wys-shell wys-belief-grid">
        <StoryImage className="wys-belief-life" {...content.images[0]} />
        <StoryImage className="wys-belief-person" {...content.images[1]} />
        <StoryImage className="wys-belief-craft" {...content.images[2]} />
        <div className="wys-belief-main">
          <h2 id="wys-belief-title" data-reveal><StoryTitle text={content.title} /></h2>
          <div className="wys-copy" data-reveal>
            {content.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </div>
        <div className="wys-belief-side wys-copy" data-reveal>
          {content.sideParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <blockquote>{content.quote}</blockquote>
        </div>
      </div>
    </section>
  );
}

function StoryClosing({ content }: { content: OurStoryEditorialContent['closing'] }) {
  return (
    <section className="wys-closing" aria-labelledby="wys-closing-title">
      <div className="wys-shell wys-closing-grid">
        <div className="wys-closing-copy">
          <h2 id="wys-closing-title" data-reveal><StoryTitle text={content.title} /></h2>
          <p data-reveal>{content.paragraph}</p>
          <nav className="wys-closing-links" aria-label="Continue exploring" data-reveal>
            <Link href="/stories">Explore Our Stories <span aria-hidden="true">↗</span></Link>
            <Link href="/experiences">Discover Our Experiences <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
        <StoryImage className="wys-closing-image" {...content.image} />
      </div>
    </section>
  );
}

const exploreRecommendations = [
  {
    title: 'Build With What Is Already Here',
    meta: 'Village Life · Ongoing',
    image: '/images/why-we-started/what-is-already-here.jpg',
    href: '/explore/activity/build-with-what-is-already-here',
  },
  {
    title: 'Care for the Forest',
    meta: 'Nature & Landscape · By Arrangement',
    image: '/images/why-we-started-editorial/04-detail.jpeg',
    href: '/explore/nature-landscape',
  },
  {
    title: 'Share Village Life',
    meta: 'Village Life · By Arrangement',
    image: '/images/why-we-started-editorial/05-life.jpeg',
    href: '/explore/village-life',
  },
  {
    title: 'Learn Through Local Craft',
    meta: 'People & Culture · Ongoing',
    image: '/images/why-we-started-editorial/02-detail.jpeg',
    href: '/explore/people-culture',
  },
];

function StoryExploreRecommendations({ content }: { content: OurStoryEditorialContent['recommendations'] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const inertiaFrameRef = useRef<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollLeft(track.scrollLeft > 8);
    setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 8);
  }, []);

  const cancelInertia = useCallback(() => {
    if (inertiaFrameRef.current === null) return;
    cancelAnimationFrame(inertiaFrameRef.current);
    inertiaFrameRef.current = null;
  }, []);

  const startInertia = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = () => {
      velocityRef.current *= .92;
      if (Math.abs(velocityRef.current) < .5) {
        velocityRef.current = 0;
        inertiaFrameRef.current = null;
        updateScrollState();
        return;
      }
      track.scrollLeft -= velocityRef.current;
      updateScrollState();
      inertiaFrameRef.current = requestAnimationFrame(step);
    };
    inertiaFrameRef.current = requestAnimationFrame(step);
  }, [updateScrollState]);

  const finishDrag = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    trackRef.current?.classList.remove('is-dragging');
    startInertia();
  }, [startInertia]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateScrollState();
    track.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      track.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
      cancelInertia();
    };
  }, [cancelInertia, updateScrollState]);

  const scroll = (direction: -1 | 1) => {
    cancelInertia();
    trackRef.current?.scrollBy({ left: direction * Math.min(window.innerWidth * .72, 720), behavior: 'smooth' });
  };

  return (
    <section className="wys-recommendations" aria-labelledby="wys-recommendations-title" style={{ backgroundImage: `url(${content.backgroundImage})` } as CSSProperties}>
      <div className="wys-recommendations-backdrop" aria-hidden="true" />
      <div className="wys-recommend-mobile-heading">
        <h2 id="wys-recommendations-title">{content.title}</h2>
        <p>{content.description}</p>
      </div>
      <div
        className="wys-recommend-track"
        ref={trackRef}
        onMouseDown={event => {
          if (event.button !== 0) return;
          cancelInertia();
          draggingRef.current = true;
          dragDistanceRef.current = 0;
          startXRef.current = event.pageX;
          lastXRef.current = event.pageX;
          scrollStartRef.current = trackRef.current?.scrollLeft ?? 0;
          velocityRef.current = 0;
          trackRef.current?.classList.add('is-dragging');
        }}
        onMouseMove={event => {
          const track = trackRef.current;
          if (!draggingRef.current || !track) return;
          event.preventDefault();
          const delta = event.pageX - startXRef.current;
          dragDistanceRef.current = Math.max(dragDistanceRef.current, Math.abs(delta));
          velocityRef.current = event.pageX - lastXRef.current;
          lastXRef.current = event.pageX;
          track.scrollLeft = scrollStartRef.current - delta;
          updateScrollState();
        }}
        onMouseUp={finishDrag}
        onMouseLeave={finishDrag}
        onDragStart={event => event.preventDefault()}
        onClickCapture={event => {
          if (dragDistanceRef.current <= 6) return;
          event.preventDefault();
          event.stopPropagation();
          dragDistanceRef.current = 0;
        }}
      >
        <div className="wys-recommend-row">
          <div className="wys-recommend-spacer" aria-hidden="true" />
          <header className="wys-recommend-intro">
            <h2>{content.title}</h2>
            <p>{content.description}</p>
          </header>
          {exploreRecommendations.map(item => (
            <article className="wys-recommend-card" key={item.title}>
              <img src={item.image} alt="" loading="lazy" decoding="async" draggable={false} />
              <div className="wys-recommend-card-shade" />
              <p>{item.meta}</p>
              <div className="wys-recommend-card-copy">
                <h3>{item.title}</h3>
                <Link href={item.href}>Explore</Link>
              </div>
            </article>
          ))}
          <Link className="wys-recommend-more" href="/explore">
            <span>View More</span>
          </Link>
          <div className="wys-recommend-end" aria-hidden="true" />
        </div>
      </div>
      <button className="wys-recommend-arrow wys-recommend-arrow-left" type="button" onClick={() => scroll(-1)} disabled={!canScrollLeft} aria-label="Previous activities">
        <ChevronLeft size={24} strokeWidth={1.5} />
      </button>
      <button className="wys-recommend-arrow wys-recommend-arrow-right" type="button" onClick={() => scroll(1)} disabled={!canScrollRight} aria-label="Next activities">
        <ChevronRight size={24} strokeWidth={1.5} />
      </button>
    </section>
  );
}

function StoryExploreCta({ content }: { content: OurStoryEditorialContent['cta'] }) {
  return (
    <section className="wys-explore-cta" aria-labelledby="wys-explore-cta-title">
      <img src={content.image} alt="" loading="lazy" decoding="async" />
      <div className="wys-explore-cta-shade" aria-hidden="true" />
      <div className="wys-explore-cta-copy">
        <h2 id="wys-explore-cta-title">{content.title}</h2>
        <Link href={content.buttonHref}>{content.buttonLabel}</Link>
      </div>
    </section>
  );
}

export default function OurStoryEditorialTemplate({ content }: { content: OurStoryEditorialContent }) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.wys-page [data-reveal]'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach(node => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="wys-page">
      <style>{styles}</style>
      <Navigation />
      <main>
        <StoryHero content={content.hero} />
        <EditorialPhotoCollage content={content.beginning} />
        <DocumentarySpread content={content.turning} />
        <ActionPhotoSequence content={content.action} />
        <EditorialPhotoEssay content={content.belief} />
        <StoryClosing content={content.closing} />
        <StoryExploreRecommendations content={content.recommendations} />
        <StoryExploreCta content={content.cta} />
      </main>
      <Footer />
    </div>
  );
}

const styles = `
  .wys-page{--ink:#000;--muted:#52575c;--line:#d8d8d8;--paper:#fff;--paper-alt:#f4f4f4;background:#fff;color:var(--ink);font-family:${SANS};overflow:hidden}
  .wys-page *{box-sizing:border-box}.wys-page main{background:#fff}.wys-shell{width:min(1440px,calc(100% - 10vw));margin:0 auto}.wys-section{padding:clamp(110px,12vw,190px) 0;background:var(--paper)}.wys-label{margin:0 0 28px;font-size:11px;line-height:1.2;font-weight:600;letter-spacing:.2em;color:#73756f;text-transform:uppercase}.wys-page h2{font-family:${SERIF};font-weight:400;letter-spacing:-.045em;line-height:.93;margin:0;font-size:clamp(56px,7vw,108px)}.wys-copy{font-size:clamp(15px,1.18vw,18px);line-height:1.75;color:var(--muted)}.wys-copy p{margin:0 0 1.35em}.wys-copy p:last-child{margin-bottom:0}.wys-image{overflow:hidden;margin:0}.wys-image img{width:100%;height:100%;display:block;object-fit:cover;transform:scale(1.035);transition:transform 1s cubic-bezier(.22,.7,.2,1)}.wys-image.is-visible img{transform:scale(1)}
  .wys-page [data-reveal]:not(.wys-image){opacity:0;transform:translateY(24px);transition:opacity .82s ease-out,transform .82s cubic-bezier(.22,.7,.2,1)}.wys-page [data-reveal].is-visible:not(.wys-image){opacity:1;transform:none}.wys-page [data-reveal="image"]{opacity:0;transform:translateY(20px);transition:opacity .9s ease-out,transform .9s cubic-bezier(.22,.7,.2,1)}.wys-page [data-reveal="image"].is-visible{opacity:1;transform:none}
  .wys-hero{--hero-image-y:0px;--hero-copy-y:0px;--hero-copy-opacity:1;position:relative;width:100%;height:100svh;min-height:720px;color:#fff;overflow:hidden;background:#243228}.wys-hero-image{position:absolute;inset:0;width:100%;height:100%;display:block;object-fit:cover;object-position:center 46%;transform:translate3d(0,var(--hero-image-y),0) scale(1.06);animation:wysHeroImage 1.4s cubic-bezier(.22,.7,.2,1) forwards}.wys-hero-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,12,10,.62) 0,rgba(8,12,10,.26) 44%,rgba(8,12,10,0) 72%),linear-gradient(0deg,rgba(8,12,10,.5) 0,transparent 43%)}.wys-hero-meta{position:absolute;z-index:2;top:clamp(104px,12vh,148px);left:6vw;right:6vw;display:flex;font-size:10px;font-weight:600;letter-spacing:.2em}.wys-hero-copy{position:absolute;z-index:2;left:6vw;bottom:18vh;max-width:980px;transform:translate3d(0,var(--hero-copy-y),0);opacity:var(--hero-copy-opacity)}.wys-hero-copy h1{font-family:${SERIF};font-size:clamp(70px,8.6vw,132px);font-weight:400;letter-spacing:-.052em;line-height:.86;margin:0 0 28px}.wys-hero-copy p{max-width:680px;margin:0;font-size:clamp(17px,1.55vw,23px);line-height:1.55;letter-spacing:.006em}.wys-hero-animate{opacity:0;transform:translateY(20px);animation:wysHeroCopy .85s ease-out forwards}.wys-hero-meta{animation-delay:.28s}.wys-hero-copy h1{animation-delay:.42s}.wys-hero-copy p{animation-delay:.56s}@keyframes wysHeroImage{to{transform:translate3d(0,var(--hero-image-y),0) scale(1.02)}}@keyframes wysHeroCopy{to{opacity:1;transform:translateY(0)}}
  .wys-beginning{background:var(--paper-alt)}.wys-beginning .wys-shell{display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:auto auto;gap:clamp(12px,1.2vw,20px)}.wys-beginning-copy{grid-column:1/5;grid-row:1;align-self:start;padding:1.5vw 2.6vw 1vw 0}.wys-beginning-copy .wys-label{margin-bottom:20px}.wys-beginning-copy h2{font-size:clamp(42px,4.2vw,66px);line-height:1;margin-bottom:30px}.wys-beginning-copy .wys-copy{max-width:500px;font-size:clamp(13px,1vw,15px);line-height:1.68}.wys-beginning-person{grid-column:5/9;grid-row:1;height:clamp(390px,34vw,530px)}.wys-beginning-village{grid-column:9/13;grid-row:1;height:clamp(390px,34vw,530px)}.wys-beginning-life{grid-column:1/9;grid-row:2;height:clamp(500px,47vw,730px)}.wys-beginning-detail{grid-column:9/13;grid-row:2;height:clamp(300px,28vw,430px)}
  .wys-turning{padding:clamp(100px,10vw,155px) 0;background:var(--paper)}.wys-turning-grid{display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:auto auto auto;column-gap:clamp(20px,2.2vw,36px);row-gap:clamp(24px,2.5vw,42px);position:relative}.wys-turning-heading{grid-column:1/7;grid-row:1;padding-right:3vw}.wys-turning-heading h2{font-size:clamp(52px,5.3vw,82px)}.wys-turning-left-copy{grid-column:1/7;grid-row:2;columns:2;column-gap:clamp(28px,3.2vw,52px);padding-right:3vw;font-size:clamp(13px,.98vw,15px);line-height:1.62}.wys-turning-left-copy p{break-inside:avoid}.wys-turning-main{grid-column:1/7;grid-row:3;margin:0 3vw 0 0}.wys-turning-main .wys-image{height:clamp(430px,39vw,610px)}.wys-turning-place{grid-column:7/13;grid-row:1/3;margin:0 0 0 3vw}.wys-turning-place .wys-image{height:clamp(500px,47vw,730px)}.wys-turning-detail{grid-column:7/10;grid-row:3;height:clamp(320px,31vw,480px);margin-left:3vw}.wys-turning-side-copy{grid-column:10/13;grid-row:3;align-self:start;font-size:clamp(13px,.98vw,15px);line-height:1.62}.wys-turning figcaption{margin-top:10px;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#7b7c77}
  .wys-action{background:var(--paper-alt);padding-bottom:0}.wys-action-grid{display:grid;grid-template-columns:4fr 8fr;gap:clamp(28px,3.5vw,58px);align-items:start}.wys-action-intro>.wys-image{width:74%;height:clamp(220px,22vw,340px);margin:0 0 clamp(36px,4vw,64px)}.wys-action-intro h2{font-size:clamp(48px,4.7vw,72px);line-height:.98;margin-bottom:30px}.wys-action-intro .wys-copy{max-width:470px;font-size:clamp(13px,1vw,15px);line-height:1.65}.wys-action-work{height:clamp(560px,57vw,860px);margin:0}.wys-action-landscape{width:100%;height:clamp(500px,54vw,900px);margin:clamp(70px,8vw,125px) auto 0;overflow:hidden;clip-path:inset(0 3%);transition:clip-path 1.1s cubic-bezier(.22,.7,.2,1)}.wys-action-landscape.is-visible{clip-path:inset(0)}.wys-action-landscape img{width:100%;height:100%;display:block;object-fit:cover}
  .wys-belief{padding:clamp(105px,11vw,170px) 0;background:var(--paper)}.wys-belief-grid{display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:auto auto;gap:clamp(18px,2vw,32px);align-items:start}.wys-belief-life{grid-column:1/9;grid-row:1;height:clamp(410px,43vw,660px)}.wys-belief-person{grid-column:9/13;grid-row:1;height:clamp(410px,43vw,660px);margin:0}.wys-belief-craft{grid-column:1/4;grid-row:2;height:clamp(460px,49vw,750px);margin:0}.wys-belief-main{grid-column:4/9;grid-row:2;margin:3vw 1vw 0}.wys-belief-main h2{font-size:clamp(46px,4.8vw,74px);line-height:.98;margin-bottom:30px}.wys-belief-main .wys-copy,.wys-belief-side{font-size:clamp(13px,1vw,15px);line-height:1.65}.wys-belief-side{grid-column:9/13;grid-row:2;margin:3vw 0 0}.wys-belief-side blockquote{border-left:2px solid var(--ink);padding-left:22px;margin:42px 0 0;font-family:${SERIF};font-size:clamp(24px,2vw,32px);line-height:1.18;letter-spacing:-.025em;color:var(--ink)}
  .wys-closing{padding:clamp(120px,15vw,240px) 0;background:var(--paper-alt)}.wys-closing-grid{display:grid;grid-template-columns:5fr 7fr;gap:clamp(60px,9vw,150px);align-items:center}.wys-closing-copy h2{font-family:${SERIF};font-size:clamp(64px,7.4vw,112px);line-height:.9;letter-spacing:-.05em;font-weight:400;margin:0 0 42px}.wys-closing-copy>p:not(.wys-label){max-width:540px;font-size:clamp(16px,1.25vw,19px);line-height:1.7;color:var(--muted)}.wys-closing-links{display:flex;flex-direction:column;align-items:flex-start;margin-top:54px}.wys-closing-links a{display:inline-flex;gap:18px;align-items:center;padding:14px 0;border-bottom:1px solid var(--ink);font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:inherit;text-decoration:none}.wys-closing-links a span{transition:transform .25s ease}.wys-closing-links a:hover span,.wys-closing-links a:focus-visible span{transform:translate(3px,-3px)}.wys-closing-image{height:clamp(520px,53vw,800px)}
  .wys-recommendations{position:relative;min-height:680px;padding:50px 0;overflow:hidden;background:url('${ASSET}/06-closing.jpeg') center/cover no-repeat;color:#fff}.wys-recommendations-backdrop{position:absolute;inset:0;background:rgba(10,10,10,.85);backdrop-filter:blur(4px)}.wys-recommend-track{position:relative;z-index:1;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;overscroll-behavior-x:contain;cursor:grab;user-select:none}.wys-recommend-track.is-dragging{cursor:grabbing}.wys-recommend-track::-webkit-scrollbar{display:none}.wys-recommend-row{display:flex;gap:20px;width:max-content;align-items:stretch}.wys-recommend-spacer{width:max(30px,calc((100vw - 1440px)/2 + 50px));flex:0 0 auto}.wys-recommend-intro{width:260px;height:550px;display:flex;flex-direction:column;justify-content:center;flex:0 0 auto;padding-right:18px}.wys-recommend-intro h2,.wys-recommend-mobile-heading h2{font-family:${SERIF};font-size:45px;font-weight:400;line-height:1;letter-spacing:2.25px;text-transform:uppercase;color:#fff;margin:0 0 24px}.wys-recommend-intro p,.wys-recommend-mobile-heading p{font-family:${SANS};font-size:17px;line-height:1.5;letter-spacing:.85px;font-style:italic;color:rgba(255,255,255,.78);margin:0}.wys-recommend-card{position:relative;width:310px;height:550px;flex:0 0 auto;overflow:hidden;background:#252525}.wys-recommend-card>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;transition:transform .7s cubic-bezier(.22,.7,.2,1)}.wys-recommend-card:hover>img{transform:scale(1.045)}.wys-recommend-card-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.12) 0,rgba(0,0,0,.05) 42%,rgba(0,0,0,.84) 100%)}.wys-recommend-card>p{position:absolute;z-index:1;top:22px;right:20px;max-width:82%;margin:0;text-align:right;font-family:${SANS};font-size:13px;font-weight:700;line-height:1.4;letter-spacing:.85px;text-transform:uppercase;color:#fff}.wys-recommend-card-copy{position:absolute;z-index:1;left:24px;right:24px;bottom:28px}.wys-recommend-card-copy h3{max-width:250px;margin:0 0 20px;font-family:${SANS};font-size:18px;line-height:1.25;letter-spacing:1px;text-transform:uppercase;color:#fff}.wys-recommend-card-copy a{display:inline-flex;align-items:center;justify-content:center;min-width:102px;padding:11px 20px;background:rgba(0,0,0,.66);backdrop-filter:blur(8px);font-family:${SANS};font-size:13px;font-weight:700;letter-spacing:.85px;text-transform:uppercase;color:#fff;text-decoration:none;transition:background .25s,color .25s}.wys-recommend-card-copy a:hover,.wys-recommend-card-copy a:focus-visible{background:#fff;color:#000}.wys-recommend-more{width:155px;height:550px;flex:0 0 auto;display:flex;align-items:center;justify-content:flex-start;border:0;font-family:${SANS};font-size:13px;font-weight:700;letter-spacing:.85px;text-transform:uppercase;color:#fff;text-decoration:none}.wys-recommend-more span{display:inline-flex;padding:13px 24px;background:rgba(255,255,255,.18);transition:background .25s,color .25s}.wys-recommend-more:hover span,.wys-recommend-more:focus-visible span{background:#fff;color:#000}.wys-recommend-end{width:30px;flex:0 0 auto}.wys-recommend-arrow{position:absolute;z-index:2;top:50%;width:48px;height:48px;border:1px solid rgba(255,255,255,.58);border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.45);backdrop-filter:blur(7px);color:#fff;cursor:pointer;transition:opacity .2s,background .2s;transform:translateY(-50%)}.wys-recommend-arrow:hover{background:#fff;color:#000}.wys-recommend-arrow:disabled{opacity:0;pointer-events:none}.wys-recommend-arrow-left{left:24px}.wys-recommend-arrow-right{right:24px}.wys-recommend-mobile-heading{display:none;position:relative;z-index:1;padding:0 20px 32px}.wys-explore-cta{position:relative;height:clamp(260px,30vw,275px);display:flex;align-items:center;justify-content:center;overflow:hidden;background:#1a1a1a;color:#fff;text-align:center}.wys-explore-cta>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 55%}.wys-explore-cta-shade{position:absolute;inset:0;background:rgba(0,0,0,.68)}.wys-explore-cta-copy{position:relative;z-index:1}.wys-explore-cta h2{font-family:${SERIF};font-size:45px;font-weight:400;line-height:1;letter-spacing:2.25px;text-transform:uppercase;color:#fff;margin:0 0 28px}.wys-explore-cta a{display:inline-flex;align-items:center;justify-content:center;padding:13px 26px;background:#000;border:1px solid #000;font-family:${SANS};font-size:13px;font-weight:700;line-height:1.4;letter-spacing:.85px;text-transform:uppercase;color:#fff;text-decoration:none;transition:background .25s,color .25s,border-color .25s}.wys-explore-cta a:hover,.wys-explore-cta a:focus-visible{background:#fff;border-color:#fff;color:#000}
  .wys-page .wys-label{font-family:${SANS};font-size:13px;font-weight:700;line-height:1.5;letter-spacing:.85px;color:#52575c}.wys-page .wys-copy,.wys-page .wys-beginning-copy .wys-copy,.wys-page .wys-turning-left-copy,.wys-page .wys-turning-side-copy,.wys-page .wys-action-intro .wys-copy,.wys-page .wys-belief-main .wys-copy,.wys-page .wys-belief-side{font-family:${SANS};font-size:17px;font-weight:400;line-height:1.5;letter-spacing:.85px;color:#52575c}.wys-page h2,.wys-page .wys-beginning-copy h2,.wys-page .wys-turning-heading h2,.wys-page .wys-action-intro h2,.wys-page .wys-belief-main h2,.wys-page .wys-closing-copy h2{font-family:${SERIF};font-size:clamp(34px,4vw,45px);font-weight:400;line-height:1;letter-spacing:2.25px;color:#000;text-transform:uppercase}.wys-page .wys-recommend-intro h2,.wys-page .wys-recommend-mobile-heading h2,.wys-page .wys-explore-cta h2{color:#fff}.wys-page .wys-hero-copy h1{font-family:${SERIF};font-size:clamp(48px,6vw,78px);font-weight:400;line-height:1;letter-spacing:2.25px;text-transform:uppercase}.wys-page .wys-hero-copy p{font-family:${SANS};font-size:17px;line-height:1.5;letter-spacing:.85px}.wys-page .wys-closing-copy>p:not(.wys-label){font-family:${SANS};font-size:17px;line-height:1.5;letter-spacing:.85px;color:#52575c}.wys-page .wys-closing-links a{font-family:${SANS};font-size:13px;font-weight:700;line-height:1.5;letter-spacing:.85px}
  @media(max-width:900px){.wys-shell{width:calc(100% - 48px)}.wys-section{padding:100px 0}.wys-beginning .wys-shell{gap:14px}.wys-turning-grid,.wys-belief-grid{gap:24px}.wys-beginning-copy{grid-column:1/7;padding-right:24px}.wys-beginning-person{grid-column:7/13;height:440px}.wys-beginning-village{grid-column:8/13;grid-row:2;height:460px}.wys-beginning-life{grid-column:1/8;grid-row:2;height:460px}.wys-beginning-detail{grid-column:5/11;grid-row:3;height:380px}.wys-turning-grid:after{display:none}.wys-turning-heading,.wys-turning-left-copy,.wys-turning-main{grid-column:1/8}.wys-turning-place{grid-column:8/13;margin-left:0}.wys-turning-detail{grid-column:8/13;margin-left:0}.wys-turning-side-copy{grid-column:8/13}.wys-action-grid{gap:32px}.wys-belief-main{grid-column:4/9}.wys-belief-side{grid-column:9/13}}
  @media(max-width:640px){.wys-shell{width:calc(100% - 36px)}.wys-section{padding:92px 0}.wys-hero{min-height:660px}.wys-hero-meta{top:96px;left:18px;right:18px;font-size:8px}.wys-hero-copy{left:18px;right:18px;bottom:20vh}.wys-hero-copy h1{font-size:clamp(52px,16vw,72px);margin-bottom:22px}.wys-hero-copy p{font-size:16px}.wys-scroll-cue{right:18px;bottom:32px}.wys-page h2{font-size:clamp(50px,15vw,68px)}.wys-label{margin-bottom:20px}.wys-beginning .wys-shell,.wys-turning-grid,.wys-belief-grid,.wys-action-grid,.wys-closing-grid{display:block}.wys-beginning-copy{padding-top:0;margin-bottom:54px}.wys-beginning-copy h2{margin-bottom:32px}.wys-beginning-person{width:72%;height:420px;margin-left:auto}.wys-beginning-village{width:68%;height:420px;margin:-80px 0 0}.wys-beginning-life{width:92%;height:390px;margin:64px auto 0}.wys-beginning-detail{width:60%;height:320px;margin:30px 0 0 auto}.wys-turning-heading{margin-bottom:38px}.wys-turning-left-copy{columns:auto;padding:0}.wys-turning-main{margin:60px 0 0}.wys-turning-main .wys-image{height:430px}.wys-turning-place{width:76%;margin:80px 0 0 auto}.wys-turning-place .wys-image{height:390px}.wys-turning-detail{width:58%;height:360px;margin:26px 0 0}.wys-turning-side-copy{width:76%;margin:34px 0 0 auto}.wys-action-intro>.wys-image{width:72%;height:280px;margin-bottom:60px}.wys-action-intro h2{margin-bottom:32px}.wys-action-work{width:86%;height:560px;margin:72px 0 0 auto}.wys-action-landscape{width:100%;height:52vh;min-height:380px;margin-top:76px}.wys-belief-life{height:410px}.wys-belief-person{width:63%;height:470px;margin:24px 0 0 auto}.wys-belief-craft{width:68%;height:520px;margin:72px 0 0}.wys-belief-main{margin:68px 0 0}.wys-belief-main h2{margin-bottom:34px}.wys-belief-side{margin:42px 0 0}.wys-belief-side blockquote{margin-top:46px}.wys-closing{padding:100px 0 120px}.wys-closing-copy h2{font-size:62px}.wys-closing-image{height:430px;margin-top:70px}.wys-closing-links{margin-top:40px}.wys-recommendations{min-height:0;padding:54px 0}.wys-recommend-mobile-heading{display:block}.wys-recommend-mobile-heading h2{font-size:34px}.wys-recommend-intro,.wys-recommend-spacer{display:none}.wys-recommend-row{gap:14px;padding-left:20px}.wys-recommend-card,.wys-recommend-more{width:78vw;max-width:310px;height:470px}.wys-recommend-end{width:6px}.wys-recommend-arrow{display:none}.wys-explore-cta{height:300px;padding:0 24px}.wys-explore-cta h2{font-size:34px}}
  @media(max-width:640px){.wys-page h2,.wys-page .wys-beginning-copy h2,.wys-page .wys-turning-heading h2,.wys-page .wys-action-intro h2,.wys-page .wys-belief-main h2,.wys-page .wys-closing-copy h2{font-size:34px}.wys-page .wys-copy,.wys-page .wys-beginning-copy .wys-copy,.wys-page .wys-turning-left-copy,.wys-page .wys-turning-side-copy,.wys-page .wys-action-intro .wys-copy,.wys-page .wys-belief-main .wys-copy,.wys-page .wys-belief-side{font-size:16px}.wys-page .wys-hero-copy h1{font-size:42px}}
  @media(max-width:640px){
    .wys-page{overflow-x:hidden}.wys-shell{width:calc(100% - 40px)}.wys-section{padding:76px 0}.wys-label{margin-bottom:16px}.wys-copy p{margin-bottom:1.2em}
    .wys-hero{height:100svh;min-height:620px}.wys-hero-image{inset:0;width:100%;height:100%;object-position:56% center}.wys-hero-shade{background:linear-gradient(0deg,rgba(8,12,10,.68) 0,rgba(8,12,10,.12) 68%),linear-gradient(90deg,rgba(8,12,10,.22),transparent)}.wys-hero-meta{top:92px;left:20px;right:20px;gap:18px}.wys-hero-copy{left:20px;right:20px;bottom:19vh}.wys-hero-copy h1{margin-bottom:20px}.wys-scroll-cue{right:20px;bottom:30px}
    .wys-beginning .wys-shell{display:flex;flex-direction:column;gap:0}.wys-beginning-copy{width:100%;padding:0;margin:0 0 42px}.wys-beginning-copy h2{margin-bottom:26px}.wys-beginning-person,.wys-beginning-village,.wys-beginning-life,.wys-beginning-detail{width:100%;height:auto;aspect-ratio:4/5;margin:0 0 18px}.wys-beginning-village,.wys-beginning-life{aspect-ratio:4/3}.wys-beginning-detail{aspect-ratio:1/1;margin-bottom:0}
    .wys-turning-grid{display:flex;flex-direction:column;gap:0}.wys-turning-heading{margin:0 0 26px}.wys-turning-left-copy{width:100%;margin:0}.wys-turning-main,.wys-turning-place,.wys-turning-detail{width:100%;height:auto;margin:42px 0 0}.wys-turning-main .wys-image,.wys-turning-place .wys-image,.wys-turning-detail{height:auto;aspect-ratio:4/3}.wys-turning figcaption{margin-top:8px}.wys-turning-place{margin-top:24px}.wys-turning-detail{aspect-ratio:1/1;margin-top:24px}.wys-turning-side-copy{width:100%;margin:34px 0 0}
    .wys-action{padding-top:76px}.wys-action-grid{display:flex;flex-direction:column;gap:0}.wys-action-intro{display:flex;flex-direction:column}.wys-action-intro>.wys-image{order:3;width:100%;height:auto;aspect-ratio:4/3;margin:38px 0 0}.wys-action-intro h2{margin-bottom:26px}.wys-action-work{width:100%;height:auto;aspect-ratio:4/5;margin:20px 0 0}.wys-action-landscape{height:auto;min-height:0;aspect-ratio:4/3;margin-top:20px;clip-path:none}
    .wys-belief-grid{display:flex;flex-direction:column;gap:0}.wys-belief-main{order:1;margin:0 0 40px}.wys-belief-main h2{margin-bottom:26px}.wys-belief-life{order:2;width:100%;height:auto;aspect-ratio:4/3;margin:0 0 18px}.wys-belief-person{order:3;width:100%;height:auto;aspect-ratio:4/5;margin:0 0 18px}.wys-belief-craft{order:4;width:100%;height:auto;aspect-ratio:4/5;margin:0}.wys-belief-side{order:5;width:100%;margin:34px 0 0}.wys-belief-side blockquote{margin-top:32px}
    .wys-closing{padding:76px 0}.wys-closing-grid{display:flex;flex-direction:column;gap:0}.wys-closing-copy h2{margin-bottom:26px}.wys-closing-links{margin-top:34px}.wys-closing-image{width:100%;height:auto;aspect-ratio:4/5;margin:48px 0 0}
    .wys-recommendations{padding:50px 0 42px}.wys-recommend-mobile-heading{padding:0 20px 28px}.wys-recommend-mobile-heading p{font-size:16px}.wys-recommend-row{padding-left:20px;gap:12px}.wys-recommend-card{width:82vw;max-width:320px;height:460px}.wys-recommend-more{width:155px;height:460px}.wys-recommend-card-copy{left:20px;right:20px;bottom:24px}.wys-recommend-end{width:8px}.wys-explore-cta{height:280px;padding:0 26px}.wys-explore-cta h2{margin-bottom:24px}
  }
  /* Shared story rhythm: compact enough for continuous reading while preserving the editorial layouts. */
  .wys-section{padding:clamp(72px,8vw,120px) 0}
  .wys-turning{padding:clamp(68px,7vw,108px) 0}
  .wys-action-landscape{margin-top:clamp(44px,5vw,78px)}
  .wys-belief{padding:clamp(72px,8vw,120px) 0}
  .wys-closing{padding:clamp(80px,9vw,140px) 0}
  @media(max-width:900px){
    .wys-section,.wys-turning,.wys-belief,.wys-closing{padding:72px 0}
  }
  @media(max-width:640px){
    .wys-section,.wys-turning,.wys-belief,.wys-closing{padding:56px 0}
    .wys-action{padding-top:56px}
    .wys-beginning-copy{margin-bottom:32px}
    .wys-turning-main{margin-top:32px}
    .wys-action-intro>.wys-image{margin-top:30px}
    .wys-belief-main{margin-bottom:32px}
    .wys-closing-image{margin-top:36px}
  }
  @media(prefers-reduced-motion:reduce){.wys-page *{animation:none!important;scroll-behavior:auto!important}.wys-hero-animate,.wys-page [data-reveal],.wys-page [data-reveal="image"]{opacity:1!important;transform:none!important}.wys-image img{transform:none!important;transition:none!important}.wys-action-landscape{clip-path:none!important;transition:none!important}}
`;
