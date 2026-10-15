import { useEffect, useMemo, useState } from 'react';
import { Link, useRoute } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ExploreActivityDetail from '@/components/ExploreActivityDetail';
import { useMediaObjectPosition } from '@/lib/media-position';
import { trpc } from '@/lib/trpc';
import { EXPLORE_CATEGORIES, exploreCategorySlug, normalizeExplorePage, type ExploreCategory, type ExplorePageContent } from '@shared/explore';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";
const ACCENT = '#F5569B';
const slugCategory = Object.fromEntries(Object.entries(exploreCategorySlug).map(([name, slug]) => [slug, name])) as Record<string, ExploreCategory>;
const categoryCopy: Record<ExploreCategory,{kicker:string;description:string}> = {
  'Village Life': { kicker:'Homes / Food / Everyday Work', description:'Take part in the practical rhythms of village life—from caring for existing spaces to sharing work, food and ordinary time.' },
  'Nature & Landscape': { kicker:'Forests / Water / Care', description:'Join work that helps people observe, understand and care for the landscapes that shape life around the village.' },
  'People & Culture': { kicker:'Craft / Knowledge / Seasons', description:'Learn alongside people whose skills, materials and seasonal practices continue through everyday use.' },
};
type Activity = { slug:string; title:string; content:ExplorePageContent };
type ActivityPreview = { id:string; title:string; category:ExploreCategory; status:string; excerpt:string; image:string; href:string; sample?:boolean };
const BUILD_SLUG='build-with-what-is-already-here';
const BUILD_ARCHIVE_IMAGE='/images/explore/build-together/reference/02-opening-work.jpg';
const EXPLORE_BANNER='/images/our-way-of-travel/bamboo-trail-group.jpg';
const SAMPLE_ACTIVITIES:ActivityPreview[]=[
  {id:'sample-village-tea',title:'Pick Tea With a Mountain Family',category:'Village Life',status:'Seasonal · By Arrangement',excerpt:'Follow the rhythm of a tea-growing day and learn how leaves move from hillside to cup.',image:'/images/explore/build-together/place/yaan-tea-landscape.jpg',href:'/join-us/contact',sample:true},
  {id:'sample-village-day',title:'Share a Day of Village Life',category:'Village Life',status:'Ongoing · Small Groups',excerpt:'Walk familiar paths, prepare food and spend unhurried time within the ordinary life of the village.',image:'/images/our-way-of-travel/entering-village.jpg',href:'/join-us/contact',sample:true},
  {id:'sample-nature-forest',title:'Walk Into the Forest Together',category:'Nature & Landscape',status:'Seasonal · Half Day',excerpt:'Enter the mountain forest slowly, noticing its plants, water, changing light and local knowledge.',image:'/images/stories/into-the-forest-together/group-in-forest.jpg',href:'/join-us/contact',sample:true},
  {id:'sample-nature-water',title:'Follow Water Through the Valley',category:'Nature & Landscape',status:'Weather Dependent',excerpt:'Trace the relationship between rainfall, forest, cultivated land and the villages below.',image:'/images/our-way-of-travel/waterfall.jpg',href:'/join-us/contact',sample:true},
  {id:'sample-nature-land',title:'Read the Mountain Landscape',category:'Nature & Landscape',status:'Flexible · By Arrangement',excerpt:'Look across tea slopes, cloud seas and working land to understand how altitude shapes everyday life.',image:'/images/explore/build-together/place/yaan-mountain-panorama.jpg',href:'/join-us/contact',sample:true},
  {id:'sample-culture-clay',title:'Meet the Hands Behind Local Clay',category:'People & Culture',status:'Small Groups · 3 Hours',excerpt:'Spend time with practiced hands and learn how useful objects carry technique, memory and place.',image:'/images/stories/the-rhythm-of-clay/craftsman-with-lids.jpg',href:'/join-us/contact',sample:true},
  {id:'sample-culture-table',title:'Cook and Share a Village Meal',category:'People & Culture',status:'By Arrangement · Half Day',excerpt:'Prepare a meal together and discover how recipes, ingredients and hospitality hold local stories.',image:'/images/what-we-believe/preparing-together.jpg',href:'/join-us/contact',sample:true},
  {id:'sample-culture-pattern',title:'Make a Pattern Together',category:'People & Culture',status:'Workshop · Small Groups',excerpt:'Learn through repetition, material and conversation while making something collectively.',image:'/images/stories/a-pattern-made-together/working-together.jpg',href:'/join-us/contact',sample:true},
];

function toPreview(item:Activity):ActivityPreview{
  const category=item.content.activityDetail?.category??'Village Life';
  return {id:item.slug,title:item.title,category,status:item.content.activity.statusLabel,excerpt:item.content.activityDetail?.excerpt??item.content.hero.subtitle,image:item.slug===BUILD_SLUG?BUILD_ARCHIVE_IMAGE:(item.content.homepageCard.image||item.content.hero.image),href:`/explore/activity/${item.slug}`};
}

export default function ExplorePage() {
  const [, activityParams] = useRoute('/explore/activity/:slug');
  const [, legacyParams] = useRoute('/explore/:category');
  const {data:sections=[],isLoading}=trpc.explore.listPublicSections.useQuery();
  const activities = useMemo<Activity[]>(()=>sections.map(section=>({slug:section.slug,title:section.title,content:normalizeExplorePage(section.pageContent,section.slug)})).filter(item=>item.content.activity.enabled),[sections]);
  const requestedSlug = activityParams?.slug || legacyParams?.category;
  const activity = requestedSlug ? activities.find(item=>item.slug===requestedSlug) : undefined;
  const selectedCategory = !activity && legacyParams?.category ? slugCategory[legacyParams.category] : undefined;
  if(isLoading)return <div className="min-h-screen bg-white"><Navigation/></div>;
  if(activity)return <ExploreActivityDetail content={activity.content}/>;
  if(legacyParams?.category&&!selectedCategory)return <><Navigation/><main style={{minHeight:'70vh',padding:'180px 24px',textAlign:'center'}}><h1>Explore page not found</h1></main><Footer/></>;
  return <ExploreIndex activities={activities} selectedCategory={selectedCategory}/>;
}

function ExploreIndex({activities,selectedCategory}:{activities:Activity[];selectedCategory?:ExploreCategory}){
  const position=useMediaObjectPosition();
  const isOverview=!selectedCategory;
  const [currentSection,setCurrentSection]=useState<ExploreCategory>('Village Life');
  const realPreviews=activities.map(toPreview);
  const previewsFor=(category:ExploreCategory)=>{
    const real=realPreviews.filter(item=>item.category===category);
    const samples=SAMPLE_ACTIVITIES.filter(item=>item.category===category&&!real.some(entry=>entry.title===item.title));
    return [...real,...samples].slice(0,isOverview?3:9);
  };
  const title=selectedCategory||'Explore';
  const intro=selectedCategory?categoryCopy[selectedCategory].description:'Ways to take part in the work, seasons and everyday life of rural communities—shaped around what is happening locally and what participants hope to understand or contribute.';
  useEffect(()=>{
    if(!isOverview)return;
    const sections=EXPLORE_CATEGORIES.map(category=>document.getElementById(exploreCategorySlug[category])).filter(Boolean) as HTMLElement[];
    const observer=new IntersectionObserver(entries=>{
      const active=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(active)setCurrentSection(slugCategory[active.target.id]);
    },{rootMargin:'-28% 0px -55% 0px',threshold:[0,.2,.5]});
    sections.forEach(section=>observer.observe(section));
    return()=>observer.disconnect();
  },[isOverview]);
  const scrollToCategory=(category:ExploreCategory)=>{
    setCurrentSection(category);
    document.getElementById(exploreCategorySlug[category])?.scrollIntoView({behavior:'smooth',block:'start'});
  };
  return <div className="explore-index" style={{fontFamily:SANS,background:'#fff',color:'#000'}}>
    <style>{`
      .explore-index .wrap{width:min(1320px,calc(100% - 64px));margin:0 auto}.explore-index .display{font-family:${DISPLAY};font-weight:400;letter-spacing:.045em;line-height:.92;text-transform:uppercase;color:#050505}.explore-index .eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}.explore-index .summary{font-size:16px;line-height:1.65;letter-spacing:.025em;color:#5c5c5c}.explore-index a{text-decoration:none;color:inherit}.explore-index .image{display:block;width:100%;height:100%;object-fit:cover}.explore-index .explore-intro{padding-bottom:clamp(54px,6.5vw,84px)}.explore-index .explore-banner{height:clamp(330px,43vw,570px);margin-top:clamp(42px,5vw,68px);overflow:hidden;background:#ededed}.explore-index .tabs{display:flex;justify-content:center;gap:clamp(26px,5vw,72px);overflow-x:auto;scrollbar-width:none}.explore-index .tabs::-webkit-scrollbar{display:none}.explore-index .tab{white-space:nowrap;padding:0 0 13px;border:0;border-bottom:3px solid transparent;background:none;color:#111;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;transition:color .2s ease,border-color .2s ease}.explore-index .tab:hover{color:#777}.explore-index .tab.active{color:${ACCENT};border-bottom-color:${ACCENT}}.explore-index .category-section{padding:clamp(105px,11vw,150px) 0;scroll-margin-top:70px}.explore-index .category-section:nth-of-type(odd){background:#f5f5f5}.explore-index .category-section:nth-of-type(even){background:#fff}.explore-index .category-head{display:grid;grid-template-columns:1fr .75fr;gap:32px;align-items:end;margin-bottom:58px}.explore-index .activity-link{display:block}.explore-index .activity-frame{overflow:hidden;background:#ededed}.explore-index .activity-frame img{transition:transform .45s ease,filter .3s ease}.explore-index .activity-link:hover .activity-frame img{transform:scale(1.02);filter:brightness(.93)}.explore-index .activity-title{color:#111;font-size:clamp(25px,2.7vw,38px);line-height:1.17;font-weight:500;margin:0 0 13px;transition:color .2s ease}.explore-index .activity-link:hover .activity-title{color:#6f6f6f}.explore-index .activity-meta{color:${ACCENT};margin:20px 0 10px}.explore-index .activity-action{color:${ACCENT};margin:0}.explore-index .village-layout{display:grid;grid-template-columns:minmax(0,1.58fr) minmax(300px,.92fr);gap:32px;align-items:start}.explore-index .village-main .activity-frame{aspect-ratio:1.08/1}.explore-index .village-side{display:grid;gap:44px}.explore-index .village-side .activity-frame{aspect-ratio:16/9}.explore-index .village-side .summary{display:none}.explore-index .nature-top{display:grid;grid-template-columns:minmax(0,1.58fr) minmax(280px,.92fr);gap:32px;align-items:start}.explore-index .nature-top>article:first-child .activity-frame{aspect-ratio:4/3}.explore-index .nature-top>article:nth-child(2){margin-top:64px}.explore-index .nature-top>article:nth-child(2) .activity-frame{aspect-ratio:3/4}.explore-index .nature-wide{width:79%;margin-top:74px}.explore-index .nature-wide .activity-frame{aspect-ratio:2/1}.explore-index .people-layout{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;align-items:start}.explore-index .people-layout .activity-frame{aspect-ratio:3/4}.explore-index .people-layout>article:nth-child(2){margin-top:58px}.explore-index .people-layout>article:nth-child(3){margin-top:116px}.explore-index .view-more{display:inline-flex;align-items:center;gap:9px;margin-top:58px;padding-bottom:7px;border-bottom:1px solid ${ACCENT};color:${ACCENT};font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;transition:opacity .2s ease}.explore-index .view-more:hover{opacity:.62}@media(max-width:767px){.explore-index .wrap{width:calc(100% - 40px)}.explore-index .explore-intro{padding-bottom:48px}.explore-index .explore-banner{height:280px;margin-top:38px}.explore-index .tabs{justify-content:flex-start;gap:27px}.explore-index .category-section{padding:76px 0}.explore-index .category-head{display:block;margin-bottom:42px}.explore-index .category-head .summary{margin-top:24px!important}.explore-index .village-layout,.explore-index .nature-top,.explore-index .people-layout{display:block}.explore-index .village-side{display:block}.explore-index .activity-card{margin:0 0 46px!important}.explore-index .activity-frame,.explore-index .village-main .activity-frame,.explore-index .village-side .activity-frame,.explore-index .nature-top>article:first-child .activity-frame,.explore-index .nature-top>article:nth-child(2) .activity-frame,.explore-index .nature-wide .activity-frame,.explore-index .people-layout .activity-frame{height:auto;aspect-ratio:4/3}.explore-index .village-side .summary{display:block}.explore-index .nature-wide{width:100%;margin-top:0}.explore-index .view-more{margin-top:4px}}
    `}</style>
    <Navigation/>
    <main style={{paddingTop:'clamp(128px,14vw,190px)'}}>
      <header className="wrap explore-intro"><p className="eyebrow" style={{color:ACCENT,margin:'0 0 22px'}}>Participation / Rural China</p><div className="grid md:grid-cols-[1.2fr_.8fr] gap-8 items-end"><h1 className="display" style={{fontSize:'clamp(74px,12vw,168px)',margin:0}}>{title}</h1><p className="summary" style={{margin:'0 0 10px',maxWidth:560}}>{intro}</p></div>{isOverview&&<div className="explore-banner"><img src={EXPLORE_BANNER} alt="Walking together through a bamboo forest" className="image" style={{objectPosition:position(EXPLORE_BANNER)}}/></div>}</header>
      {isOverview?<nav className="wrap tabs" aria-label="Explore categories" style={{paddingBottom:34}}>{EXPLORE_CATEGORIES.map(category=><button type="button" className={`tab ${currentSection===category?'active':''}`} onClick={()=>scrollToCategory(category)} key={category}>{category}</button>)}</nav>:<nav className="wrap tabs" aria-label="Explore categories" style={{paddingBottom:34}}>{EXPLORE_CATEGORIES.map(category=><Link href={`/explore/${exploreCategorySlug[category]}`} className={`tab ${selectedCategory===category?'active':''}`} key={category}>{category}</Link>)}</nav>}
      {isOverview?EXPLORE_CATEGORIES.map((category,index)=>{
        const items=previewsFor(category);
        return <section id={exploreCategorySlug[category]} className="category-section" key={category}><div className="wrap"><div className="category-head"><div><p className="eyebrow" style={{color:ACCENT,margin:'0 0 17px'}}>0{index+1} / {categoryCopy[category].kicker}</p><h2 className="display" style={{fontSize:'clamp(54px,8vw,106px)',margin:0}}>{category}</h2></div><p className="summary" style={{margin:'0 0 8px'}}>{categoryCopy[category].description}</p></div><ActivityList category={category} items={items} position={position}/><Link href={`/explore/${exploreCategorySlug[category]}`} className="view-more">View More {category} <span>↗</span></Link></div></section>;
      }):<section className="category-section"><div className="wrap"><div className="category-head"><div><p className="eyebrow" style={{color:ACCENT,margin:'0 0 17px'}}>Ongoing / By Arrangement</p><h2 className="display" style={{fontSize:'clamp(54px,8vw,106px)',margin:0}}>Ways to Take Part</h2></div><p className="summary" style={{margin:'0 0 8px'}}>Activities remain flexible rather than tied to fixed departures. We shape each visit around the work underway and the needs of the people joining.</p></div><ActivityList category={selectedCategory} items={previewsFor(selectedCategory)} position={position}/></div></section>}
    </main><Footer/>
  </div>;
}

function ActivityList({category,items,position}:{category:ExploreCategory;items:ActivityPreview[];position:(url:string)=>string}){
  if(category==='Village Life')return <div className="village-layout">{items[0]&&<ActivityCard item={items[0]} className="village-main" position={position}/>}<div className="village-side">{items.slice(1).map(item=><ActivityCard item={item} key={item.id} position={position}/>)}</div></div>;
  if(category==='Nature & Landscape')return <><div className="nature-top">{items.slice(0,2).map(item=><ActivityCard item={item} key={item.id} position={position}/>)}</div>{items[2]&&<ActivityCard item={items[2]} className="nature-wide" position={position}/>}</>;
  return <div className="people-layout">{items.map(item=><ActivityCard item={item} key={item.id} position={position}/>)}</div>;
}

function ActivityCard({item,className='',position}:{item:ActivityPreview;className?:string;position:(url:string)=>string}){
  return <article className={`activity-card ${className}`}><Link href={item.href} className="activity-link"><div className="activity-frame"><img src={item.image} alt={item.title} className="image" style={{objectPosition:item.id===BUILD_SLUG?'center center':position(item.image)}}/></div><p className="eyebrow activity-meta">{item.category} · {item.status}</p><h3 className="activity-title">{item.title}</h3><p className="summary" style={{margin:'0 0 19px'}}>{item.excerpt}</p><p className="eyebrow activity-action">{item.sample?'Register Interest →':'Explore Activity →'}</p></Link></article>;
}
