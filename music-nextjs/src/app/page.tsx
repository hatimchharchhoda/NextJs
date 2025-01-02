import FeaturedCourses from "@/components/FeaturedCourses";
import HeroSection from "@/components/HeroSection";
import MusicSchoolTestimonailCards from "@/components/TestimonailCards";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className="text-center text-3xl">
      <HeroSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <MusicSchoolTestimonailCards />
    </div>
  );
}