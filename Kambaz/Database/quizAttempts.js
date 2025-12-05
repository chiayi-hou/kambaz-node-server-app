export default [
  {
    _id: "A1001",
    quizId: "Q101",
    course: "RS101",        // 可選，方便查
    userId: "U123",         // 學生 ID
    attemptNumber: 1,
    startedAt: "2025-11-21T15:00:00.000Z",
    submittedAt: "2025-11-21T15:10:00.000Z",
    score: 15,              // 總分
    answers: [
      { questionId: "01", answer: "2" },
      { questionId: "02", answer: true },
      { questionId: "03", answer: "4" },
    ],
  },
];
