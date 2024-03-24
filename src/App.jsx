import { Link } from 'react-router-dom'

function App() {
  return (
    <div className='h-screen w-screen bg-hero-pattern bg-cover'>
      <nav className='text-white max-w-7xl p-20 mx-auto'>
        <div className='flex w-full justify-between'>
          <strong className='text-2xl text-violet-500'>FitoFriend</strong>

          <ul className='flex gap-3'>
            <li className='underline font-semibold'>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>
      </nav>

      <main>
        <h1 className='text-4xl font-bold text-white text-center pt-20'>
          Your Interactive Fitness Friend!
        </h1>
        <p className='text-white text-xl text-center pt-5'>
          Setup customized routine, track your workouts, get reminders, and
          more!
        </p>
        <div className='flex justify-center pt-10'>
          <Link
            to='upload-avatar'
            className='bg-violet-800 text-white p-4 rounded-lg'>
            Get Started
          </Link>
        </div>
      </main>
    </div>
  )
}

export default App
