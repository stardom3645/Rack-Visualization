# RackML Server (ABLESTACK)

RackML Server는 랙 시각화 XML인 RackML을 편집하고 시각화할 수 있는 단일 실행 파일 기반의 웹 애플리케이션입니다.
ABLESTACK MOLD에서 작동하기 위해 원본 프로젝트에 추가로
Express와 MySQL을 기반으로 한 API 서버와 패키징 요소가 포함되어 있습니다.

---

## 📦 주요 기능

- SVG 기반 랙 시각화 (RackML XML 포맷)
- 에디터 기반 RackML 수정 및 저장
- MySQL 기반 RackML 설정 저장/조회
- SVG 내보내기(PNG, SVG), 편집기 모달 UI
- `pkg`를 통해 단일 실행파일로 빌드 가능

---

## 🗂️ 프로젝트 구조

```bash
Rack-Visualization/
├── public/
│   ├── index.html         # 메인 페이지
│   ├── app.js             # 시각화 로직 및 클라이언트 동작
│   ├── style.css          # 스타일시트
│   ├── syntax.html        # 문법 도움말
│   ├── sample.png         # 샘플 이미지
│   └── screenshot.png     # 스크린샷
├── server.js              # Express 서버 + API
├── package.json           # 의존성 및 pkg 빌드 설정
```
---

## 개발 및 테스트

### 1. 의존성 설치 (개발용)

```bash
npm install
```

### 2. MySQL 테이블 생성 (개발용)
```
CREATE TABLE IF NOT EXISTS rackml_config (
  zone_id INT NOT NULL,
  name VARCHAR(128) NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (zone_id, name)
);
```

### 3. 서버 실행 (개발용)

```bash
node server.js
```

브라우저에서 확인:
http://localhost:7077



## 패키징

### 1. package.json 설정

```
"pkg": {
  "assets": [
    "public/**/*"
  ],
  "targets": ["node18-linux-x64"],
  "outputPath": "dist"
}
```


### 2. 빌드 실행

```
npx pkg .
```


### 3. 실행

```
./dist/rackml-server
```
