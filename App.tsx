
import React, { Suspense, lazy } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/features/Hero';
import HostelExplorer from './components/features/HostelExplorer';
import { Skeleton } from './components/ui/Skeleton';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Lazy load non-critical components below the fold
const CommunityHub = lazy(() => import('./components/features/CommunityHub'));
const StudentSpotlight = lazy(() => import('./components/features/StudentSpotlight'));
const ContactForm = lazy(() => import('./components/features/ContactForm'));

const SectionSkeleton = () => (
  <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
    <Skeleton className="h-12 w-64 mx-auto" />
    <Skeleton className="h-4 w-96 mx-auto" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Skeleton className="h-64 w-full rounded-[2.5rem]" />
      <Skeleton className="h-64 w-full rounded-[2.5rem]" />
      <Skeleton className="h-64 w-full rounded-[2.5rem]" />
    </div>
  </div>
);

const MainContent: React.FC = () => {
  const { isAdmin, loading } = useApp();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <div className="text-center">
        <i className="fa-solid fa-circle-notch fa-spin text-4xl text-yellow mb-4"></i>
        <p className="text-white font-black uppercase tracking-widest text-xs">Loading UniStay...</p>
      </div>
    </div>
  );

  if (isAdmin) return <AdminDashboard />;

  return (
    <div className="flex flex-col min-h-screen selection:bg-yellow selection:text-navy">
      <Header />
      <main className="flex-grow scroll-smooth">
        <Hero />
        
        <section id="hostels" className="bg-gray-50 relative z-20 cv-auto">
          <HostelExplorer />
        </section>

        <section className="cv-auto">
          <Suspense fallback={<SectionSkeleton />}>
            <CommunityHub />
          </Suspense>
        </section>

        <section className="cv-auto">
          <Suspense fallback={<SectionSkeleton />}>
            <StudentSpotlight />
          </Suspense>
        </section>

        <section className="cv-auto">
          <Suspense fallback={<SectionSkeleton />}>
            <ContactForm />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
