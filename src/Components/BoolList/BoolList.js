import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import AllBookingData from '../AllBookingData/AllBookingData';
import { authcontext } from '../ContextProvider/ContextProvider';
import Modal from '../Modal/Modal';

const BoolList = () => {

    const { user } = useContext(authcontext)


    // get all booking data 
    const { data: bookingData = [], refetch, isLoading } = useQuery({
        queryKey: ["booking", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/booking?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })
    const [bookingModal, setBookingModal] = useState(bookingData)

    console.log('datasss', bookingData)

    // if (isLoading) {
    //     return <img src="https://flevix.com/wp-content/uploads/2019/07/Curve-Loading.gif" alt="" />
    // }


    const handleForm = e => {
        e.preventDefault()
        const form = e.target
        const firstName = form.firstName.value
        const fullName = `${firstName}`
        const email = form.email.value
        // const bookName = form.bookName.value
        const phone = form.phone.value
        const city = form.city.value
        const book = form.bookName.value
        const bookName = book.toLowerCase()
        console.log(bookName)

        const allData = { fullName, email, phone, city, bookName }



        fetch('http://localhost:5000/booking', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(allData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    form.reset()
                    refetch()
                }
                else if (data.result) {
                    toast.error('Already Added')
                }
            })
    }
    // refetch()

    return (
        <>
            {
                user?.email &&

                <div className='px-[60px]'>
                    {
                        isLoading && <img src="https://flevix.com/wp-content/uploads/2019/07/Curve-Loading.gif" alt="" />
                    }
                    < h1 className='text-3xl mt-10 font-semibold' >Add Your Book Address</ h1>
                    <div className='flex gap-x-16 mt-10'>
                        <div className='w-[30%] bg-teal-400 px-5 py-10'>
                            <form action="" onSubmit={handleForm} >
                                <input type="text" placeholder="UserName" name='firstName' disabled readOnly defaultValue={user?.displayName} className="input mt-3  w-full input-bordered" />
                                <input required type="text" placeholder="Email Address" disabled readOnly defaultValue={user?.email} name='email' className="input mt-3  w-full input-bordered" />
                                <input required type="text" placeholder="Book Name" name='bookName' className="input mt-3  w-full input-bordered" />
                                <input required type="number" placeholder="Phone Number" name='phone' className="input mt-3  w-full input-bordered" />
                                <input required type="text" placeholder="City" name='city' className="input mt-3  w-full input-bordered" />
                                <button className="btn btn-active btn-primary mt-5">Button</button>

                            </form>
                        </div>
                        <div className='w-[60%]'>
                            <AllBookingData
                                bookingData={bookingData}
                                refetch={refetch}
                                bookingModal={bookingModal}
                                setBookingModal={setBookingModal}
                            ></AllBookingData>

                            {bookingModal &&
                                <Modal
                                    bookingModal={bookingModal}
                                    refetch={refetch}
                                    setBookingModal={setBookingModal}
                                ></Modal>
                            }
                        </div>
                    </div>

                </div>
                    
            
            }

        </>
    );
};

export default BoolList;