// Branding Safari World Tours — Brand Identity Case Study
import type { Metadata } from 'next';
import ProjectPage, { type ProjectPageData } from '@/components/sections/project/ProjectPage';

export const metadata: Metadata = {
  title: 'Safari World Tours — Brand Identity Design Case Study',
  description: 'Complete brand identity created for Safari World Tours — logo, colour palette, typography and brand guidelines.',
};

const DATA: ProjectPageData = {
  slug:     'branding-safari',
  title:    'Safari World Tours — Brand Identity',
  category: 'branding',
  industry: 'Travel & Tourism',
  location: 'Global',
  liveUrl:  '#',
  duration: '2 Weeks',
  role:     'Full Brand Identity Design',
  tags:     ['Brand Identity', 'Logo Design', 'Guidelines'],
  tagColors:['tag-amber', 'tag-purple', 'tag-dim'],
  overview: 'This project will be updated with the full brand identity case study. The client required a complete brand identity package including logo design, colour palette, typography system and brand guidelines document.',
  services: [
    { icon:'🎨', title:'Logo Design',               desc:'Multiple logo concepts with refinement rounds until perfect.' },
    { icon:'🖌️', title:'Colour Palette',            desc:'Brand colour system with primary, secondary and accent colours.' },
    { icon:'✍️', title:'Typography System',         desc:'Font pairing selection and usage hierarchy for all media.' },
    { icon:'📦', title:'Brand Guidelines Document', desc:'Complete guidelines PDF covering all brand usage rules.' },
    { icon:'📱', title:'Social Media Kit',          desc:'Profile images, cover photos and post templates for all platforms.' },
  ],
  technologies: ['Adobe Illustrator','Adobe InDesign','Figma','Adobe Photoshop','Coolors','Google Fonts'],
  features: [
    { icon:'🎭', title:'Brand Strategy',    desc:'Defined brand personality, values and positioning before any design work.' },
    { icon:'🏷️', title:'Logo System',      desc:'Primary logo, secondary mark and icon variations for all use cases.' },
    { icon:'🎨', title:'Colour Psychology', desc:'Colours chosen based on audience psychology and industry context.' },
    { icon:'✍️', title:'Typography',        desc:'Carefully selected typeface pairing for headings and body text.' },
    { icon:'📐', title:'Clear Space Rules', desc:'Defined logo minimum sizes and clear space requirements.' },
    { icon:'🚫', title:'Don\'ts Guide',    desc:'Visual guide of incorrect brand usage to protect brand consistency.' },
  ],
  challenges: [
    'Content for this case study is pending — will be added by the client via WordPress ACF',
    'Challenge 2 — update via ACF: branding_safari_challenge_2',
    'Challenge 3 — update via ACF: branding_safari_challenge_3',
  ],
  solutions: [
    'Solution 1 — update via ACF: branding_safari_solution_1',
    'Solution 2 — update via ACF: branding_safari_solution_2',
    'Solution 3 — update via ACF: branding_safari_solution_3',
  ],
  results: [
    { num:'✓', label:'Brand Identity Complete', sub:'Logo, colours, typography, guidelines' },
    { num:'5★', label:'Client Satisfaction',    sub:'Post-project review' },
    { num:'2wk', label:'Delivery Time',         sub:'From brief to final files' },
    { num:'∞', label:'Formats Provided',        sub:'SVG, PNG, PDF — all sizes' },
  ],
  galleryCount: 3,
};

export default function BrandingSafariPage() {
  return <ProjectPage data={DATA} />;
}
