import React from 'react'
import IMAGE_1 from '../../assets/images/image4.jpg'
import {LuTrendingUpDown} from "react-icons/lu"

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <h2 className='text-lg font-medium text-black'>CredEdge</h2>
            {children}
        </div>

        <div className='hidden md:block w-[40vw] h-screen relative overflow-hidden border-l border-black'>
            <img
                src={IMAGE_1}
                alt="CredEdge"
                className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/40'></div>
            <div className='relative z-10 h-full p-8 flex flex-col justify-between'>
              <div>
                <StatsInfoCard
                  icon={<LuTrendingUpDown/>}
                  label="Track Your Income & Expenses"
                  value="430,000"
                  color='bg-primary'
                />
              </div>
              <div className='text-white'>
                <h3 className='text-2xl font-bold'>CredEdge</h3>
                <p className='text-sm text-white/80'>Manage your finances with ease</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({icon, label, value, color}) =>{
  return <div className=''>
    <div className=''></div>
  </div>
}