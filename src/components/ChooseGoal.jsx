import { useState } from 'react'
import ReccPage from './ReccPage'

const GoalSelection = () => {
  const [goal, setGoal] = useState('')
  const [sex, setSex] = useState('')
  const [showSexInput, setShowSexInput] = useState(false)
  const [age, setAge] = useState('')
  const [showAgeInput, setShowAgeInput] = useState(false)
  const [weight, setWeight] = useState('')
  const [showWeightInput, setShowWeightInput] = useState(false)
  const [height, setHeight] = useState('')
  const [showHeightInput, setShowHeightInput] = useState(false)
  const [weightUnit, setWeightUnit] = useState('kg')
  const [heightUnit, setHeightUnit] = useState('cm')

  const [showBMICalculator, setShowCalculateBMI] = useState(false)

  const handleGoalSelection = (selectedGoal) => {
    setGoal(selectedGoal)
    setShowSexInput(true)
  }

  const handleSexInput = (e) => {
    setSex(e.target.value)
  }

  const handleSexSubmit = () => {
    setShowSexInput(false)
    setShowAgeInput(true)
  }

  const handleAgeInput = (e) => {
    setAge(e.target.value)
  }

  const handleAgeSubmit = () => {
    setShowAgeInput(false)
    setShowWeightInput(true)
  }

  const handleWeightInput = (e) => {
    setWeight(e.target.value)
  }

  const handleWeightSubmit = () => {
    setShowWeightInput(false)
    setShowHeightInput(true)
  }

  const handleHeightInput = (e) => {
    setHeight(e.target.value)
  }

  const handleHeightSubmit = () => {
    setShowHeightInput(false)

    setShowCalculateBMI(true)
    // Here you can do something with all the collected data
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {goal &&
        !showSexInput &&
        !showAgeInput &&
        !showWeightInput &&
        !showHeightInput}

      {showBMICalculator && (
        <ReccPage
          goal={goal}
          sex={sex}
          age={age}
          weight={weight}
          height={height}
          weightUnit={weightUnit}
          heightUnit={heightUnit}
        />
      )}

      {goal && showSexInput && (
        <>
          <div className = "bg-slate-100 w-[25rem] h-[20rem] rounded-md shadow-md flex flex-col items-center justify-center">
          <h1 className='text-3xl mb-4'>What is your Sex?</h1>
          <select
            value={sex}
            onChange={handleSexInput}
            className='border border-gray-300 rounded-md p-2 mb-4'>
            <option value=''>Select Sex</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
          <button
            onClick={handleSexSubmit}
            className='bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
            Submit
          </button>
          </div>
          
        </>
      )}

      {goal && !showSexInput && showAgeInput && (
        <>
          <div className = "bg-slate-100 w-[25rem] h-[20rem] rounded-md shadow-md flex flex-col items-center justify-center">
          <h1 className='text-3xl mb-4'>What is your Age?</h1>
          <input
            type='number'
            placeholder='Enter Age'
            value={age}
            onChange={handleAgeInput}
            className='border border-gray-300 rounded-md p-2 mb-4'
          />
          <button
            onClick={handleAgeSubmit}
            className='bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
            Submit
          </button>
          </div>
        </>

      )}

      {goal && !showSexInput && !showAgeInput && showWeightInput && (
        <>
          <div className = "bg-slate-100 w-[25rem] h-[20rem] rounded-md shadow-md flex flex-col items-center justify-center">
          <h1 className='text-3xl mb-4'>What is your Weight?</h1>
          <input
            type='number'
            placeholder={`Enter Weight (${weightUnit})`}
            value={weight}
            onChange={handleWeightInput}
            className='border border-gray-300 rounded-md p-2 mb-4'
          />
          <select
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
            className='border border-gray-300 rounded-md p-2 mb-4'>
            <option value='kg'>kg</option>
            <option value='lb'>lb</option>
          </select>
          <button
            onClick={handleWeightSubmit}
            className='bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
            Submit
          </button>
          </div>
        </>
      )}

      {goal &&
        !showSexInput &&
        !showAgeInput &&
        !showWeightInput &&
        showHeightInput && (
          <>
            <div className = "bg-slate-100 w-[25rem] h-[20rem] rounded-md shadow-md flex flex-col items-center justify-center">
            <h1 className='text-3xl mb-4'>What is your Height?</h1>
            <input
              type='number'
              placeholder={`Enter Height (${heightUnit})`}
              value={height}
              onChange={handleHeightInput}
              className='border border-gray-300 rounded-md p-2 mb-4'
            />
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
              className='border border-gray-300 rounded-md p-2 mb-4'>
              <option value='cm'>cm</option>
              <option value='ft'>ft</option>
            </select>
            <button
              onClick={handleHeightSubmit}
              className='bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              Submit
            </button>
            </div>
          </>
        )}

      {!goal && (
        <>
          <div className = "bg-slate-100 w-[25rem] h-[20rem] rounded-md shadow-md flex flex-col items-center justify-center">
          <h1 className='text-3xl mb-4'>What is your Goal?</h1>
          <div className='flex justify-center gap-2 w-full mb-4'>
            <button
              onClick={() => handleGoalSelection('Weightloss')}
              className='bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              Weight Loss
            </button>
            <button
              onClick={() => handleGoalSelection('Bulk')}
              className='bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              Bulk
            </button>
            <button
              onClick={() => handleGoalSelection('Maintain')}
              className='bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              Maintain
            </button>
          </div>
          </div>
        </>
      )}
    </div>
  )
}

export default GoalSelection
