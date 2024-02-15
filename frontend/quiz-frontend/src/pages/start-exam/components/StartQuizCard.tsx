import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { RootState } from "../../../store/store";

interface StartQuizProps {
  question: {
    _id: string;
    question: string;
    questionNumber: number;
    options: { 1: ""; 2: ""; 3: ""; 4: "" };
  };
  index: number;
  attemptedQuestion: {};
  setAttemptedQuestion: Dispatch<SetStateAction<{}>>;
}

const StartQuizCard: React.FC<StartQuizProps> = ({
  question,
  index,
  attemptedQuestion,
  setAttemptedQuestion,
}) => {
  const [isFav, setIsFav] = useState(false);
  const [myFavQuestionColection, setMyFavQuestionCollection] = useState<any>(
    []
  );
  const token = useSelector((state: RootState) => state.token.token);

  useEffect(
    () =>
      setIsFav(
        myFavQuestionColection.some(
          (favQuestion: any) => question._id === favQuestion._id
        )
      ),
    [myFavQuestionColection, question._id]
  );

  const toggleFavItem = async () => {
    if (isFav) {
      setMyFavQuestionCollection((prevData: []) => {
        return prevData.filter(
          (favQuestion: { _id: string }) => question._id !== favQuestion._id
        );
      });
    } else {
      setMyFavQuestionCollection((prevItem: any) => {
        return [...prevItem, question];
      });
      try {
        const res = await axios.post(
          "https://quizzle-app-backend.vercel.app/favquestion",
          { question: question.question, options: question.options },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status === "success") {
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const selectOption = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    let stringIndex = String(index + 1);

    setAttemptedQuestion({ ...attemptedQuestion, [stringIndex]: value });
  };

  return (
    <div className="start-quiz-card" key={question._id}>
      <h1 className="py-4 text-2xl">
        <span>{question.questionNumber})</span> {question.question}
      </h1>
      <div className="quiz-options">
        <input
          type="radio"
          name={`option-${index}`}
          value="1"
          onChange={selectOption}
        />
        {/* <p>1</p> */}
        <h5>{question.options[1]}</h5>
      </div>
      <div className="quiz-options">
        <input
          type="radio"
          name={`option-${index}`}
          value="2"
          onChange={selectOption}
        />
        {/* <p>2</p> */}
        <h5>{question.options[2]}</h5>
      </div>
      <div className="quiz-options">
        <input
          type="radio"
          name={`option-${index}`}
          value="3"
          onChange={selectOption}
        />
        {/* <p>3</p> */}
        <h5>{question.options[3]}</h5>
      </div>
      <div className="quiz-options">
        <input
          type="radio"
          name={`option-${index}`}
          value="4"
          onChange={selectOption}
        />
        {/* <p>4</p> */}
        <h5>{question.options[4]}</h5>
      </div>
      <div className="flex items-center justify-between mt-3">
        {/* <div className="flex items-center px-3 gap-0.5">
          <label htmlFor="">1</label>
          <input
            type="radio"
            name={`option-${index}`}
            value="1"
            onChange={selectOption}
          />
          <label htmlFor="" className="ml-2.5">
            2
          </label>
          <input
            type="radio"
            name={`option-${index}`}
            value="2"
            onChange={selectOption}
          />
          <label htmlFor="" className="ml-2.5">
            3
          </label>
          <input
            type="radio"
            name={`option-${index}`}
            value="3"
            onChange={selectOption}
          />
          <label htmlFor="" className="ml-2.5">
            4
          </label>
          <input
            type="radio"
            name={`option-${index}`}
            value="4"
            onChange={selectOption}
          />
        </div> */}
        <button
          className={`heart mr-1 ${isFav ? "fvrt" : "unFvrt"}`}
          onClick={() => toggleFavItem()}
        ></button>
      </div>
    </div>
  );
};

export default StartQuizCard;
