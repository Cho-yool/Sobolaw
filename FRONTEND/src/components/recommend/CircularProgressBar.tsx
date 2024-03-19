import React, { useEffect, useState } from 'react';
import styles from '../../styles/recommend/CircularProgressBar.module.css'; // Update with your actual path
interface CircularProgressBarProps {
    percentage: number;
    size?: number;
    isMobile?: boolean;
  }
  
  const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ percentage, size = 120, isMobile = false }) => {
    const radius = size / 2;
    const stroke = size * 0.05;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // 천천히 채워지는 애니메이션
        const progressInterval = setInterval(() => {
            setProgress((prevProgress) => {
                const nextProgress = prevProgress + 1;
                if (nextProgress > percentage) {
                    clearInterval(progressInterval);
                    return percentage;
                }
                return nextProgress;
            });
        }, 20);

        return () => clearInterval(progressInterval);
    }, [percentage]);

    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <svg height={size} width={size} className={styles.progressCircle}>
            <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#BF8438', stopOpacity: 1 }} />
                    <stop offset="25%" style={{ stopColor: '#EAA854', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#FFD966', stopOpacity: 1 }} />
                    <stop offset="75%" style={{ stopColor: '#FEDA89', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#f2b25f', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <circle
                stroke="#F3E7C0"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                stroke="url(#progressGradient)"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className={styles.progressBar}
            />
            <text
                x="50%"
                y="50%"
                dy=".3em"
                textAnchor="middle"
                className={styles.progressText}
                style={{ transform: 'rotate(90deg)', transformOrigin: `${radius}px ${radius}px` }}
            >
                {`${progress}%`}
            </text>
        </svg>
    );
};


export default CircularProgressBar;
