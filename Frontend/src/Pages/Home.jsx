import React from "react";
import Hero           from "../Components/Home/Hero";
import FeaturedBooks  from "../Components/Home/FeaturedBooks";
import TrendingBooks  from "../Components/Home/TrendingBooks";
import Categories     from "../Components/Home/Categories";
import AddBook        from "../Components/Home/AddBook";
import OfferBanner    from "../Components/Home/OfferBanner";
import Testimonials   from "../Components/Home/Testimonials";
import AuthorSpotlight from "../Components/Home/AuthorSpotlight";
import ReadingBenefits from "../Components/Home/ReadingBenefits";
import Newsletter     from "../Components/Home/Newsletter";
import FAQ            from "../Components/Home/FAQ";
import CTASection     from "../Components/Home/CTASection";

const Home = () => (
  <main className="page-enter">
    <Hero />
    <FeaturedBooks />
    <Categories />
    <TrendingBooks />
    <OfferBanner />
    <AddBook />
    <ReadingBenefits />
    <Testimonials />
    <AuthorSpotlight />
    <Newsletter />
    <FAQ />
    <CTASection />
  </main>
);

export default Home;
