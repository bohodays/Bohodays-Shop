import { User as firebaseUser, UserInfo, UserMetadata } from "firebase/auth";

// 유저의 정보 타입 (firebase의 Google 소셜 로그인을 통해 얻음)
interface User extends firebaseUser {
  isAdmin?: boolean;
}

export type userType =
  | User
  | {
      isAdmin?: boolean;
      uid?: string | undefined;
      photoURL?: string | null;
      displayName?: string | null;
    }
  | null;
