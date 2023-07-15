import { User } from "firebase/auth";

// 유저의 정보 타입 (firebase의 Google 소셜 로그인을 통해 얻음)
export type userType = User | null;
