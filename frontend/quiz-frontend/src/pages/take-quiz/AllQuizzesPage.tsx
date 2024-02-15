import React, { useState } from "react";

import AllQuizHero from "./components/AllQuizHero";
import "../../styles/allQuiz.css";
import AllQuizzes from "./components/AllQuizzes";
import { ConnectionResponse } from "../../utils/interfaces";

const AllQuizzesPage: React.FC<ConnectionResponse> = ({setIsConnectionError}) => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="pb-10">
      <AllQuizHero searchInput={searchInput} setSearchInput={setSearchInput} />
      <AllQuizzes searchInput={searchInput} setIsConnectionError={setIsConnectionError}/>
    </div>
  );
};

export default AllQuizzesPage;
