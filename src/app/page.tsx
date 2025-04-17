import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/home/HeroSection';
import OverviewSection from '@/components/sections/home/OverviewSection';
import FeaturedPrograms from '@/components/sections/home/FeaturedPrograms';
import UpcomingEvents from '@/components/sections/home/UpcomingEvents';
import DonationSection from '@/components/sections/home/DonationSection';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <OverviewSection />
      <FeaturedPrograms />
      <UpcomingEvents />
      <DonationSection />
    </Layout>
  );
}
