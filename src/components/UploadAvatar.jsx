import { useState } from 'react'
import PhotoIcon from '../icons/photo'
import { useRef } from 'react'
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

  return (
    <div className='h-screen w-screen bg-cover bg-white relative'>
      {/* <div className='-z-1 pointer-events-none absolute inset-0 bg-black/60'></div> */}

      <div className='max-w-7xl p-20 mx-auto relative z-10'>
        <nav className='text-white flex w-full justify-center'>
          <Link to='/'>
            <a className='text-2xl font-semibold text-green-600'>WeFitWell</a>
          </Link>
        </nav>

        <main className='flex items-center mx-auto text-black mb-12'>
          <form
            method='post'
            className={`max-w-4xl mx-auto border-2 border-green-500 border-dashed mt-20 w-full p-4 rounded-md ${
              isDropping ? 'bg bg-green-200' : 'bg-white'
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

        <div className='mx-auto text-center'>
          <Link
            to='/setgoal'
            className='bg-green-600 text-white p-4 rounded-lg mt-10 mx-auto'>
            Set Goal
          </Link>
        </div>
      </div>
    </div>
  )
}
