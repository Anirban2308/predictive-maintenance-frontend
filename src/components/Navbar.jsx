import React from 'react'

const Navbar = () => {
  return (
    <div>
    <nav className='flex justify-between bg-gray-700 items-center p-4 text-white'>
        <h1 className='px-4 py-2 bg-amber-800 rounded-lg font-bold'>DASH</h1>
        <ul className='hidden md:flex gap-6'>
            <li className='hover:underline cursor-pointer hover:text-blue-400'>Home</li>
            <li className='hover:underline cursor-pointer'>Register</li>
        </ul>
        <button className='text-2xl md:hidden'>hi</button>


    </nav>

    <div className='max-w-sm mx-auto rounded-lg bg-blue-600 p-4'>
        <img src='https://picsum.photos/400' className='w-full h-48 rounded-lg'></img>
        <h2 className='font-bold text-center'>Water</h2>
        <p className='text-center'>Water is source of life</p>
        <div className="flex justify-center">
  <button className="mt-3 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg">
    Save
  </button>
</div>

    </div>
    <div class="max-w-sm mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
  <img src="https://picsum.photos/400" class="w-full h-48 object-cover" />

  <div class="p-4">
    <h2 class="text-lg font-semibold">Product Title</h2>
    <p class="text-gray-600 my-2">This is a short description of the product.</p>
    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
      Buy Now
    </button>
  </div>
</div>


<div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
    <p>h</p>
    <img src="https://picsum.photos/400" className='w-48 h-49'/>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
  <div class="flex flex-col justify-center">
    <h1 class="text-3xl font-bold mb-4">Welcome!</h1>
    <p class="text-gray-600">This is a responsive two-column layout.</p>
  </div>

  <img src="https://picsum.photos/600" class="rounded-xl w-40" />
</div>

<div className='flex  items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600 p-8'>
    <form class="w-full max-w-sm bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl" >
    <h2 className='text-center font-semibold text-white pb-5 text-2xl'>login</h2>
      <div className='flex flex-col gap-3'>
        <input 
        type='email'
        name='email'
        placeholder='json@gmail.com'
        className='px-4 py-2 rounded-lg bg-white/30 text-white '
        />
         <input 
        type='email'
        name='email'
        placeholder='json@gmail.com'
        className='px-4 py-2 rounded-lg bg-amber-300 text-white placeholder-white/70'
        />
        <button className='px-4 py-2 font-semibold bg-amber-800 rounded-lg'>Login</button>
        </div>
    </form>
</div>
<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-4">

  <div class="w-full max-w-sm bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
    <h2 class="text-2xl font-bold text-white text-center mb-4">Login</h2>

    <div class="flex flex-col gap-3">
      <input type="email" placeholder="Email"
        class="px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/70" />

      <input type="password" placeholder="Password"
        class="px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/70" />

      <button class="w-full py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-200">
        Login
      </button>
    </div>
  </div>

</div>

<div className=' grid grid-cols-1 md:grid-cols-3 gap-6 p-6'>

  <div className=' bg-gray-600 rounded-lg p-6 shadow hover:shadow-xl transition '>
       <h3>Fire</h3>
       <p className='font-semibold text-red-600'>1234</p>
  </div>
   <div className=' bg-gray-600 rounded-lg p-6 '>
  <h3>Fire</h3>
       <p className='font-semibold text-red-600'>1234</p>
  </div>
   <div className=' bg-gray-600 rounded-lg p-6 '>
  <h3>Fire</h3>
       <p className='font-semibold text-red-600'>1234</p>
  </div>


</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
  <div class="p-6 bg-white rounded-xl shadow hover:shadow-xl transition">
    <h3 class="text-gray-500 text-sm">Users</h3>
    <p class="text-2xl font-bold mt-2">1,203</p>
  </div>

  <div class="p-6 bg-white rounded-xl shadow hover:shadow-xl transition">
    <h3 class="text-gray-500 text-sm">Revenue</h3>
    <p class="text-2xl font-bold mt-2">$8,394</p>
  </div>

  <div class="p-6 bg-white rounded-xl shadow hover:shadow-xl transition">
    <h3 class="text-gray-500 text-sm">Orders</h3>
    <p class="text-2xl font-bold mt-2">549</p>
  </div>
</div>

<nav className='flex items-center justify-between p-6 '>
  <h2>Logo</h2>
  <ul className='hidden md:flex items-center justify-between gap-6'>
    <li>Home</li>
    <li>Home</li>
    <li>Home</li>
  </ul>
  <button className='md:hidden bg-blue-400'>menu</button>
</nav>

<div className='min-h-screen bg-indigo-600 flex items-center justify-center p-6'>
  <form className='bg-white/20 backdrop-blur-xl p-6 shadow-xl max-w-sm rounded-lg '>
  <h2 className='font-semibold text-center '>Login</h2>
    <input
    type='name'
    name='text'
    placeholder='Enter name'
    className='w-full p-2  rounded-sm my-2 bg-white/30 placeholder-white/70'
    />
       <input
    type='email'
    name='email'
    placeholder='Enter email'
    className='w-full p-2 rounded-sm border'
    />
    <button className='w-full bg-white my-2 rounded-lg font-bold p-2 '>Login</button>
  </form>
</div>

    </div>
    
  )
}

export default Navbar