export type UserState = {
  userId: number;
  nickname: string;
  accessToken: string;
  refreshToken: string;
  precedents: number[];
};

export type MypaperWide = {
  key: string;
  type: string;
  id: number;
  name: string;
  target: string;
  date: string;
  tags: string[];
};

export type MypaperNarrow = {
  key: string;
  name: string;
  type: string;
  id: number;
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

export type Highlights = {
  memberPrecedentHightlightId: number;
  memberPrecedentId: number;
  main: string;
  location: number[];
  highlightType: string;
  content: string;
};

export type memberPrecedents = {
  memberPrecedentId: number;
  memberId: number;
  precedentId: number;
  highlights: Highlights;
};

export type MemberInfo = {
  memberId: number;
  name: string;
  email: string;
  birthday: string | null;
  memberKeyword: MemberKeyword[];
  memberRecents: MemberRecent[];
  memberPrecedents: memberPrecedents[];
};

export type MemberPrecedent = {
  precedentId: number;
  memberPrecedentId: number;
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
  id: number;
  type: "Insult" | "Fraud" | "Defamation";
  title: string | null;
  createdTime: string;
  defendantName: string | null;
};

export type DefamationForm = {
  // lawsuitId: number;
  title: string;
  plaintiffName: string;
  plaintiffResidentRegistrationNumber: string;
  plaintiffAddress: string;
  plaintiffPhoneNumber: string;
  defendantName: string;
  defendantAddress: string;
  defendantPhoneNumber: string;
  defendantIdentificationDetails: string;
  incidentDate: string;
  incidentTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  location: string;
  defamationContent: string;
  isFalseAccusation: boolean;
  relatedPeople: string;
  evidence: string;
  submissionDate: string;
  policeStationTeam: string;
};

export type FraudForm = {
  title: string;
  plaintiffName: string;
  plaintiffResidentRegistrationNumber: string;
  plaintiffAddress: string;
  plaintiffPhoneNumber: string;
  defendantName: string;
  defendantAddress: string;
  defendantPhoneNumber: string;
  contactDate: string;
  contactTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  tradeSite: string;
  tradedItem: string;
  depositDate: string;
  depositTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  depositAmount: number;
  contactMethod: string;
  isCashDeposit: boolean;
  bankName: string;
  accountNumber: string;
  evidence: string;
  policeStationTeam: string;
};

export type InsultForm = {
  title: string;
  plaintiffName: string;
  plaintiffResidentRegistrationNumber: string;
  plaintiffAddress: string;
  plaintiffPhoneNumber: string;
  plaintiffNickname: string;
  defendantName: string;
  defendantNickname: string;
  defendantAddress: string;
  defendantPhoneNumber: string;
  incidentDate: string;
  incidentTime: string;
  onlineServiceType: string;
  webServiceDetails: string;
  problemSpeech: string;
  reasonsForInsult: string;
  relatedPeopleCount: string;
  witness1: string;
  witness2: string;
  witness3: string;
  insultDuration: string;
  insultFrequency: string;
  circumstancesForIdentification: string;
  evidence: string;
  submissionDate: string;
  policeStationTeam: string;
};

export interface TimeContent {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface FraudDetails {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  plaintiffName: string;
  setPlaintiffName: React.Dispatch<React.SetStateAction<string>>;
  isPlaintiff: boolean;
  setIsplaintiff: React.Dispatch<React.SetStateAction<boolean>>;
  plaintiffResidentRegistrationNumber: string;
  setPlaintiffResidentRegistrationNumber: React.Dispatch<
    React.SetStateAction<string>
  >;
  plaintiffMainAddress: string;
  setPlaintiffMainAddress: React.Dispatch<React.SetStateAction<string>>;
  plaintiffSubAddress: string;
  setPlaintiffSubAddress: React.Dispatch<React.SetStateAction<string>>;
  plaintiffPhoneNumber: string;
  setPlaintiffPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  defendantName: string;
  setDefendantName: React.Dispatch<React.SetStateAction<string>>;
  isDefendantName: boolean;
  setIsDefendantName: React.Dispatch<React.SetStateAction<boolean>>;
  isDefendantAddress: boolean;
  setIsDefendantAddress: React.Dispatch<React.SetStateAction<boolean>>;
  isDefendantPhoneNumber: boolean;
  setIsDefendantPhoneNumber: React.Dispatch<React.SetStateAction<boolean>>;
  defendantMainAddress: string;
  setDefendantMainAddress: React.Dispatch<React.SetStateAction<string>>;
  defendantSubAddress: string;
  setDefendantSubAddress: React.Dispatch<React.SetStateAction<string>>;
  defendantPhoneNumber: string;
  setDefendantPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  incidentDate: string;
  setIncidentDate: React.Dispatch<React.SetStateAction<string>>;
  incidentTime: TimeContent;
  setIncidentTime: React.Dispatch<React.SetStateAction<TimeContent>>;
  paperIDate: string;
  setPaperIDate: React.Dispatch<React.SetStateAction<string>>;
  paperITime: string;
  setPaperITime: React.Dispatch<React.SetStateAction<string>>;
  tradedItem: string;
  setTradedItem: React.Dispatch<React.SetStateAction<string>>;
  tradeSite: string;
  setTradeSite: React.Dispatch<React.SetStateAction<string>>;
  directSite: string;
  setDirectSite: React.Dispatch<React.SetStateAction<string>>;
  contact: string[];
  setContact: React.Dispatch<React.SetStateAction<string[]>>;
  disposalMethod: number | undefined;
  setDisposalMethod: React.Dispatch<React.SetStateAction<number | undefined>>;
  bankName: string;
  setBankName: React.Dispatch<React.SetStateAction<string>>;
  accountNumber: string;
  setAccountNumber: React.Dispatch<React.SetStateAction<string>>;
  damageMoney: string;
  setDamageMoney: React.Dispatch<React.SetStateAction<string>>;
  moneyDate: string;
  setMoneyDate: React.Dispatch<React.SetStateAction<string>>;
  moneyTime: string;
  setMoneyTime: React.Dispatch<React.SetStateAction<string>>;
  evidence: string;
  setEvidence: React.Dispatch<React.SetStateAction<string>>;
  evidenceEtc: boolean;
  setEvidenceEtc: React.Dispatch<React.SetStateAction<boolean>>;
  evidenceList: string[];
  setEvidenceList: React.Dispatch<React.SetStateAction<string[]>>;
  policeStation: string;
  setPoliceStation: React.Dispatch<React.SetStateAction<string>>;
}