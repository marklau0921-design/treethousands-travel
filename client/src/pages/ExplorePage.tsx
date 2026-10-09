import { useMemo } from 'react';
import { Link, useRoute } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ExploreActivityDetail from '@/components/ExploreActivityDetail';
import { useMediaObjectPosition } from '@/lib/media-position';
import { trpc } from '@/lib/trpc';
import { EXPLORE_CATEGORIES, exploreCategorySlug, normalizeExplorePage, type ExploreCategory, type ExplorePageContent } from '@shared/explore';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";
const slugCategory = Object.fromEntries(Object.entries(exploreCategorySlug).map(([name, slug]) => [slug, name])) as Record<string, ExploreCategory>;
const categoryCopy: Record<ExploreCategory,{kicker:string;description:string}> = {
  'Village Life': { kicker:'Homes / Food / Everyday Work', description:'Take part in the practical rhythms of village life—from caring for existing spaces to sharing work, food and ordinary time.' },
  'Nature & Landscape': { kicker:'Forests / Water / Care', description:'Join work that helps people observe, understand and care for the landscapes that shape life around the village.' },
  'People & Culture': { kicker:'Craft / Knowledge / Seasons', description:'Learn alongside people whose skills, materials and seasonal practices continue through everyday use.' },
};
type Activity = { slug:string; title:string; content:ExplorePageContent };

export default function ExplorePage() {
  const [, activityParams] = useRoute('/explore/activity/:slug');
  const [, legacyParams] = useRoute('/explore/:category');
  const {data:sections=[],isLoading}=trpc.explore.listPublicSections.useQuery();
  const activities = useMemo<Activity[]>(()=>sections.map(section=>({slug:section.slug,title:section.title,content:normalizeExplorePage(section.pageContent,section.slug)})).filter(item=>item.content.activity.enabled),[sections]);
  const requestedSlug = activityParams?.slug || legacyParams?.category;
  const activity = requestedSlug ? activities.find(item=>item.slug===requestedSlug) : undefined;
  const selectedCategory = !activity && legacyParams?.category ? slugCategory[legacyParams.category] : undefined;
  if(isLoading)return <div className="min-h-screen bg-[#f5f1e8]"><Navigation/></div>;
  if(activity)return <ExploreActivityDetail content={activity.content}/>;
  if(legacyParams?.category&&!selectedCategory)return <><Navigation/><main style={{minHeight:'70vh',padding:'180px 24px',textAlign:'center'}}><h1>Explore page not found</h1></main><Footer/></>;
  return <ExploreIndex activities={activities} selectedCategory={selectedCategory}/>;
}

function ExploreIndex({activities,selectedCategory}:{activities:Activity[];selectedCategory?:ExploreCategory}){
  const position=useMediaObjectPosition();
  const visible=selectedCategory?activities.filter(item=>item.content.activityDetail?.category===selectedCategory):activities;
  const title=selectedCategory||'Explore';
  const intro=selectedCategory?categoryCopy[selectedCategory].description:'Ways to take part in the work, seasons and everyday life of rural communities—shaped around what is happening locally and what participants hope to understand or contribute.';
  return <div className="explore-index" style={{fontFamily:SANS,background:'#f5f1e8',color:'#17251f'}}>
    <style>{`
      .explore-index .wrap{width:min(1320px,calc(100% - 64px));margin:0 auto}.explore-index .display{font-family:${DISPLAY};font-weight:400;letter-spacing:.045em;line-height:.92;text-transform:uppercase}.explore-index .eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}.explore-index .summary{font-size:16px;line-height:1.7;letter-spacing:.025em;color:#59605b}.explore-index a{text-decoration:none;color:inherit}.explore-index .tabs{display:flex;justify-content:center;gap:clamp(25px,5vw,68px);overflow-x:auto}.explore-index .tab{white-space:nowrap;padding:0 0 13px;border-bottom:3px solid transparent;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.explore-index .tab.active{color:#9b5e3d;border-bottom-color:#9b5e3d}.explore-index .activity-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:65px 32px}.explore-index .activity-card{grid-column:span 6}.explore-index .activity-card:nth-child(3n){grid-column:3/span 8}.explore-index .image{display:block;width:100%;height:470px;object-fit:cover}.explore-index .category-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}.explore-index .category-card{min-height:360px;padding:36px;display:flex;flex-direction:column;justify-content:flex-end}.explore-index .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:28px}.explore-index .step{border-top:1px solid #a8aaa2;padding-top:20px}.explore-index .button{display:inline-block;background:#111;color:#fff!important;padding:13px 28px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}@media(max-width:767px){.explore-index .wrap{width:calc(100% - 40px)}.explore-index .tabs{justify-content:flex-start}.explore-index .activity-grid,.explore-index .category-grid,.explore-index .steps{display:block}.explore-index .activity-card,.explore-index .category-card,.explore-index .step{margin-bottom:42px}.explore-index .image{height:360px}}
    `}</style>
    <Navigation/>
    <main style={{paddingTop:'clamp(128px,14vw,190px)'}}>
      <header className="wrap" style={{paddingBottom:'clamp(55px,7vw,88px)'}}><p className="eyebrow" style={{color:'#9b5e3d',margin:'0 0 22px'}}>Participation / Rural China</p><div className="grid md:grid-cols-[1.2fr_.8fr] gap-8 items-end"><h1 className="display" style={{fontSize:'clamp(74px,12vw,168px)',margin:0}}>{title}</h1><p className="summary" style={{margin:'0 0 10px',maxWidth:560}}>{intro}</p></div></header>
      <nav className="wrap tabs" aria-label="Explore categories" style={{paddingBottom:38}}><Link href="/explore" className={`tab ${!selectedCategory?'active':''}`}>All Activities</Link>{EXPLORE_CATEGORIES.map(category=><Link href={`/explore/${exploreCategorySlug[category]}`} className={`tab ${selectedCategory===category?'active':''}`} key={category}>{category}</Link>)}</nav>
      {!selectedCategory&&<section style={{padding:'clamp(88px,10vw,135px) 0',background:'#17352d',color:'#f5f1e8'}}><div className="wrap"><p className="eyebrow" style={{color:'#c79a72',margin:'0 0 18px'}}>Three Ways to Enter</p><h2 className="display" style={{fontSize:'clamp(52px,7vw,94px)',maxWidth:820,margin:'0 0 52px'}}>Begin with what you hope to understand.</h2><div className="category-grid">{EXPLORE_CATEGORIES.map((category,i)=><Link href={`/explore/${exploreCategorySlug[category]}`} className="category-card" key={category} style={{background:i===0?'#d7cbbb':i===1?'#526b5d':'#a16b4d',color:i===0?'#17251f':'#fff'}}><p className="eyebrow">0{i+1}</p><h3 className="display" style={{fontSize:'clamp(38px,4vw,58px)',margin:'auto 0 16px'}}>{category}</h3><p style={{fontSize:14,lineHeight:1.6,margin:0,opacity:.78}}>{categoryCopy[category].description}</p></Link>)}</div></div></section>}
      <section style={{padding:'clamp(90px,11vw,155px) 0',background:'#fff'}}><div className="wrap"><div className="grid md:grid-cols-[1fr_.75fr] gap-8 items-end" style={{marginBottom:55}}><div><p className="eyebrow" style={{color:'#9b5e3d'}}>Ongoing · By Arrangement</p><h2 className="display" style={{fontSize:'clamp(54px,8vw,106px)',margin:0}}>{selectedCategory?'Ways to Take Part':'Current Activities'}</h2></div><p className="summary" style={{margin:0}}>Activities remain flexible rather than tied to fixed departures. We shape each visit around the work underway and the needs of the people joining.</p></div>{visible.length?<div className="activity-grid">{visible.map((item,index)=><article className="activity-card" key={item.slug}><Link href={`/explore/activity/${item.slug}`}><img src={item.content.hero.image} alt={item.title} className="image" style={{height:index%3===2?560:440,objectPosition:position(item.content.hero.image)}}/><p className="eyebrow" style={{color:'#9b5e3d',margin:'21px 0 10px'}}>{item.content.activityDetail?.category} · {item.content.activity.statusLabel}</p><h3 style={{fontSize:'clamp(28px,3vw,42px)',lineHeight:1.16,fontWeight:500,margin:'0 0 13px'}}>{item.title}</h3><p className="summary" style={{margin:'0 0 20px'}}>{item.content.activityDetail?.excerpt}</p><span className="eyebrow">Explore Activity →</span></Link></article>)}</div>:<div style={{borderTop:'1px solid #d5d0c6',padding:'45px 0'}}><p className="summary">We are preparing participation opportunities in this area. Tell us what interests you and we can begin a conversation around the work currently taking place.</p><Link href="/join-us/contact" className="button">Tell Us What Interests You</Link></div>}</div></section>
      {!selectedCategory&&<section style={{padding:'clamp(95px,12vw,165px) 0',background:'#cfd2c3'}}><div className="wrap"><p className="eyebrow" style={{color:'#79583c'}}>How Participation Takes Shape</p><h2 className="display" style={{fontSize:'clamp(52px,7vw,94px)',maxWidth:900,margin:'16px 0 58px'}}>No fixed package. A clear way to begin.</h2><div className="steps">{[['Choose an Area','Begin with village life, nature and landscape, or people and culture.'],['Tell Us About You','Share your available time, group, interests and practical needs.'],['Shape It Together','We connect your needs with the project stage and appropriate ways to contribute.'],['Enter with Care','Join with clear guidance, boundaries and respect for the place’s own pace.']].map((step,i)=><div className="step" key={step[0]}><p className="eyebrow" style={{color:'#79583c'}}>0{i+1}</p><h3 style={{fontSize:23,fontWeight:500,margin:'18px 0 12px'}}>{step[0]}</h3><p className="summary" style={{fontSize:14,margin:0}}>{step[1]}</p></div>)}</div></div></section>}
      <section style={{padding:'clamp(90px,11vw,150px) 0',background:'#a16140',color:'#fff',textAlign:'center'}}><div className="wrap"><p className="eyebrow" style={{opacity:.7}}>Start with a conversation</p><h2 className="display" style={{fontSize:'clamp(54px,8vw,108px)',maxWidth:920,margin:'15px auto 34px'}}>Tell us how you would like to take part.</h2><Link href="/join-us/contact" className="button">Register Your Interest</Link></div></section>
    </main><Footer/>
  </div>;
}
