import type { Metadata } from 'next';
import ProjectPage, { type ProjectPageData } from '@/components/sections/project/ProjectPage';

export const metadata: Metadata = {
  title: 'ElevatedYou Fitness — Brand Identity Design Case Study',
  description: 'Bold fitness brand identity for ElevatedYou — logo design, brand colours, social media kit and full brand guidelines.',
};

const DATA: ProjectPageData = {
  slug:     'branding-elevatedyou',
  title:    'ElevatedYou Fitness — Brand Identity',
  category: 'branding',
  industry: 'Health & Fitness',
  location: 'USA',
  liveUrl:  '#',
  duration: '10 Days',
  role:     'Brand Identity Designer',
  tags:     ['Brand Identity', 'Fitness', 'Social Media Kit'],
  tagColors:['tag-green', 'tag-purple', 'tag-dim'],
  overview: 'ElevatedYou is a fitness coaching brand based in the USA. This project will be updated with the full case study content. The brand required an energetic, bold identity that would connect with its target audience and stand out in the competitive fitness market.',
  services: [
    { icon:'🏋️', title:'Fitness Brand Identity',    desc:'Bold, energetic logo and visual identity tailored for the fitness industry.' },
    { icon:'🎨', title:'Colour System',              desc:'High-energy primary and secondary colour palette with accessibility compliance.' },
    { icon:'✍️', title:'Typography Pairing',         desc:'Strong headline font paired with readable body text for all applications.' },
    { icon:'📱', title:'Social Media Kit',           desc:'Instagram, Facebook and LinkedIn templates for consistent posting.' },
    { icon:'📦', title:'Complete Brand Guidelines',  desc:'Full guidelines document covering all brand rules and usage examples.' },
  ],
  technologies: ['Adobe Illustrator','Figma','Adobe InDesign','Adobe Photoshop','Coolors'],
  features: [
    { icon:'🔥', title:'High-Energy Logo',      desc:'Bold logomark designed to energise and motivate the target fitness audience.' },
    { icon:'🎨', title:'Power Colour Palette',  desc:'Dynamic colour scheme that communicates strength, energy and transformation.' },
    { icon:'📐', title:'Versatile Logo System', desc:'Primary, stacked and icon-only logo variations for every use case.' },
    { icon:'📱', title:'Social Templates',      desc:'Pre-designed Canva and Figma templates for consistent daily posting.' },
    { icon:'📋', title:'Brand Guidelines',      desc:'Complete PDF guidelines document covering every aspect of the brand.' },
    { icon:'🖨️', title:'Print-Ready Files',    desc:'Business cards, letterhead and flyer templates included in the package.' },
  ],
  challenges: [
    'Content for this case study is pending — please update via WordPress ACF: branding_elevatedyou_challenge_1',
    'Challenge 2 — update via ACF: branding_elevatedyou_challenge_2',
    'Challenge 3 — update via ACF: branding_elevatedyou_challenge_3',
  ],
  solutions: [
    'Solution 1 — update via ACF: branding_elevatedyou_solution_1',
    'Solution 2 — update via ACF: branding_elevatedyou_solution_2',
    'Solution 3 — update via ACF: branding_elevatedyou_solution_3',
  ],
  results: [
    { num:'✓', label:'Brand Identity Delivered',  sub:'Logo, colours, typography, guidelines' },
    { num:'5★', label:'Client Review',            sub:'Excellent satisfaction score' },
    { num:'10d', label:'Fast Delivery',           sub:'Brief to final files in 10 days' },
    { num:'📦', label:'Complete Package',         sub:'All formats and sizes provided' },
  ],
  galleryCount: 3,
};

export default function BrandingElevatedYouPage() {
  return <ProjectPage data={DATA} />;
}
