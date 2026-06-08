import React, { useState, useEffect } from 'react';
import { Moon, Sun, Mail, ExternalLink } from 'lucide-react';
import { FaLinkedin, FaYoutube, FaInstagram, FaFacebook, FaBluesky } from 'react-icons/fa6';
import { motion } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

function Navbar({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) {
  const location = useLocation();
  const is404 = location.pathname !== '/';

  const logo = (
    <Link to={is404 ? location.pathname : "/"} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-Logo font-logo font-bold tracking-tight flex items-center gap-3 text-black dark:text-white shrink-0 whitespace-nowrap">
      <span>Lifelike <span className="text-accent-500">Motion</span></span>
    </Link>
  );

  const themeToggleContent = (
    <button 
      onClick={toggleTheme}
      className="shrink-0 p-2 rounded-full bg-white dark:bg-neutral-900 hover:bg-neutral-50 active:bg-neutral-50 dark:hover:bg-neutral-800 dark:active:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white pointer-events-auto"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5 text-accent-500" /> : <Moon className="w-5 h-5 text-accent-500" />}
    </button>
  );

  return (
    <div className="fixed top-8 left-0 right-0 z-50 px-6 md:px-12 max-w-7xl mx-auto pointer-events-none">
      <nav className="pointer-events-auto relative w-full bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl h-24 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-y-0 left-6 right-6 md:left-10 md:right-10 flex items-center justify-between">
          {logo}
          <div className="flex items-center">
            {themeToggleContent}
          </div>
        </div>
      </nav>
    </div>
  );
}

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.4 },
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.3 }
      }
    }
  };

  return (
    <section className="pt-40 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl px-6 py-12 md:p-20 text-left flex flex-col justify-center md:min-h-[min(calc(100vh_-_12rem),calc(100vw_-_12rem),74rem)]"
      >
        <motion.h1 variants={itemVariants} className="text-Motto font-extrabold tracking-tight mb-10 leading-tight">
          <span className="text-accent-500">Motion capture</span><br />
          animations that suit<br />
          your exact needs.
        </motion.h1>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-5 text-Button font-semibold rounded-2xl bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-600">
            Get in touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

const fastContainerVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: 0.3 },
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const fastItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: 0.2 }
    }
  }
};

function CallToAction() {
  return (
    <section id="contact" className="mt-24 pb-20 scroll-mt-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 min-[1123px]:grid-cols-2 gap-10 md:max-w-4xl md:mx-auto min-[1123px]:max-w-none min-[1123px]:mx-0">
          
          <motion.div 
            variants={fastContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl px-6 py-12 md:p-16 flex flex-col justify-start items-start space-y-10 text-left"
          >
            <motion.h2 variants={fastItemVariants} className="text-Header font-bold leading-tight">Do you have a question or business proposition?</motion.h2>
            <motion.a href="https://docs.google.com/forms/d/e/1FAIpQLSfANZicNeyK4sNZHze_hfk1jEBNqidutkmWdmBuOS4dU5nTPA/viewform" target="_blank" rel="noopener noreferrer" variants={fastItemVariants} className="w-full inline-flex items-center justify-start text-left gap-4 px-8 py-5 text-Button font-semibold rounded-2xl bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-600">
              <Mail className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              <span>Fill out the contact form</span>
            </motion.a>
          </motion.div>

          <motion.div 
            variants={fastContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl px-6 py-12 md:p-16 flex flex-col justify-start items-start space-y-10 text-left"
          >
            <motion.h2 variants={fastItemVariants} className="text-Header font-bold leading-tight">Check out my game-ready animations and tools!</motion.h2>
            <motion.div variants={fastItemVariants} className="flex flex-col w-full gap-5">
              <a href="https://assetstore.unity.com/publishers/104621" target="_blank" rel="noopener noreferrer" className="group w-full inline-flex items-center justify-start text-left gap-4 px-8 py-5 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white hover:bg-neutral-50 active:bg-neutral-50 dark:hover:bg-neutral-800 dark:active:bg-neutral-800 font-semibold text-Button">
                <ExternalLink className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-black dark:text-white group-hover:text-accent-500 group-active:text-accent-500 dark:group-hover:text-accent-500 dark:group-active:text-accent-500 transition-colors duration-200" />
                <span>Visit Unity Asset Store</span>
              </a>
              <a href="https://www.fab.com/sellers/Lifelike%20Motion" target="_blank" rel="noopener noreferrer" className="group w-full inline-flex items-center justify-start text-left gap-4 px-8 py-5 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white hover:bg-neutral-50 active:bg-neutral-50 dark:hover:bg-neutral-800 dark:active:bg-neutral-800 font-semibold text-Button">
                <ExternalLink className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-black dark:text-white group-hover:text-accent-500 group-active:text-accent-500 dark:group-hover:text-accent-500 dark:group-active:text-accent-500 transition-colors duration-200" />
                <span>Visit FAB</span>
              </a>
              <a href="https://lifelikemotion.gumroad.com/" target="_blank" rel="noopener noreferrer" className="group w-full inline-flex items-center justify-start text-left gap-4 px-8 py-5 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white hover:bg-neutral-50 active:bg-neutral-50 dark:hover:bg-neutral-800 dark:active:bg-neutral-800 font-semibold text-Button">
                <ExternalLink className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-black dark:text-white group-hover:text-accent-500 group-active:text-accent-500 dark:group-hover:text-accent-500 dark:group-active:text-accent-500 transition-colors duration-200" />
                <span>Visit Gumroad</span>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-neutral-50 dark:bg-neutral-950 border-t-2 border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3 text-black dark:text-white">
          <span className="font-logo font-bold tracking-tight text-Logo">Lifelike <span className="text-accent-500">Motion</span></span>
        </div>
        <div className="flex items-center gap-8">
          <a href="https://www.linkedin.com/company/lifelike-motion/" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-accent-500 active:text-accent-500 dark:hover:text-accent-500 dark:active:text-accent-500" aria-label="LinkedIn"><FaLinkedin size={28} /></a>
          <a href="https://www.youtube.com/@lifelike-motion" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-accent-500 active:text-accent-500 dark:hover:text-accent-500 dark:active:text-accent-500" aria-label="YouTube"><FaYoutube size={28} /></a>
          <a href="https://www.instagram.com/lifelike_motion/" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-accent-500 active:text-accent-500 dark:hover:text-accent-500 dark:active:text-accent-500" aria-label="Instagram"><FaInstagram size={28} /></a>
          <a href="https://www.facebook.com/lifelikemotionmocap" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-accent-500 active:text-accent-500 dark:hover:text-accent-500 dark:active:text-accent-500" aria-label="Facebook"><FaFacebook size={28} /></a>
          <a href="https://bsky.app/profile/lifelikemotion.bsky.social" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-accent-500 active:text-accent-500 dark:hover:text-accent-500 dark:active:text-accent-500" aria-label="Bluesky">
            <FaBluesky size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function MainContent() {
  return (
    <main>
      <Hero />
      <CallToAction />
    </main>
  );
}

function Hero404() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.4 },
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.3 }
      }
    }
  };

  return (
    <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl px-6 py-12 md:p-20 flex flex-col items-center text-center justify-center md:min-h-[min(calc(100vh_-_12rem),calc(100vw_-_12rem),74rem)]"
      >
        <motion.h1 variants={itemVariants} className="tracking-tight mb-10 leading-tight">
          <span className="text-accent-500 text-[clamp(4rem,3vw+3rem,6rem)] font-extrabold leading-none">404</span><br />
          <span className="text-Section font-bold pt-4 block">Page not found...</span>
        </motion.h1>
        <motion.div variants={itemVariants} className="flex justify-center flex-col sm:flex-row gap-4">
          <Link to="/" className="inline-flex items-center justify-center px-8 py-5 text-Button font-semibold rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white hover:bg-neutral-50 active:bg-neutral-50 dark:hover:bg-neutral-800 dark:active:bg-neutral-800">
            Back to home
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function NotFoundContent() {
  return (
    <main>
      <Hero404 />
    </main>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, behavior: 'auto' });
    const timer = setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 10);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return !(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-neutral-50 text-black dark:bg-neutral-950 dark:text-white font-sans selection:bg-accent-500/30">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="*" element={<NotFoundContent />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppContent />
    </BrowserRouter>
  );
}