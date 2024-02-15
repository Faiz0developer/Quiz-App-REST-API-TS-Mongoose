import React from 'react'

import CreateQuiz from './components/CreateQuiz'
import '../../styles/createQuiz.css'
import { ConnectionResponse } from '../../utils/interfaces'

const CreateQuizPage:React.FC<ConnectionResponse> = ({setIsConnectionError}) => {
  return (
    <CreateQuiz setIsConnectionError={setIsConnectionError}/>
  )
}

export default CreateQuizPage