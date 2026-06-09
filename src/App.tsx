import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { FaLinkedin, FaYoutube, FaInstagram, FaFacebook, FaBluesky } from 'react-icons/fa6';
import { motion } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

const ArrowUpIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className={className}>
    <path d="M480-520.35 327.83-368.17Q315.15-355.5 296-355.5t-31.83-12.67Q251.5-380.85 251.5-400t12.67-31.83l183.76-183.76q13.68-13.67 32.07-13.67t32.07 13.67l183.76 183.76Q708.5-419.15 708.5-400t-12.67 31.83Q683.15-355.5 664-355.5t-31.83-12.67L480-520.35Z"/>
  </svg>
);

const ArrowDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -990 960 960" width="24px" fill="currentColor" className={className}>
    <path d="M462.85-358.6q-8.2-3.1-14.92-9.81L264.17-552.17Q251.5-564.85 251.5-584t12.67-31.83Q276.85-628.5 296-628.5t31.83 12.67L480-463.65l152.17-152.18Q644.85-628.5 664-628.5t31.83 12.67Q708.5-603.15 708.5-584t-12.67 31.83L512.07-368.41q-6.72 6.71-14.92 9.81-8.19 3.1-17.15 3.1-8.96 0-17.15-3.1Z"/>
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className={className}>
    <path d="M162.87-151.87q-37.78 0-64.39-26.61t-26.61-64.39v-474.26q0-37.78 26.61-64.39t64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v474.26q0 37.78-26.61 64.39t-64.39 26.61H162.87Zm634.26-477.85L504.11-444.87q-5.67 3.48-11.91 5.22-6.24 1.74-12.2 1.74-5.96 0-12.2-1.74-6.24-1.74-11.91-5.22L162.87-629.72v386.85h634.26v-386.85ZM480-517.13l317.13-200H162.87l317.13 200ZM162.87-629.72v10.96-63.93 1.11-35.55 35.59-.86 63.64-10.96 386.85-386.85Z"/>
  </svg>
);

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className={className}>
    <path d="M462.85-345.12q-8.2-3.1-14.92-9.81L300.35-502.52q-13.44-13.44-13.06-31.83.38-18.39 13.06-31.82 13.67-13.68 32.32-14.06 18.66-.38 32.33 13.29l69.5 69.5v-265.19q0-19.15 13.17-32.33 13.18-13.17 32.33-13.17t32.33 13.17q13.17 13.18 13.17 32.33v265.19l69.5-69.5q13.43-13.67 32.09-13.41 18.65.26 32.32 13.94 12.92 13.67 13.3 31.94.38 18.27-13.3 31.95L512.07-354.93q-6.72 6.71-14.92 9.81-8.19 3.1-17.15 3.1-8.96 0-17.15-3.1ZM242.87-151.87q-37.78 0-64.39-26.61t-26.61-64.39v-74.5q0-19.15 13.17-32.33 13.18-13.17 32.33-13.17t32.33 13.17q13.17 13.18 13.17 32.33v74.5h474.26v-74.5q0-19.15 13.17-32.33 13.18-13.17 32.33-13.17t32.33 13.17q13.17 13.18 13.17 32.33v74.5q0 37.78-26.61 64.39t-64.39 26.61H242.87Z"/>
  </svg>
);

const UrlIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className={className}>
    <path d="M202.87-111.87q-37.78 0-64.39-26.61t-26.61-64.39v-554.26q0-37.78 26.61-64.39t64.39-26.61H434.5q19.15 0 32.33 13.17Q480-821.78 480-802.63t-13.17 32.33q-13.18 13.17-32.33 13.17H202.87v554.26h554.26V-434.5q0-19.15 13.17-32.33Q783.48-480 802.63-480t32.33 13.17q13.17 13.18 13.17 32.33v231.63q0 37.78-26.61 64.39t-64.39 26.61H202.87Zm554.26-581.85L427-363.59q-12.67 12.68-31.59 12.56-18.91-.12-31.58-12.8-12.68-12.67-12.68-31.7 0-19.04 12.68-31.71l329.89-329.89H605.5q-19.15 0-32.33-13.17Q560-783.48 560-802.63t13.17-32.33q13.18-13.17 32.33-13.17h197.13q19.15 0 32.33 13.17 13.17 13.18 13.17 32.33v197.13q0 19.15-13.17 32.33Q821.78-560 802.63-560t-32.33-13.17q-13.17-13.18-13.17-32.33v-88.22Z"/>
  </svg>
);

const DarkThemeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className={className}>
    <path d="M480.24-116.41q-153.63 0-258.73-104.98Q116.41-326.37 116.41-480q0-133.93 84.74-235.43t223.31-123.05q15.39-3.43 27.54 1.35 12.15 4.78 19.95 14.02 7.79 9.24 9.6 22.2 1.82 12.95-4.75 26.11-13.89 25.04-21.31 51.65-7.42 26.61-7.42 55.5 0 91.69 64.32 155.88 64.33 64.18 156.22 64.18 28.37 0 56.48-7.44 28.11-7.45 50.91-20.58 12.91-5.8 25.13-4.11 12.22 1.7 21.1 8.13 9.88 6.44 14.66 18.23 4.78 11.8 1.59 27.95Q820.17-291 717.63-203.71q-102.54 87.3-237.39 87.3Zm0-91q81.78 0 147.84-43.72 66.05-43.72 98.29-114.78-17.61 4.04-35.1 6.32-17.49 2.29-34.86 1.81-122.04-4.07-207.94-89.37-85.9-85.31-90.45-209.26-.24-17.37 1.93-34.98 2.16-17.61 6.44-34.98-70.82 32.48-114.78 98.65-43.96 66.18-43.96 147.72 0 112.93 79.83 192.76 79.83 79.83 192.76 79.83Zm-13.11-259.48Z"/>
  </svg>
);

const LightThemeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className={className}>
    <path d="M557.23-402.77Q589-434.54 589-480q0-45.46-31.77-77.23Q525.46-589 480-589q-45.46 0-77.23 31.77Q371-525.46 371-480q0 45.46 31.77 77.23Q434.54-371 480-371q45.46 0 77.23-31.77ZM338.5-338.5Q280-397 280-480t58.5-141.5Q397-680 480-680t141.5 58.5Q680-563 680-480t-58.5 141.5Q563-280 480-280t-141.5-58.5ZM80-434.5q-19.15 0-32.33-13.17Q34.5-460.85 34.5-480t13.17-32.33Q60.85-525.5 80-525.5h80q19.15 0 32.33 13.17Q205.5-499.15 205.5-480t-13.17 32.33Q179.15-434.5 160-434.5H80Zm720 0q-19.15 0-32.33-13.17Q754.5-460.85 754.5-480t13.17-32.33Q780.85-525.5 800-525.5h80q19.15 0 32.33 13.17Q925.5-499.15 925.5-480t-13.17 32.33Q899.15-434.5 880-434.5h-80ZM447.67-767.67Q434.5-780.85 434.5-800v-80q0-19.15 13.17-32.33Q460.85-925.5 480-925.5t32.33 13.17Q525.5-899.15 525.5-880v80q0 19.15-13.17 32.33Q499.15-754.5 480-754.5t-32.33-13.17Zm0 720Q434.5-60.85 434.5-80v-80q0-19.15 13.17-32.33Q460.85-205.5 480-205.5t32.33 13.17Q525.5-179.15 525.5-160v80q0 19.15-13.17 32.33Q499.15-34.5 480-34.5t-32.33-13.17Zm-225.5-626.26-43-42Q165.5-728.61 166-747.76t13.17-33.07q13.44-13.67 32.59-13.67 19.15 0 32.07 13.67l42.24 43q12.67 13.44 12.55 31.71-.12 18.27-12.55 31.95-12.68 13.67-31.45 13.41-18.77-.26-32.45-13.17Zm494 494.76-42.24-43q-12.67-13.44-12.67-32.09 0-18.65 12.67-31.57 12.68-13.67 31.45-13.17t32.45 13.17l43 41.76q13.67 12.68 13.17 31.83t-13.17 33.07q-13.44 13.67-32.59 13.67-19.15 0-32.07-13.67Zm-42-494.76Q660.5-686.61 661-705.38t13.17-32.45l41.76-43q12.68-13.67 31.83-13.17t33.07 13.17q13.67 13.44 13.67 32.59 0 19.15-13.67 32.07l-43 42.24q-13.44 12.67-31.71 12.55-18.27-.12-31.95-12.55Zm-495 494.76q-13.67-13.44-13.67-32.59 0-19.15 13.67-32.07l43-42.24q13.44-12.67 32.09-12.67 18.65 0 31.57 12.67 13.67 12.68 13.17 31.45t-13.17 32.45l-41.76 43Q231.39-165.5 212.24-166t-33.07-13.17ZM480-480Z"/>
  </svg>
);

const ObjectIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className={className}>
    <path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z"/>
  </svg>
);

const Navbar = ({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) => {
  const location = useLocation();
  const isMain = location.pathname === '/';
  const isSupport = location.pathname === '/support';
  const is404 = !isMain && !isSupport;

  const navRef = useRef<HTMLElement>(null);
  const fullRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  
  const [hideState, setHideState] = useState<0 | 1 | 2>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleOutside = (e: MouseEvent | TouchEvent | Event) => {
      if (!navRef.current) return;
      const target = e.target as Node;
      if (!navRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    const handleLinkClick = (e: MouseEvent | TouchEvent | Event) => {
      if (!navRef.current) return;
      const target = e.target as Node;
      if (navRef.current.contains(target) && (target as Element).closest('a')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside, { passive: true });
    document.addEventListener('touchmove', handleOutside, { passive: true });
    document.addEventListener('scroll', handleOutside, { passive: true });
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
      document.removeEventListener('touchmove', handleOutside);
      document.removeEventListener('scroll', handleOutside);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      if (!navRef.current || !fullRef.current || !midRef.current) return;
      
      const fullOverflow = fullRef.current.scrollWidth > fullRef.current.clientWidth;
      const midOverflow = midRef.current.scrollWidth > midRef.current.clientWidth;
      const isMobileWidth = window.innerWidth < 816;

      if (!fullOverflow && !isMobileWidth) {
        setHideState(0);
      } else if (!midOverflow) {
        setHideState(1);
      } else {
        setHideState(2);
      }
    };

    const observer = new ResizeObserver(measure);
    if (navRef.current) observer.observe(navRef.current);
    window.addEventListener('resize', measure);
    
    // initial measure
    measure();
    requestAnimationFrame(measure); 
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isSupport, is404]);

  const logo = (
    <Link to={isSupport ? "/support" : is404 ? location.pathname : "/"} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-Logo font-logo font-bold tracking-tight flex items-center gap-3 text-black dark:text-white shrink-0 whitespace-nowrap">
      <span>Lifelike <span className="text-accent-500">Motion</span></span>
    </Link>
  );

  const textLinks = (
    <>
      {!isSupport && !is404 && (
        <>
          <Link to="#offer" className="ml-8 text-black dark:text-white hover:text-accent-500 active:text-accent-500 dark:hover:text-accent-500 dark:active:text-accent-500 shrink-0 whitespace-nowrap">Offer</Link>
          <Link to="#portfolio" className="ml-8 text-black dark:text-white hover:text-accent-500 active:text-accent-500 dark:hover:text-accent-500 dark:active:text-accent-500 shrink-0 whitespace-nowrap">Portfolio</Link>
        </>
      )}
      {isSupport && !is404 && (
        <Link to="#products" className="ml-8 text-black dark:text-white hover:text-accent-500 active:text-accent-500 dark:hover:text-accent-500 dark:active:text-accent-500 shrink-0 whitespace-nowrap">Products</Link>
      )}
      {!is404 && <Link to="#contact" className="ml-8 text-black dark:text-white hover:text-accent-500 active:text-accent-500 dark:hover:text-accent-500 dark:active:text-accent-500 shrink-0 whitespace-nowrap">Contact</Link>}
    </>
  );

  const supportLinkContent = isSupport || is404 ? (
    <Link to="/" className="shrink-0 whitespace-nowrap px-4 py-1.5 rounded-2xl bg-white dark:bg-neutral-900 hover:bg-neutral-50 active:bg-neutral-50 dark:hover:bg-neutral-800 dark:active:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white hover:text-accent-500 active:text-accent-500 dark:hover:text-accent-500 dark:active:text-accent-500">Home</Link>
  ) : (
    <Link to="/support" className="shrink-0 whitespace-nowrap px-4 py-1.5 rounded-2xl bg-white dark:bg-neutral-900 hover:bg-neutral-50 active:bg-neutral-50 dark:hover:bg-neutral-800 dark:active:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white hover:text-accent-500 active:text-accent-500 dark:hover:text-accent-500 dark:active:text-accent-500">Support</Link>
  );

  const spacerContent = <div className="shrink-0 w-[2px] h-6 bg-neutral-300 dark:bg-neutral-700"></div>;

  const themeToggleContent = (
    <button 
      onClick={toggleTheme}
      className="shrink-0 p-2 rounded-full bg-white dark:bg-neutral-900 hover:bg-neutral-50 active:bg-neutral-50 dark:hover:bg-neutral-800 dark:active:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white pointer-events-auto"
      aria-label="Toggle theme"
    >
      {isDark ? <LightThemeIcon className="w-5 h-5 text-accent-500" /> : <DarkThemeIcon className="w-5 h-5 text-accent-500" />}
    </button>
  );

  const menuToggle = (
    <button 
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="ml-6 shrink-0 w-[40px] h-[40px] flex items-center justify-center border-2 border-neutral-200 dark:border-neutral-800 rounded-full bg-white dark:bg-neutral-900 hover:bg-neutral-50 active:bg-neutral-50 dark:hover:bg-neutral-800 dark:active:bg-neutral-800 text-black dark:text-white pointer-events-auto"
      aria-label="Toggle menu"
    >
      <span className="text-accent-500 flex items-center justify-center">
        {isMenuOpen ? <ArrowUpIcon className="w-7 h-7" /> : <ArrowDownIcon className="w-7 h-7" />}
      </span>
    </button>
  );

  return (
    <div className="fixed top-8 left-0 right-0 z-50 px-6 md:px-12 max-w-7xl mx-auto pointer-events-none">
      <nav ref={navRef} className="pointer-events-auto relative w-full bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl h-24 px-6 md:px-10 overflow-hidden">
        
        {/* Visible layer */}
        <div className="absolute inset-y-0 left-6 right-6 md:left-10 md:right-10 flex items-center justify-between">
          {hideState !== 2 ? (
            <>
              {logo}
              <div className="flex items-center">
                {(hideState === 0 || hideState === 1) && (
                  <div className="flex items-center text-Button_Header font-semibold">
                    {hideState === 0 && textLinks}
                    <div className="ml-8">{supportLinkContent}</div>
                  </div>
                )}
                <div className="ml-6">{spacerContent}</div>
                <div className="ml-6">{themeToggleContent}</div>
              </div>
            </>
          ) : (
            <>
              <div className="relative flex-1 h-full">
                 <motion.div 
                    initial={false}
                    animate={{ y: isMenuOpen ? '-100%' : '0%' }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                    className="absolute inset-x-0 h-full flex items-center"
                 >
                    {logo}
                 </motion.div>
                 <motion.div 
                    initial={false}
                    animate={{ y: isMenuOpen ? '0%' : '100%' }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                    className="absolute inset-x-0 h-full flex items-center"
                 >
                    {themeToggleContent}
                    <div className="mx-6">{spacerContent}</div>
                    <div className="flex items-center text-Button_Header font-semibold shrink-0">
                      {supportLinkContent}
                    </div>
                 </motion.div>
              </div>
              <div className="flex items-center relative z-10">
                {menuToggle}
              </div>
            </>
          )}
        </div>

        {/* Full measurement ghost */}
        <div ref={fullRef} className="absolute inset-y-0 left-6 right-6 md:left-10 md:right-10 pointer-events-none invisible flex items-center justify-between -z-10" aria-hidden="true">
          {logo}
          <div className="flex items-center shrink-0">
            <div className="flex items-center text-Button_Header font-semibold shrink-0">
              {textLinks}
              <div className="ml-8">{supportLinkContent}</div>
            </div>
            <div className="ml-6">{spacerContent}</div>
            <div className="ml-6">{themeToggleContent}</div>
          </div>
        </div>

        {/* Medium measurement ghost (text buttons hidden) */}
        <div ref={midRef} className="absolute inset-y-0 left-6 right-6 md:left-10 md:right-10 pointer-events-none invisible flex items-center justify-between -z-10" aria-hidden="true">
          {logo}
          <div className="flex items-center shrink-0">
            <div className="flex items-center text-Button_Header font-semibold shrink-0">
              <div className="ml-8">{supportLinkContent}</div>
            </div>
            <div className="ml-6">{spacerContent}</div>
            <div className="ml-6">{themeToggleContent}</div>
          </div>
        </div>
        
      </nav>
    </div>
  );
}

function Hero() {
  const location = useLocation();
  const isSupport = location.pathname === '/support';
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
          {isSupport ? (
            <>
              Looking<br />
              for <span className="text-accent-500">support</span>?
            </>
          ) : (
            <>
              <span className="text-accent-500">Motion capture</span><br />
              animations that suit<br />
              your exact needs.
            </>
          )}
        </motion.h1>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
          <Link to={isSupport ? "#contact" : "#contact"} className="inline-flex items-center justify-center px-8 py-5 text-Button font-semibold rounded-2xl bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-600">
            Get in touch
          </Link>
          <Link to={isSupport ? "#products" : "#offer"} className="inline-flex items-center justify-center px-8 py-5 text-Button font-semibold rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white hover:bg-neutral-50 active:bg-neutral-50 dark:hover:bg-neutral-800 dark:active:bg-neutral-800">
            {isSupport ? "Explore products" : "Explore the offer"}
          </Link>
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

function Offer() {
  const offers =[
    {
      title: "Motion capture recording and editing",
      desc: "Are you looking to add customized motion capture animations to your project? \nWith the use of the latest hardware from Rokoko I provide a full service of recording and editing custom motion capture animations that suit your exact needs.",
      videoSrc: "https://www.dropbox.com/scl/fi/99g05sepadexaj7u5p3gj/Rokoko720p.mp4?rlkey=hbqvzo7bghk40zry0hnzr0lob&st=y83wzzdl&raw=1"
    },
    {
      title: "Motion capture editing",
      desc: "Maybe you already own a set of animations that need some cleanup? \nI can offer you a great service of retargeting and editing your existing animations that ensures high quality results.",
      videoSrc: "https://www.dropbox.com/scl/fi/z51ubivq8wr6p0h6orfli/Mocap_editing720p.mp4?rlkey=085brw69r2qkajatfloxb00cx&st=rjy7fle7&raw=1"
    },
    {
      title: "Motion capture recording",
      desc: "How about ordering custom and raw motion capture data set? \nI can offer you high quality motion capture data that includes full body motion as well as facial capture data that suits your existing pipeline.",
      videoSrc: "https://www.dropbox.com/scl/fi/i2zspa8ka0bpsr4dcw2t5/Mocap_recording720p.mp4?rlkey=f3m5a354zsgs4nmcqf7dzgjqe&st=zxdedpcm&raw=1"
    },
    {
      title: "Tools, scripts and technical support",
      desc: "Looking for animation tools, scripts or an individual technical support for your existing project? \nI specialize in working with the Unity game engine and Autodesk Maya software to create easy to use animation tools and scripts.",
      videoSrc: "https://www.dropbox.com/scl/fi/4x8tlb54jc3yc92kuxaw1/IK_demo720.mp4?rlkey=saw2brn75rbu3a313sdosho3j&st=gyu4qoyl&raw=1"
    }
  ];

  return (
    <section id="offer" className="mt-24 scroll-mt-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-left mb-12">
          <h2 className="text-Section font-bold leading-tight">My offer</h2>
        </div>
        <div className="space-y-10">
          {offers.map((offer, idx) => (
            <motion.div 
              key={idx} 
              variants={fastContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl px-6 py-12 md:p-12 flex flex-col md:flex-row gap-12 items-center"
            >
              <div className="w-full md:w-1/2 space-y-8 text-left">
                <motion.h3 variants={fastItemVariants} className="text-Header font-bold leading-tight">{offer.title}</motion.h3>
                <motion.div variants={fastItemVariants} className="space-y-5">
                  {offer.desc.split('\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-Body text-black dark:text-white font-medium leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>
              </div>
              <motion.div variants={fastItemVariants} className="w-full md:w-1/2">
                <video src={offer.videoSrc} autoPlay muted loop playsInline className="w-full aspect-square bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-700 rounded-2xl object-cover"></video>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const works =[
    { 
      id: 2, 
      title: "IKFootPlacement", 
      desc: "Simple, efficient and easy to use tool for inverse kinematics.\nIKFootPlacement is a free C# script for Unity engine that animates the characters with the use of inverse kinematics. The script supports characters with any number of legs, which means it does not require the usage of a \"humanoid\" avatar.",
      videoSrc: "https://www.dropbox.com/scl/fi/zg4sq2a9acdpyskmtldp7/IKFootPlacement.mp4?rlkey=7yzflng4d362e1945dlode2hr&st=jbjk6krj&raw=1",
      link: "https://assetstore.unity.com/packages/tools/animation/ikfootplacement-free-ik-script-315249"
    },
  ];

  const portfolioContainerVariants = {
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

  const portfolioItemVariants = {
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
    <section id="portfolio" className="mt-24 scroll-mt-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-left mb-12">
          <h2 className="text-Section font-bold leading-tight">My works</h2>
        </div>
        <div className="flex flex-col gap-10 max-w-4xl mx-auto">
          {works.map(work => (
            <motion.div 
              key={work.id} 
              variants={portfolioContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden"
            >
              <video src={work.videoSrc} autoPlay loop muted playsInline controls className="w-full aspect-video bg-neutral-100 dark:bg-neutral-800 border-b-2 border-neutral-200 dark:border-neutral-800 object-contain"></video>
              <div className="px-6 py-12 md:p-12 text-left">
                <motion.h3 variants={portfolioItemVariants} className="text-Header font-bold mb-4 leading-tight">{work.title}</motion.h3>
                <motion.div variants={portfolioItemVariants} className="space-y-4">
                  {work.desc.split('\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-Body text-black dark:text-white font-medium leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>
                {work.link && (
                  <motion.div variants={portfolioItemVariants} className="mt-8">
                    <a href={work.link} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-6 py-3 text-Button font-semibold rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white hover:bg-neutral-50 active:bg-neutral-50 dark:hover:bg-neutral-800 dark:active:bg-neutral-800 transition-colors">
                      Read more
                      <UrlIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-black dark:text-white group-hover:text-accent-500 group-active:text-accent-500 dark:group-hover:text-accent-500 dark:group-active:text-accent-500 transition-colors duration-200" />
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
              <MailIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
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
                <UrlIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-black dark:text-white group-hover:text-accent-500 group-active:text-accent-500 dark:group-hover:text-accent-500 dark:group-active:text-accent-500 transition-colors duration-200" />
                <span>Visit Unity Asset Store</span>
              </a>
              <a href="https://www.fab.com/sellers/Lifelike%20Motion" target="_blank" rel="noopener noreferrer" className="group w-full inline-flex items-center justify-start text-left gap-4 px-8 py-5 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white hover:bg-neutral-50 active:bg-neutral-50 dark:hover:bg-neutral-800 dark:active:bg-neutral-800 font-semibold text-Button">
                <UrlIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-black dark:text-white group-hover:text-accent-500 group-active:text-accent-500 dark:group-hover:text-accent-500 dark:group-active:text-accent-500 transition-colors duration-200" />
                <span>Visit FAB</span>
              </a>
              <a href="https://lifelikemotion.gumroad.com/" target="_blank" rel="noopener noreferrer" className="group w-full inline-flex items-center justify-start text-left gap-4 px-8 py-5 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white hover:bg-neutral-50 active:bg-neutral-50 dark:hover:bg-neutral-800 dark:active:bg-neutral-800 font-semibold text-Button">
                <UrlIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-black dark:text-white group-hover:text-accent-500 group-active:text-accent-500 dark:group-hover:text-accent-500 dark:group-active:text-accent-500 transition-colors duration-200" />
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
      <Offer />
      <Portfolio />
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

function Products() {
  const products = [
    {
      title: "Blendshape Per Frame - Free MEL Script",
      buttons: [
        { label: "Visit Gumroad", href: "https://lifelikemotion.gumroad.com/l/blendshapeperframe" }
      ]
    },
    {
      title: "Bake Constraint - Free MEL Script",
      buttons: [
        { label: "Visit Gumroad", href: "https://lifelikemotion.gumroad.com/l/bakeconstraint" }
      ]
    },
    {
      title: "IKFootPlacement - Free IK Script",
      buttons: [
        { label: "PDF Documentation", href: "https://drive.usercontent.google.com/u/0/uc?id=14YCC5M0oinTKQ04ybDi4no4MLosyAY_6&export=download", isDownload: true },
        { label: "Visit Unity Asset Store", href: "https://assetstore.unity.com/packages/tools/animation/ikfootplacement-free-ik-script-315249" },
        { label: "Visit FAB", href: "https://www.fab.com/listings/ee6411e8-bcb0-4ccc-872d-94f140110a45" }
      ]
    }
  ];

  return (
    <section id="products" className="mt-24 scroll-mt-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-left mb-12">
          <h2 className="text-Section font-bold leading-tight">My products</h2>
        </div>
        <div className="grid grid-cols-1 min-[1123px]:grid-cols-2 gap-10 md:max-w-4xl md:mx-auto min-[1123px]:max-w-none min-[1123px]:mx-0">
          {products.map((product, idx) => (
            <motion.div 
              key={idx} 
              variants={fastContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl px-6 py-12 md:p-12 flex flex-col gap-8 items-center"
            >
              <motion.div variants={fastItemVariants} className="w-full">
                <div className="w-full aspect-video bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-700 rounded-2xl flex items-center justify-center">
                  <ObjectIcon className="w-24 h-24 md:w-32 md:h-32 text-neutral-300 dark:text-neutral-900" />
                </div>
              </motion.div>
              <div className="w-full flex-1 flex flex-col items-start gap-8 text-left">
                <motion.h3 variants={fastItemVariants} className="text-Header font-bold leading-tight">{product.title}</motion.h3>
                <motion.div variants={fastItemVariants} className="flex flex-col w-full gap-5">
                  {product.buttons.map((btn, bIdx) => (
                    <a 
                      key={bIdx} 
                      href={btn.href} 
                      target={btn.isDownload ? "_self" : "_blank"} 
                      rel={btn.isDownload ? undefined : "noopener noreferrer"} 
                      download={btn.isDownload ? true : undefined}
                      className="group w-full inline-flex items-center justify-start text-left gap-4 px-8 py-5 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white hover:bg-neutral-50 active:bg-neutral-50 dark:hover:bg-neutral-800 dark:active:bg-neutral-800 font-semibold text-Button"
                    >
                      {btn.isDownload ? (
                        <DownloadIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-black dark:text-white group-hover:text-accent-500 group-active:text-accent-500 dark:group-hover:text-accent-500 dark:group-active:text-accent-500 transition-colors duration-200" />
                      ) : (
                        <UrlIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-black dark:text-white group-hover:text-accent-500 group-active:text-accent-500 dark:group-hover:text-accent-500 dark:group-active:text-accent-500 transition-colors duration-200" />
                      )}
                      <span>{btn.label}</span>
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportContent() {
  return (
    <main>
      <Hero />
      <Products />
      <CallToAction />
    </main>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo({ top: 0, behavior: 'auto' });
      const timer = setTimeout(() => {
        document.documentElement.style.scrollBehavior = '';
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

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
        <Route path="/support" element={<SupportContent />} />
        <Route path="*" element={<NotFoundContent />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}