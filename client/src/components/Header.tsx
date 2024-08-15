import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Header = () => {
  return (
    <div className="h-14 shadow-md">
        <div className="container flex justify-between items-center">
          <img className='w-[100px]' src="./logo-buana-color.png" alt="logo" />

          <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
    </div>
  )
}

export default Header