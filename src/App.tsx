import { useEffect, useState } from "react";
import "./App.css";
import { IQuestion, IUserAnswer } from "./types";
import { getQuestionList } from "./services/fetchQuestions";
import { Difficulty, totalQuestions } from "./constants";
import AppSpinner from "./components/Spinner";
import { Box, Heading } from "@chakra-ui/react";
import AppButton from "./components/AppButton/indes";
import QuestionCard from "./components/QuestionCard";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [userAnswer, setUserAnswer] = useState<IUserAnswer[]>([]);
  const [loading, setLoading] = useState<boolean>(true); //타입스크립트가 충분히 추론을 할 수 있는 경우에는 굳이 타입을 명시하지 않는다.
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionListing = await getQuestionList(
        totalQuestions,
        Difficulty.EASY
      );
      console.log(questionListing);
      setQuestions(questionListing);
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  const startQuizGame = () => {
    setStartQuiz(true);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (gameOver) return;
    setChosenAnswer(e.currentTarget.innerText);
    const correct = questions[questionNumber]?.correct_answer === chosenAnswer;

    // 정답이면 score+1
    if (correct) setScore((previous) => previous + 1);
    const answerObject = {
      question: questions[questionNumber]?.question,
      answer: e.currentTarget.innerText,
      correct,
      correctAnswer: questions[questionNumber]?.correct_answer,
    };

    setUserAnswer((previous) => [...previous, answerObject]);
  };

  const nextQuestion = (): void => {
    setChosenAnswer(null);
    const nextQuestion = questionNumber + 1;
    if (totalQuestions === nextQuestion) {
      setGameOver(true);
    }
    setQuestionNumber(nextQuestion);
  };

  const replayQuiz = (): void => {
    setStartQuiz(false);
    setGameOver(false);
    setQuestionNumber(0);
    setScore(0);
    setUserAnswer([]);
  };

  return (
    <main>
      {loading && (
        <div className="app-spinner">
          <AppSpinner
            speed="0.65s"
            emptyColor="gray.200"
            color="purple"
            size="lg"
            thickness="5px"
          />
        </div>
      )}

      {userAnswer.length === questionNumber &&
      !gameOver &&
      !loading &&
      !startQuiz ? (
        <div className="greeting-box">
          <Box boxShadow="base" p="6" rounded="md" bg="white" maxW="560px">
            <Heading as="h2" size="lg" mb={2}>
              퀴즈 앱
            </Heading>
            <p>
              참 또는 거짓으로 대답할 수 있는 {totalQuestions}개의 질문이
              제시됩니다.
            </p>
            <AppButton
              colorScheme="purple"
              variant="solid"
              onClick={startQuizGame}
              value="Start Quiz Game"
            />
          </Box>
        </div>
      ) : null}
      {!loading && !gameOver && startQuiz && (
        <Box boxShadow="base" p="6" rounded="md" bg="white" maxW="560px">
          <QuestionCard
            question={questions[questionNumber].question}
            category={questions[questionNumber].category}
            checkAnswer={checkAnswer}
            chosenAnswer={chosenAnswer}
            totalQuestion={totalQuestions}
            questionNumber={questionNumber}
          />
          <AppButton
            disabled={chosenAnswer === null}
            colorScheme="purple"
            variant="solid"
            onClick={nextQuestion}
            value="Next Question"
            className="next-button"
            width="full"
          />
        </Box>
      )}
      {gameOver && (
        <>
          <Box boxShadow="base" p="6" rounded="md" bg="white" maxW="560px">
            <Box mb={4}>
              <Box fontWeight="bold" as="h3" fontSize="4xl">
                Game Over!
              </Box>
            </Box>
            <Box as="h3" fontSize="xl">
              Your score is {score}/{totalQuestions}.
            </Box>
          </Box>
          {userAnswer.map((answer, index) => (
            <Box key={index}>
              <div className="answer-list">
                <Box fontSize="md" fontWeight="bold">
                  Q.
                  <p dangerouslySetInnerHTML={{ __html: answer.question }} />
                </Box>
                <ul>
                  <li>You answered:{answer.answer}</li>
                  <li>Correct answer:{answer.correctAnswer}</li>
                </ul>
              </div>
            </Box>
          ))}
          <AppButton
            colorScheme="purple"
            variant="solid"
            onClick={replayQuiz}
            value="Replay Quiz"
            width="full"
          />
        </>
      )}
    </main>
  );
}

export default App;
