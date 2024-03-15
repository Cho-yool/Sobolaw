import React from 'react';
import styles from '../../styles/recommend/LoadingImage.module.css';

interface LoadingImageProps {
  progress: number;
}

const getLoadingMessage = (progress: number) => {
  if (progress <= 25) {
    return '입력된 텍스트를 단어로 분리하는 중...';
  } else if (progress <= 50) {
    return '분리된 단어의 중요도 계산 중...';
  } else if (progress <= 75) {
    return '사용자 조건에 맞는 판례 검색 중...';
  } else {
    return '검색된 판례를 준비하는 중...';
  }
};

const LoadingImage: React.FC<LoadingImageProps> = ({ progress }) => {
  const loadingMessage = getLoadingMessage(progress);
  const showFireworks = progress >= 100;

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.maskedImage}>
        <img src="/images/soboro_black.png" alt="Mask" />
      </div>
      {showFireworks && <div className={styles.fireworksEffect} style={{ display: 'block'}}></div>}
      <div className={styles.fullImage} style={{clipPath: `polygon(0 ${100 - progress}%, 100% ${100 - progress}%, 100% 100%, 0 100%)`}}>
        <img src="/images/soboro_color.png" alt="Loading" />
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${progress}%` }}></div>
      </div>
      <p className={styles.loadingText}>{loadingMessage} {progress}%</p>
    </div>
  );
};

export default LoadingImage;
