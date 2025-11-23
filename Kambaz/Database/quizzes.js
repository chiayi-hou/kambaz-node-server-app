export default [
  {
    _id: "Q101",
    course: "RS101",
    title: "Q1 - HTML",
    instructions: "Please complete the quiz before the due date.",
    published: true,

    // Canvas 上的 Quiz Type / Assignment Group / Points
    type: "Graded Quiz",      // or "Practice Quiz", "Graded Survey" ...
    points: 15,               // 建議 = questions 的 points 總和
    assignmentGroup: "Quizzes", // 原本的 assign_group

    // Options
    shuffleAnswers: true,
    timeLimit: 20,            // min
    multipleAttempts: false,
    maxAttempts: 1,
    showCorrectAnswers: true,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,

    // Dates（字串即可，前端再轉 Date）
    due: "2016-03-01",
    availableFrom: "2016-02-01",
    availableUntil: "2016-03-01",

    questions: [
      {
        _id: "01",
        title: "Question 1",
        points: 5,
        question: "What is 1+1?",
        type: "Multiple Choice",  // or "True/False", "Fill in the Blank"
        choices: ["2", "3", "4"],
        answers: ["2"],           // correct choices
      },
      {
        _id: "02",
        title: "Question 2",
        points: 5,
        question: "1+1=2",
        type: "True/False",
        choices: ["True", "False"],
        answers: [true],          // 或你也可以用 "True"，但就保持一致
      },
      {
        _id: "03",
        title: "Question 3",
        points: 5,
        question: "2+2=____?",
        type: "Fill in the Blank",
        choices: [],
        // 可以接受多種答案
        answers: ["4", "four"],
      },
    ],
  },
];
