"use client";
import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import TechStrip from "@/components/TechStrip";
import ServicesSection from "@/components/ServicesSection";
import FeaturedWork from "@/components/FeaturedWork";
import DomainSearch from "@/components/DomainSearch";
import BundlesSection from "@/components/BundlesSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import CTASection from "@/components/CTASection";
import DomainBlock from "@/components/DomainBlock";
import BundlesBlock from "@/components/BundlesBlock";

export default function Page() {
  return (
    <div className="container">
      {/* HERO */}
      <HeroSection />
      {/* TECH STRIP */}
      <TechStrip />
      {/* SERVICES */}
      <ServicesSection />
      {/* DOMAIN SEARCH */}
      <DomainBlock />
      {/* BUNDLES */}
      <BundlesBlock contactHref="/contact" />
      {/* FEATURED WORK */}
      <FeaturedWork />
      {/* PROCESS */}
      <ProcessSection currentStep={0} />
      {/* TESTIMONIALS */}
      <TestimonialsCarousel className="mt-14" />
      {/* CTA */}
      <CTASection />
    </div>
  );
}
