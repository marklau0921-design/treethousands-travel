import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ASSET = '/images/why-we-started-editorial';
const SERIF = `var(--font-travel-condensed, "League Gothic", "Arial Narrow", Impact, sans-serif)`;
const SANS = `var(--font-travel-sans, "Helvetica Neue", Arial, sans-serif)`;

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

export function StorySectionLabel({ children }: { children: string }) {
  return <p className="wys-label" data-reveal>{children}</p>;
}

function StoryHero() {
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
      <img className="wys-hero-image" src={`${ASSET}/01-opening.jpeg`} alt="Mountain village surrounded by forest and morning mist" />
      <div className="wys-hero-shade" />
      <div className="wys-hero-meta wys-hero-animate">
        <span>TREE THOUSANDS / OUR STORIES</span>
        <span>01 / ORIGINS</span>
      </div>
      <div className="wys-hero-copy">
        <h1 className="wys-hero-animate">Why We Started.</h1>
        <p className="wys-hero-animate">Every story begins somewhere. Ours begins with a place, its people, and a different way of seeing the world.</p>
      </div>
      <div className="wys-scroll-cue wys-hero-animate"><span />SCROLL TO EXPLORE</div>
    </header>
  );
}

function EditorialPhotoCollage() {
  return (
    <section className="wys-section wys-beginning" aria-labelledby="wys-beginning-title">
      <div className="wys-shell">
        <div className="wys-beginning-copy">
          <StorySectionLabel>01 / THE BEGINNING</StorySectionLabel>
          <h2 id="wys-beginning-title" data-reveal>It began with a place.</h2>
          <div className="wys-copy" data-reveal>
            <p>Before Tree Thousands became what it is today, there was a growing curiosity about the relationship between people and the places they call home.</p>
            <p>In the mountains of Sichuan, forests, villages, and everyday traditions exist side by side. Here, nature is not simply a landscape to admire, but part of daily life.</p>
            <p>Over time, these connections offered a different perspective: to understand a place, we must also understand the people who shape it and call it home.</p>
          </div>
        </div>
        <StoryImage className="wys-beginning-person" src={`${ASSET}/02-person.jpeg`} alt="A villager carrying a woven basket" />
        <StoryImage className="wys-beginning-village" src={`${ASSET}/02-village.jpeg`} alt="A narrow path between traditional village buildings" />
        <StoryImage className="wys-beginning-life" src={`${ASSET}/02-life.jpeg`} alt="Children carrying branches along a village path" />
        <StoryImage className="wys-beginning-detail" src={`${ASSET}/02-detail.jpeg`} alt="Hands weaving a bamboo basket" />
      </div>
    </section>
  );
}

function DocumentarySpread() {
  return (
    <section className="wys-section wys-turning" aria-labelledby="wys-turning-title">
      <div className="wys-shell wys-turning-grid">
        <div className="wys-turning-heading">
          <StorySectionLabel>02 / THE TURNING POINT</StorySectionLabel>
          <h2 id="wys-turning-title" data-reveal>A Different Way<br />of Seeing.</h2>
        </div>
        <div className="wys-turning-left-copy wys-copy" data-reveal>
          <p>Our early work focused on the natural world. From planting bamboo to removing invasive species, these experiences brought us closer to the landscapes we hoped to protect.</p>
          <p>Yet the more time we spent in these places, the more we came to understand that nature and community were deeply connected.</p>
        </div>
        <figure className="wys-turning-main">
          <StoryImage src={`${ASSET}/03-action.jpeg`} alt="People working together in a mountain field" />
          <figcaption>Learning by taking part.</figcaption>
        </figure>
        <figure className="wys-turning-place">
          <StoryImage src={`${ASSET}/03-place.jpeg`} alt="An old village window framed by green leaves" />
          <figcaption>Daily life leaves its traces.</figcaption>
        </figure>
        <StoryImage className="wys-turning-detail" src={`${ASSET}/03-detail.jpeg`} alt="Hands carving and shaping bamboo" />
        <div className="wys-turning-side-copy wys-copy" data-reveal>
          <p>The people living alongside these forests carried knowledge, traditions, and ways of life shaped by generations of experience.</p>
          <p>Our perspective began to expand. Protecting a place was not only about its environment, but also about recognizing the people whose lives were intertwined with it.</p>
        </div>
      </div>
    </section>
  );
}

function ActionPhotoSequence() {
  return (
    <section className="wys-section wys-action" aria-labelledby="wys-action-title">
      <div className="wys-shell wys-action-grid">
        <div className="wys-action-intro">
          <StoryImage src={`${ASSET}/04-detail.jpeg`} alt="People planting bamboo together in a forest" />
          <StorySectionLabel>03 / TAKING ACTION</StorySectionLabel>
          <h2 id="wys-action-title" data-reveal>Small actions.<br />Real connections.</h2>
          <div className="wys-copy" data-reveal>
            <p>From planting bamboo and caring for the natural environment to working alongside villagers on shared spaces, our ideas began to take shape through real experiences.</p>
            <p>These moments were not simply about completing a task. They created opportunities to learn from one another, exchange skills, and develop a deeper understanding of the places we had come to know.</p>
            <p>What stayed with us was not only what we made or changed, but the relationships formed along the way.</p>
          </div>
        </div>
        <StoryImage className="wys-action-work" src={`${ASSET}/04-action.jpeg`} alt="Two people repairing a shared wooden structure" />
      </div>
      <div className="wys-action-landscape" data-reveal="wide">
        <img src={`${ASSET}/04-landscape.jpeg`} alt="Terraced fields and homes across a mountain valley" loading="lazy" decoding="async" />
      </div>
    </section>
  );
}

function EditorialPhotoEssay() {
  return (
    <section className="wys-section wys-belief" aria-labelledby="wys-belief-title">
      <div className="wys-shell wys-belief-grid">
        <StoryImage className="wys-belief-life" src={`${ASSET}/05-life.jpeg`} alt="A family sharing a meal at home" />
        <StoryImage className="wys-belief-person" src={`${ASSET}/05-person.jpeg`} alt="An older villager standing in a carved wooden doorway" />
        <StoryImage className="wys-belief-craft" src={`${ASSET}/05-craft.jpeg`} alt="A craftsperson weaving a bamboo basket" />
        <div className="wys-belief-main">
          <StorySectionLabel>04 / WHAT WE BELIEVE</StorySectionLabel>
          <h2 id="wys-belief-title" data-reveal>A place is more<br />than a place.</h2>
          <div className="wys-copy" data-reveal>
            <p>It is the people who call it home, the traditions they carry, and the everyday moments that shape their lives.</p>
            <p>Over time, we have come to value the simple exchanges that happen when people share a meal, learn a skill, or work together. These moments often reveal more about a place than any landmark or itinerary ever could.</p>
          </div>
        </div>
        <div className="wys-belief-side wys-copy" data-reveal>
          <p>We believe meaningful travel begins with curiosity and grows through understanding. Not simply seeing somewhere new, but taking the time to connect with the people who make it what it is.</p>
          <blockquote>The most meaningful journeys bring us closer to people, not just places.</blockquote>
        </div>
      </div>
    </section>
  );
}

function StoryClosing() {
  return (
    <section className="wys-closing" aria-labelledby="wys-closing-title">
      <div className="wys-shell wys-closing-grid">
        <div className="wys-closing-copy">
          <StorySectionLabel>THE JOURNEY AHEAD</StorySectionLabel>
          <h2 id="wys-closing-title" data-reveal>The Story<br />Continues.</h2>
          <p data-reveal>What began with a simple curiosity continues to grow through the people we meet, the places we come to know, and the experiences we share along the way.</p>
          <nav className="wys-closing-links" aria-label="Continue exploring" data-reveal>
            <Link href="/stories">Explore Our Stories <span aria-hidden="true">↗</span></Link>
            <Link href="/experiences">Discover Our Experiences <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
        <StoryImage className="wys-closing-image" src={`${ASSET}/06-closing.jpeg`} alt="Two villagers sitting together outside a wooden home" />
      </div>
    </section>
  );
}

export default function WhyWeStartedEditorial() {
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
        <StoryHero />
        <EditorialPhotoCollage />
        <DocumentarySpread />
        <ActionPhotoSequence />
        <EditorialPhotoEssay />
        <StoryClosing />
      </main>
      <Footer />
    </div>
  );
}

const styles = `
  .wys-page{--ink:#000;--muted:#52575c;--line:#d8d8d8;--paper:#fff;--paper-alt:#f4f4f4;background:#fff;color:var(--ink);font-family:${SANS};overflow:hidden}
  .wys-page *{box-sizing:border-box}.wys-page main{background:#fff}.wys-shell{width:min(1440px,calc(100% - 10vw));margin:0 auto}.wys-section{padding:clamp(110px,12vw,190px) 0;background:var(--paper)}.wys-label{margin:0 0 28px;font-size:11px;line-height:1.2;font-weight:600;letter-spacing:.2em;color:#73756f;text-transform:uppercase}.wys-page h2{font-family:${SERIF};font-weight:400;letter-spacing:-.045em;line-height:.93;margin:0;font-size:clamp(56px,7vw,108px)}.wys-copy{font-size:clamp(15px,1.18vw,18px);line-height:1.75;color:var(--muted)}.wys-copy p{margin:0 0 1.35em}.wys-copy p:last-child{margin-bottom:0}.wys-image{overflow:hidden;margin:0}.wys-image img{width:100%;height:100%;display:block;object-fit:cover;transform:scale(1.035);transition:transform 1s cubic-bezier(.22,.7,.2,1)}.wys-image.is-visible img{transform:scale(1)}
  .wys-page [data-reveal]:not(.wys-image){opacity:0;transform:translateY(24px);transition:opacity .82s ease-out,transform .82s cubic-bezier(.22,.7,.2,1)}.wys-page [data-reveal].is-visible:not(.wys-image){opacity:1;transform:none}.wys-page [data-reveal="image"]{opacity:0;transform:translateY(20px);transition:opacity .9s ease-out,transform .9s cubic-bezier(.22,.7,.2,1)}.wys-page [data-reveal="image"].is-visible{opacity:1;transform:none}
  .wys-hero{--hero-image-y:0px;--hero-copy-y:0px;--hero-copy-opacity:1;position:relative;height:100svh;min-height:720px;color:#fff;overflow:hidden;background:#243228}.wys-hero-image{position:absolute;inset:-5%;width:110%;height:110%;object-fit:cover;object-position:center 46%;transform:translate3d(0,var(--hero-image-y),0) scale(1.04);animation:wysHeroImage 1.4s cubic-bezier(.22,.7,.2,1) forwards}.wys-hero-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,12,10,.62) 0,rgba(8,12,10,.26) 44%,rgba(8,12,10,0) 72%),linear-gradient(0deg,rgba(8,12,10,.5) 0,transparent 43%)}.wys-hero-meta{position:absolute;z-index:2;top:clamp(104px,12vh,148px);left:6vw;right:6vw;display:flex;justify-content:space-between;font-size:10px;font-weight:600;letter-spacing:.2em}.wys-hero-copy{position:absolute;z-index:2;left:6vw;bottom:18vh;max-width:980px;transform:translate3d(0,var(--hero-copy-y),0);opacity:var(--hero-copy-opacity)}.wys-hero-copy h1{font-family:${SERIF};font-size:clamp(70px,8.6vw,132px);font-weight:400;letter-spacing:-.052em;line-height:.86;margin:0 0 28px}.wys-hero-copy p{max-width:680px;margin:0;font-size:clamp(17px,1.55vw,23px);line-height:1.55;letter-spacing:.006em}.wys-scroll-cue{position:absolute;z-index:2;right:6vw;bottom:6vh;display:flex;align-items:center;gap:12px;font-size:9px;font-weight:600;letter-spacing:.19em}.wys-scroll-cue span{width:48px;height:1px;background:currentColor}.wys-hero-animate{opacity:0;transform:translateY(20px);animation:wysHeroCopy .85s ease-out forwards}.wys-hero-meta{animation-delay:.28s}.wys-hero-copy h1{animation-delay:.42s}.wys-hero-copy p{animation-delay:.56s}.wys-scroll-cue{animation-delay:.75s}@keyframes wysHeroImage{to{transform:translate3d(0,var(--hero-image-y),0) scale(1)}}@keyframes wysHeroCopy{to{opacity:1;transform:translateY(0)}}
  .wys-beginning{background:var(--paper-alt)}.wys-beginning .wys-shell{display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:auto auto;gap:clamp(12px,1.2vw,20px)}.wys-beginning-copy{grid-column:1/5;grid-row:1;align-self:start;padding:1.5vw 2.6vw 1vw 0}.wys-beginning-copy .wys-label{margin-bottom:20px}.wys-beginning-copy h2{font-size:clamp(42px,4.2vw,66px);line-height:1;margin-bottom:30px}.wys-beginning-copy .wys-copy{max-width:500px;font-size:clamp(13px,1vw,15px);line-height:1.68}.wys-beginning-person{grid-column:5/9;grid-row:1;height:clamp(390px,34vw,530px)}.wys-beginning-village{grid-column:9/13;grid-row:1;height:clamp(390px,34vw,530px)}.wys-beginning-life{grid-column:1/9;grid-row:2;height:clamp(500px,47vw,730px)}.wys-beginning-detail{grid-column:9/13;grid-row:2;height:clamp(300px,28vw,430px)}
  .wys-turning{padding:clamp(100px,10vw,155px) 0;background:var(--paper)}.wys-turning-grid{display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:auto auto auto;column-gap:clamp(20px,2.2vw,36px);row-gap:clamp(24px,2.5vw,42px);position:relative}.wys-turning-grid:after{content:"";position:absolute;top:0;bottom:0;left:50%;width:1px;background:#ecece8}.wys-turning-heading{grid-column:1/7;grid-row:1;padding-right:3vw}.wys-turning-heading h2{font-size:clamp(52px,5.3vw,82px)}.wys-turning-left-copy{grid-column:1/7;grid-row:2;columns:2;column-gap:clamp(28px,3.2vw,52px);padding-right:3vw;font-size:clamp(13px,.98vw,15px);line-height:1.62}.wys-turning-left-copy p{break-inside:avoid}.wys-turning-main{grid-column:1/7;grid-row:3;margin:0 3vw 0 0}.wys-turning-main .wys-image{height:clamp(430px,39vw,610px)}.wys-turning-place{grid-column:7/13;grid-row:1/3;margin:0 0 0 3vw}.wys-turning-place .wys-image{height:clamp(500px,47vw,730px)}.wys-turning-detail{grid-column:7/10;grid-row:3;height:clamp(320px,31vw,480px);margin-left:3vw}.wys-turning-side-copy{grid-column:10/13;grid-row:3;align-self:start;font-size:clamp(13px,.98vw,15px);line-height:1.62}.wys-turning figcaption{margin-top:10px;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#7b7c77}
  .wys-action{background:var(--paper-alt);padding-bottom:0}.wys-action-grid{display:grid;grid-template-columns:4fr 8fr;gap:clamp(28px,3.5vw,58px);align-items:start}.wys-action-intro>.wys-image{width:74%;height:clamp(220px,22vw,340px);margin:0 0 clamp(36px,4vw,64px)}.wys-action-intro h2{font-size:clamp(48px,4.7vw,72px);line-height:.98;margin-bottom:30px}.wys-action-intro .wys-copy{max-width:470px;font-size:clamp(13px,1vw,15px);line-height:1.65}.wys-action-work{height:clamp(560px,57vw,860px);margin:0}.wys-action-landscape{width:100%;height:clamp(500px,54vw,900px);margin:clamp(70px,8vw,125px) auto 0;overflow:hidden;clip-path:inset(0 3%);transition:clip-path 1.1s cubic-bezier(.22,.7,.2,1)}.wys-action-landscape.is-visible{clip-path:inset(0)}.wys-action-landscape img{width:100%;height:100%;display:block;object-fit:cover}
  .wys-belief{padding:clamp(105px,11vw,170px) 0;background:var(--paper)}.wys-belief-grid{display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:auto auto;gap:clamp(18px,2vw,32px);align-items:start}.wys-belief-life{grid-column:1/9;grid-row:1;height:clamp(410px,43vw,660px)}.wys-belief-person{grid-column:9/13;grid-row:1;height:clamp(410px,43vw,660px);margin:0}.wys-belief-craft{grid-column:1/4;grid-row:2;height:clamp(460px,49vw,750px);margin:0}.wys-belief-main{grid-column:4/9;grid-row:2;margin:3vw 1vw 0}.wys-belief-main h2{font-size:clamp(46px,4.8vw,74px);line-height:.98;margin-bottom:30px}.wys-belief-main .wys-copy,.wys-belief-side{font-size:clamp(13px,1vw,15px);line-height:1.65}.wys-belief-side{grid-column:9/13;grid-row:2;margin:3vw 0 0}.wys-belief-side blockquote{border-left:2px solid var(--ink);padding-left:22px;margin:42px 0 0;font-family:${SERIF};font-size:clamp(24px,2vw,32px);line-height:1.18;letter-spacing:-.025em;color:var(--ink)}
  .wys-closing{padding:clamp(120px,15vw,240px) 0;background:var(--paper-alt)}.wys-closing-grid{display:grid;grid-template-columns:5fr 7fr;gap:clamp(60px,9vw,150px);align-items:center}.wys-closing-copy h2{font-family:${SERIF};font-size:clamp(64px,7.4vw,112px);line-height:.9;letter-spacing:-.05em;font-weight:400;margin:0 0 42px}.wys-closing-copy>p:not(.wys-label){max-width:540px;font-size:clamp(16px,1.25vw,19px);line-height:1.7;color:var(--muted)}.wys-closing-links{display:flex;flex-direction:column;align-items:flex-start;margin-top:54px}.wys-closing-links a{display:inline-flex;gap:18px;align-items:center;padding:14px 0;border-bottom:1px solid var(--ink);font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:inherit;text-decoration:none}.wys-closing-links a span{transition:transform .25s ease}.wys-closing-links a:hover span,.wys-closing-links a:focus-visible span{transform:translate(3px,-3px)}.wys-closing-image{height:clamp(520px,53vw,800px)}
  .wys-page .wys-label{font-family:${SANS};font-size:13px;font-weight:700;line-height:1.5;letter-spacing:.85px;color:#52575c}.wys-page .wys-copy,.wys-page .wys-beginning-copy .wys-copy,.wys-page .wys-turning-left-copy,.wys-page .wys-turning-side-copy,.wys-page .wys-action-intro .wys-copy,.wys-page .wys-belief-main .wys-copy,.wys-page .wys-belief-side{font-family:${SANS};font-size:17px;font-weight:400;line-height:1.5;letter-spacing:.85px;color:#52575c}.wys-page h2,.wys-page .wys-beginning-copy h2,.wys-page .wys-turning-heading h2,.wys-page .wys-action-intro h2,.wys-page .wys-belief-main h2,.wys-page .wys-closing-copy h2{font-family:${SERIF};font-size:clamp(34px,4vw,45px);font-weight:400;line-height:1;letter-spacing:2.25px;color:#000;text-transform:uppercase}.wys-page .wys-hero-copy h1{font-family:${SERIF};font-size:clamp(48px,6vw,78px);font-weight:400;line-height:1;letter-spacing:2.25px;text-transform:uppercase}.wys-page .wys-hero-copy p{font-family:${SANS};font-size:17px;line-height:1.5;letter-spacing:.85px}.wys-page .wys-closing-copy>p:not(.wys-label){font-family:${SANS};font-size:17px;line-height:1.5;letter-spacing:.85px;color:#52575c}.wys-page .wys-closing-links a{font-family:${SANS};font-size:13px;font-weight:700;line-height:1.5;letter-spacing:.85px}.wys-page footer{background:#f4f4f4!important;color:#52575c!important}.wys-page footer h4,.wys-page footer p,.wys-page footer a{color:#52575c!important}.wys-page footer a:hover{color:#000!important}.wys-page footer .h-px{background:#d8d8d8!important}
  @media(max-width:900px){.wys-shell{width:calc(100% - 48px)}.wys-section{padding:100px 0}.wys-beginning .wys-shell{gap:14px}.wys-turning-grid,.wys-belief-grid{gap:24px}.wys-beginning-copy{grid-column:1/7;padding-right:24px}.wys-beginning-person{grid-column:7/13;height:440px}.wys-beginning-village{grid-column:8/13;grid-row:2;height:460px}.wys-beginning-life{grid-column:1/8;grid-row:2;height:460px}.wys-beginning-detail{grid-column:5/11;grid-row:3;height:380px}.wys-turning-grid:after{display:none}.wys-turning-heading,.wys-turning-left-copy,.wys-turning-main{grid-column:1/8}.wys-turning-place{grid-column:8/13;margin-left:0}.wys-turning-detail{grid-column:8/13;margin-left:0}.wys-turning-side-copy{grid-column:8/13}.wys-action-grid{gap:32px}.wys-belief-main{grid-column:4/9}.wys-belief-side{grid-column:9/13}}
  @media(max-width:640px){.wys-shell{width:calc(100% - 36px)}.wys-section{padding:92px 0}.wys-hero{min-height:660px}.wys-hero-meta{top:96px;left:18px;right:18px;font-size:8px}.wys-hero-copy{left:18px;right:18px;bottom:20vh}.wys-hero-copy h1{font-size:clamp(52px,16vw,72px);margin-bottom:22px}.wys-hero-copy p{font-size:16px}.wys-scroll-cue{right:18px;bottom:32px}.wys-page h2{font-size:clamp(50px,15vw,68px)}.wys-label{margin-bottom:20px}.wys-beginning .wys-shell,.wys-turning-grid,.wys-belief-grid,.wys-action-grid,.wys-closing-grid{display:block}.wys-beginning-copy{padding-top:0;margin-bottom:54px}.wys-beginning-copy h2{margin-bottom:32px}.wys-beginning-person{width:72%;height:420px;margin-left:auto}.wys-beginning-village{width:68%;height:420px;margin:-80px 0 0}.wys-beginning-life{width:92%;height:390px;margin:64px auto 0}.wys-beginning-detail{width:60%;height:320px;margin:30px 0 0 auto}.wys-turning-heading{margin-bottom:38px}.wys-turning-left-copy{columns:auto;padding:0}.wys-turning-main{margin:60px 0 0}.wys-turning-main .wys-image{height:430px}.wys-turning-place{width:76%;margin:80px 0 0 auto}.wys-turning-place .wys-image{height:390px}.wys-turning-detail{width:58%;height:360px;margin:26px 0 0}.wys-turning-side-copy{width:76%;margin:34px 0 0 auto}.wys-action-intro>.wys-image{width:72%;height:280px;margin-bottom:60px}.wys-action-intro h2{margin-bottom:32px}.wys-action-work{width:86%;height:560px;margin:72px 0 0 auto}.wys-action-landscape{width:100%;height:52vh;min-height:380px;margin-top:76px}.wys-belief-life{height:410px}.wys-belief-person{width:63%;height:470px;margin:24px 0 0 auto}.wys-belief-craft{width:68%;height:520px;margin:72px 0 0}.wys-belief-main{margin:68px 0 0}.wys-belief-main h2{margin-bottom:34px}.wys-belief-side{margin:42px 0 0}.wys-belief-side blockquote{margin-top:46px}.wys-closing{padding:100px 0 120px}.wys-closing-copy h2{font-size:62px}.wys-closing-image{height:430px;margin-top:70px}.wys-closing-links{margin-top:40px}}
  @media(max-width:640px){.wys-page h2,.wys-page .wys-beginning-copy h2,.wys-page .wys-turning-heading h2,.wys-page .wys-action-intro h2,.wys-page .wys-belief-main h2,.wys-page .wys-closing-copy h2{font-size:34px}.wys-page .wys-copy,.wys-page .wys-beginning-copy .wys-copy,.wys-page .wys-turning-left-copy,.wys-page .wys-turning-side-copy,.wys-page .wys-action-intro .wys-copy,.wys-page .wys-belief-main .wys-copy,.wys-page .wys-belief-side{font-size:16px}.wys-page .wys-hero-copy h1{font-size:42px}}
  @media(prefers-reduced-motion:reduce){.wys-page *{animation:none!important;scroll-behavior:auto!important}.wys-hero-animate,.wys-page [data-reveal],.wys-page [data-reveal="image"]{opacity:1!important;transform:none!important}.wys-image img{transform:none!important;transition:none!important}.wys-action-landscape{clip-path:none!important;transition:none!important}}
`;
