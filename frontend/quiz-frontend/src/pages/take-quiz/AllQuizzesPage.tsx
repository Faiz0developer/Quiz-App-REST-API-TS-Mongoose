import React, { useState } from "react";

import AllQuizHero from "./components/AllQuizHero";
import "../../styles/allQuiz.css";
import AllQuizzes from "./components/AllQuizzes";

const AllQuizzesPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="pb-10">
      <AllQuizHero searchInput={searchInput} setSearchInput={setSearchInput} />
      <AllQuizzes searchInput={searchInput} />
    </div>
  );
};

export default AllQuizzesPage;
