import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useReducedMotion } from 'framer-motion';
import { useWindowSize } from '~/hooks';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formatDate } from '~/utils/date';
import { classes, cssProps } from '~/utils/style';
import styles from './articles.module.css';
import resumePDF from './resume.pdf';

function ArticlesPost({ slug, frontmatter, timecode, index }) {
  const [hovered, setHovered] = useState(false);
  const [dateTime, setDateTime] = useState(null);
  const reduceMotion = useReducedMotion();
  const { title, abstract, date, featured, banner, location } = frontmatter;

  useEffect(() => {
    setDateTime(formatDate(date));
  }, [date, dateTime]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <article
      className={styles.post}
      data-featured={!!featured}
      style={index !== undefined ? cssProps({ delay: index * 100 + 200 }) : undefined}
    >
      {featured && (
        <Text className={styles.postLabel} size="s">
          Featured
        </Text>
      )}
      {featured && !!banner && (
        <div className={styles.postImage}>
          <Image
            noPauseButton
            play={!reduceMotion ? hovered : undefined}
            src={banner}
            placeholder={`${banner.split('.')[0]}-placeholder.jpg`}
            alt=""
            role="presentation"
          />
        </div>
      )}
      {banner && (
        <RouterLink
          unstable_viewTransition
          prefetch="intent"
          to={`/articles.${slug}`}
          className={styles.postLink}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.postDetails}>
            <div aria-hidden className={styles.postDate}>
              <Divider notchWidth="64px" notchHeight="8px" />
              {dateTime}
            </div>
            <Heading as="h2" level={featured ? 2 : 4}>
              {title}
            </Heading>
            <Text size={featured ? 'l' : 's'} as="p">
              {location}
            </Text>
            <Text size={featured ? 'l' : 's'} as="p">
              {abstract}
            </Text>
            <div className={styles.postFooter}>
              {featured && !!banner && (
                <RouterLink to="/articles.modern-styling-in-react">
                  <Button secondary iconHoverShift as="span">
                    View CV
                  </Button>
                </RouterLink>
              )}
              {!featured && banner && (
                <Button secondary iconHoverShift icon="chevron-right" as="span">
                  See more
                </Button>
              )}

              <Text className={styles.timecode} size="s">
                {timecode}
              </Text>
            </div>
          </div>
        </RouterLink>
      )}

      {featured && !!banner && (
        <div className={styles.postLink}>
          <div className={styles.postDetails}>
            {/* <div aria-hidden className={styles.postDate}>
              <Divider notchWidth="64px" notchHeight="8px" />
              {dateTime}
            </div> */}
            {/* <Heading as="h2" level={featured ? 2 : 4}>
              {title}
            </Heading> */}
            {/* <Text size={featured ? 'l' : 's'} as="p">
              {location}
            </Text> */}
            {/* <Text size={featured ? 'l' : 's'} as="p">
              {abstract}
            </Text> */}
            <div className={styles.postFooter}>
              {featured && !!banner && (
                <a href={resumePDF} download="Resume" target="blank">
                  <Button secondary iconHoverShift as="div">
                    Download CV
                  </Button>
                </a>
              )}
              {/* {!featured && banner && (
                <Button secondary iconHoverShift icon="chevron-right" as="div">
                  See more
                </Button>
              )} */}

              <Text className={styles.timecode} size="s">
                {timecode}
              </Text>
            </div>
          </div>
        </div>
      )}

      {featured && (
        <Text aria-hidden className={styles.postTag} size="s">
          477
        </Text>
      )}
    </article>
  );
}

function SkeletonPost({ index }) {
  return (
    <article
      aria-hidden="true"
      className={classes(styles.post, styles.skeleton)}
      data-featured="false"
      style={index !== undefined ? cssProps({ delay: index * 100 + 200 }) : undefined}
    >
      <div className={styles.postLink}>
        <div className={styles.postDetails}>
          <div aria-hidden className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            Coming soon...
          </div>
          <Heading
            className={styles.skeletonBone}
            as="h2"
            level={4}
            style={{ height: 24, width: '70%' }}
          />
          <Text
            className={styles.skeletonBone}
            size="s"
            as="p"
            style={{ height: 90, width: '100%' }}
          />
          <div className={styles.postFooter}>
            <Button secondary iconHoverShift icon="chevron-right" as="div">
              See more
            </Button>
            <Text className={styles.timecode} size="s">
              00:00:00:00
            </Text>
          </div>
        </div>
      </div>
    </article>
  );
}

// Work experience data from resume
const articlesData = {
  posts: [
    {
      slug: 'work-experience-3',
      timecode: '08:2024-05:2025',
      frontmatter: {
        title: 'Full Stack Engineer Intern @ Citywide Eye Care',
        abstract: 'During my Full Stack Engineer Internship at Citywide Eye Care, I designed and deployed a scalable full-stack solution to modernize clinic operations. I developed an interactive, user-friendly interface using React.js and Material-UI, increasing patient engagement by 87% based on user feedback. I implemented an efficient inventory management system with Python and PostgreSQL, reducing stock discrepancies by 30%. Additionally, I optimized AWS cloud services (EC2, S3, RDS) to achieve 99.9% uptime while enhancing data security by integrating AWS Secrets Manager. I also automated online form processing workflows, improving data handling speed by 35% and reducing staff response time by 30%.',
        date: '2024-08-01',
        featured: false,
        banner: '/static/hello-world-banner.jpg',
        location: 'Great Neck, NY'
      }
    },
    {
      slug: 'work-experience-2',
      timecode: '05:2024-07:2024',
      frontmatter: {
        title: 'Software Engineer Intern @ Citywide Eye Care',
        abstract: 'As a Software Engineer Intern at Citywide Eye Care, I led the digital transformation of the clinic\'s website, migrating it from Google Sites to a dynamic, responsive React.js platform. I crafted a modern, accessible UI using React.js and Material-UI, ensuring seamless usability across desktop and mobile devices. I integrated an automated appointment booking system, streamlining the scheduling process and reducing administrative workload. These enhancements contributed to a 25% increase in patient appointments and significantly improved overall user experience and engagement.',
        date: '2024-05-01',
        featured: false,
        banner: '/static/hello-world-banner.jpg',
        location: 'Great Neck, NY'
      }
    },
    {
      slug: 'work-experience-1',
      timecode: '06:2023-08:2023',
      frontmatter: {
        title: 'Application Developer Intern @ ADP',
        abstract: 'Unlocking the power of real-time cost insights and streamlined deployment processes, my internship at ADP revolutionized decision-making by reducing time by 20% and increasing cost-effectiveness by 15%. Delve deeper into how I optimized querying speed, integrated AWS data, and automated manual processes to achieve a remarkable 71% boost in productivity across ADP\'s EFS teams.',
        date: '2023-06-01',
        featured: false,
        banner: '/static/hello-world-banner.jpg',
        location: 'Roseland, NJ'
      }
    }
  ],
  featured: {
    slug: 'work-experience-3',
    timecode: '02:30:00:00',
    frontmatter: {
      title: 'Jonathan Zhu',
      abstract: 'Full Stack Engineer skilled in React.js, AWS, SQL, and AI technologies.',
      date: '2025-03-19',
      featured: true,
      banner: '/static/modern-styling-in-react-banner.jpg',
      location: 'Remote'
    }
  }
};

export function Articles() {
  // Use the articlesData object directly
  const { posts, featured } = articlesData;
  const { width } = useWindowSize();
  const singleColumnWidth = 1190;
  const isSingleColumn = width <= singleColumnWidth;

  const postsHeader = (
    <header className={styles.header}>
      <Heading className={styles.heading} level={5} as="h1">
        <DecoderText text="Work Experience" />
      </Heading>
      <Barcode className={styles.barcode} />
    </header>
  );

  const postList = (
    <div className={styles.list}>
      {!isSingleColumn && postsHeader}
      {posts.map(({ slug, ...post }, index) => (
        <ArticlesPost key={slug} slug={slug} index={index} {...post} />
      ))}
      {Array(2)
        .fill()
        .map((skeleton, index) => (
          <SkeletonPost key={index} index={index} />
        ))}
    </div>
  );

  const featuredPost = <ArticlesPost {...featured} />;

  return (
    <article className={styles.articles}>
      <Section className={styles.content}>
        {!isSingleColumn && (
          <div className={styles.grid}>
            {postList}
            {featuredPost}
          </div>
        )}
        {isSingleColumn && (
          <div className={styles.grid}>
            {postsHeader}
            {featuredPost}
            {postList}
          </div>
        )}
      </Section>
      <Footer />
    </article>
  );
}

function Barcode({ className }) {
  return (
    <svg
      className={className}
      width="153"
      height="20"
      fill="currentColor"
      viewBox="0 0 153 20"
    >
      <path
        fillOpacity=".6"
        d="M153 0v20h-2V0h2Zm-4 0v20h-4V0h4Zm-6 0v20h-2V0h2Zm-4 4v3h-2V4h2Zm-5 0V0h3v4h-3Zm-2 0h2v6h-2V4Zm0 0h-2V0h2v4Zm-4-4v4h-4v5h-2v4h-5V9h3V6h-5V0h13Zm-11 13v3h-2v-3h2Zm-4-13v6h-2v4h2v4h-2v2h2v4h-4V0h4Zm-6 4V0h-2v4h2Zm-1 6V7h-4V4h-2V0h-2v4h-2V0H86v4h-2v3h-2v2h-2v4h6v3h-2v4h6v-4h-2v-3h-2V9h-2V7h4V4h3v9h2v7h7v-4h-5v-3h-2V9h2V7h3v3h2v4h6v-4ZM74 7v3h-2v2h2v8h-4V0h8v5h-3V4h-3v3h2Zm28 13h4v-4h-4v4Zm28-6v-4h-2v6h2v4h2v-6h-2Zm9 2v-6h-2v6h-2v4h4v-4Zm-12 4v-4h-4v4h4ZM0 20h2V0H0v20Zm4 0h4V0H4v20Zm6 0h2V0h-2v20Zm5 0h7V0h-7v20Zm12 0h-3V0h3v20Zm5 0h3v-4h5v-6h-5V6h7V3h3V0h-7v3h-3V0h-3v20ZM52 3v3h-3v3h-4V6h1V3h6Zm23 13h6v4h-6v-4Zm-29-6v3h3v-3h3v3h-2v6h-3v-3h-2v-3h-2v-3h3Zm8 6v3h-2v-3h2Zm3 0v3h2v-3h2v-3h-2v3h-2Zm0 0v-6h-3v6h3Zm4-7V6h2V0h-2v6h-2v3h2Zm5-3v3h-2V6h2Zm2 0h-2V3h2v3Zm-9-3V0h-2v3h2Z"
      />
    </svg>
  );
}

// Add default export for the Articles component
export default Articles;