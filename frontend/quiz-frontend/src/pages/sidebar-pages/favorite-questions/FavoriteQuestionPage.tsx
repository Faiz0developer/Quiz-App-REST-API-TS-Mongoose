import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";

import FavoriteQuestion from "./components/FavoriteQuestion";
import { RootState } from "../../../store/store";

const FavoriteQuestionPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favQuestionData, setFavQuestionData] = useState<{}[]>();
  const token = useSelector((state: RootState) => state.token.token);

  useEffect(() => {
    const getFavQuestionsData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:3002/favquestion", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        setFavQuestionData(res.data.data.favQues);
      } catch (error) {
        console.log(error);
      }
    };
    getFavQuestionsData();
  }, [token]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <div className="my-quiz-loader-wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <span>Loading</span>
          </div>
        </div>
      ) : (
        <div className="pt-10">
          <h1 className="heading">Favorite Questions Collection</h1>
          <div className="p-4">
            {favQuestionData?.length ? (
              <>
                {favQuestionData?.map((favQuestion: any, index) => {
                  return (
                    <FavoriteQuestion
                      favQuestion={favQuestion}
                      index={index}
                      setFavQuestionData={setFavQuestionData}
                      favQuestionData={favQuestionData}
                      key={favQuestion._id}
                    />
                  );
                })}
              </>
            ) : (
              <div className="flex flex-col h-[30vh] items-center mt-20">
                <p className="text-center text-xl">Collection is empty.</p>
                <FallingLines
                  color="#4fa94d"
                  width="100"
                  visible={true}
                  // ariaLabel="falling-lines-loading"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteQuestionPage;
