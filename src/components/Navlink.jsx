import React from 'react'
import { NavLink } from 'react-router-dom'

const Navlink = ({item}) => {
  return (
    <NavLink to={item?.link} className="w-full text-left pl-[30px] py-[20px]">
        <span>
            {item?.name}
        </span>
    </NavLink>
  )
}

export default Navlink