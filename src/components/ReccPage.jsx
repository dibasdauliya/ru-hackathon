import React from 'react'
import { useNavigate } from 'react-router-dom'

const ReccPage = ({
  goal,
  sex,
  age,
  weight,
  height,
  weightUnit,
  heightUnit
}) => {
  // Helper functions to calculate BMR, TDEE, and recommendations
  const calculateBMR = (sex, weight, height, age) => {
    // BMR calculation logic based on sex
    if (sex === 'Male') {
      return 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age
    } else {
      return 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age
    }
  }

  const calculateTDEE = (bmr, activityLevel) => {
    // TDEE calculation based on activity level
    switch (activityLevel) {
      case 'sedentary':
        return bmr * 1.2
      case 'lightly active':
        return bmr * 1.375
      case 'moderately active':
        return bmr * 1.55
      case 'very active':
        return bmr * 1.725
      case 'extremely active':
        return bmr * 1.9
      default:
        return bmr * 1.375 // Default to lightly active
    }
  }

  const generateRecommendations = (goal, tdee) => {
    let recommendations = []

    if (goal === 'Weightloss') {
      // Recommendations for weight loss
      recommendations = [
        {
          title: 'Drink Water',
          description: `Drink at least ${Math.round(
            weight * 0.033
          )} liters of water per day`,
          duration: '5 minutes',
          frequency: 7
        },
        {
          title: 'Calorie Deficit',
          description: `Aim for a daily calorie deficit of 500-1000 calories`,
          duration: '10 minutes',
          frequency: 7
        },
        {
          title: 'Protein Intake',
          description: `Consume at least ${Math.round(
            weight * 2.2
          )} grams of protein per day`,
          duration: '15 minutes',
          frequency: 7
        },
        {
          title: 'Walk',
          description: `Walk at least 10,000 steps per day`,
          duration: '30 minutes',
          frequency: 7
        },
        {
          title: 'Cardio',
          description: `Perform 30-60 minutes of cardio exercise`,
          duration: '20 minutes',
          frequency: 5
        },
        {
          title: 'Strength Training',
          description: `Engage in strength training exercises`,
          duration: '20 minutes',
          frequency: 3
        },
        {
          title: 'High-Intensity Interval Training (HIIT)',
          description: `Perform 20-30 minutes of HIIT workout`,
          duration: '20 minutes',
          frequency: 2
        }
      ]
    } else if (goal === 'Bulk') {
      // Recommendations for bulking
      recommendations = [
        {
          title: 'Drink Water',
          description: `Drink at least ${Math.round(
            weight * 0.033
          )} liters of water per day`,
          duration: '5 minutes',
          frequency: 7
        },
        {
          title: 'Calorie Surplus',
          description: `Aim for a daily calorie surplus of 300-500 calories`,
          duration: '10 minutes',
          frequency: 7
        },
        {
          title: 'Protein Intake',
          description: `Consume at least ${Math.round(
            weight * 2.2
          )} grams of protein per day`,
          duration: '15 minutes',
          frequency: 7
        },
        {
          title: 'Strength Training',
          description: `Engage in strength training exercises`,
          duration: '30 minutes',
          frequency: 5
        },
        {
          title: 'Cardio',
          description: `Perform 20-30 minutes of cardio exercise`,
          duration: '20 minutes',
          frequency: 3
        },
        {
          title: 'Yoga or Stretching',
          description: `Practice yoga or stretching for flexibility and recovery`,
          duration: '20 minutes',
          frequency: 2
        }
      ]
    } else if (goal === 'Maintain') {
      // Recommendations for maintaining
      recommendations = [
        {
          title: 'Drink Water',
          description: `Drink at least ${Math.round(
            weight * 0.033
          )} liters of water per day`,
          duration: '5 minutes',
          frequency: 7
        },
        {
          title: 'Calorie Maintenance',
          description: `Aim to consume around ${Math.round(
            tdee
          )} calories per day`,
          duration: '10 minutes',
          frequency: 7
        },
        {
          title: 'Protein Intake',
          description: `Consume at least ${Math.round(
            weight * 1.6
          )} grams of protein per day`,
          duration: '15 minutes',
          frequency: 7
        },
        {
          title: 'Strength Training',
          description: `Engage in strength training exercises`,
          duration: '30 minutes',
          frequency: 3
        },
        {
          title: 'Cardio',
          description: `Perform 30-60 minutes of cardio exercise`,
          duration: '20 minutes',
          frequency: 3
        },
        {
          title: 'Mindfulness Practice',
          description: `Practice mindfulness or meditation for mental well-being`,
          frequency: 2,
          duration: '20 minutes'
        }
      ]
    }

    localStorage.setItem('recommendations', JSON.stringify(recommendations))
    return recommendations
  }

  // Convert height to cm if provided in feet
  const heightInCm = heightUnit === 'ft' ? height * 30.48 : height

  // Convert weight to kg if provided in pounds
  const weightInKg = weightUnit === 'lb' ? weight * 0.453592 : weight

  // Calculate BMR and TDEE
  const bmr = calculateBMR(sex, weightInKg, heightInCm, age)
  const tdee = calculateTDEE(bmr, 'moderately active') // Assuming moderately active lifestyle

  // Generate recommendations based on goal and TDEE
  const recommendations = generateRecommendations(goal, tdee)

  // Categorize recommendations into easy, medium, and hard
  const easyRecs = recommendations.filter((rec) => rec.frequency === 7)
  const mediumRecs = recommendations.filter(
    (rec) => rec.frequency >= 3 && rec.frequency < 7
  )
  const hardRecs = recommendations.filter((rec) => rec.frequency < 3)

  const navigate = useNavigate()

  const handleCardClick = () => {
    // go to "/main route"
    navigate('/main')
  }

  return (
    <div className = 'bg-slate-100 px-5 py-10 rounded-md shadow-sm'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Daily Recommendations</h2>
      <div className='mb-8 p-3 cursor-pointer rounded-md shadow-sm bg-slate-50' onClick={handleCardClick}>
        <h3 className='text-xl font-bold mb-2'>Easy</h3>
        <ul>
          {easyRecs.map((rec, index) => (
            <li key={index} className='mb-2'>
              <strong>{rec.title}:</strong> {rec.description}
            </li>
          ))}
        </ul>
      </div>
      <div className='mb-8 p-3 cursor-pointer rounded-md shadow-sm bg-slate-50' onClick={handleCardClick}>
        <h3 className='text-xl font-bold mb-2'>Medium</h3>
        <ul>
          {mediumRecs.map((rec, index) => (
            <li key={index} className='mb-2'>
              <strong>{rec.title}:</strong> {rec.description}
            </li>
          ))}
        </ul>
      </div>
      <div className='mb-8 p-3 cursor-pointer rounded-md shadow-sm bg-slate-50' onClick={handleCardClick}>
        <h3 className='text-xl font-bold mb-2'>Hard</h3>
        <ul>
          {hardRecs.map((rec, index) => (
            <li key={index} className='mb-2'>
              <strong>{rec.title}:</strong> {rec.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ReccPage
