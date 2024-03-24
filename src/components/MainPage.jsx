import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import PlusIcon from '../icons/plus'

export default function MainPage() {
  const [events, setEvents] = useState([])

  const [dialogDetails, setDialogDetails] = useState({
    open: false,
    title: '',
    description: '',
    frequency: 0
  })

  const [timeDetail, setTime] = useState('')

  const recTasks = [
    {
      title: 'Drink Water',
      description: '2 glasses',
      frequency: 4
    },
    {
      title: 'Cardio',
      description: '30 minutes',
      frequency: 3
    },
    {
      title: 'Yoga',
      description: '1 hour',
      frequency: 2
    }
  ]

  const [tasks, setTasks] = useState([])

  function handleSetTask(e) {
    e.preventDefault()

    console.log({ val: e.target })

    setTasks([
      ...tasks,
      {
        title: dialogDetails.title,
        description: dialogDetails.description,
        frequency: dialogDetails.frequency,
        time: timeDetail
      }
    ])

    setDialogDetails({ ...dialogDetails, open: false })
  }

  return (
    <div className='w-screen min-h-screen bg-gym-pic relative bg-cover p-8'>
      <main className='p-4 bg-white rounded-md mx-auto max-w-3xl'>
        {/* avatar image with emoji to indicate reaction */}

        <header className='flex gap-6 items-center'>
          <div className='relative w-fit'>
            <img
              src='https://randomuser.me/api/portraits/men/30.jpg'
              alt='avatar'
              className='w-20 h-20 rounded-full border'
            />
            <span className='text-2xl absolute top-0 -right-2'>😊</span>
          </div>

          <h1 className='text-3xl font-semibold'>
            Welcome back, <span className='text-violet-500'>John</span>!
          </h1>
        </header>

        {/* current date & time */}
        <section className='mt-6'>
          <h2 className='text-xl font-semibold'>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
          <p className='text-gray-600'>
            {new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </section>

        {/* drinking water, excercise staus of user*/}

        <section className='flex gap-4 mt-4'>
          <div className='flex-1'>
            <h2 className='text-xl font-semibold'>Daily Water Intake</h2>
            <p className='text-gray-600'>3/8 glasses</p>
          </div>

          <div className='flex-1'>
            <h2 className='text-xl font-semibold'>Exercise</h2>
            <p className='text-gray-600'>1/3 workouts</p>
          </div>
        </section>

        <div
          className={`fixed inset-0 z-40 flex items-center justify-center ${
            dialogDetails.open ? '' : 'hidden'
          }`}
          style={{
            backdropFilter: 'blur(2px)'
          }}>
          <dialog
            open={dialogDetails.open}
            className='mt-6 p-3 absolute z-50 border rounded-lg bg-white shadow-xl min-w-80'>
            <h2 className='text-xl font-semibold'>Add Task</h2>
            <form className='mt-4' onSubmit={handleSetTask}>
              <div className='space-y-2'>
                <h2 className='text-xl font-semibold'>{dialogDetails.title}</h2>
                <p className='text-gray-600'>{dialogDetails.description}</p>
                {/* frequency */}
                <p className='text-gray-600'>
                  {dialogDetails.frequency} times a day
                </p>
              </div>

              {/* set time */}
              <input
                type='time'
                className='border p-2 rounded-lg w-full mt-4'
                placeholder='Set Time'
                onChange={(e) => setTime(e.target.value)}
              />

              <div className='flex gap-2'>
                <button
                  className='bg-violet-800 text-white p-2 rounded-lg mt-4'
                  type='submit'
                  onClick={handleSetTask}>
                  Add Task
                </button>
                <button
                  onClick={() =>
                    setDialogDetails({ ...dialogDetails, open: false })
                  }
                  className='bg-red-500 text-white p-2 rounded-lg mt-4 ml-2'>
                  Close
                </button>
              </div>
            </form>
          </dialog>
        </div>

        <section className='mt-6'>
          <h2 className='text-xl font-semibold'>Recommended Tasks</h2>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            {recTasks.map((task, index) => (
              <div
                key={index}
                className='bg-gray-100 p-4 rounded-md flex justify-between gap-2 relative'>
                <span className='absolute -left-3 -top-3 bg-white text-black p-1 w-8 h-8 flex items-center justify-center rounded-full border'>
                  {task.frequency -
                    tasks.filter((t) => t.title == task.title).length}
                  x
                </span>

                <div>
                  <h3 className='text-lg font-semibold'>{task.title}</h3>
                  <p className='text-gray-600'>{task.description}</p>
                </div>

                <button
                  className='bg-violet-800 text-white p-2 rounded-lg mt-2'
                  onClick={() =>
                    setDialogDetails({
                      open: true,
                      title: task.title,
                      description: task.description,
                      frequency: task.frequency
                    })
                  }>
                  <PlusIcon />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* calander layout and pull data from google calander. layout similar to Google Calander. all time in rows and task in some empty in some */}

        <section className='mt-6'>
          <h2 className='text-xl font-semibold'>Today's Schedule</h2>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <div
                  key={index}
                  className='bg-gray-100 p-4 rounded-md flex gap-4 items-center'>
                  <div>
                    <span className='text-lg'>{task.time} </span>
                  </div>

                  <div>
                    <h3 className='text-lg font-semibold'>{task.title}</h3>
                    <p className='text-gray-600'>{task.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className='bg-gray-100 p-4 rounded-md'>
                <h3 className='text-lg font-semibold'>No task added</h3>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
