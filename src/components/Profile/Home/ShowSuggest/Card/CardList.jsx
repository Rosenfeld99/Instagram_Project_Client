import React, { useEffect } from 'react'
import CardItem from './CardItem'
import useUser from '../../../../../hooks/useUser'

const CardList = () => {
    const arr = [1,2,3,4,5]
    const {getSuggested,usersSuggestedAccounts} = useUser()

    useEffect(()=>{
      getSuggested()
    },[])
    // console.log(usersSuggestedAccounts);

  return (
    <div className='custom-scrollbar flex items-center overflow-x-scroll overflow-y-hidden gap-5 px-20 pb-20'>
        {usersSuggestedAccounts?.map((item) =>(
            <CardItem key={item?._id} item={item}/>
        ))}
    </div>
  )
}

export default CardList