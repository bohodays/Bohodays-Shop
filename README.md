<br/>

# Bohodays
- 1인 프로젝트

<br>

## 📆 프로젝트 기간

### 23.07.12 ~ 현재
- 기획 및 설계 : 23.07.12 ~ 23.07.16
- 프로젝트 1차 구현 : 23.07.17 ~ 23.07.31 - v1.0.0

<br />

## ❓기획 배경

> 평소 이커머스 분야에 관심이 있었고,
> 백엔드, 프론트엔드, DB 모두 혼자 구현하여 각각의 분야에 대한 이해력을 높이고자 했습니다. <br />
> 그리고 React Query와 같은 최신 라이브러리들을 적용하기에 이커머스 프로젝트가 최적이라는 생각이 들어 `Bohodays` 쇼핑몰 프로젝트를 기획하게 되었습니다.


<br />

## 💡 서비스 소개

### Bohodays

> Bohodays는 카테고리별 의류 쇼핑몰 서비스입니다. <br />
> 구매자는 원하는 의류를 카테고리별로 볼 수 있고, 원하는 물품을 장바구니에 담을 수 있습니다. <br />
> 판매자는 admin 페이지를 통해 원하는 물품을 등록하여 판매할 수 있습니다. <br />


<br/>

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;" /> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <br>
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&color=06B6D4&logo=TailwindCSS&logoColor=FFFFFF" style="height : auto; margin-left : 10px; margin-right : 10px;"/> 


<br />


</details>

<br />

## 🗂️ 라이브러리 및 서비스 선정 이유

- React-Query
- Firebase
- Cloudinary
- TailwindCSS
- uuid

<br />

## 🖥️ 주요기능

### I. 회원가입 및 로그인

<br />

### II. Main 페이지

<br />

### III. 제품 목록 페이지

<br />

### IV. 제품 상세 페이지

<br />

### V. 제품 등록 페이지

<br>

## 📝 이슈사항 및 회고

### firebase를 이용한 구글 소셜 로그인 구현 과정에서 포트 번호 차이로 인한 로그인 이슈 발생
- vite로 앱 생성 시 기본 포트번호는 5173이지만 firebase의 기본 localhost 포트번호는 3000을 사용함
- vite의 포트 번호를 3000으로 바꿔주어 해결함
```JavaScript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
```

<br>


