import React from 'react';
import { FaInstagram } from 'react-icons/fa6';
import { CiLinkedin } from 'react-icons/ci';
import { AiOutlineGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const data = {
  brand: {
    name: 'Farhan Sadik',
    tagline: 'Modern UI, fast experiences',
  },
  navColumns: [
    {
      title: 'Services',
      links: [
        { title: 'Web Design', href: '/services/web-design' },
        { title: 'E-commerce', href: '/services/ecommerce' },
        { title: 'UI / UX', href: '/services/ui-ux' },
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Careers', href: '/careers' },
        { title: 'Projects', href: '/projects' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { title: 'Contact', href: '/contact' },
        { title: 'Testimonials', href: '/reviews' },
        { title: 'Case Studies', href: '/case-studies' },
      ],
    },
  ],
  contact: {
    address: 'Dhaka, Bangladesh',
    email: 'hello@farhanagency.com',
    phone: '+880 1234-567890',
    hours: 'Mon–Fri, 9:00–18:00 (GMT+6)',
  },
  social: [
    {
      id: 'instagram',
      network: 'instagram',
      href: 'https://www.instagram.com/farhansadik02/',
      ariaLabel: 'Follow Farhan Sadik on instagram',
    },
    {
      id: 'linkedin',
      network: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mdsadikdev/',
      ariaLabel: 'Follow Farhan Sadik on LinkedIn',
    },
    {
      id: 'github',
      network: 'GitHub',
      href: 'https://github.com/farhandotio',
      ariaLabel: 'View Farhan Sadik on GitHub',
    },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
  ],
};

const Footer = () => {
  const jsonLd = {
    // ... (JSON-LD remains the same)
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.brand.name,
    url: typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com',
    logo: data.brand.logo,
    sameAs: data.social.map((s) => s.href),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: data.contact.phone,
        contactType: 'customer service',
        email: data.contact.email,
        hoursAvailable: data.contact.hours,
        availableLanguage: ['English', 'Bengali'],
      },
    ],
  };

  return (
    <footer className="max-w-[1400px] mx-auto text-mutedText bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="px-5 md:px-7 lg:px-10 mx-auto container">
        <div
          // --- LIGHTING UPDATE 1: Top Border Glow ---
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10  pt-16 lg:py-24 border-t border-border"
        >
          <div className="space-y-4 md:col-span-2">
            <Link
              to="/"
              aria-label={`${data.brand.name} - Home`}
              className="inline-flex items-center gap-3"
            >
              <div>
                {/* --- LIGHTING UPDATE 2: Brand Name linear --- */}
                <p className="font-bold text-xl uppercase bg-clip-text text-transparent bg-linear-to-r from-text to-primary">
                  {data.brand.name}
                </p>
                <p className="text-sm text-primary/80">{data.brand.tagline}</p>
              </div>
            </Link>

            <p className="text-sm text-mutedText">
              I craft fast, accessible websites and beautiful UI systems for startups and brands.
            </p>

            <div className="mt-4 flex items-center gap-5" aria-hidden="true">
              {/* Small social icons */}
              {data.social.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.ariaLabel}
                  // --- LIGHTING UPDATE 3: Social Icons Glow ---
                  className="text-3xl text-mutedText hover:text-primary transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 rounded-full"
                >
                  {/* simple svg icons */}
                  {s.id === 'instagram' && <FaInstagram />}
                  {s.id === 'linkedin' && <CiLinkedin />}
                  {s.id === 'github' && <AiOutlineGithub />}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {data.navColumns.map((col) => (
            <div key={col.title} aria-labelledby={`footer-${col.title.toLowerCase()}`}>
              {/* --- LIGHTING UPDATE 4: Column Titles --- */}
              <h4
                id={`footer-${col.title.toLowerCase()}`}
                className="text-sm font-extrabold mb-4 uppercase text-text tracking-wider"
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      to={link.href}
                      // --- LIGHTING UPDATE 5: Nav Links Hover ---
                      className="text-sm text-mutedText hover:text-text transition-colors duration-300"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          // --- LIGHTING UPDATE 6: Bottom Divider Glow ---
          className="border-t border-border mt-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="text-sm text-mutedText">
            © {new Date().getFullYear()} {data.brand.name}. All rights reserved.
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-4">
              {data.legal.map((l) => (
                <Link
                  key={l.title}
                  to={l.href}
                  className="text-sm text-mutedText hover:text-fuchsia-400 transition"
                >
                  {l.title}
                </Link>
              ))}
            </div>

            <div className="text-sm text-mutedText">
              Made with care in <span className="text-fuchsia-400">Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
