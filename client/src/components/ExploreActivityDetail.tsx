import { useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Grid3X3,
  Hammer,
  MapPin,
  X,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useMediaObjectPosition } from "@/lib/media-position";
import type { ExplorePageContent } from "@shared/explore";

const DISPLAY =
  "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS =
  "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";
const TEXT = "#52575c";

export default function ExploreActivityDetail({
  content,
}: {
  content: ExplorePageContent;
}) {
  const detail = content.activityDetail;
  const getObjectPosition = useMediaObjectPosition();
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = `${content.hero.title} | TreeThousands`;
    let meta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = detail?.excerpt || content.hero.subtitle;
  }, [content.hero.title, content.hero.subtitle, detail?.excerpt]);

  if (!detail) return null;

  const fallbackGallery = [
    content.hero.image,
    ...detail.currentWork.images,
    detail.purpose.image,
    ...detail.people.images,
    detail.flexibility.image,
    detail.closing.image,
  ];
  const gallery = (
    detail.gallery.length ? detail.gallery : fallbackGallery
  ).filter((src, index, all) => Boolean(src) && all.indexOf(src) === index);

  useEffect(() => {
    if (galleryIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGalleryIndex(null);
      if (event.key === "ArrowLeft")
        setGalleryIndex(index =>
          index === null ? null : Math.max(0, index - 1)
        );
      if (event.key === "ArrowRight")
        setGalleryIndex(index =>
          index === null ? null : Math.min(gallery.length - 1, index + 1)
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [galleryIndex, gallery.length]);

  const blocks = [
    {
      title: detail.purpose.title,
      description: detail.purpose.paragraphs.join("\n\n"),
      imageUrl: detail.purpose.image,
    },
    {
      title: detail.currentWork.title,
      description: detail.currentWork.paragraphs.join("\n\n"),
      imageUrl: detail.currentWork.images[0],
    },
    {
      title: detail.participation.title,
      description: [
        detail.participation.introduction,
        ...detail.participation.items.map(
          item => `${item.title}\n${item.description}`
        ),
      ].join("\n\n"),
      imageUrl: detail.currentWork.images[1] || detail.flexibility.image,
    },
    {
      title: detail.flexibility.title,
      description: [
        ...detail.flexibility.paragraphs,
        detail.flexibility.points.join(" · "),
      ].join("\n\n"),
      imageUrl: detail.flexibility.image,
    },
    {
      title: detail.people.title,
      description: detail.people.paragraphs.join("\n\n"),
      imageUrl: detail.people.images[0],
    },
    {
      title: detail.practical.title,
      description: [
        detail.practical.introduction,
        ...detail.practical.items.map(
          item => `${item.title}\n${item.description}`
        ),
      ].join("\n\n"),
      imageUrl: detail.people.images[1] || detail.closing.image,
    },
    {
      title: detail.closing.title,
      description: detail.closing.paragraphs.join("\n\n"),
      imageUrl: detail.closing.image,
    },
  ].filter(block => block.imageUrl);

  return (
    <div
      className="activity-detail-page"
      style={{ fontFamily: SANS, background: "#fff", color: TEXT }}
    >
      <Navigation />

      <style>{`
      .activity-detail-page .activity-intro{width:min(1120px,calc(100% - 64px));margin:0 auto;padding:116px 0 88px}.activity-detail-page .activity-overview{display:grid;grid-template-columns:minmax(0,1.32fr) minmax(330px,.72fr);gap:clamp(42px,5vw,66px);align-items:start}.activity-detail-page .preview-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.activity-detail-page .preview-image{position:relative;aspect-ratio:1/1;overflow:hidden;border:0;border-radius:11px;padding:0;background:#eee;cursor:pointer}.activity-detail-page .preview-image img{width:100%;height:100%;display:block;object-fit:cover;transition:transform .45s ease,filter .25s ease}.activity-detail-page .preview-image:hover img{transform:scale(1.025);filter:brightness(.9)}.activity-detail-page .gallery-button{display:inline-flex;align-items:center;gap:8px;margin-top:16px;padding:9px 13px;border:1px solid #cfcfcf;border-radius:9px;background:#fff;color:#222;font-size:11px;font-weight:700;letter-spacing:.08em;cursor:pointer}.activity-detail-page .gallery-button:hover{background:#f5f5f5}.activity-detail-page .activity-copy{position:sticky;top:105px;text-align:center}.activity-detail-page .activity-category{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#F5569B;margin:8px 0 15px}.activity-detail-page .activity-title{font-family:${SANS};font-size:clamp(27px,2.7vw,34px);font-weight:700;line-height:1.15;letter-spacing:-.025em;color:#171717;margin:0 auto 15px;max-width:420px}.activity-detail-page .activity-excerpt{font-size:14px;line-height:1.52;letter-spacing:0;color:#5c5c5c;margin:0 auto 13px;max-width:390px}.activity-detail-page .activity-status{color:#666;font-size:13px;line-height:1.5;margin-bottom:6px}.activity-detail-page .activity-location{font-size:13px;color:#666;margin:0}.activity-detail-page .activity-actions{display:flex;justify-content:center;gap:18px;margin:23px 0}.activity-detail-page .icon-action{width:40px;height:40px;border:0;border-radius:50%;background:#fff;color:#111;display:flex;align-items:center;justify-content:center;cursor:pointer}.activity-detail-page .icon-action:hover{background:#f2f2f2}.activity-detail-page .activity-tags{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;padding-bottom:24px;border-bottom:1px solid #e1e1e1}.activity-detail-page .activity-tag{padding:7px 10px;border-radius:6px;background:#f5f5f5;color:#555;font-size:11px}.activity-detail-page .highlights{text-align:left;padding:7px 0 5px}.activity-detail-page .highlight{display:grid;grid-template-columns:42px 1fr;gap:13px;align-items:start;padding:14px 0}.activity-detail-page .highlight-icon{width:42px;height:42px;border-radius:9px;background:#f3f3f3;color:#111;display:flex;align-items:center;justify-content:center}.activity-detail-page .highlight-title{font-size:14px;font-weight:600;color:#222;margin:1px 0 3px}.activity-detail-page .highlight-copy{font-size:12px;line-height:1.45;color:#717171;margin:0}.activity-detail-page .booking-card{display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center;border:1px solid #ddd;border-radius:16px;padding:18px 20px;margin-top:13px;box-shadow:0 5px 18px rgba(0,0,0,.07);text-align:left}.activity-detail-page .booking-label{font-size:13px;font-weight:700;color:#222;margin:0 0 3px}.activity-detail-page .booking-note{font-size:11px;color:#F5569B;margin:0}.activity-detail-page .join-button{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 21px;border-radius:10px;background:#111;color:#fff;text-align:center;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.04em;transition:background .2s ease}.activity-detail-page .join-button:hover{background:#F5569B}.activity-detail-page .activity-note{font-size:11px;line-height:1.5;color:#777;margin:13px 4px 0;text-align:left}.activity-detail-page .gallery-modal{position:fixed;inset:0;z-index:1000;background:#0b0b0b;color:#fff;display:flex;align-items:center;justify-content:center}.activity-detail-page .gallery-stage{width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:76px 110px}.activity-detail-page .gallery-stage img{display:block;max-width:100%;max-height:100%;object-fit:contain}.activity-detail-page .gallery-close,.activity-detail-page .gallery-arrow{position:absolute;border:0;background:rgba(255,255,255,.08);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s ease}.activity-detail-page .gallery-close{right:28px;top:24px;width:46px;height:46px}.activity-detail-page .gallery-arrow{top:50%;transform:translateY(-50%);width:50px;height:64px}.activity-detail-page .gallery-arrow:hover,.activity-detail-page .gallery-close:hover{background:rgba(255,255,255,.2)}.activity-detail-page .gallery-arrow.prev{left:28px}.activity-detail-page .gallery-arrow.next{right:28px}.activity-detail-page .gallery-count{position:absolute;left:28px;top:34px;font-size:11px;font-weight:700;letter-spacing:.16em}.activity-detail-page .gallery-caption{position:absolute;left:0;right:0;bottom:24px;text-align:center;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#bbb}@media(max-width:800px){.activity-detail-page .activity-intro{width:calc(100% - 40px);padding:92px 0 64px}.activity-detail-page .activity-overview{display:block}.activity-detail-page .preview-grid{gap:5px}.activity-detail-page .preview-image{border-radius:8px}.activity-detail-page .gallery-button{margin-bottom:38px}.activity-detail-page .activity-copy{position:static}.activity-detail-page .activity-title{font-size:28px}.activity-detail-page .gallery-stage{padding:70px 20px 86px}.activity-detail-page .gallery-arrow{top:auto;bottom:20px;transform:none;width:48px;height:48px}.activity-detail-page .gallery-arrow.prev{left:20px}.activity-detail-page .gallery-arrow.next{right:20px}.activity-detail-page .gallery-close{right:20px;top:18px}.activity-detail-page .gallery-count{left:20px;top:31px}.activity-detail-page .gallery-caption{bottom:35px}}
    `}</style>

      <style>{`
        .activity-detail-page .activity-intro {
          width: min(1240px, calc(100% - 40px));
          padding: 104px 0 76px;
        }
        .activity-detail-page .activity-overview {
          grid-template-columns: minmax(0, 750px) minmax(360px, 1fr);
          gap: clamp(32px, 3.4vw, 46px);
          align-items: start;
        }
        .activity-detail-page .activity-media {
          display: flex;
          min-height: 0;
          flex-direction: column;
        }
        .activity-detail-page .preview-grid {
          width: 750px;
          max-width: 100%;
          height: 750px;
          flex: none;
          min-height: 0;
          overflow: hidden;
          border-radius: 30px;
        }
        .activity-detail-page .preview-image {
          min-height: 0;
          aspect-ratio: auto;
          border-radius: 0;
        }
        .activity-detail-page .preview-image img {
          position: absolute;
          inset: 0;
        }
        .activity-detail-page .gallery-button {
          align-self: flex-start;
          padding: 9px 0;
          border: 0;
          border-radius: 0;
          background: transparent;
        }
        .activity-detail-page .gallery-button:hover {
          background: transparent;
          color: #F5569B;
        }
        .activity-detail-page .activity-category { font-size: 12px; }
        .activity-detail-page .activity-title {
          max-width: 470px;
          font-size: clamp(34px, 3vw, 42px);
          line-height: 1.12;
        }
        .activity-detail-page .activity-excerpt {
          max-width: 440px;
          font-size: 16px;
          line-height: 1.58;
        }
        .activity-detail-page .activity-status,
        .activity-detail-page .activity-location { font-size: 14px; }
        .activity-detail-page .activity-tag { font-size: 12px; }
        .activity-detail-page .highlight-title { font-size: 15px; }
        .activity-detail-page .highlight-copy {
          font-size: 13px;
          line-height: 1.5;
        }
        .activity-detail-page .booking-label { font-size: 14px; }
        .activity-detail-page .booking-note,
        .activity-detail-page .activity-note { font-size: 12px; }
        .activity-detail-page .gallery-modal {
          background: #fff;
          color: #222;
        }
        .activity-detail-page .gallery-stage {
          padding: 82px 116px 54px;
        }
        .activity-detail-page .gallery-stage img {
          max-width: min(860px, 70vw);
          max-height: calc(100vh - 136px);
          border-radius: 28px;
        }
        .activity-detail-page .gallery-close,
        .activity-detail-page .gallery-arrow {
          color: #222;
          background: transparent;
          border-radius: 50%;
          transition: background .2s ease, opacity .2s ease;
        }
        .activity-detail-page .gallery-close {
          top: 16px;
          right: 28px;
          width: 48px;
          height: 48px;
        }
        .activity-detail-page .gallery-arrow {
          width: 52px;
          height: 64px;
        }
        .activity-detail-page .gallery-arrow.prev { left: 22px; }
        .activity-detail-page .gallery-arrow.next { right: 22px; }
        .activity-detail-page .gallery-arrow:hover,
        .activity-detail-page .gallery-close:hover { background: #f5f5f5; }
        .activity-detail-page .gallery-arrow:disabled {
          opacity: .18;
          cursor: default;
          background: transparent;
        }
        .activity-detail-page .gallery-count {
          left: 50%;
          top: 24px;
          transform: translateX(-50%);
          color: #717171;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0;
        }
        .activity-detail-page .gallery-caption { display: none; }
        @media (max-width: 800px) {
          .activity-detail-page .activity-intro {
            width: calc(100% - 28px);
            padding: 88px 0 60px;
          }
          .activity-detail-page .preview-grid { border-radius: 20px; }
          .activity-detail-page .activity-media { display: block; }
          .activity-detail-page .preview-grid {
            width: 100%;
            height: auto;
            aspect-ratio: 1 / 1;
          }
          .activity-detail-page .gallery-stage { padding: 72px 18px 88px; }
          .activity-detail-page .gallery-stage img {
            max-width: 100%;
            max-height: calc(100vh - 160px);
            border-radius: 18px;
          }
          .activity-detail-page .gallery-count {
            left: 50%;
            top: 26px;
          }
        }
      `}</style>

      <section className="activity-intro">
        <div className="activity-overview">
          <div className="activity-media">
            <div className="preview-grid">
              {gallery.slice(0, 4).map((image, index) => (
                <button
                  type="button"
                  className="preview-image"
                  key={image}
                  onClick={() => setGalleryIndex(index)}
                  aria-label={`Open photo ${index + 1} of ${gallery.length}`}
                >
                  <img
                    src={image}
                    alt={`${content.hero.title} — view ${index + 1}`}
                    style={{ objectPosition: getObjectPosition(image) }}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="gallery-button"
              onClick={() => setGalleryIndex(0)}
            >
              <Grid3X3 size={15} /> View all photos · {gallery.length}
            </button>
          </div>
          <aside className="activity-copy">
            <p className="activity-category">
              {content.activity.type} / {detail.category}
            </p>
            <h1 className="activity-title">{content.hero.title}</h1>
            <p className="activity-excerpt">{detail.excerpt}</p>
            <div className="activity-status">
              {content.activity.statusLabel}
            </div>
            <p className="activity-location">
              {content.activity.location} · {detail.category}
            </p>
            <div className="activity-tags">
              <span className="activity-tag">Small groups</span>
              <span className="activity-tag">Flexible arrangement</span>
            </div>
            <div className="highlights">
              <Highlight
                icon={<Hammer size={19} />}
                title="A real project in progress"
                copy="Join useful work shaped by the condition of the house."
              />
              <Highlight
                icon={<MapPin size={19} />}
                title={content.activity.location}
                copy="Detailed meeting information is shared after confirmation."
              />
              <Highlight
                icon={<Clock3 size={19} />}
                title={content.activity.duration}
                copy={`${content.activity.difficulty} · ${content.activity.groupSize}`}
              />
              <Highlight
                icon={<CalendarDays size={19} />}
                title="Planned around your group"
                copy="Timing and tasks are agreed through a conversation."
              />
            </div>
            <div className="booking-card">
              <div>
                <p className="booking-label">Join by arrangement</p>
                <p className="booking-note">Ongoing participation</p>
              </div>
              <Link
                href={content.activity.registrationHref}
                className="join-button"
              >
                Enquire
              </Link>
            </div>
            <p className="activity-note">{content.activity.note}</p>
          </aside>
        </div>
      </section>

      {galleryIndex !== null && (
        <div
          className="gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${content.hero.title} photo gallery`}
        >
          <button
            type="button"
            className="gallery-close"
            onClick={() => setGalleryIndex(null)}
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>
          <span className="gallery-count">
            {String(galleryIndex + 1).padStart(2, "0")} /{" "}
            {String(gallery.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="gallery-arrow prev"
            onClick={() => setGalleryIndex(galleryIndex - 1)}
            disabled={galleryIndex === 0}
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} />
          </button>
          <div className="gallery-stage">
            <img
              src={gallery[galleryIndex]}
              alt={`${content.hero.title} — photo ${galleryIndex + 1}`}
            />
          </div>
          <button
            type="button"
            className="gallery-arrow next"
            onClick={() => setGalleryIndex(galleryIndex + 1)}
            disabled={galleryIndex === gallery.length - 1}
            aria-label="Next photo"
          >
            <ChevronRight size={28} />
          </button>
          <div className="gallery-caption">
            Build together / working with what is already here
          </div>
        </div>
      )}

      <div className="tea-body">
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto 48px",
            padding: "0 24px",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(34px,4vw,45px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "2.25px",
              color: "#000",
              margin: "0 0 18px",
              textTransform: "uppercase",
            }}
          >
            {detail.purpose.eyebrow}
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.5,
              color: TEXT,
              fontFamily: SANS,
              letterSpacing: ".85px",
              margin: 0,
            }}
          >
            {detail.excerpt}
          </p>
        </div>

        {blocks.map((block, index) => {
          const text = (
            <div className="tea-detail-text">
              <div className="tea-detail-text-inner">
                <h3
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: "clamp(34px,3.6vw,45px)",
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: "2.25px",
                    color: "#000",
                    margin: "0 0 18px",
                    textTransform: "uppercase",
                  }}
                >
                  {block.title}
                </h3>
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.5,
                    color: TEXT,
                    fontFamily: SANS,
                    letterSpacing: ".85px",
                    margin: 0,
                    whiteSpace: "pre-line",
                  }}
                >
                  {block.description}
                </p>
              </div>
            </div>
          );
          const image = (
            <div className="tea-detail-img-wrap">
              <img
                src={block.imageUrl}
                alt={block.title}
                className="tea-detail-img"
                style={{ objectPosition: getObjectPosition(block.imageUrl) }}
              />
            </div>
          );
          return (
            <div
              key={block.title}
              className={`tea-detail-row${index % 2 === 0 ? "" : " mirror"}`}
            >
              {index % 2 === 0 ? (
                <>
                  {text}
                  {image}
                </>
              ) : (
                <>
                  {image}
                  {text}
                </>
              )}
            </div>
          );
        })}
      </div>

      <section
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(260px,30vw,275px)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: content.cta.backgroundColor || "#1a1a1a",
        }}
      >
        {content.cta.textureImage && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${content.cta.textureImage})`,
              backgroundRepeat: "repeat",
              backgroundSize: "420px 420px",
              opacity: content.cta.textureOpacity / 100,
            }}
          />
        )}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <h2
            style={{
              fontFamily: DISPLAY,
              fontSize: 45,
              fontWeight: 400,
              color: content.cta.textColor || "#fff",
              letterSpacing: "2.25px",
              textTransform: "uppercase",
              margin: 0,
              lineHeight: 1,
            }}
          >
            {content.cta.title}
          </h2>
          <Link
            href={content.activity.registrationHref}
            style={{
              backgroundColor: content.cta.buttonBackgroundColor || "#111",
              color: content.cta.buttonTextColor || "#fff",
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: ".85px",
              lineHeight: 1.5,
              textTransform: "uppercase",
              padding: "14px 36px",
              border: "2px solid #111",
              textDecoration: "none",
            }}
          >
            {content.activity.registrationLabel}
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Highlight({
  icon,
  title,
  copy,
}: {
  icon: ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="highlight">
      <span className="highlight-icon">{icon}</span>
      <div>
        <p className="highlight-title">{title}</p>
        <p className="highlight-copy">{copy}</p>
      </div>
    </div>
  );
}
