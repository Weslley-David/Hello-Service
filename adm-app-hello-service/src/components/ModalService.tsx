
import { useState } from 'react'

import React from "react";


export function ModalService({ descricao, title, id }: { descricao: string, title: string, id: number }) {
    const [showModal, setShowModal] = useState(false);
    const [Desc, setDesc] = useState("");
    const [Title, setTitle] = useState("");

    async function Post(title: string, descricao: string, id: number) {
        const addRecordEndpoint = "http://localhost:3000/Services/" + id;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'Nome': title,
                    'Descrição': descricao
                }
            )
        }

        const response = await fetch(addRecordEndpoint, options);
        const jsonResponse = await response.json().then(() => {
            window.location.reload();
            setShowModal(false);
        });
        console.log(jsonResponse);

    }
    async function Delete(id: number) {
        const addRecordEndpoint = "http://localhost:3000/Services/" + id;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },

        }

        const response = await fetch(addRecordEndpoint, options);
        const jsonResponse = await response.json().then(() => {
            window.location.reload();
        });
        if (Boolean(jsonResponse)) {
            setShowModal(false)
        }
        console.log(Boolean(jsonResponse))
    }


    console.log(Desc)
    console.log(Title)
    return (
        <>
            <button
                className="bg-slate-800 text-[12px]  hover:bg-slate-900 text-white font-bold py-2 px-5 rounded ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Ver mais
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 pt-6 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}



                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="mb-3 pt-0">
                                        <input type="text" defaultValue={title} onChange={(e) => setTitle(e.target.value)} className="px-4 py-3 placeholder-slate-900 text-black relative  rounded text-lg border-2 outline-none text-left w-full" />
                                    </div>
                                    <div className="py-2 px-4 border-2  bg-white rounded-b-lg  dark:bg-gray-800">
                                        <p className="mb-4 text-slate-900 text-lg text-left w-full leading-relaxed">Descrição</p>
                                        <textarea style={{ minHeight: "14vh", minWidth: "90vh", height: "unset" }} id="editor" className="block px-0 w-full text-sm outline-none
                                         text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0
                                          dark:text-white dark:placeholder-gray-400" defaultValue={descricao} onChange={(e) => setDesc(e.target.value)} />
                                    </div>

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => { Delete(id) }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => Post(Title, Desc, id)}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}


export default ModalService