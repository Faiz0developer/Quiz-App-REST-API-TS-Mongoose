import React, { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import axios from "axios";

import { RootState } from "../../store/store";
import "../../styles/report.css";

const ReportPage: React.FC = () => {
  const [allReports, setAllReports] = useState<[]>();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state: RootState) => state.token.token);
  const allPublishedQuiz = useSelector(
    (state: RootState) => state.allPublishedQuiz.publishedQuiz
  );

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:3002/report/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllReports(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchReportData();
  }, [token]);

  const gettingQuiz: any = (quizId: string) => {
    return allPublishedQuiz.find(
      (publishQuiz: { _id: string }) => publishQuiz._id === quizId
    );
  };

  return (
    <div className="px-10 pb-16 pt-10">
      <div>
        <h1 className="text-center text-xl min-[400px]:text-3xl md:text-4xl text-[#164E63] pt-4 pb-6 font-[serif]">
          Quiz Reports
        </h1>
        {allReports?.length === 0 ? (
          <div className="flex flex-col items-center mt-20">
            <p className="text-center text-xl">No result to show</p>
            <FallingLines
              color="#4fa94d"
              width="100"
              visible={true}
              // ariaLabel="falling-lines-loading"
            />
          </div>
        ) : (
          <div
            className={`reports-card-container ${isLoading ? "pt-0" : "pt-0"}`}
          >
            {allReports?.map((report: any) => {
              return (
                <div key={report._id}>
                  {isLoading ? (
                    <div className="main-item">
                      <div className="animated-background h-12 mb-5"></div>

                      <div className=" w-full mt-10 flex flex-col gap-4">
                        <div className="animated-background h-8 w-3/4"></div>
                        <div className="animated-background h-8 w-3/4"></div>
                        <div className="animated-background h-8 w-[90%]"></div>
                        <div className="animated-background h-8 w-3/4 mx-auto"></div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`report-card bg-[#E9D5FF] px-2 ${
                        report.result === "Pass"
                          ? "hover:bg-[#22C55E]"
                          : "hover:bg-[#EF4444]"
                      }`}
                    >
                      <div className="h-16">
                        <h1 className="text-xl md:text-2xl text-[#164E63]">
                          {gettingQuiz(report.quizId)?.name}
                        </h1>
                      </div>
                      <div className="flex flex-col px-2 gap-4">
                        <h1>Marks: {report.score}</h1>
                        <h1>out of: {report.total}</h1>
                        <h1>Percentage: {report.percentage}%</h1>
                        <h1
                          className={`text-lg text-center mt-4 text-[#fff] uppercase`}
                        >
                          {report.result}
                        </h1>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
