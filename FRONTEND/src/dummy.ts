function dummydata1() {
  return {
    memberId: 123,
    name: "김종범",
    email: "johndoe@example.com",
    birthday: "1990-01-01",
    memberKeyword: [
      {
        memberKeywordId: 1,
        memberId: 123,
        word: "강제추행",
      },
      {
        memberKeywordId: 2,
        memberId: 123,
        word: "강간",
      },
      {
        memberKeywordId: 3,
        memberId: 123,
        word: "사기",
      },
    ],
    memberRecents: [
      {
        recentPrecedentId: 1,
        memberId: 123,
        precedentId: 456,
      },
      {
        recentPrecedentId: 2,
        memberId: 123,
        precedentId: 789,
      },
    ],
  };
}

function dummydata2() {
  return {
    memberPrecedentId: 1,
    memberId: 123,
    precedentId: 456,
    highlights: [
      {
        memberPrecedentHighlightId: 1,
        memberPrecedent: "Example Member Precedent",
        location: "Example Location",
        highlightType: "MEMO",
        content: 12345,
      },
      {
        memberPrecedentHighlightId: 2,
        memberPrecedent: "Example Member Precedent",
        location: "Example Location",
        highlightType: "MEMO",
        content: 54321,
      },
    ],
  };
}

export { dummydata1, dummydata2 };
