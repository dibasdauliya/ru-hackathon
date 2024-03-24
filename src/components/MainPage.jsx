export default function MainPage() {
  return (
    <div className='w-screen min-h-screen bg-gym-pic relative bg-cover'>
      <main className='p-4 bg-white rounded-md mx-auto max-w-5xl grid place-items-center pt-20'>
        <h1 className='text-4xl font-bold text-black text-center pt-20'>
          Your Interactive Fitness Friend!
        </h1>
        <p className='text-white text-xl text-center pt-5'>
          Setup customized routine, track your workouts, get reminders, and
          more!
        </p>
        <div className='flex justify-center pt-10'>
          <button className='bg-violet-800 text-white p-4 rounded-lg'>
            Get Started
          </button>
        </div>
      </main>
    </div>
  )
}
