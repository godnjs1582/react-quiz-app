import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";
import AppButton from "../AppButton/indes";

interface QuestionCardProps {
  question: string;
  category: string;
  totalQuestion?: number;
  questionNumber?: number;
  chosenAnswer: string | null;
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  category,
  totalQuestion,
  questionNumber,
  checkAnswer,
  chosenAnswer,
}) => {
  return (
    <Box bg="white" w="100%">
      <Box mb={6} fontSize="md" fontWeight="bold" textTransform="uppercase">
        Your progress: {questionNumber}/{totalQuestion}
      </Box>

      <Box fontSize="sm" mb={1}>
        {category}
      </Box>

      <Heading as="h1" size="lg">
        <p dangerouslySetInnerHTML={{ __html: question }}></p>
      </Heading>

      <Flex direction="column">
        <Box w="100%" mt={4} mb={4}>
          <AppButton
            colorScheme="purple"
            variant={chosenAnswer === "True" ? "solid" : "outline"}
            onClick={checkAnswer}
            value="True"
            width="full"
          />
        </Box>
        <Spacer />
        <Box w="100%" mb={4}>
          <AppButton
            colorScheme="purple"
            variant={chosenAnswer === "False" ? "solid" : "outline"}
            onClick={checkAnswer}
            value="False"
            width="full"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default QuestionCard;
