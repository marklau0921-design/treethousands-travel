import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { Link } from "wouter";
import {
  Accessibility,
  Backpack,
  BookOpen,
  CalendarDays,
  Camera,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Clock3,
  CookingPot,
  Footprints,
  Grid3X3,
  HandHeart,
  Hammer,
  Languages,
  Leaf,
  MapPin,
  PenLine,
  Ruler,
  ShieldCheck,
  Shirt,
  Users,
  Video,
  X,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useMediaObjectPosition } from "@/lib/media-position";
import { trpc } from "@/lib/trpc";
import type { ExplorePageContent } from "@shared/explore";

const DISPLAY =
  "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS =
  "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";
const TEXT = "#52575c";

const ROLE_ICONS = {
  design: Ruler,
  maker: Hammer,
  camera: Camera,
  video: Video,
  cook: CookingPot,
  plant: Leaf,
  leaf: Leaf,
  writer: PenLine,
  languages: Languages,
  group: Users,
  hands: HandHeart,
  research: BookOpen,
} as const;

export default function ExploreActivityDetail({
  content,
}: {
  content: ExplorePageContent;
}) {
  const detail = content.activityDetail;
  const getObjectPosition = useMediaObjectPosition();
  const { data: homepageAssets } = trpc.media.getHomepageAssets.useQuery();
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [experienceIndex, setExperienceIndex] = useState<number | null>(null);
  const overlayOpen = galleryIndex !== null || experienceIndex !== null;

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
  const isBuildActivity = content.activity.type === "Build Together";
  const ctaTexture = homepageAssets?.cta?.url || content.cta.textureImage || "";
  const ctaTextureOpacity = Math.max(
    0,
    Math.min(1, Number(homepageAssets?.cta?.opacity ?? content.cta.textureOpacity ?? 28) / 100)
  );

  useEffect(() => {
    if (!overlayOpen) return;
    const scrollY = window.scrollY;
    const htmlOverflow = document.documentElement.style.overflow;
    const bodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
    };
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      Object.assign(document.body.style, bodyStyles);
      window.scrollTo(0, scrollY);
    };
  }, [overlayOpen]);

  useEffect(() => {
    if (!overlayOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setGalleryIndex(null);
        setExperienceIndex(null);
      }
      if (galleryIndex !== null && event.key === "ArrowLeft")
        setGalleryIndex(index =>
          index === null ? null : Math.max(0, index - 1)
        );
      if (galleryIndex !== null && event.key === "ArrowRight")
        setGalleryIndex(index =>
          index === null ? null : Math.min(gallery.length - 1, index + 1)
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [overlayOpen, galleryIndex, gallery.length]);

  const experienceItems = detail.participation.items.slice(0, 5).map((item, index) => ({
    title: item.title,
    summary: item.description,
    description: item.description,
    image: gallery[index] || gallery[0],
    note: detail.currentWork.paragraphs[index % Math.max(1, detail.currentWork.paragraphs.length)] || detail.participation.introduction,
  }));

  const practicalIcons = [
    <Footprints size={20} />, <CloudSun size={20} />, <Shirt size={20} />,
    <Backpack size={20} />, <Accessibility size={20} />, <ShieldCheck size={20} />,
  ];
  const participationNotes = detail.practical.items.slice(0, 6).map((item, index) => ({
    icon: practicalIcons[index % practicalIcons.length], title: item.title, copy: item.description,
  }));

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
        .activity-detail-page .activity-tags {
          position: relative;
          padding-bottom: 32px;
          border-bottom: 0;
        }
        .activity-detail-page .activity-tags::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 25%;
          height: 1px;
          background: #e1e1e1;
          transform: translateX(-50%);
        }
        .activity-detail-page .highlight-title { font-size: 15px; }
        .activity-detail-page .highlight-copy {
          font-size: 13px;
          line-height: 1.5;
        }
        .activity-detail-page .booking-label { font-size: 14px; }
        .activity-detail-page .booking-note,
        .activity-detail-page .activity-note { font-size: 12px; }
        .activity-detail-page .experience-section {
          background: #f7f7f7;
          padding: 92px 20px;
        }
        .activity-detail-page .experience-shell {
          width: min(1240px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(330px, .72fr);
          gap: clamp(48px, 6vw, 88px);
          align-items: start;
        }
        .activity-detail-page .experience-heading {
          margin: 0 0 34px;
          color: #111;
          font-family: ${SANS};
          font-size: clamp(34px, 3vw, 42px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -.025em;
        }
        .activity-detail-page .experience-list {
          display: grid;
          gap: 10px;
        }
        .activity-detail-page .experience-item {
          width: 100%;
          display: grid;
          grid-template-columns: 118px minmax(0, 1fr) 28px;
          gap: 24px;
          align-items: center;
          padding: 18px 0;
          border: 0;
          background: transparent;
          color: #111;
          text-align: left;
          cursor: pointer;
        }
        .activity-detail-page .experience-thumb {
          width: 118px;
          height: 88px;
          overflow: hidden;
          border-radius: 14px;
          background: #e7e7e7;
        }
        .activity-detail-page .experience-thumb img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform .35s ease;
        }
        .activity-detail-page .experience-item:hover .experience-thumb img { transform: scale(1.04); }
        .activity-detail-page .experience-item:hover .experience-item-title,
        .activity-detail-page .experience-item:hover .experience-arrow { color: #F5569B; }
        .activity-detail-page .experience-item-title {
          display: block;
          margin: 0 0 7px;
          font-size: 19px;
          font-weight: 700;
          line-height: 1.25;
          transition: color .2s ease;
        }
        .activity-detail-page .experience-item-copy {
          display: block;
          margin: 0;
          color: #696969;
          font-size: 14px;
          line-height: 1.5;
        }
        .activity-detail-page .experience-arrow { transition: color .2s ease; }
        .activity-detail-page .participation-card {
          position: sticky;
          top: 104px;
          padding: 30px;
          border-radius: 24px;
          background: #fff;
          box-shadow: 0 8px 30px rgba(0,0,0,.06);
        }
        .activity-detail-page .participation-title {
          margin: 0 0 8px;
          color: #111;
          font-size: 24px;
          line-height: 1.2;
        }
        .activity-detail-page .participation-intro {
          margin: 0 0 20px;
          color: #737373;
          font-size: 13px;
          line-height: 1.5;
        }
        .activity-detail-page .participation-note {
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 10px;
          padding: 13px 0;
        }
        .activity-detail-page .participation-note-icon { color: #F5569B; }
        .activity-detail-page .participation-note-title {
          margin: 0 0 2px;
          color: #222;
          font-size: 14px;
          font-weight: 700;
        }
        .activity-detail-page .participation-note-copy {
          margin: 0;
          color: #707070;
          font-size: 12px;
          line-height: 1.45;
        }
        .activity-detail-page .experience-modal {
          position: fixed;
          inset: 0;
          z-index: 1100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 50px 60px;
          background: rgba(255,255,255,.36);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .activity-detail-page .experience-dialog {
          position: relative;
          width: min(1360px, calc(100vw - 120px));
          height: min(700px, calc(100vh - 100px));
          display: grid;
          grid-template-columns: 68px minmax(0, 1.08fr) minmax(320px, .92fr);
          column-gap: 42px;
          padding: 18px;
          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
        }
        .activity-detail-page .experience-dialog::before {
          content: "";
          position: absolute;
          z-index: 0;
          top: 0;
          right: 0;
          bottom: 0;
          left: 112px;
          border-radius: 32px;
          background: rgba(255,255,255,.68);
          box-shadow: 0 18px 56px rgba(0,0,0,.12);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .activity-detail-page .experience-thumbs {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 13px;
        }
        .activity-detail-page .experience-thumb-button {
          width: 58px;
          height: 58px;
          padding: 0;
          overflow: hidden;
          border: 2px solid transparent;
          border-radius: 16px;
          background: #eee;
          cursor: pointer;
        }
        .activity-detail-page .experience-thumb-button.active { border-color: #111; }
        .activity-detail-page .experience-thumb-button img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
        .activity-detail-page .experience-main-image {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 24px;
          background: #eee;
        }
        .activity-detail-page .experience-main-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
        .activity-detail-page .experience-modal-copy {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 46px 34px;
          text-align: center;
        }
        .activity-detail-page .experience-modal-copy h3 {
          margin: 0 0 24px;
          color: #111;
          font-size: clamp(28px, 2.6vw, 40px);
          line-height: 1.18;
        }
        .activity-detail-page .experience-modal-copy p {
          margin: 0;
          color: #6d6d6d;
          font-size: 16px;
          line-height: 1.65;
        }
        .activity-detail-page .experience-modal-note {
          margin-top: 28px !important;
          padding-top: 0;
          color: #F5569B !important;
          font-size: 13px !important;
        }
        .activity-detail-page .experience-modal-close {
          position: absolute;
          z-index: 2;
          top: 20px;
          right: 20px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: #111;
          cursor: pointer;
        }
        .activity-detail-page .experience-modal-close:hover { background: #f2f2f2; }
        .activity-detail-page .story-purpose {
          padding: 118px 24px 126px;
          background: #fff;
        }
        .activity-detail-page .story-purpose-shell {
          width: min(1240px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.02fr) minmax(360px, .82fr);
          gap: clamp(76px, 8vw, 126px);
          align-items: center;
        }
        .activity-detail-page .story-purpose-images {
          position: relative;
          min-height: 650px;
          padding: 0 68px 68px 0;
        }
        .activity-detail-page .story-purpose-main {
          width: 88%;
          height: 610px;
          display: block;
          object-fit: cover;
          border-radius: 28px;
        }
        .activity-detail-page .story-purpose-inset {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 48%;
          aspect-ratio: 4 / 3;
          display: block;
          object-fit: cover;
          border: 10px solid #fff;
          border-radius: 24px;
          box-shadow: 0 18px 44px rgba(0,0,0,.12);
        }
        .activity-detail-page .story-kicker {
          margin: 0 0 20px;
          color: #F5569B;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .activity-detail-page .story-heading {
          margin: 0 0 30px;
          color: #111;
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -.035em;
        }
        .activity-detail-page .story-copy p {
          margin: 0 0 19px;
          color: #5f6367;
          font-size: 17px;
          line-height: 1.72;
        }
        .activity-detail-page .story-pullquote {
          margin: 34px 0 0;
          padding-left: 22px;
          border-left: 3px solid #F5569B;
          color: #171717;
          font-size: 20px;
          font-weight: 600;
          line-height: 1.5;
        }
        .activity-detail-page .place-story {
          padding: 110px 24px 122px;
          background: #f6f6f6;
        }
        .activity-detail-page .place-story-shell {
          width: min(1440px, 100%);
          margin: 0 auto;
        }
        .activity-detail-page .place-figure {
          width: 88%;
          margin: 0;
        }
        .activity-detail-page .place-image-wrap {
          width: 100%;
          aspect-ratio: 2.55 / 1;
          overflow: hidden;
          background: #e9e9e9;
        }
        .activity-detail-page .place-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 58%;
        }
        .activity-detail-page .place-editorial {
          width: 88%;
          margin-top: 48px;
          display: grid;
          grid-template-columns: minmax(260px, .72fr) minmax(0, 1.28fr);
          gap: clamp(60px, 8vw, 130px);
          align-items: start;
        }
        .activity-detail-page .place-header {
          margin: 0;
          text-align: left;
        }
        .activity-detail-page .place-header .story-heading {
          max-width: 410px;
          margin-bottom: 0;
          font-size: clamp(34px, 3.5vw, 50px);
        }
        .activity-detail-page .place-deck {
          margin: 0 0 25px;
          color: #5d6165;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.6;
        }
        .activity-detail-page .place-columns {
          margin: 0;
        }
        .activity-detail-page .place-columns p {
          margin: 0 0 18px;
          color: #5f6367;
          font-size: 16px;
          line-height: 1.78;
        }
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
          .activity-detail-page .experience-section { padding: 64px 14px; }
          .activity-detail-page .experience-shell { display: block; }
          .activity-detail-page .experience-heading { margin-bottom: 26px; }
          .activity-detail-page .experience-item {
            grid-template-columns: 92px minmax(0,1fr) 22px;
            gap: 14px;
          }
          .activity-detail-page .experience-thumb { width: 92px; height: 76px; }
          .activity-detail-page .experience-item-title { font-size: 16px; }
          .activity-detail-page .experience-item-copy { font-size: 12px; }
          .activity-detail-page .participation-card { position: static; margin-top: 38px; padding: 24px; }
          .activity-detail-page .experience-modal { padding: 0; }
          .activity-detail-page .experience-dialog {
            width: 100vw;
            height: 100dvh;
            display: flex;
            flex-direction: column;
            gap: 14px;
            padding: 16px;
            border-radius: 0;
          }
          .activity-detail-page .experience-dialog::before {
            left: 0;
            border-radius: 0;
          }
          .activity-detail-page .experience-thumbs {
            order: 2;
            flex-direction: row;
            justify-content: flex-start;
            overflow-x: auto;
          }
          .activity-detail-page .experience-thumb-button { flex: 0 0 58px; width: 58px; height: 58px; }
          .activity-detail-page .experience-main-image { height: 43dvh; flex: 0 0 43dvh; border-radius: 20px; }
          .activity-detail-page .experience-modal-copy {
            order: 3;
            display: block;
            overflow-y: auto;
            padding: 16px 8px 28px;
            text-align: left;
          }
          .activity-detail-page .experience-modal-copy h3 { margin-bottom: 12px; padding-right: 44px; font-size: 26px; }
          .activity-detail-page .experience-modal-copy p { font-size: 14px; }
          .activity-detail-page .experience-modal-close { top: 20px; right: 20px; background: #fff; }
          .activity-detail-page .story-purpose { padding: 74px 20px 82px; }
          .activity-detail-page .story-purpose-shell { display: block; }
          .activity-detail-page .story-purpose-images { min-height: 0; margin-bottom: 72px; padding: 0 36px 40px 0; }
          .activity-detail-page .story-purpose-main { width: 92%; height: auto; aspect-ratio: 4 / 5; border-radius: 20px; }
          .activity-detail-page .story-purpose-inset { width: 48%; border-width: 7px; border-radius: 18px; }
          .activity-detail-page .story-heading { font-size: 36px; }
          .activity-detail-page .story-copy p { font-size: 15px; line-height: 1.68; }
          .activity-detail-page .story-pullquote { font-size: 18px; }
          .activity-detail-page .place-story { padding: 72px 14px 82px; }
          .activity-detail-page .place-figure,
          .activity-detail-page .place-editorial { width: 92%; }
          .activity-detail-page .place-image-wrap { aspect-ratio: 1.72 / 1; }
          .activity-detail-page .place-editorial { display: block; margin-top: 34px; }
          .activity-detail-page .place-header { margin: 0 0 30px; }
          .activity-detail-page .place-header .story-heading { font-size: 34px; }
          .activity-detail-page .place-deck { font-size: 16px; }
          .activity-detail-page .place-columns p { font-size: 15px; line-height: 1.7; }
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
              <span className="activity-tag">{content.activity.groupSize}</span>
              <span className="activity-tag">{content.activity.dateLabel}</span>
            </div>
            <div className="highlights">
              <Highlight
                icon={isBuildActivity ? <Hammer size={19} /> : <Leaf size={19} />}
                title={content.activity.type}
                copy={detail.currentWork.title}
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
                <p className="booking-label">{content.activity.registrationLabel}</p>
                <p className="booking-note">{content.activity.statusLabel}</p>
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

        {detail.roles.items.length > 0 && <div className="participation-roles">
          <style>{`
            .activity-detail-page .participation-roles{margin-top:68px;padding-top:34px}.activity-detail-page .roles-intro{margin-bottom:30px}.activity-detail-page .roles-kicker{margin:0 0 12px;color:#F5569B;font:700 11px/1.3 ${SANS};letter-spacing:.18em;text-transform:uppercase}.activity-detail-page .roles-title{margin:0;color:#151515;font-family:${DISPLAY};font-size:clamp(38px,4vw,54px);font-weight:400;letter-spacing:.035em;line-height:1;text-transform:uppercase}.activity-detail-page .roles-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}.activity-detail-page .role-card{min-height:150px;padding:19px 18px 18px;border-radius:14px;background:#f6f6f6;transition:background .25s ease,transform .25s ease}.activity-detail-page .role-card:hover{background:#f0f0f0;transform:translateY(-2px)}.activity-detail-page .role-icon{width:33px;height:33px;margin-bottom:17px;color:#F5569B;display:flex;align-items:center;justify-content:flex-start;transition:transform .25s ease}.activity-detail-page .role-card:hover .role-icon{transform:translateY(-2px)}.activity-detail-page .role-card-title{margin:0 0 7px;color:#202020;font:650 14px/1.3 ${SANS}}.activity-detail-page .role-card-copy{margin:0;color:#6c7074;font:400 11px/1.45 ${SANS}}.activity-detail-page .roles-footer{display:flex;align-items:center;justify-content:space-between;gap:30px;margin-top:27px;padding:0 2px}.activity-detail-page .roles-footer p{margin:0;color:#F5569B;font:600 13px/1.5 ${SANS}}.activity-detail-page .roles-link{color:#202020;font:700 12px/1.4 ${SANS};letter-spacing:.08em;text-decoration:none;text-transform:uppercase;white-space:nowrap;transition:color .2s ease}.activity-detail-page .roles-link:hover{color:#F5569B}@media(max-width:980px){.activity-detail-page .roles-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:800px){.activity-detail-page .participation-roles{margin-top:54px;padding-top:24px}.activity-detail-page .roles-intro{margin-bottom:26px}.activity-detail-page .roles-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.activity-detail-page .role-card{min-height:164px;padding:18px 15px 16px}.activity-detail-page .role-icon{margin-bottom:17px}.activity-detail-page .roles-footer{align-items:flex-start;flex-direction:column;gap:14px;margin-top:24px}}
          `}</style>
          <div className="roles-intro">
            <div>
              <p className="roles-kicker">{detail.roles.eyebrow}</p>
              <h2 className="roles-title">{detail.roles.title}</h2>
            </div>
          </div>

          <div className="roles-grid">
            {detail.roles.items.map(role => {
              const Icon = ROLE_ICONS[role.icon as keyof typeof ROLE_ICONS] || HandHeart;
              return (
                <article className="role-card" key={role.title}>
                  <span className="role-icon" aria-hidden="true">
                    <Icon size={26} strokeWidth={1.7} />
                  </span>
                  <h3 className="role-card-title">{role.title}</h3>
                  <p className="role-card-copy">{role.description}</p>
                </article>
              );
            })}
          </div>

          <div className="roles-footer">
            <p>{detail.roles.footer}</p>
            <Link href={content.activity.registrationHref} className="roles-link">
              {detail.roles.linkLabel}
            </Link>
          </div>
        </div>}
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
            {content.activity.type} / {content.activity.location}
          </div>
        </div>
      )}

      <section className="experience-section">
        <div className="experience-shell">
          <div>
            <h2 className="experience-heading">What You’ll Experience</h2>
            <div className="experience-list">
              {experienceItems.map((item, index) => (
                <button
                  type="button"
                  className="experience-item"
                  key={item.title}
                  onClick={() => setExperienceIndex(index)}
                >
                  <span className="experience-thumb">
                    <img
                      src={item.image}
                      alt=""
                      style={{ objectPosition: getObjectPosition(item.image) }}
                    />
                  </span>
                  <span>
                    <span className="experience-item-title">{item.title}</span>
                    <span className="experience-item-copy">{item.summary}</span>
                  </span>
                  <ChevronRight className="experience-arrow" size={22} />
                </button>
              ))}
            </div>
          </div>

          <aside className="participation-card">
            <h3 className="participation-title">Before you join</h3>
            <p className="participation-intro">
              {detail.practical.introduction}
            </p>
            {participationNotes.map(item => (
              <div className="participation-note" key={item.title}>
                <span className="participation-note-icon">{item.icon}</span>
                <div>
                  <p className="participation-note-title">{item.title}</p>
                  <p className="participation-note-copy">{item.copy}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      {experienceIndex !== null && (
        <div
          className="experience-modal"
          role="dialog"
          aria-modal="true"
          aria-label={experienceItems[experienceIndex].title}
        >
          <div className="experience-dialog">
            <button
              type="button"
              className="experience-modal-close"
              onClick={() => setExperienceIndex(null)}
              aria-label="Close experience detail"
            >
              <X size={24} />
            </button>

            <div className="experience-thumbs" aria-label="Experience steps">
              {experienceItems.map((item, index) => (
                <button
                  type="button"
                  className={`experience-thumb-button${index === experienceIndex ? " active" : ""}`}
                  key={item.title}
                  onClick={() => setExperienceIndex(index)}
                  aria-label={`Show ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt=""
                    style={{ objectPosition: getObjectPosition(item.image) }}
                  />
                </button>
              ))}
            </div>

            <div className="experience-main-image">
              <img
                src={experienceItems[experienceIndex].image}
                alt={experienceItems[experienceIndex].title}
                style={{
                  objectPosition: getObjectPosition(
                    experienceItems[experienceIndex].image
                  ),
                }}
              />
            </div>

            <div className="experience-modal-copy">
              <h3>{experienceItems[experienceIndex].title}</h3>
              <p>{experienceItems[experienceIndex].description}</p>
              <p className="experience-modal-note">
                {experienceItems[experienceIndex].note}
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="story-purpose">
        <div className="story-purpose-shell">
          <div className="story-purpose-images">
            <img
              className="story-purpose-main"
              src={detail.purposeStory.mainImage}
              alt={detail.purposeStory.title}
            />
            <img
              className="story-purpose-inset"
              src={detail.purposeStory.insetImage || detail.purposeStory.mainImage}
              alt=""
            />
          </div>
          <div className="story-copy">
            <p className="story-kicker">{detail.purposeStory.eyebrow}</p>
            <h2 className="story-heading">{detail.purposeStory.title}</h2>
            {detail.purposeStory.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <blockquote className="story-pullquote">
              {detail.purposeStory.quote}
            </blockquote>
          </div>
        </div>
      </section>

      <section className="place-story">
        <div className="place-story-shell">
          <figure className="place-figure">
            <div className="place-image-wrap">
              <img
                className="place-image"
                src={detail.placeStory.image}
                alt={detail.placeStory.title}
              />
            </div>
          </figure>

          <div className="place-editorial">
            <div className="place-header">
              <p className="story-kicker">{detail.placeStory.eyebrow}</p>
              <h2 className="story-heading">{detail.placeStory.title}</h2>
            </div>
            <div>
              <p className="place-deck">
                {detail.placeStory.introduction}
              </p>
              <div className="place-columns">
                <p>
                  {detail.placeStory.paragraphs[0]}
                </p>
                <p>
                  {detail.placeStory.paragraphs.slice(1).join(" ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ActivityRecommendations currentTitle={content.hero.title} />

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
        {ctaTexture && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${ctaTexture})`,
              backgroundRepeat: "repeat",
              backgroundSize: "420px 420px",
              opacity: ctaTextureOpacity,
              filter: "contrast(1.45) brightness(1.08)",
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

const ACTIVITY_RECOMMENDATIONS = [
  {
    title: "Pick Tea With Local Growers",
    category: "People & culture",
    duration: "Half or full day",
    detail: "Seasonal · By arrangement",
    image: "/images/explore/tea-with-growers/YT-21-learning-to-pick.png",
    href: "/explore/activity/pick-tea-with-local-growers",
  },
  {
    title: "A Day Along the Village Paths",
    category: "Village life",
    duration: "3–5 hours",
    detail: "Small groups",
    image: "/images/our-way-of-travel/entering-village.jpg",
    href: "/explore",
  },
  {
    title: "Walk Into the Forest Together",
    category: "Nature & landscape",
    duration: "Half day",
    detail: "Gentle pace",
    image: "/images/stories/into-the-forest-together/group-in-forest.jpg",
    href: "/explore",
  },
  {
    title: "Follow Water Through the Valley",
    category: "Nature & landscape",
    duration: "4 hours",
    detail: "Weather dependent",
    image: "/images/our-way-of-travel/waterfall.jpg",
    href: "/explore",
  },
  {
    title: "Prepare and Share a Village Meal",
    category: "People & culture",
    duration: "Half day",
    detail: "By arrangement",
    image: "/images/what-we-believe/preparing-together.jpg",
    href: "/explore",
  },
  {
    title: "Meet the Hands Behind Local Clay",
    category: "People & culture",
    duration: "2–3 hours",
    detail: "Small groups",
    image: "/images/stories/the-rhythm-of-clay/craftsman-with-lids.jpg",
    href: "/explore",
  },
];

function ActivityRecommendations({ currentTitle }: { currentTitle: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const draggedRef = useRef(false);
  const activePointerRef = useRef<number | null>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const cancelMotion = () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  };

  const updateArrows = () => {
    const track = trackRef.current;
    if (!track) return;
    setShowLeft(track.scrollLeft > 3);
    setShowRight(track.scrollLeft < track.scrollWidth - track.clientWidth - 3);
  };

  const beginInertia = () => {
    const track = trackRef.current;
    if (!track) return;
    const step = () => {
      velocityRef.current *= 0.92;
      if (Math.abs(velocityRef.current) < 0.45) {
        velocityRef.current = 0;
        frameRef.current = null;
        updateArrows();
        return;
      }
      const before = track.scrollLeft;
      track.scrollLeft -= velocityRef.current;
      updateArrows();
      if (track.scrollLeft === before) {
        frameRef.current = null;
        return;
      }
      frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
  };

  const beginDrag = (pageX: number) => {
    cancelMotion();
    draggingRef.current = true;
    draggedRef.current = false;
    startXRef.current = pageX;
    startScrollRef.current = trackRef.current?.scrollLeft ?? 0;
    lastXRef.current = pageX;
    velocityRef.current = 0;
  };

  const moveDrag = (pageX: number) => {
    if (!draggingRef.current || !trackRef.current) return;
    const distance = pageX - startXRef.current;
    velocityRef.current = pageX - lastXRef.current;
    lastXRef.current = pageX;
    if (Math.abs(distance) > 4) draggedRef.current = true;
    trackRef.current.scrollLeft = startScrollRef.current - distance;
    updateArrows();
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    activePointerRef.current = null;
    beginInertia();
  };

  const scrollBy = (distance: number) => {
    cancelMotion();
    trackRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  useEffect(() => {
    updateArrows();
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelMotion();
    };
  }, []);

  return (
    <section className="activity-recommendations">
      <style>{`
        .activity-detail-page .activity-recommendations{position:relative;padding:92px 0 102px;background:#fff;overflow:hidden}.activity-detail-page .recommendation-heading{width:min(1240px,calc(100% - 80px));margin:0 auto 38px}.activity-detail-page .recommendation-kicker{margin:0 0 12px;color:#F5569B;font:700 11px/1.3 ${SANS};letter-spacing:.18em;text-transform:uppercase}.activity-detail-page .recommendation-title{margin:0;color:#151515;font-family:${DISPLAY};font-size:clamp(38px,4vw,54px);font-weight:400;letter-spacing:.035em;line-height:1;text-transform:uppercase}.activity-detail-page .recommendation-track{width:100%;overflow-x:auto;overflow-y:hidden;cursor:grab;user-select:none;touch-action:pan-y;overscroll-behavior-x:contain;scrollbar-width:none;-webkit-overflow-scrolling:touch}.activity-detail-page .recommendation-track.is-dragging{cursor:grabbing}.activity-detail-page .recommendation-track::-webkit-scrollbar{display:none}.activity-detail-page .recommendation-row{display:flex;width:max-content;gap:24px;padding:0 max(40px,calc((100vw - 1240px)/2)) 8px}.activity-detail-page .recommendation-card{display:block;width:350px;flex:0 0 350px;color:inherit;text-decoration:none;-webkit-user-drag:none}.activity-detail-page .recommendation-image{width:100%;aspect-ratio:1.08/1;overflow:hidden;border-radius:28px;background:#eee}.activity-detail-page .recommendation-image img{width:100%;height:100%;display:block;object-fit:cover;pointer-events:none;-webkit-user-drag:none;transition:transform .45s ease}.activity-detail-page .recommendation-card:hover .recommendation-image img{transform:scale(1.025)}.activity-detail-page .recommendation-copy{padding:18px 4px 0}.activity-detail-page .recommendation-card-title{margin:0 0 8px;color:#1d1d1d;font:600 20px/1.28 ${SANS};letter-spacing:-.015em}.activity-detail-page .recommendation-meta{margin:0 0 5px;color:#6a6a6a;font:500 13px/1.4 ${SANS}}.activity-detail-page .recommendation-detail{margin:0;color:#333;font:600 13px/1.4 ${SANS}}.activity-detail-page .recommendation-arrow{position:absolute;top:54%;z-index:5;width:40px;height:40px;border:0;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.45);color:#fff;cursor:pointer;transition:background .2s ease,opacity .2s ease}.activity-detail-page .recommendation-arrow:hover{background:rgba(0,0,0,.72)}.activity-detail-page .recommendation-arrow.left{left:16px}.activity-detail-page .recommendation-arrow.right{right:16px}@media(max-width:800px){.activity-detail-page .activity-recommendations{padding:72px 0 78px}.activity-detail-page .recommendation-heading{width:calc(100% - 40px);margin-bottom:28px}.activity-detail-page .recommendation-title{font-size:38px}.activity-detail-page .recommendation-row{gap:16px;padding-left:20px;padding-right:20px}.activity-detail-page .recommendation-card{width:78vw;flex-basis:78vw}.activity-detail-page .recommendation-image{border-radius:22px}.activity-detail-page .recommendation-arrow{display:none}}
      `}</style>
      <div className="recommendation-heading">
        <p className="recommendation-kicker">Explore More</p>
        <h2 className="recommendation-title">More Ways to Take Part</h2>
      </div>

      <button
        type="button"
        className="recommendation-arrow left"
        style={{ opacity: showLeft ? 1 : 0, pointerEvents: showLeft ? "auto" : "none" }}
        onClick={() => scrollBy(-Math.min(window.innerWidth * 0.72, 720))}
        aria-label="Scroll recommendations left"
      >
        <ChevronLeft size={20} strokeWidth={2} />
      </button>

      <div
        ref={trackRef}
        className="recommendation-track"
        onScroll={updateArrows}
        onPointerDown={(event: ReactPointerEvent<HTMLDivElement>) => {
          if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
          activePointerRef.current = event.pointerId;
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.classList.add("is-dragging");
          beginDrag(event.clientX);
        }}
        onPointerMove={(event: ReactPointerEvent<HTMLDivElement>) => {
          if (!draggingRef.current || activePointerRef.current !== event.pointerId) return;
          if (event.pointerType === "mouse") event.preventDefault();
          moveDrag(event.clientX);
        }}
        onPointerUp={(event: ReactPointerEvent<HTMLDivElement>) => {
          if (activePointerRef.current !== event.pointerId) return;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          event.currentTarget.classList.remove("is-dragging");
          endDrag();
        }}
        onPointerCancel={(event: ReactPointerEvent<HTMLDivElement>) => {
          event.currentTarget.classList.remove("is-dragging");
          endDrag();
        }}
        onClickCapture={event => {
          if (!draggedRef.current) return;
          event.preventDefault();
          event.stopPropagation();
          draggedRef.current = false;
        }}
      >
        <div className="recommendation-row">
          {ACTIVITY_RECOMMENDATIONS.filter(item => item.title !== currentTitle).map(item => (
            <Link href={item.href} className="recommendation-card" key={item.title}>
              <div className="recommendation-image">
                <img src={item.image} alt={item.title} draggable={false} />
              </div>
              <div className="recommendation-copy">
                <h3 className="recommendation-card-title">{item.title}</h3>
                <p className="recommendation-meta">{item.category} · {item.duration}</p>
                <p className="recommendation-detail">{item.detail}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="recommendation-arrow right"
        style={{ opacity: showRight ? 1 : 0, pointerEvents: showRight ? "auto" : "none" }}
        onClick={() => scrollBy(Math.min(window.innerWidth * 0.72, 720))}
        aria-label="Scroll recommendations right"
      >
        <ChevronRight size={20} strokeWidth={2} />
      </button>
    </section>
  );
}
