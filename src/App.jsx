import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const { loginWithRedirect } = useAuth0()

  return (
    <div className='h-screen w-screen bg-hero-pattern bg-cover'>
      <nav className='text-white max-w-7xl p-20 mx-auto'>
        <div className='flex w-full justify-center'>
          <strong className='text-2xl text-green-500'>WeFitWell</strong>
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
          <button
            onClick={() => loginWithRedirect()}
            className='bg-green-800 text-white p-4 rounded-lg'>
            Get Started
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
