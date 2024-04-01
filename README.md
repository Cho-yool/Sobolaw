# 소보로(SoboLaw)

#### 소보로(’소’송 초’보’들을 위한 법(law) 지침서)

본 프로젝트는 소송에 휘말린 사용자들에게 자신의 상황과 가장 유사한 판례를 통해 승소 확률을 예측할 수 있는 도움을 제공하는 것을 목표로 합니다. 또한, 소송과 관련된 다양한 기능들을 함께 제공하는 종합 법률 서비스 지원 플랫폼을 제작하는 것입니다.

서비스 URL : https://j10a604.p.ssafy.io/

## 1. 주요 기능 & 목적

![프로젝트 소개](./upload/image/프로젝트 소개.PNG)

단순 검색 기능만이 아닌, 승소에 필요한 부가기능을 통해 보다 더 편히 법률 서비스를 이용할 수 있도록 도움을 제공합니다.

## 2. 개발 환경

#### 백엔드 알아서 쓰세용

- **Spring boot 3.2.1**
  https://start.spring.io/
- **java 17**
  https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html

- **Elastic Search 7.17.18**
- **Logstash 7.10.2**
- **Kibana 7.10.2**

#### 프론트엔드

- **Node.js (up to 20.10.0)**
  https://nodejs.org/en/download/

```
//package.json
    "@ant-design/icons": "^5.3.4",
    "@ant-design/pro-components": "^2.6.49",
    "@fortawesome/fontawesome-svg-core": "^6.5.1",
    "@fortawesome/free-solid-svg-icons": "^6.5.1",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@reduxjs/toolkit": "^2.2.1",
    "@types/aos": "^3.0.7",
    "@types/node": "^20.12.2",
    "@types/react-transition-group": "^4.4.10",
    "antd": "^5.14.2",
    "aos": "^2.3.4",
    "axios": "^1.6.7",
    "firebase": "^10.9.0",
    "html2canvas": "^1.4.1",
    "josa": "^3.0.1",
    "jspdf": "^2.5.1",
    "query-string": "^9.0.0",
    "react": "^18.2.0",
    "react-canvas-confetti": "^2.0.7",
    "react-countup": "^6.5.2",
    "react-dom": "^18.2.0",
    "react-icons": "^5.0.1",
    "react-pretty-loading": "^1.0.9",
    "react-query": "^3.39.3",
    "react-redux": "^9.1.0",
    "react-router-dom": "^6.22.2",
    "react-to-print": "^2.15.1",
    "react-transition-group": "^4.4.5",
    "redux-persist": "^6.0.0",
    "swiper": "^11.1.0"

```

### 배포 환경 알아서 쓰세용

- **EC2 Ubuntu 20.04.6 LTS (GNU/Linux 5.15.0-1051-aws x86_64)**
- **Docker**
- **Jenkins**
- **Spring cloud gateway 3.2.2**
- **Srping cloud Neflix - Eureka 3.2.2**

### DB 설정 알아서 쓰세용

- **mysql 8.1.0**
  https://downloads.mysql.com/archives/community/
- **redis 7.2.3**
- dump 파일 위치 :

### IDE

- **IntelliJ IDEA 2023.3.2**
  https://www.jetbrains.com/ko-kr/idea/download/?section=windows
- **VisualStudio Code (up to 1.86.1)**
  https://code.visualstudio.com/Download

- **DBeaver 23.3.1** ?
  https://dbeaver.io/download/

## 3. 프로젝트 설계

### 화면정의서

https://docs.google.com/spreadsheets/d/1qCgAPlU9wz-RW0pP60K7Ob6Be6cQOX0YMfgii7YH50U/edit?usp=sharing

### 피그마

https://www.figma.com/file/SUE0cYTv1tI8OXvykMrvUv/%E1%84%8B%E1%84%89%E1%84%8B%E1%84%8B%E1%84%89%E1%84%8B's-team-library?type=design&node-id=0%3A1&mode=design&t=webwtd7FTnp1m6p8-1

### API 명세

[스웨거링크]

### ERD 설계

[소보로\_erd](./upload/image/_erd.png)

## 4. 서비스 화면(웹)

### 메인

![메인페이지](./upload/image/main.gif)

### 회원

- 로그인 및 회원가입

![로그인 페이지](./upload/image/login.gif)

- 회원 정보 조회

![회원정보조회 페이지](./upload/image/myinfo.gif)

- 회원 등급 수정

![변호사 신청 모달](./upload/image/apply_lawyer.gif)

- 내가 쓴 소장 조회

![소장 조회 페이지](./upload/image/mypaper.gif)

- 내가 쓴 소장 상세 조회

![소장 상세조회 페이지](./upload/image/mypaper_detail.gif)

- 내가 저장한 판례 조회

![저장한 판례 조회 페이지](./upload/image/mycase.gif)

- 저장한 판례 상세 조회

![판례 상세조회(하이라이트) 페이지](./upload/image/mycase_detail.gif)

### 검색

- 일반 판례 검색

![판례 검색 페이지](./upload/image/search.gif)

- 인기 판례 및 인기 법령 조회

![판례 검색 페이지](./upload/image/hottest.gif)

- 판례 상세 조회 및 요약, 하이라이트 기능

![판례 상세 조회 페이지](./upload/image/search_detail.gif)

- 맞춤형 판례 검색

![맞춤형 판례 추천 페이지](./upload/image/recommend.gif)

- 맞춤형 판례 검색 결과

![맞춤형 판례 추천 결과 페이지](./upload/image/recommend_result.gif)

### 부가기능

- 비용계산 페이지

![비용계산 페이지](./upload/image/calculator.gif)

- 소장작성 페이지

![소장작성 페이지](./upload/image/lawsuit.gif)

- 상담소 페이지

![상담소 페이지](./upload/image/board.gif)

- 법률용어사전 및 챗봇 컴포넌트

![법률용어사전](./upload/image/dict.gif)

![챗봇 페이지](./upload/image/chatbot.gif)

- 법률 뉴스 페이지

![법률 뉴스 페이지](./upload/image/news.gif)

### 그 외 페이지

- 관리자의 멤버 조회 및 변호사 신청 승인

![관리자 페이지](./upload/image/admin.gif)

## 5. 서비스 화면(앱)

### PWA(Progressive Web Application) 적용을 통해 모바일앱으로의 동작도 가능하도록 했습니다.

- 메인

![메인 페이지_앱](./upload/image/main_app.gif)

## 6. 주요 기능 소개

#### 1. 맞춤형 판례 추천

- 내용: 입력한 키워드에 맞춰 TF-IDF분석을 통한 맞춤형 판례 제공
- 사용 기술:
- 사용 이유:
-

#### 2. 일반 판례 및 법령 검색

- 내용 :
- 사용 기술 : Elastic Search
- 사용 이유 : 판매자가 작성한 키워드를 MySQL에서 조회 시 검색 속도 저하,  
  키워드 검색 시 한국어로 필터링이 어려움
- ELK를 통해 검색 속도 향상 및 score로 필터링하여 정확도 향상
- 한국어 분석기인 nori를 사용하여 한국어 검색 내용 정확도 개선

#### 3. 소장 작성

- 내용 : 판매자의 작성 정보로 맞춤형 소장 제공
- 사용 기술 :
- 사용 이유 :
-

### 7. 프로젝트 소개 UCC

![프로젝트 소개](./upload/video/ucc.mp4)

### 8. 팀원 소개 각자 깃허브 다쉴????

<table>
  <tbody>
    <tr>
      <td align="center"><a href=""><img src="width="100px;" alt=""/><br /><sub><b>FE 팀원 : 김현지</b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="100px;" alt=""/><br /><sub><b>FE 팀원 : 조성호</b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="100px;" alt=""/><br /><sub><b>FE 팀원 : 최근영</b></sub></a><br /></td>
     <tr/>
      <td align="center"><a href=""><img src="" width="100px;" alt=""/><br /><sub><b>BE 팀장 : 김종범</b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="100px;" alt=""/><br /><sub><b>BE 팀원 : 장재성</b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="100px;" alt=""/><br /><sub><b>BE 팀원 : 정소영</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>
