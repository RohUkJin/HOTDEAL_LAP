# 핫딜 연구소 (HOTDEAL LAB)

AI를 활용한 실시간 커뮤니티 핫딜 수집 및 스마트 추천 플랫폼입니다. 
서버리스(Serverless) 아키텍처를 기반으로 구축되었으며 클라이언트, 데이터 파이프라인, AI 추론 로직이 연동되어 작동합니다.

## 시스템 아키텍처 및 동작 원리

### 1. 데이터 수집 파이프라인 (Data Pipeline)
* **크롤링 및 적재:** 독립적으로 동작하는 백그라운드 Python 크롤러 스크립트가 주기적으로 주요 커뮤니티의 핫딜 게시판을 순회하며 상품명, 가격 변동치, 링크, 커뮤니티 추천수 및 댓글수를 수집합니다.
* **데이터 필터링:** 수집된 데이터는 정규화 과정을 거쳐 Supabase (PostgreSQL)의 핫딜 전용 테이블에 저장됩니다. 이때 AI와 텍스트 분석 알고리즘이 상품의 카테고리(식품, 전자기기, 의류 등)를 자동 분류합니다.

> 🔗 **자세한 데이터 수집 및 처리 과정은 아래 스크레이퍼(Scraper) 전용 저장소를 참고해 주세요.**
> [HOTDEAL_SCRAPER Repository](https://github.com/RohUkJin/HOTDEAL_SCRAPER)

### 2. 프론트엔드 및 사용성 (Frontend layer)
* **프레임워크:** Next.js (App Router) 기반으로 구축되어 빠른 렌더링을 제공합니다. 
* **UI/UX 구현:** 전체 베스트 상품 영역과 카테고리별 핫딜 영역으로 나뉩니다. React Swiper를 활용한 카드 UI로 구현되었으며, framer-motion을 통해 테마 변경이나 모달 창 렌더링 시 최적화된 애니메이션을 제공합니다.
* **사용자 참여 피드백 블라인드:** 각 핫딜 카드에는 '변동/종료 신고' 기능이 제공되며, 특정 횟수 이상 누적 신고된 품목은 프론트 단에서 자동으로 흐림 처리(Dim) 및 링크 비활성화 처리가 이루어집니다.

### 3. AI 기반 추천 알고리즘 (Generative AI Integration)
* **자연어 검색 처리:** 사용자가 "주말 캠핑용 가성비 먹거리 찾아줘"와 같은 일상적인 자연어를 입력하면, Next.js Server Actions를 통해 백엔드 환경에서 안전하게 Google Gemini API로 프롬프트가 전송됩니다.
* **의미론적 벡터 변환:** 구글의 `gemini-embedding-001` 모델을 활용하여 사용자의 질문에 담긴 핵심 문맥과 의도를 768차원의 벡터(Vector) 데이터로 변환합니다. 백엔드(Supabase Vector DB)에 사전 적재된 모든 핫딜 상품들 역시 고유의 임베딩 값을 가지고 있습니다.
* **유사도 기반 시맨틱 검색:** 이제 단순한 텍스트 매칭(`ilike`)이 아닌, 코사인 유사도 연산 등 벡터 거리를 측정하는 의미론적 검색(Semantic Similarity Search)이 수행됩니다. 입력된 키워드와 단어 형태가 달라도, 내포된 의미가 부합하면 AI가 찰떡같이 찾아옵니다.
* **결과 도출:** 검색된 데이터 중 자체 추천 점수, 커뮤니티 추천수, 댓글수의 가중치까지 결합된 최적의 맞춤 AI 핫딜 TOP 결과가 사용자에게 최종 노출됩니다.

### 4. 에러 핸들링 및 안정성 (AI 맞춤 추천 전용 Fallback)
* 유저가 직접 '맞춤 핫딜'을 검색할 때 사용되는 **AI 맞춤 추천 통신**에서, 메인 추론 모델(`gemini-2.5-flash`)의 API Rate Limit(429 Error, 사용량 초과)가 감지될 경우 에러를 반환하지 않고, 즉시 백업용 경량화 모델(`gemini-2.5-flash-lite`)로 트래픽을 자동 우회(Fallback)시키는 로직이 구현되어 있어 안정적인 서비스 연속성을 보장합니다. (※ 해당 로직은 일 2회 백그라운드에서 진행되는 전체 상품 수집·분석용이 아닌, 유저 요청 시 실시간 응답용으로 분리되어 작용합니다.)

## 기술 스택 (Tech Stack)
* **Client:** Next.js 15, React(TypeScript), Styled-Components, Framer Motion
* **Backend:** Next.js Server Actions 
* **DB/BaaS:** Supabase (PostgreSQL)
* **AI:** Google Gen AI SDK (Gemini)
