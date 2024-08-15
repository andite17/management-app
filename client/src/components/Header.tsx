import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Header = () => {
  return (
    <div className="container h-14 flex justify-between items-center bg-blue-300">
        <img className='w-[100px]' src="./logo-buana-color.png" alt="lgo" />

        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    </div>
  )
}

export default Header