import Header from './components/Header';
import Hero from './components/Hero';
import WhoWeAre from './components/WhoWeAre';
import Commitment from './components/Commitment';
import Offer from './components/Offer';
import Locations from './components/Locations';
import Booking from './components/Booking';
import Registration from './components/Registration';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:bg-brand focus:px-5 focus:py-3 focus:text-[12px] focus:font-semibold focus:uppercase focus:tracking-[0.16em] focus:text-fg"
      >
        Skip to content
      </a>

      <Header />

      <div className="relative">
        {/* Green atmosphere behind the whole page — see .dg-page-wash in index.css */}
        <div aria-hidden="true" className="dg-page-wash pointer-events-none absolute inset-0 -z-10" />

        <main id="main">
          <Hero />
          <WhoWeAre />
          <Commitment />
          <Offer />
          <Locations />
          <Booking />
          <Registration />
        </main>

        <Footer />
      </div>
    </>
  );
}
