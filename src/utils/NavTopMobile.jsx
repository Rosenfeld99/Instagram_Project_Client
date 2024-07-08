import React from 'react'
import { TOKEN_KEY } from '../constant/url'
 
const NavTopMobile = ({children,left,right,cenetr1,cenetr2}) => {
  return (
    <div className={` flex items-center md:hidden justify-between dark:border-b-[1.5px] border-b-2 px-4 py-1.5 fixed top-0 left-0 flex-1 w-full z-40 max-h-12 ${localStorage[TOKEN_KEY] ? "bg-bgk_light dark:bg-bgk_dark dark:border-btn_dark border-btn_light" : " bg-white text-black"}`}>
        <div className=' text-[1.5rem]'> 
            {left}
        </div>
        <div className=' flex items-center text-[1.2rem]'>
          
            {cenetr1}
            {cenetr2}
        </div>
        <div className=' text-[1.5rem]'>
            {right}
        </div>
    </div>
  )
}

export default NavTopMobile