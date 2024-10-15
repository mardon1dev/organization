import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Organization, SinglePage } from '../pages'

const Routers = () => {
  return (
    <div className='w-full p-[30px]'>
        <Routes>
            <Route path="/" element={<Organization />}/>
            <Route path="/:id" element={<SinglePage />}/>
        </Routes>
    </div>
  )
}

export default Routers