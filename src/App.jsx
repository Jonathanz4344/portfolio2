import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { Post, postMarkdown } from '~/layouts/post';
import { ThemeProvider, themeStyles } from '~/components/theme-provider';
import GothamBook from '~/assets/fonts/gotham-book.woff2';
import GothamMedium from '~/assets/fonts/gotham-medium.woff2';
import { Error } from '~/layouts/error';
import { VisuallyHidden } from '~/components/visually-hidden';
import { Navbar } from '~/layouts/navbar';
import { Progress } from '~/components/progress';
import config from '~/config.json';
import '~/reset.module.css';
import '~/global.module.css';
import styles from '~/root.module.css';

// Import route components
import Home from '~/routes/home/home';
import Contact from './components/Contact';
import Articles from '~/routes/articles_._index/articles';
import Uses from '~/routes/uses/uses';
import Citywide from '~/routes/projects.citywide/citywide';
import Slice from '~/routes/projects.slice/slice';
import VolkiharKnight from '~/routes/projects.volkihar-knight/volkihar-knight';
import NotFound from '~/routes/$';

// Import work experience MDX files
import WorkExperience1 from '~/routes/articles.work-experience-1.mdx';
import WorkExperience2 from '~/routes/articles.work-experience-2.mdx';
import WorkExperience3 from '~/routes/articles.work-experience-3.mdx';

// Import resume MDX file
import ModernStylingInReact from '~/routes/articles.modern-styling-in-react.mdx';

// Preload fonts and other assets
const preloadAssets = [
  { rel: 'preload', href: GothamMedium, as: 'font', type: 'font/woff2', crossOrigin: '' },
  { rel: 'preload', href: GothamBook, as: 'font', type: 'font/woff2', crossOrigin: '' },
];

// Add preload links to head
preloadAssets.forEach(asset => {
  const link = document.createElement('link');
  Object.entries(asset).forEach(([key, value]) => {
    link[key] = value;
  });
  document.head.appendChild(link);
});

// Add style tag for theme styles
const styleTag = document.createElement('style');
styleTag.innerHTML = themeStyles;
document.head.appendChild(styleTag);

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Update theme in localStorage and body attribute when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = 
      theme === 'dark' ? '#111' : '#F2F2F2';
    document.querySelector('meta[name="color-scheme"]').content = 
      theme === 'light' ? 'light dark' : 'dark light';
  }, [theme]);

  // Set loading state when location changes
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleStop = () => setIsLoading(false);

    // Set up a fake loading state for route changes
    handleStart();
    const timer = setTimeout(() => {
      handleStop();
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Console easter egg
  useEffect(() => {
    console.info(
      `${config.ascii}\n`,
      `Taking a peek huh? Check out the source code: ${config.repo}\n\n`
    );
  }, []);

  function toggleTheme(newTheme) {
    setTheme(newTheme ? newTheme : theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
      <Progress isAnimating={isLoading} />
      <VisuallyHidden showOnFocus as="a" className={styles.skip} href="#main-content">
        Skip to main content
      </VisuallyHidden>
      <Navbar />
      <main
        id="main-content"
        className={styles.container}
        tabIndex={-1}
        data-loading={isLoading}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/articles" element={<Articles />} />
          
          {/* Resume Route */}
          <Route path="/articles.modern-styling-in-react" element={
            <MDXProvider components={postMarkdown}>
              <Post 
                title="Jonathan Zhu"
                date="2024-01-01"
                banner="/static/modern-styling-in-react-banner.jpg"
                timecode="01:30:00:00"
              >
                <ModernStylingInReact />
              </Post>
            </MDXProvider>
          } />
          <Route path="/uses" element={<Uses />} />
          <Route path="/projects/citywide" element={<Citywide />} />
          <Route path="/projects/slice" element={<Slice />} />
          <Route path="/projects/volkihar-knight" element={<VolkiharKnight />} />
          
          {/* Work Experience Routes */}
          <Route path="/articles.work-experience-1" element={
            <MDXProvider components={postMarkdown}>
              <Post 
                title="Application Developer Intern @ ADP"
                date="2023-06-01"
                banner="/static/hello-world-banner.jpg"
                timecode="06:2023-08:2023"
              >
                <WorkExperience1 />
              </Post>
            </MDXProvider>
          } />
          
          <Route path="/articles.work-experience-2" element={
            <MDXProvider components={postMarkdown}>
              <Post 
                title="Software Engineer Intern @ Citywide Eye Care"
                date="2024-05-01"
                banner="/static/hello-world-banner.jpg"
                timecode="05:2024-07:2024"
              >
                <WorkExperience2 />
              </Post>
            </MDXProvider>
          } />
          
          <Route path="/articles.work-experience-3" element={
            <MDXProvider components={postMarkdown}>
              <Post 
                title="Full Stack Engineer Intern @ Citywide Eye Care"
                date="2024-08-01"
                banner="/static/hello-world-banner.jpg"
                timecode="08:2024-05:2025"
              >
                <WorkExperience3 />
              </Post>
            </MDXProvider>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}

export default App;