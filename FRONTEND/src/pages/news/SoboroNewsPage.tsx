import React, { useEffect, useState, useRef } from 'react';
import { getNewsList } from '../../api/lawsearch';
import styles from '../../styles/news/SoboroNewsPage.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation, Mousewheel } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface NewsItem {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
}

interface Slide {
  title: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: '손해배상',
    image: 'images/damage.png',
  },
  {
    title: '사기',
    image: 'images/fraud.png',
  },
  {
    title: '횡령',
    image: 'images/spoliation.png',
  },
  {
    title: '계약위반',
    image: 'images/contract.png',
  },
  {
    title: '고용법',
    image: 'images/employment.png',
  },
  {
    title: '청구이의',
    image: 'images/claimObjection.png',
  },
  {
    title: '소유권분쟁',
    image: 'images/ownership.png',
  },
];

const SoboroNewsPage: React.FC = () => {
  const [newsData, setNewsData] = useState<{ [key: string]: NewsItem[] }>({});
  const [currentCategory, setCurrentCategory] = useState<string>(slides[0].title);
  const debounceTimeoutRef = useRef<number | null>(null);

  const removeTags = (text: string) => {
    return text.replace(/<[^>]*>?/gm, '').replace(/&quot;/g, '"');
  };

  useEffect(() => {
    const fetchAllNews = async () => {
      const newsDataMap: { [key: string]: NewsItem[] } = {};

      try {
        for (const slide of slides) {
          const newsItems = await getNewsList(slide.title);
          newsDataMap[slide.title] = newsItems;
        }
        setNewsData(newsDataMap);
      } catch (error) {
        console.error('뉴스 목록 조회 오류:', error);
      }
    };

    fetchAllNews();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 450,
      once: false,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [newsData[currentCategory]]);

  const handleSlideChange = (swiper: any) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const activeIndex = swiper.realIndex;
      const activeSlide = slides[(activeIndex % slides.length)];
      setCurrentCategory(activeSlide.title);
    }, 300);
  };


  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.description}>
          <h1 className={styles.title} data-aos="fade-down">오늘의 소보로 뉴스</h1>
          <p data-aos="fade-down">
            추천 판례나 법령과 관련된<br/>  최신 날짜의뉴스를 빠르게 확인해보세요!<br/> 
            이미지에 마우스를 올려놓고 스크롤을 하면<br/>  주제에 맞는 뉴스를 볼 수 있습니다!
          </p>
        </div>
        <div className={styles.swiperWrapper}>
          <Swiper
            effect={'coverflow'}
            centeredSlides={true}
            slidesPerView={2}
            loop={true}
            mousewheel={true}
            navigation={{
              nextEl: `.${styles.swiperButtonNext}`,
              prevEl: `.${styles.swiperButtonPrev}`,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 300,
              modifier: 0.5,
              slideShadows: true,
            }}
            pagination={{
              el: `${styles.swiperPagination}`,
              clickable: true,
              bulletClass: styles.swiperPaginationBullet,
              bulletActiveClass: styles.swiperPaginationBulletActive,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Mousewheel]}
            className={styles.swiperContainer}
            onSlideChange={handleSlideChange}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <img src={slide.image} alt={slide.title} />
                <div className={styles.slideContent}>
                  <h2>{slide.title}</h2>
                </div>
              </SwiperSlide>
            ))}
            <div className={`${styles.swiperButtonNext} ${styles.swiperNavButton}`}></div>
            <div className={`${styles.swiperButtonPrev} ${styles.swiperNavButton}`}></div>
          </Swiper>
          <div className={styles.swiperPagination}></div>
        </div>
      </div>
      <div className={styles.newsCards}>
        {newsData[currentCategory]?.map((news, index) => (
          <div
            key={index}
            className={styles.newsItem}
            data-aos="fade-up"
            data-aos-delay={index * 50}
          >
            <h3 className={styles.newsTitle} data-aos="fade-up">{removeTags(news.title)}</h3>
            <p className={styles.newsDescription}>
              {removeTags(news.description).split(' ').slice(0, 20).join(' ')}...
            </p>
            <a href={news.link} target="_blank" rel="noopener noreferrer" className={styles.newsLink}>
              뉴스 원문 보러가기
            </a>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SoboroNewsPage;