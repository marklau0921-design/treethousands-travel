import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const categories = ['Brand Stories', 'Village Notes', 'Local Life', 'Journal'];

export default function Stories() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 bg-[#F5F3EF]" style={{ paddingTop: '140px', paddingBottom: '100px' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="font-display text-5xl md:text-7xl uppercase text-black mb-16">Stories</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
            {categories.map(category => (
              <div key={category} className="bg-[#F5F3EF] p-10 md:p-14 min-h-[220px] flex items-end">
                <h2 className="font-display text-3xl md:text-4xl uppercase text-black">{category}</h2>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
