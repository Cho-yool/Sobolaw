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

export type KeywordType = {
  key: string;
  title: string;
};

export type MemberKeyword = {
  memberKeywordId: number;
  memberId: number;
  word: string;
};

export type MemberRecent = {
  recentPrecedentId: number;
  memberId: number;
  precedentId: number;
};

export type MemberInfo = {
  memberId: number;
  name: string;
  email: string;
  birthday: string;
  memberKeyword: MemberKeyword[];
  memberRecents: MemberRecent[];
};

// interface Highlight {
//   memberPrecedentHighlightId: number;
//   memberPrecedent: string;
//   location: string;
//   highlightType: string;
//   content: number;
// }

export type MemberPrecedent = {
  precedentId: number;
  caseName: string;
  caseNumber: string;
  judgmentDate: string;
  judgment: string;
  courtName: string;
  caseType: string;
  verdictType: string;
  judicialNotice: string;
  verdictSummary: string;
  referencedStatute: string;
  referencedCase: string;
  caseContent: string;
  hit: number;
};

export type MemberLawsuit = {
  type: "Insult" | "Fraud" | "Defamation";
  title: string | null;
  createdTime: string;
  defendantName: string | null;
};
