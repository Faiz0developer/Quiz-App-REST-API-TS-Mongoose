import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { CiSearch } from "react-icons/ci";

interface AllQuizPropsType {
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
}

const AllQuizHero: React.FC<AllQuizPropsType> = ({
  searchInput,
  setSearchInput,
}) => {
  const searchInputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchInput(e.target.value);
  };
  return (
    <div className="quiz-hero">
      <div className="mt-16 w-full">
        <h1 className="text-5xl min-[500px]:text-6xl lg:text-7xl text-[#fff] md:text-[#fff] px-2 pt-0 min-[800px]:pt-2 text-center">
          Test Your Skills
        </h1>
        <p className="mt-4 text-xl px-2 text-[#fff] md:text-[#d2513e] text-center">
          Choose your favorite quiz and play <br /> with your skills
        </p>
      </div>
      <div className="search-input">
        <input
          type="search"
          className="bg-[#64748B] h-full focus:outline-none"
          placeholder="Search (small letters)"
          onChange={searchInputHandler}
          value={searchInput}
        />
        <CiSearch className="icon" />
        <div className="drop-down">
          <select
            name=""
            id=""
            className="filter"
            onChange={searchInputHandler}
          >
            <option value="all">All Quiz</option>
            <option value="exam" className="p-2">
              Exam
            </option>
            <option value="test">Test</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AllQuizHero;
