import React, { useState } from 'react';

const GoalSelection = () => {
  const [goal, setGoal] = useState('');
  const [sex, setSex] = useState('');
  const [showSexInput, setShowSexInput] = useState(false);
  const [age, setAge] = useState('');
  const [showAgeInput, setShowAgeInput] = useState(false);

  const handleGoalSelection = (selectedGoal) => {
    setGoal(selectedGoal);
    setShowSexInput(true);
  };

  const handleSexInput = (e) => {
    setSex(e.target.value);
  };

  const handleSexSubmit = () => {
    setShowSexInput(false);
    setShowAgeInput(true);
  };

  const handleAgeInput = (e) => {
    setAge(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {goal && !showSexInput && !showAgeInput && (
        <h1 className="text-3xl mb-4">What is your Goal?</h1>
      )}

      {goal && showSexInput && (
        <>
          <h1 className="text-3xl mb-4">What is your Sex?</h1>
          <input
            type="text"
            placeholder="Enter Sex"
            value={sex}
            onChange={handleSexInput}
            className="border border-gray-300 rounded-md p-2 mb-4"
          />
          <button
            onClick={handleSexSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </>
      )}

      {goal && !showSexInput && showAgeInput && (
        <>
          <h1 className="text-3xl mb-4">What is your Age?</h1>
          <input
            type="text"
            placeholder="Enter Age"
            value={age}
            onChange={handleAgeInput}
            className="border border-gray-300 rounded-md p-2 mb-4"
          />
        </>
      )}

      {!goal && (
        <div className="flex justify-around w-full mb-4">
          <button
            onClick={() => handleGoalSelection('Weightloss')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Weightloss
          </button>
          <button
            onClick={() => handleGoalSelection('Bulk')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Bulk
          </button>
          <button
            onClick={() => handleGoalSelection('Maintain')}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Maintain
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalSelection;
