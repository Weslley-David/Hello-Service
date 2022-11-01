
import { useEffect, useState } from 'react'
import useFetch from 'react-fetch-hook';

interface User_Ban {
    id: number
    Nome: string
    msg: string
    by: string
}
type json_download = {
    data: any
    Nome: string
    msg: string
}
export function Log() {

    const [data, setData] = useState<User_Ban[]>([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const URL = 'http://localhost:3000/Logs'
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
    const downloadFile = ({ data, fileName, fileType }: { data: any, fileName: any, fileType: any }) => {
        // Create a blob with the data we want to download as a file
        const blob = new Blob([data], { type: fileType })
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }
    const exportToJson = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        downloadFile({
            data: JSON.stringify(data),
            fileName: 'users.json',
            fileType: 'text/json',
        })
    }
    console.log(data)
    return <div className='flex-1 p-10  font-bold h-screen overflow-y-auto'>
        <div className={`p-7 text-2xl font-semibold flex-1 `}>
            <h2>Logs</h2>
        </div>
        <div className='  
                py-3    grid grid-cols-7'>
            <div className='border-x px-6  py-2'>
                Id
            </div>
            <div className='border-x px-4 py-2 '>
                Nome
            </div >
            <div className='border-x px-2 py-2 '>
                Descrição
            </div>
            <div className='border-x-l px-2 py-2 '>
                Admin
            </div>
            <button type='button' className='flex w-max rounded bg-lime-600 p-2 text-white' onClick={exportToJson}>
                Export to JSON
            </button>
        </div>
        <div>
            {isLoading ? (<div className="flex items-center justify-center py-24 ">
            <div className="spinner-border items-center  animate-spin                     transition duration-1000
                      block w-8 h-8 rounded-full m-12" role="status">
                <img src='./src/assets/loading.png'
                    width="40" />
            </div>
        </div>) :
                data.map(data => (<div className='
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
                    <div className='grid grid-cols-7 gap-2 '>
                        <div className=''>
                            {data.id}
                        </div>
                        <div>{data.Nome}</div>
                        <div>{data.msg}</div>
                        <div>{data.by}</div>
                        <button className="bg-slate-800 text-[12px] hover:bg-slate-900 text-white font-bold py-2 px-2 rounded">
                            Ver Perfil
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-[12px] text-white font-bold py-2 px-2 rounded">
                            Excluir
                        </button>
                        <button className="bg-yellow-400 text-[12px] hover:bg-yellow-500 text-white font-bold py-2 px-2 rounded">
                            Desbanir
                        </button>

                    </div>
                </div>))
            }
        </div>

    </div >
}

export default Log