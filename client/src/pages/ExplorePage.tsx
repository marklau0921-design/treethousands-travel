import { useRoute } from 'wouter';
import ExploreTemplate from '@/components/ExploreTemplate';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { createDefaultExplorePage, normalizeExplorePage } from '@shared/explore';

export default function ExplorePage() {
  const [, params] = useRoute('/explore/:category');
  const slug = params?.category || 'village-life';
  const { data: sections, isLoading } = trpc.explore.listPublicSections.useQuery();
  const section = sections?.find(item => item.slug === slug);
  if (isLoading) return <div style={{minHeight:'100vh',background:'#f5f1e8'}}><Navigation /></div>;
  if (sections && !section) return <><Navigation /><main style={{minHeight:'70vh',padding:'180px 24px',textAlign:'center'}}><h1>Explore page not found</h1></main><Footer /></>;
  return <ExploreTemplate content={section ? normalizeExplorePage(section.pageContent, section.slug) : createDefaultExplorePage(slug)} />;
}
