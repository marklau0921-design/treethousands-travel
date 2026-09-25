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
      @media(max-width:767px){.editorial-blocks .editorial-wrap{width:calc(100% - 40px)}.editorial-blocks .editorial-split,.editorial-blocks .editorial-wide-copy,.editorial-blocks .editorial-double,.editorial-blocks .editorial-quote-grid{display:flex;flex-direction:column}.editorial-blocks .editorial-split .editorial-block-copy{padding:55px 20px}.editorial-blocks .editorial-split .editorial-image{min-height:0;aspect-ratio:4/3}.editorial-blocks .editorial-split.image-left .editorial-image,.editorial-blocks .editorial-split.image-right .editorial-image{order:1}.editorial-blocks .editorial-split.image-left .editorial-block-copy,.editorial-blocks .editorial-split.image-right .editorial-block-copy{order:2}.editorial-blocks .editorial-double .editorial-image:last-child{margin-top:0}.editorial-blocks .editorial-collage{display:block}.editorial-blocks .editorial-collage .editorial-image{margin:0 0 20px!important;aspect-ratio:4/3!important}.editorial-blocks .editorial-gallery{display:block}.editorial-blocks .editorial-gallery .editorial-image{margin-bottom:20px;aspect-ratio:4/3}}
    `}</style>
    {visible.map(block => {
      const sectionStyle = { background: block.backgroundColor, color: block.textColor };
      if (block.type === 'split' || block.type === 'image-text') return <section key={block.id} style={sectionStyle} className={`editorial-split image-${block.imageSide}`}><EditorialImage src={block.images[0]} alt={block.title} fit={block.imageFit} /><Copy block={block} /></section>;
      if (block.type === 'full-image') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(75px,10vw,145px) 0' }}><div className="editorial-wrap"><EditorialImage src={block.images[0]} alt={block.title} fit={block.imageFit} className="editorial-wide-image" /><Copy block={block} /></div></section>;
      if (block.type === 'double-image') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(85px,11vw,160px) 0' }}><div className="editorial-wrap"><div className="editorial-double">{block.images.slice(0, 2).map((image, index) => <EditorialImage key={index} src={image} alt={`${block.title} ${index + 1}`} fit={block.imageFit} />)}</div><div style={{ maxWidth: 840, margin: '70px auto 0' }}><Copy block={block} /></div></div></section>;
      if (block.type === 'collage') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(85px,11vw,160px) 0' }}><div className="editorial-wrap"><div className="editorial-collage">{block.images.slice(0, 3).map((image, index) => <EditorialImage key={index} src={image} alt={`${block.title} ${index + 1}`} fit={block.imageFit} />)}</div><div style={{ maxWidth: 860, margin: '70px auto 0' }}><Copy block={block} /></div></div></section>;
      if (block.type === 'quote-image') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(85px,11vw,155px) 0' }}><div className="editorial-wrap editorial-quote-grid"><div><p className="editorial-eyebrow" style={{ color: block.accentColor }}>{block.eyebrow}</p><blockquote className="editorial-quote">“{block.quote || block.title}”</blockquote>{block.body.filter(Boolean).map((paragraph, index) => <p className="editorial-paragraph" key={index}>{paragraph}</p>)}</div><EditorialImage src={block.images[0]} alt={block.title || block.quote} fit={block.imageFit} /></div></section>;
      if (block.type === 'statement') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(105px,15vw,220px) 0' }}><div className="editorial-wrap"><p className="editorial-eyebrow" style={{ color: block.accentColor }}>{block.eyebrow}</p><p className="editorial-statement">{block.title}</p></div></section>;
      if (block.type === 'gallery') return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(85px,11vw,155px) 0' }}><div className="editorial-wrap"><Copy block={block} /><div className="editorial-gallery" style={{ marginTop: 55 }}>{block.images.map((image, index) => <EditorialImage key={index} src={image} alt={`${block.title} ${index + 1}`} fit={block.imageFit} />)}</div></div></section>;
      if (block.type === 'divider') return <section key={block.id} className="editorial-divider" style={{ ...sectionStyle, padding: 'clamp(105px,15vw,210px) 0' }}><div className="editorial-wrap"><Copy block={block} /></div></section>;
      return <section key={block.id} style={{ ...sectionStyle, padding: 'clamp(80px,10vw,145px) 0' }}><div className="editorial-wrap editorial-wide-copy"><p className="editorial-eyebrow" style={{ color: block.accentColor }}>{block.eyebrow}</p><Copy block={{ ...block, eyebrow: '' }} /></div></section>;
    })}
  </div>;
}
