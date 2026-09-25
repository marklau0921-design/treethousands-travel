import type { EditorialBlock } from '@shared/editorial-blocks';
import { useMediaObjectPosition } from '@/lib/media-position';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";

function EditorialImage({ src, alt, fit = 'cover', className = '' }: { src: string; alt: string; fit?: 'cover' | 'contain'; className?: string }) {
  const getPosition = useMediaObjectPosition();
  if (!src) return null;
  return <figure className={`editorial-image ${className}`} style={{ margin: 0 }}>
    <img src={src} alt={alt} loading="lazy" onError={event => { event.currentTarget.closest('figure')?.setAttribute('hidden', ''); }} style={{ width: '100%', height: '100%', display: 'block', objectFit: fit, objectPosition: getPosition(src) }} />
  </figure>;
}

function Copy({ block }: { block: EditorialBlock }) {
  return <div className="editorial-block-copy">
    {block.eyebrow && <p className="editorial-eyebrow" style={{ color: block.accentColor }}>{block.eyebrow}</p>}
    {block.title && <h2 className="editorial-heading">{block.title}</h2>}
    {block.body.filter(Boolean).map((paragraph, index) => <p className="editorial-paragraph" key={index}>{paragraph}</p>)}
  </div>;
}

export default function EditorialBlocks({ blocks, className = '' }: { blocks?: EditorialBlock[]; className?: string }) {
  const visible = (blocks || []).filter(block => block.visible !== false);
  if (!visible.length) return null;
  return <div className={`editorial-blocks ${className}`} style={{ fontFamily: SANS }}>
    <style>{`
      .editorial-blocks .editorial-wrap{width:min(1320px,calc(100% - 64px));margin:0 auto}
      .editorial-blocks .editorial-eyebrow{font-size:11px;font-weight:700;letter-spacing:.19em;text-transform:uppercase;margin:0 0 20px}
      .editorial-blocks .editorial-heading{font-family:${DISPLAY};font-size:clamp(44px,6vw,82px);font-weight:400;letter-spacing:.04em;line-height:.94;text-transform:uppercase;margin:0 0 34px}
      .editorial-blocks .editorial-paragraph{font-size:17px;line-height:1.82;letter-spacing:.025em;margin:0 0 22px;max-width:760px}
      .editorial-blocks .editorial-image{overflow:hidden;background:transparent}
      .editorial-blocks .editorial-image[hidden]{display:none!important}
      .editorial-blocks .editorial-split{display:grid;grid-template-columns:1fr 1fr;min-height:680px}
      .editorial-blocks .editorial-split.image-right .editorial-block-copy{order:1}.editorial-blocks .editorial-split.image-right .editorial-image{order:2}
      .editorial-blocks .editorial-split.image-left .editorial-image{order:1}.editorial-blocks .editorial-split.image-left .editorial-block-copy{order:2}
      .editorial-blocks .editorial-split .editorial-block-copy{padding:clamp(55px,8vw,120px);align-self:center}
      .editorial-blocks .editorial-split .editorial-image{min-height:680px}
      .editorial-blocks .editorial-wide-copy{display:grid;grid-template-columns:.72fr 1.28fr;gap:clamp(45px,8vw,130px);align-items:start}
      .editorial-blocks .editorial-wide-image{aspect-ratio:16/9;margin-bottom:clamp(45px,6vw,85px)}
      .editorial-blocks .editorial-double{display:grid;grid-template-columns:1.12fr .88fr;gap:24px;align-items:start}
      .editorial-blocks .editorial-double .editorial-image:first-child{aspect-ratio:4/5}.editorial-blocks .editorial-double .editorial-image:last-child{aspect-ratio:4/5;margin-top:110px}
      .editorial-blocks .editorial-collage{display:grid;grid-template-columns:repeat(12,1fr);gap:24px;align-items:start}
      .editorial-blocks .editorial-collage .editorial-image:nth-child(1){grid-column:1/8;aspect-ratio:4/3}.editorial-blocks .editorial-collage .editorial-image:nth-child(2){grid-column:8/13;aspect-ratio:4/5;margin-top:120px}.editorial-blocks .editorial-collage .editorial-image:nth-child(3){grid-column:3/9;aspect-ratio:3/2;margin-top:10px}
      .editorial-blocks .editorial-gallery{display:grid;grid-template-columns:repeat(12,1fr);gap:22px}.editorial-blocks .editorial-gallery .editorial-image{grid-column:span 6;aspect-ratio:4/3}.editorial-blocks .editorial-gallery .editorial-image:nth-child(3n){grid-column:3/span 8;aspect-ratio:16/9}
      .editorial-blocks .editorial-quote-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(45px,8vw,120px);align-items:center}.editorial-blocks .editorial-quote{font-size:clamp(34px,4.5vw,64px);line-height:1.12;letter-spacing:-.025em;margin:0 0 36px}.editorial-blocks .editorial-quote-grid .editorial-image{aspect-ratio:4/5}
      .editorial-blocks .editorial-statement{font-size:clamp(36px,5.5vw,76px);line-height:1.12;letter-spacing:-.025em;max-width:1120px;margin:0}
      .editorial-blocks .editorial-divider{text-align:center}.editorial-blocks .editorial-divider .editorial-heading{font-size:clamp(58px,9vw,126px);max-width:1050px;margin:0 auto}
      .editorial-blocks .editorial-sheet{width:min(1320px,calc(100% - 64px));margin:clamp(80px,10vw,150px) auto;display:grid;grid-template-columns:1fr 1fr;align-items:stretch}
      .editorial-blocks .editorial-sheet .editorial-block-copy{padding:clamp(45px,7vw,95px)}.editorial-blocks .editorial-sheet .editorial-image{min-height:640px}
      .editorial-blocks .mature-visual{display:grid;grid-template-columns:repeat(12,1fr);gap:32px;align-items:start}.editorial-blocks .mature-visual .editorial-image:nth-child(1){grid-column:1/9;aspect-ratio:4/3}.editorial-blocks .mature-visual .editorial-image:nth-child(2){grid-column:9/13;aspect-ratio:4/5;margin-top:170px}.editorial-blocks .mature-visual .editorial-image:nth-child(3){grid-column:2/6;aspect-ratio:4/5;margin-top:72px}.editorial-blocks .mature-visual .editorial-block-copy{grid-column:7/12;margin-top:150px}
      .editorial-blocks .mature-details{display:grid;grid-template-columns:repeat(6,1fr);gap:22px;align-items:end}.editorial-blocks .mature-details .editorial-image{grid-column:span 2;aspect-ratio:4/5}.editorial-blocks .mature-details .editorial-image:nth-child(1){aspect-ratio:5/6}.editorial-blocks .mature-details .editorial-image:nth-child(2){aspect-ratio:4/5}.editorial-blocks .mature-details .editorial-image:nth-child(n+4){aspect-ratio:4/3}
      .editorial-blocks .mature-mosaic{display:grid;grid-template-columns:repeat(12,1fr);gap:54px 34px}.editorial-blocks .mature-mosaic .editorial-image:nth-child(1),.editorial-blocks .mature-mosaic .editorial-image:nth-child(4){grid-column:span 7;aspect-ratio:7/5}.editorial-blocks .mature-mosaic .editorial-image:nth-child(2),.editorial-blocks .mature-mosaic .editorial-image:nth-child(3){grid-column:span 5;aspect-ratio:4/5}.editorial-blocks .mature-mosaic .editorial-image:nth-child(2){margin-top:110px}
      .editorial-blocks .mature-perspectives{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}.editorial-blocks .mature-perspectives .editorial-image{aspect-ratio:4/5}.editorial-blocks .mature-perspectives .editorial-image:nth-child(2){margin-top:90px}
      .editorial-blocks .culinary-grid{display:grid;grid-template-columns:1.2fr .8fr .8fr;gap:28px;align-items:start}.editorial-blocks .culinary-grid .editorial-image:first-child{aspect-ratio:4/5}.editorial-blocks .culinary-grid .editorial-image:not(:first-child){aspect-ratio:4/3;margin-top:110px}
      .editorial-blocks .context-grid{display:grid;grid-template-columns:.38fr 1fr;gap:clamp(45px,8vw,130px)}
      .editorial-blocks .inline-story{display:grid;grid-template-columns:1.15fr .85fr;gap:clamp(45px,8vw,110px);align-items:start}.editorial-blocks .inline-story .editorial-image{aspect-ratio:4/5}
      .editorial-blocks .column-essay{columns:2;column-gap:clamp(40px,7vw,95px)}.editorial-blocks .column-essay .editorial-paragraph{break-inside:avoid}.editorial-blocks .column-quote{font-size:clamp(30px,4vw,54px);line-height:1.16;margin:0 0 35px;break-inside:avoid}
      @media(max-width:767px){.editorial-blocks .editorial-wrap,.editorial-blocks .editorial-sheet{width:calc(100% - 40px)}.editorial-blocks .editorial-split,.editorial-blocks .editorial-wide-copy,.editorial-blocks .editorial-double,.editorial-blocks .editorial-quote-grid,.editorial-blocks .editorial-sheet,.editorial-blocks .context-grid,.editorial-blocks .inline-story{display:flex;flex-direction:column}.editorial-blocks .editorial-split .editorial-block-copy{padding:55px 20px}.editorial-blocks .editorial-split .editorial-image,.editorial-blocks .editorial-sheet .editorial-image{min-height:0;aspect-ratio:4/3}.editorial-blocks .editorial-split.image-left .editorial-image,.editorial-blocks .editorial-split.image-right .editorial-image{order:1}.editorial-blocks .editorial-split.image-left .editorial-block-copy,.editorial-blocks .editorial-split.image-right .editorial-block-copy{order:2}.editorial-blocks .editorial-double .editorial-image:last-child{margin-top:0}.editorial-blocks .editorial-collage,.editorial-blocks .editorial-gallery,.editorial-blocks .mature-visual,.editorial-blocks .mature-details,.editorial-blocks .mature-mosaic,.editorial-blocks .mature-perspectives,.editorial-blocks .culinary-grid{display:block}.editorial-blocks .editorial-collage .editorial-image,.editorial-blocks .editorial-gallery .editorial-image,.editorial-blocks .mature-visual .editorial-image,.editorial-blocks .mature-details .editorial-image,.editorial-blocks .mature-mosaic .editorial-image,.editorial-blocks .mature-perspectives .editorial-image,.editorial-blocks .culinary-grid .editorial-image{margin:0 0 20px!important;aspect-ratio:4/3!important}.editorial-blocks .column-essay{columns:1}}
    `}</style>
    {visible.map(block => {
      const sectionStyle = { background: block.backgroundColor, color: block.textColor };
      if (block.type === 'our-story-split' || block.type === 'home-edge-rows') return <section key={block.id} style={sectionStyle} className={`editorial-split image-${block.imageSide}`}><EditorialImage src={block.images[0]} alt={block.title} fit={block.imageFit} /><Copy block={block} /></section>;
      if (block.type === 'our-story-sheet') return <section key={block.id} style={sectionStyle}><div className={`editorial-sheet image-${block.imageSide}`}><Copy block={block} /><EditorialImage src={block.images[0]} alt={block.title} fit={block.imageFit} /></div></section>;
      if (block.type === 'our-story-closing' || block.type === 'story-closing' || block.type === 'magazine-inline') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(85px,11vw,155px) 0' }}><div className="editorial-wrap inline-story"><Copy block={block} /><EditorialImage src={block.images[0]} alt={block.title} fit={block.imageFit} /></div></section>;
      if (block.type === 'our-story-quote') return <section key={block.id} style={sectionStyle} className={`editorial-split image-${block.imageSide}`}><div className="editorial-block-copy"><p className="editorial-eyebrow" style={{ color: block.accentColor }}>{block.eyebrow}</p><blockquote className="editorial-quote">“{block.quote || block.title}”</blockquote>{block.body.map((p,i)=><p className="editorial-paragraph" key={i}>{p}</p>)}</div><EditorialImage src={block.images[0]} alt={block.title} fit={block.imageFit} /></section>;
      if (block.type === 'our-story-mosaic') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(95px,12vw,170px) 0' }}><div className="editorial-wrap"><Copy block={block} /><div className="mature-mosaic" style={{marginTop:60}}>{block.images.slice(0,4).map((image,i)=><EditorialImage key={i} src={image} alt={`${block.title} ${i+1}`} fit={block.imageFit}/>)}</div></div></section>;
      if (block.type === 'explore-visual') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(85px,11vw,160px) 0' }}><div className="editorial-wrap mature-visual">{block.images.slice(0,3).map((image,i)=><EditorialImage key={i} src={image} alt={`${block.title} ${i+1}`} fit={block.imageFit}/>)}<Copy block={block}/></div></section>;
      if (block.type === 'explore-details' || block.type === 'magazine-contact-sheet') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(85px,10vw,145px) 0' }}><div className="editorial-wrap"><Copy block={block}/><div className="mature-details" style={{marginTop:55}}>{block.images.slice(0,6).map((image,i)=><EditorialImage key={i} src={image} alt={block.captions[i] || `${block.title} ${i+1}`} fit={block.imageFit}/>)}</div></div></section>;
      if (block.type === 'explore-statement') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(105px,15vw,220px) 0' }}><div className="editorial-wrap"><p className="editorial-eyebrow" style={{color:block.accentColor}}>{block.eyebrow}</p><p className="editorial-statement">{block.title}</p></div></section>;
      if (block.type === 'explore-perspectives') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(90px,11vw,155px) 0' }}><div className="editorial-wrap"><Copy block={block}/><div className="mature-perspectives" style={{marginTop:55}}>{block.images.slice(0,3).map((image,i)=><EditorialImage key={i} src={image} alt={`${block.title} ${i+1}`} fit={block.imageFit}/>)}</div></div></section>;
      if (block.type === 'story-context') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(80px,10vw,145px) 0' }}><div className="editorial-wrap context-grid"><p className="editorial-eyebrow" style={{color:block.accentColor}}>{block.eyebrow}</p><Copy block={{...block,eyebrow:''}}/></div></section>;
      if (block.type === 'story-spread') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(85px,11vw,160px) 0' }}><div className="editorial-wrap"><div className="editorial-double">{block.images.slice(0,2).map((image,i)=><EditorialImage key={i} src={image} alt={`${block.title} ${i+1}`} fit={block.imageFit}/>)}</div><div style={{maxWidth:880,margin:'70px auto 0'}}><Copy block={block}/></div></div></section>;
      if (block.type === 'story-photo-quote') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(90px,11vw,155px) 0' }}><div className="editorial-wrap"><div className="editorial-double">{block.images.slice(0,2).map((image,i)=><EditorialImage key={i} src={image} alt={`${block.title} ${i+1}`} fit={block.imageFit}/>)}</div><div style={{maxWidth:930,margin:'70px auto 0'}}><p className="editorial-eyebrow" style={{color:block.accentColor}}>{block.eyebrow}</p><blockquote className="editorial-quote">“{block.quote || block.title}”</blockquote>{block.body.map((p,i)=><p className="editorial-paragraph" key={i}>{p}</p>)}</div></div></section>;
      if (block.type === 'city-culinary') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(90px,11vw,155px) 0' }}><div className="editorial-wrap"><Copy block={block}/><div className="culinary-grid" style={{marginTop:55}}>{block.images.slice(0,3).map((image,i)=><EditorialImage key={i} src={image} alt={`${block.title} ${i+1}`} fit={block.imageFit}/>)}</div></div></section>;
      if (block.type === 'magazine-full-bleed') return <section key={block.id} style={sectionStyle}><EditorialImage src={block.images[0]} alt={block.title} fit={block.imageFit} className="editorial-wide-image" />{(block.title||block.eyebrow)&&<div className="editorial-wrap" style={{padding:'35px 0 80px'}}><Copy block={block}/></div>}</section>;
      if (block.type === 'magazine-columns') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(90px,12vw,170px) 0' }}><div className="editorial-wrap">{block.images[0]&&<EditorialImage src={block.images[0]} alt={block.title} fit={block.imageFit} className="editorial-wide-image"/>}<Copy block={{...block,body:[]}}/><div className="column-essay">{block.quote&&<blockquote className="column-quote">“{block.quote}”</blockquote>}{block.body.map((p,i)=><p className="editorial-paragraph" key={i}>{p}</p>)}</div></div></section>;
      return null;
    })}
  </div>;
}
