// AsalSports project page
import type { Metadata } from 'next';
import ProjectPage, { type ProjectPageData } from '@/components/sections/project/ProjectPage';

export const metadata: Metadata = {
  title: 'AsalSports — WordPress Community Sports Platform Case Study',
  description: 'How we built a community-driven sports platform for AsalSports with player profiles, tournament listings and team management.',
};

const DATA: ProjectPageData = {
  slug:     'asal-sports',
  title:    'AsalSports',
  category: 'wordpress',
  industry: 'Sports & Recreation',
  location: 'Global',
  liveUrl:  'https://asalsports.org',
  duration: '3 Weeks',
  role:     'Full WordPress Development',
  tags:     ['WordPress', 'Sports', 'Community'],
  tagColors:['tag-purple', 'tag-green', 'tag-dim'],
  overview: 'AsalSports is a global sports community platform connecting athletes, teams and tournament organisers. They needed a feature-rich WordPress website to host player profiles, tournament brackets, team management and a sports news blog.',
  services: [
    { icon:'🏆', title:'Sports Community Platform', desc:'Custom WordPress platform with player, team and tournament management.' },
    { icon:'📋', title:'Tournament Bracket System',  desc:'Interactive tournament management with brackets and results tracking.' },
    { icon:'👤', title:'Player Profiles',            desc:'Rich player profile pages with stats, team affiliation and achievements.' },
    { icon:'📸', title:'Photo Gallery',              desc:'Organised sports photo galleries with category filtering.' },
    { icon:'📰', title:'Sports News Blog',           desc:'Category-organised blog for sports news, match reports and updates.' },
  ],
  technologies: ['WordPress','Elementor Pro','ACF Pro','WP Rocket','Cloudflare','Contact Form 7','The Events Calendar','WPForms'],
  features: [
    { icon:'🏟️', title:'Tournament Management',  desc:'Create, manage and display tournaments with live bracket updates.' },
    { icon:'👥', title:'Team & Player Profiles', desc:'Dedicated pages for teams and athletes with full statistics.' },
    { icon:'📸', title:'Media Gallery',          desc:'Rich photo and video galleries for match highlights.' },
    { icon:'📊', title:'Leaderboards',           desc:'Dynamic leaderboards updated automatically from match results.' },
    { icon:'📱', title:'Mobile Optimised',       desc:'Athletes on the go — designed mobile-first for all devices.' },
    { icon:'🔔', title:'Event Notifications',    desc:'Email notifications for upcoming matches and tournament deadlines.' },
  ],
  challenges: [
    'Complex data relationships between players, teams and tournaments',
    'No central platform for the community to connect and communicate',
    'Static brochure website with no community features',
    'No content management for non-technical administrators',
  ],
  solutions: [
    'Used ACF Pro custom fields to build flexible player, team and tournament data structures',
    'Developed community features: profiles, forums and tournament sign-ups',
    'Complete redesign with dynamic, data-driven pages',
    'Built an intuitive WP admin interface for non-technical staff to manage all content',
  ],
  results: [
    { num:'500+', label:'Community Members',    sub:'Registered in first 2 months' },
    { num:'30+', label:'Tournaments Hosted',    sub:'First season on the platform' },
    { num:'90+', label:'PageSpeed Score',       sub:'Core Web Vitals passed' },
    { num:'4.9★', label:'Client Rating',       sub:'Fiverr project review' },
  ],
  galleryCount: 3,
};

export default function AsalSportsPage() {
  return <ProjectPage data={DATA} />;
}
