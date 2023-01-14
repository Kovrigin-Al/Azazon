import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../index'

const ItemList = observer(() => {
    const navigate = useNavigate();
    const {item} = useContext(Context); 
  return (
      <div className="bg-white mx-auto max-w-2xl py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Buy now!</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 items-end ">
          {item.items.map((i) => (
            <div key={i.id} className="group relative">
              <div className="min-h-80 max-h-96 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={process.env.REACT_APP_SERVER_URL +'/'+ i.img}
                  alt='item preview'
                  className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                      <span onClick={()=>navigate(`/item/${i.id}`)}  className="absolute inset-0 hover:cursor-pointer" >
                      </span>
                      {i.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{i.color}</p>
                </div>
                <p className="ml-2 mt-auto text-sm font-medium text-gray-900">{i.price+'$'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
})

export default ItemList