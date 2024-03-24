import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import PlusIcon from '../icons/plus'

export default function MainPage() {
  const { user, isAuthenticated, isLoading } = useAuth0()

  const [userDetails, setUserDetails] = useState({ username: '', image: '' })

  const [dialogDetails, setDialogDetails] = useState({
    open: false,
    title: '',
    description: '',
    frequency: 0
  })

  const [timeDetail, setTime] = useState({ start: '', end: '' })

  const [recTasks, setRecTasks] = useState([])

  //   get recTasks from local storage
  useEffect(() => {
    const recTasks = JSON.parse(localStorage.getItem('recommendations'))
    setRecTasks(recTasks)
  }, [])

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (isAuthenticated) {
      setUserDetails({ username: user.name, image: user.picture })
    }
  }, [isAuthenticated, user])

  function handleSetTask(e) {
    e.preventDefault()

    setTasks((prevTasks) => {
      const isColliding = prevTasks.some((task) => {
        const taskStartTime = new Date(`1970-01-01T${task.startTime}Z`)
        const taskEndTime = new Date(`1970-01-01T${task.endTime}Z`)
        const newTaskStartTime = new Date(`1970-01-01T${timeDetail.start}Z`)
        const newTaskEndTime = new Date(`1970-01-01T${timeDetail.end}Z`)

        // Check if new task collides with existing task
        if (
          (newTaskStartTime >= taskStartTime &&
            newTaskStartTime <= taskEndTime) ||
          (newTaskEndTime >= taskStartTime && newTaskEndTime <= taskEndTime)
        ) {
          return true
        }

        return false
      })

      if (isColliding) {
        // Show error message
        alert('Task time collides with existing task')
        return prevTasks
      }

      return [
        ...prevTasks,
        {
          title: dialogDetails.title,
          description: dialogDetails.description,
          startTime: timeDetail.start,
          endTime: timeDetail.end
        }
      ]
    })

    // wanna exclude those which collide with same time. also don't inclue past time, only future time. don't add anything in 30 mins after that time. give break

    setDialogDetails({ ...dialogDetails, open: false })
  }

  function getEndTime(startTime, duration) {
    // Check if startTime and duration are valid
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(startTime) || isNaN(duration)) {
      return ''
    }

    // Convert start time and duration to Date objects
    const start = new Date(`1970-01-01T${startTime}Z`)
    const end = new Date(start.getTime() + duration * 60000)

    // Convert end time to a time string
    const endTime = end.toISOString().slice(11, 16)

    return endTime
  }

  function calculateWaterIntakeRatio() {
    const waterIntake = tasks.filter(
      (task) => task.title === 'Drink Water'
    ).length
    const totalWaterIntake = recTasks.find(
      (task) => task.title == 'Drink Water'
    ).frequency

    return waterIntake / totalWaterIntake
  }

  //   task.frequency -
  // tasks.filter((t) => t.title == task.title).length

  function getHowManyTimesTaskIsLeft(task) {
    return task.frequency - tasks.filter((t) => t.title == task.title).length
  }

  if (!recTasks?.length) {
    return <h1>Loading...</h1>
  }

  return (
    <div className='w-screen min-h-screen relative bg-cover p-8'>
      <main className='p-4 bg-white rounded-md mx-auto max-w-3xl'>
        {/* avatar image with emoji to indicate reaction */}

        <header className='flex gap-6 items-center'>
          <div className='relative w-fit'>
            <img
              src={
                userDetails.image ||
                `https://randomuser.me/api/portraits/men/30.jpg`
              }
              alt='avatar'
              className='w-14 h-14 rounded-full border'
            />
            {/* <span className='text-4xl absolute top-0 -right-2'>
              {calculateWaterIntakeRatio() > 0.9 ? '😊' : '😢'}
            </span> */}
          </div>

          <div>
            <h1 className='text-3xl font-semibold'>
              Welcome back,{' '}
              <span className='text-green-500'>
                {userDetails.username || 'User'}
              </span>
              !
            </h1>
            <p>
              {calculateWaterIntakeRatio() > 0.5
                ? 'You are doing great!'
                : 'You need to drink more water!'}
            </p>
          </div>
        </header>

        {/* current date & time */}
        <section className='mt-6 flex justify-between'>
          <div className='self-center'>
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
          </div>

          <span className='text-8xl mr-12'>
            {calculateWaterIntakeRatio() > 0.9 ? '😊' : '😢'}
          </span>
        </section>

        <section className='flex gap-4 mt-4'>
          <div className='flex-1'>
            <h2 className='text-xl font-semibold'>Daily Water Intake 💧</h2>
            <p className='text-gray-600'>
              {(calculateWaterIntakeRatio() * 100).toFixed(2)}% completed
            </p>
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
                <p className='text-gray-600'>
                  {dialogDetails.duration} duration
                </p>
              </div>

              {/* set time */}
              <label htmlFor='time' className='block mt-4'>
                Set Start Time
                <input
                  type='time'
                  className='border p-2 rounded-lg w-full mt-4'
                  placeholder='Set Time'
                  onChange={(e) => {
                    const duration = parseInt(
                      dialogDetails.duration.split(' ')[0]
                    )
                    setTime({
                      start: e.target.value,
                      end: getEndTime(e.target.value, duration)
                    })
                  }}
                />
              </label>

              {/* set end time */}
              <label htmlFor='time' className='block mt-4'>
                End Time (Start Time + Duration)
                <input
                  type='time'
                  className='border disabled:bg-gray-100 p-2 rounded-lg w-full mt-4'
                  placeholder='Set Time'
                  disabled
                  // set time [duration] mins after start time
                  value={timeDetail.end}
                />
              </label>

              <div className='flex gap-2'>
                <button
                  className='bg-green-800 text-white p-2 rounded-lg mt-4'
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
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4'>
            {recTasks.length > 0 ? (
              recTasks.map((task, index) => (
                <div
                  key={index}
                  className='bg-gray-100 p-4 rounded-md flex justify-between gap-2 relative'>
                  {getHowManyTimesTaskIsLeft(task) > 0 ? (
                    <span className='absolute -left-3 -top-3 bg-white text-black p-1 w-8 h-8 flex items-center justify-center rounded-full border'>
                      {getHowManyTimesTaskIsLeft(task)}x
                    </span>
                  ) : null}

                  <div>
                    <h3 className='text-lg font-semibold'>{task.title}</h3>
                    <p className='text-gray-600'>{task.description}</p>
                  </div>

                  {getHowManyTimesTaskIsLeft(task) > 0 ? (
                    <button
                      className='bg-green-600 text-white p-2 rounded-lg mt-2'
                      onClick={() =>
                        setDialogDetails({
                          open: true,
                          title: task.title,
                          description: task.description,
                          frequency: task.frequency,
                          duration: task.duration
                        })
                      }>
                      <PlusIcon />
                    </button>
                  ) : (
                    <span className='bg-green-500 text-white p-2 rounded-lg mt-2'>
                      Done
                    </span>
                  )}
                </div>
              ))
            ) : (
              <h2>Loading</h2>
            )}
          </div>
        </section>

        {/* calander layout and pull data from google calander. layout similar to Google Calander. all time in rows and task in some empty in some */}

        <section className='mt-6'>
          <h2 className='text-xl font-semibold'>Today's Schedule</h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <div
                  key={index}
                  className='bg-gray-100 p-4 rounded-md flex gap-4 items-center'>
                  <div>
                    <span>
                      {task.startTime} - {task.endTime}{' '}
                    </span>
                  </div>

                  <span className='text-2xl text-gray-300'>|</span>

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
