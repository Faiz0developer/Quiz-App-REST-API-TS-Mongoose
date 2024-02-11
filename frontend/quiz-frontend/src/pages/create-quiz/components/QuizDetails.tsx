import React, { Dispatch, ReactNode, ReactPortal, SetStateAction } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Carousel from 'react-multi-carousel';

interface IProps{
    quizDetails:boolean,
    setQuizDetails:Dispatch<SetStateAction<boolean>>,
    name:string,
    setName:Dispatch<SetStateAction<string>>,
    category:string,
    setCategory:Dispatch<SetStateAction<string>>,
    isPublicQuiz:boolean,
    children:JSX.Element | string | number | boolean | {},
    filterUsers:{}[],
    showSelectItems:boolean,
    setShowSelectItems:Dispatch<SetStateAction<boolean>>,
    allUsers:any,
    allowedUser:string[],
    setAllowedUsers:Dispatch<SetStateAction<string[]>>,
    passingPercentage:string,
    setPassingPercentage:Dispatch<SetStateAction<string>>,
}

const QuizDetails:React.FC<IProps> = ({quizDetails,name,setName,category,setCategory,isPublicQuiz,children,filterUsers,setShowSelectItems,showSelectItems,allUsers,setAllowedUsers,
allowedUser,setQuizDetails,passingPercentage,setPassingPercentage}) => {
  return (
    // <QuizDetails
    //     quizDetails={quizDetails}
    //     name={name}
    //     setName={setName}
    //     category={category}
    //     setCategory={setCategory}
    //     isPublicQuiz={isPublicQuiz}
    //     filterUsers={filterUsers}
    //     setShowSelectItems={setShowSelectItems}
    //     showSelectItems={showSelectItems}
    //     allUsers={allUsers}
    //     setAllowedUsers={setAllowedUsers}
    //     allowedUser={allowedUser}
    //     setQuizDetails={setQuizDetails}
    //     passingPercentage={passingPercentage}
    //     setPassingPercentage={setPassingPercentage}
    //   >
    //     <input
    //       type="checkbox"
    //       defaultChecked
    //       ref={radioRef}
    //       onChange={checkBoxHandler}
    //       className="cursor-pointer"
    //     />
    //   </QuizDetails>
    <div>Hey</div>
    // <div className="create-quiz-details w-[90%] min-[650px]:w-[75%] min-[800px]:w-[60%]">
    //     {quizDetails ? (
    //       <h1 className="w-full h-[46px] p-2.5 text-3xl rounded-md text-[#064E3B]">
    //         {name}
    //       </h1>
    //     ) : (
    //       <input
    //         type="text"
    //         className="name-input w-full"
    //         placeholder="Quiz name"
    //         value={name}
    //         onChange={(e) =>
    //           setName(e.target.value)
    //         }
    //       />
    //     )}

    //     <div className="flex justify-between w-full mt-3">
    //       <div
    //         className={`${
    //           quizDetails
    //             ? "flex px-4 py-2 rounded-md"
    //             : "dropDown before:top-[60%] after:top-[75%] flex flex-col gap-1"
    //         } `}
    //       >
    //         <label>Category</label>
    //         {quizDetails ? (
    //           <h1 className="text-center text-[#064E3B]">: {category}</h1>
    //         ) : (
    //           <select
    //             name="category"
    //             id=""
    //             value={category}
    //             onChange={(e) => setCategory(e.target.value)}
    //           >
    //             <option value="exam">Exam</option>
    //             <option value="test">Test</option>
    //           </select>
    //         )}
    //       </div>
    //       <div
    //         className={`flex gap-2 ${
    //           quizDetails ? "px-4 py-2 rounded-md " : "flex-col "
    //         }`}
    //       >
    //         <label>Passing Percentage</label>
    //         {quizDetails ? (
    //           <h1 className="text-center text-[#064E3B]">
    //             : {passingPercentage}%
    //           </h1>
    //         ) : (
    //           <input
    //             type="number"
    //             className="name-input"
    //             value={passingPercentage}
    //             onChange={(e) =>
    //               setPassingPercentage(e.target.value)
    //             }
    //           />
    //         )}
    //       </div>
    //     </div>
        
    //     <div
    //       className={`flex items-center mt-3 w-full ${
    //         quizDetails ? "flex-col py-3" : "justify-around gap-8 h-[80px]"
    //       } `}
    //     >
    //       <div
    //         className={`flex items-center gap-1 ${
    //           quizDetails ? "px-4 py-2  rounded-md" : ""
    //         }`}
    //       >
    //         {quizDetails || <label>Public</label>}
    //         {quizDetails ? (
    //           <h1 className="text-[#064E3B]">
    //             {isPublicQuiz ? "Public Quiz" : "Private Quiz"}
    //           </h1>
    //         ) : (
    //             {children}
    //         //   <input
    //         //     type="checkbox"
    //         //     defaultChecked
    //         //     ref={radioRef}
    //         //     onChange={checkBoxHandler}
    //         //     className="cursor-pointer"
    //         //   />
    //         )}
    //       </div>
    //       {isPublicQuiz || (
    //         <>
    //           {quizDetails ? (
    //             <div className="allowed-user-container py-2 mt-1 w-full">
    //               <h1 className="text-center">Allowed Users</h1>
    //               <Carousel
    //                 additionalTransfrom={0}
    //                 arrows={false}
    //                 autoPlay
    //                 autoPlaySpeed={5000}
    //                 centerMode={true}
    //                 className=""
    //                 containerClass="container-with-dots"
    //                 dotListClass=""
    //                 draggable
    //                 focusOnSelect={false}
    //                 infinite
    //                 itemClass="item-class"
    //                 keyBoardControl
    //                 minimumTouchDrag={80}
    //                 pauseOnHover
    //                 renderArrowsWhenDisabled={false}
    //                 renderButtonGroupOutside={false}
    //                 renderDotsOutside={false}
    //                 responsive={{
    //                   desktop: {
    //                     breakpoint: {
    //                       max: 3000,
    //                       min: 1024,
    //                     },
    //                     items: 5,
    //                     partialVisibilityGutter: 40,
    //                   },
    //                   mobile: {
    //                     breakpoint: {
    //                       max: 464,
    //                       min: 0,
    //                     },
    //                     items: 1,
    //                     partialVisibilityGutter: 30,
    //                   },
    //                   tablet: {
    //                     breakpoint: {
    //                       max: 1024,
    //                       min: 464,
    //                     },
    //                     items: 3,
    //                     partialVisibilityGutter: 30,
    //                   },
    //                 }}
    //                 rewind={false}
    //                 rewindWithAnimation={true}
    //                 rtl={false}
    //                 shouldResetAutoplay
    //                 showDots={false}
    //                 sliderClass=""
    //                 slidesToSlide={1}
    //                 swipeable
    //               >
    //                 {filterUsers.map((user:any) => {
    //                   return (
    //                     <div className="user-card" key={user?._id}>
    //                       <h1 className=" text-center text-[#064E3B]">
    //                         {user?.name}
    //                       </h1>
    //                     </div>
    //                   );
    //                 })}
    //               </Carousel>
    //             </div>
    //           ) : (
    //             <div className="select-container">
    //               <div
    //                 className="select-btn"
    //                 onClick={() => setShowSelectItems(!showSelectItems)}
    //               >
    //                 <span>Select Users</span>
    //                 <span>
    //                   {showSelectItems ? <IoIosArrowUp /> : <IoIosArrowDown />}
    //                 </span>
    //               </div>
    //               {showSelectItems && (
    //                 <ul className="select-items">
    //                   {allUsers?.map((user:any) => {
    //                     return (
    //                       <li key={user._id}>
    //                         <input
    //                           type="checkbox"
    //                           value={user._id}
    //                           onChange={(e) =>
    //                             setAllowedUsers([
    //                               ...allowedUser,
    //                               e.target.value,
    //                             ])
    //                           }
    //                         />
    //                         <label htmlFor="">{user.name}</label>
    //                       </li>
    //                     );
    //                   })}
    //                 </ul>
    //               )}
    //             </div>
    //           )}
    //         </>
    //       )}
    //     </div>

    //     <h1 className="w-full text-right">
    //       <span
    //         className="done-btn"
    //         onClick={() => {
    //           setQuizDetails(!quizDetails);
    //         }}
    //       >
    //         {quizDetails ? "Update" : "Done"}
    //       </span>
    //     </h1>
    //   </div>
  )
}

export default QuizDetails


