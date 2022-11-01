

import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import ModalService from '../components/ModalService'
import ModalServicePost from '../components/ModalServiceAdd'
interface Services {
    id: number
    Nome: string
    User_ative: string
    Descrição: string
}

export function Services() {

    const [data, setData] = useState<Services[]>([])
    const [popupVisible, setPopupVisible] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true);

    console.log(typeof (data))
    console.log((data))
    useEffect(() => {
        const getUser = async () => {
            const URL = 'http://localhost:3000/Services'
            const init: RequestInit = {
                method: 'GET'
            }

            const response = await fetch(URL, init)
            const data = await response.json()

            setData(data)
            setTimeout(function () {
                console.log("Delayed for 5 second.");
                setIsLoading(false);
            }, 400);
        }

        getUser()

    }, [])
    function togglePopup() {
        setPopupVisible(!popupVisible)
    }

    return <div className='flex-1 p-10  font-bold h-screen overflow-y-auto'>
        <div className={`p-7 text-2xl font-semibold flex-1 `}>
            <h2>Serviços</h2>
        </div>


        {isLoading ? (<div className="flex items-center justify-center py-24 ">
            <div className="spinner-border items-center  animate-spin                     transition duration-1000
                      block w-8 h-8 rounded-full m-12" role="status">
                <img src='./src/assets/loading.png'
                    width="40" />
            </div>
        </div>) : <div className=' grid grid-cols-4  gap-4'>
            {data.map(data => (<div className='
                      block
                      px-6
                      py-3
                      border border-gray-400 mb-2
                      w-full
                      rounded-md
                      text-black
                      cursor-pointer
                      hover:bg-gray-100
                     
                    ' key={data.id}>
                <div className='p-1'>

                    <div>{data.Nome}</div>
                    <div>Ativos:{data.User_ative}</div>

                </div>
                <button onClick={togglePopup} >
                    <ModalService
                        descricao={data.Descrição}
                        title={data.Nome}
                        id={data.id} />
                </button>
            </div>))}
            <ModalServicePost descricao={''} title={''} id={(Object.keys(data).length) + 2} />
        </div>
        }





    </div>


}
export default Services