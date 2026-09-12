import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from '@/pages/Home';
import Destinations from '@/pages/Destinations';
import DestinationsMap from '@/pages/DestinationsMap';
import Sichuan from '@/pages/Sichuan';
import Experiences from "./pages/Experiences";
import About from "./pages/About";
import WhyWeStarted from "./pages/WhyWeStarted";
import SichuanDetail from "./pages/SichuanDetail";
import Contact from "./pages/Contact";
import PlanYourTrip from './pages/PlanYourTrip';
import ExperienceDetail from './pages/ExperienceDetail';
import YunnanDetail from './pages/YunnanDetail';
import FontShowcase from "./pages/FontShowcase";
import TeaMountains from "./pages/TeaMountains";
import WhyUs from "./pages/WhyUs";
import OurTeam from "./pages/OurTeam";
import AdminEnquiries from "./pages/AdminEnquiries";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCities from "./pages/AdminCities";
import AdminExperiences from "./pages/AdminExperiences";
import AdminItineraries from "./pages/AdminItineraries";
import AdminStories from "./pages/AdminStories";
import AdminVideos from "./pages/AdminVideos";
import AdminTags from "./pages/AdminTags";
import AdminMediaLibrary from "./pages/AdminMediaLibrary";
import AdminAbout from "./pages/AdminAbout";
import AdminAboutOurTeam from "./pages/AdminAboutOurTeam";
import AdminAboutWhyUs from "./pages/AdminAboutWhyUs";
import AdminExperiencesByType from "./pages/AdminExperiencesByType";
import AdminExperiencesByCity from "./pages/AdminExperiencesByCity";
import AdminExperienceEdit from "./pages/AdminExperienceEdit";
import AdminCityEdit from "./pages/AdminCityEdit";
import AdminHomepage from "./pages/AdminHomepage";
import AdminOurStory from "./pages/AdminOurStory";

import ExperienceCategoryPage from "./pages/ExperienceCategoryPage";
import CityPage from "./pages/CityPage";
import CMSAdmin from "./pages/CMSAdmin";
import ItineraryDetail from "./pages/ItineraryDetail";
import Stories from "./pages/Stories";
import ExplorePage from "./pages/ExplorePage";
import AdminExplore from "./pages/AdminExplore";
import StoryDetail from "./pages/StoryDetail";
import AdminContactInformation from "./pages/AdminContactInformation";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

function ImageVisibilityGuard() {
  React.useEffect(() => {
    const prepare = (image: HTMLImageElement) => {
      if (image.dataset.imageGuarded) return;
      image.dataset.imageGuarded = 'true';
      const reveal = () => { if (image.naturalWidth > 0) image.dataset.imageReady = 'true'; };
      const hide = () => { image.style.display = 'none'; image.removeAttribute('data-image-ready'); };
      image.addEventListener('load', reveal);
      image.addEventListener('error', hide);
      if (image.complete) image.naturalWidth > 0 ? reveal() : hide();
    };
    document.querySelectorAll('img').forEach(node => prepare(node as HTMLImageElement));
    const observer = new MutationObserver(records => records.forEach(record => {
      if (record.type === 'attributes' && record.target instanceof HTMLImageElement) {
        const image = record.target;
        image.style.display = '';
        image.removeAttribute('data-image-ready');
        if (image.complete && image.naturalWidth > 0) image.dataset.imageReady = 'true';
        return;
      }
      record.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement)) return;
        if (node instanceof HTMLImageElement) prepare(node);
        node.querySelectorAll?.('img').forEach(image => prepare(image as HTMLImageElement));
      });
    }));
    observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'srcset'] });
    return () => observer.disconnect();
  }, []);
  return <style>{`img:not([data-image-ready="true"]){opacity:0!important}img[data-image-ready="true"]{opacity:1}`}</style>;
}

/**
 * App Router & Layout
 * Design: Light theme with elegant luxury travel aesthetic
 * Color scheme: Warm golds, deep charcoal, cream whites
 */
function Router() {
  const [location] = useLocation();
  
  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* First structure migration: reuse existing content and styling while
          the new TreeThousands routes are established. */}
      <Route path="/our-story/:slug" component={WhyWeStarted} />
      <Route path="/our-story" component={About} />
      <Route path="/explore" component={ExplorePage} />
      <Route path="/explore/:category" component={ExplorePage} />
      <Route path="/stories/article/:slug" component={StoryDetail} />
      <Route path="/stories" component={Stories} />
      <Route path="/stories/:category" component={Stories} />
      <Route path="/join-us" component={Contact} />
      <Route path="/join-us/:section" component={Contact} />
      <Route path="/destinations" component={Destinations} />
      <Route path="/destinations/sichuan" component={Sichuan} />
      <Route path="/destinations/:slug" component={CityPage} />
      <Route path="/experiences" component={Experiences} />
      <Route path="/about" component={About} />
      <Route path="/make-an-enquiry" component={Contact} />
      <Route path="/plan-your-trip" component={PlanYourTrip} />
      <Route path="/experiences/2" component={YunnanDetail} />
      <Route path="/experiences/tea-mountains-yaan" component={TeaMountains} />
      <Route path="/template/experience" component={TeaMountains} />
      <Route path="/template/city" component={Sichuan} />
      <Route path="/template/itinerary" component={YunnanDetail} />
      <Route path="/itinerary/:slug" component={ItineraryDetail} />
      <Route path="/about/why-us" component={WhyUs} />
      <Route path="/about/our-team" component={OurTeam} />
      <Route path="/experiences/:categorySlug/:id" component={ExperienceDetail} />
      <Route path="/experiences/:categorySlug" component={ExperienceCategoryPage} />
      <Route path="/experience-preview/:slug" component={ExperienceDetail} />
      <Route path="/font-showcase" component={FontShowcase} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/cms" component={CMSAdmin} />
      <Route path="/admin/enquiries" component={AdminEnquiries} />
      <Route path="/admin/cities" component={AdminCities} />
      <Route path="/admin/cities/:id/edit" component={AdminCityEdit} />
      <Route path="/admin/cities/:cityId/experiences" component={AdminExperiencesByCity} />
      <Route path="/admin/experiences" component={AdminExperiences} />
      <Route path="/admin/experiences/type/:typeId" component={AdminExperiencesByType} />
      <Route path="/admin/experiences/edit/:id" component={AdminExperienceEdit} />
      <Route path="/admin/itineraries" component={AdminItineraries} />
      <Route path="/admin/stories" component={AdminStories} />
      <Route path="/admin/videos" component={AdminVideos} />
      <Route path="/admin/tags" component={AdminTags} />
      <Route path="/admin/media" component={AdminMediaLibrary} />
      <Route path="/admin/about" component={AdminAbout} />
      <Route path="/admin/about/our-team" component={AdminAboutOurTeam} />
      <Route path="/admin/about/why-us" component={AdminAboutWhyUs} />
      <Route path="/admin/homepage" component={AdminHomepage} />
      <Route path="/admin/our-story" component={AdminOurStory} />
      <Route path="/admin/explore" component={AdminExplore} />
      <Route path="/admin/contact-information" component={AdminContactInformation} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <ImageVisibilityGuard />
          <Router />
          <FloatingWhatsApp />
          </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
