import { useState } from 'react'
import PhotoIcon from '../icons/photo'
import { useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

export default function UploadAvatar() {
  const [isDropping, setIsDropping] = useState(false)
  const fileInputRef = useRef(null)

  function handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    setIsDropping(false)
    const file = e.dataTransfer.files[0]
    fileInputRef.current.files = e.dataTransfer.files
    console.log(file)
    console.log('first')
  }

  function handleFileChange(e) {
    const file = e.target.files[0]
    console.log(file)
    console.log('second')
  }

  const { loginWithRedirect } = useAuth0()

  return (
    <div className='h-screen w-screen bg-gym-pic bg-cover bg-black relative'>
      <div className='-z-1 pointer-events-none absolute inset-0 bg-black/60'></div>

      <div className='max-w-7xl p-20 mx-auto relative z-10'>
        <nav className='text-white flex w-full justify-between'>
          <Link to='/'>
            <a className='text-2xl font-semibold text-violet-500'>FitoFriend</a>
          </Link>

          <ul className='flex gap-3'>
            <li className='underline font-semibold'>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </nav>

        <main className='flex mx-auto text-black mb-12'>
          <form
            method='post'
            className={`max-w-4xl border-2 border-violet-500 border-dashed mt-20 w-full p-4 rounded-md ${
              isDropping ? 'bg bg-violet-200' : 'bg-white'
            } grid place-items-center`}
            onDragEnter={() => setIsDropping(true)}
            onDragOver={(e) => {
              setIsDropping(true)
              e.preventDefault()
            }}
            onDragLeave={() => setIsDropping(false)}
            onDrop={handleDrop}>
            <PhotoIcon className='w-20 h-20' />

            <p className='text-lg'>Drag and drop your picture here</p>
            <p className='mt-4  ml-20'>
              or{' '}
              <input
                id='fileInput'
                ref={fileInputRef}
                className='text-center'
                type='file'
                accept='image/*'
                name='file'
                onChange={handleFileChange}
              />
            </p>
          </form>
        </main>
        {/* login button */}

        <Link
          to='/setgoal'
          className='bg-violet-800 text-white p-4 rounded-lg mt-10'>
          Set Goal
        </Link>
      </div>
    </div>
  )
}
