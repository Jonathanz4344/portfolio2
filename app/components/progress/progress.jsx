import { useRef, useEffect, useState } from 'react';
import styles from './progress.module.css';

export function Progress({ isAnimating = false }) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [visible, setVisible] = useState(false);
  const progressRef = useRef();
  const timeout = useRef(0);

  useEffect(() => {
    clearTimeout(timeout.current);

    if (isAnimating) {
      timeout.current = setTimeout(() => {
        setVisible(true);
      }, 500);
    } else if (animationComplete) {
      timeout.current = setTimeout(() => {
        setVisible(false);
      }, 300);
    }
  }, [isAnimating, animationComplete]);

  useEffect(() => {
    if (!progressRef.current) return;

    const controller = new AbortController();

    if (isAnimating) {
      return setAnimationComplete(false);
    }

    Promise.all(
      progressRef.current
        .getAnimations({ subtree: true })
        .map(animation => animation.finished)
    ).then(() => {
      if (controller.signal.aborted) return;
      setAnimationComplete(true);
    });

    return () => {
      controller.abort();
    };
  }, [isAnimating]);

  return (
    <div
      className={styles.progress}
      data-status={isAnimating ? 'loading' : 'idle'}
      data-visible={visible}
      data-complete={animationComplete}
      ref={progressRef}
    />
  );
}
