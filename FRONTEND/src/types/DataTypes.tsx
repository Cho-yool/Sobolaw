export type UserState = {
  userId: number;
  nickname: string;
  accessToken: string;
  refreshToken: string;
};

export type MypaperWide = {
  key: string;
  name: string;
  target: string;
  date: string;
  tags: string[];
};

export type MypaperNarrow = {
  key: string;
  name: string;
};
