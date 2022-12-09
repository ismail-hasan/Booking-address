import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import AllBookingData from '../AllBookingData/AllBookingData';
import Modal from '../Modal/Modal';

const BoolList = () => {

    // get all booking data 
    const { data: bookingData = [], refetch } = useQuery({
        queryKey: ["booking"],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/booking')
            const data = await res.json()
            return data
        }
    })

    const [bookingModal, setBookingModal] = useState(bookingData)

    const handleForm = e => {
        e.preventDefault()
        const form = e.target
        const firstName = form.firstName.value
        const lastName = form.lastName.value
        const fullName = `${firstName} ${lastName}`
        const email = form.email.value
        const phone = form.phone.value
        const city = form.city.value
        const allData = { fullName, email, phone, city }
        console.log(allData)



        fetch('http://localhost:5000/booking', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(allData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    console.log(data)
                    form.reset()
                    refetch()
                }
            })
    }





    // // delete data 

    // const handleDelete = (id) => {
    //     console.log(id)
    //     fetch(`http://localhost:5000/booking/${id}`, {
    //         method: "DELETE",
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             if (data.deletedCount > 0) {
    //                 toast.success('delete done')
    //                 refetch()

    //             }
    //         })
    // }

    // console.log('data', bookingData)

    return (
        <div className='px-[60px]'>
            <h1 className='text-3xl mt-10 font-semibold'>Our Book Address</h1>
            <div className='flex gap-x-16 mt-10'>
                <div className='w-[30%] bg-teal-400 px-5 py-10'>
                    <form action="" onSubmit={handleForm} >
                        <input type="text" placeholder="First Name" name='firstName' className="input mt-3  w-full input-bordered" />
                        <input type="text" placeholder="Last Name" name='lastName' className="input mt-3  w-full input-bordered" />
                        <input type="text" placeholder="Email Address" name='email' className="input mt-3  w-full input-bordered" />
                        <input type="text" placeholder="Phone Number" name='phone' className="input mt-3  w-full input-bordered" />
                        <input type="text" placeholder="City" name='city' className="input mt-3  w-full input-bordered" />
                        <button className="btn btn-active btn-secondary mt-5">Button</button>
                    </form>
                </div>
                <div className='w-[60%]'>
                    <AllBookingData
                        bookingData={bookingData}
                        refetch={refetch}
                        bookingModal={bookingModal}
                        setBookingModal={setBookingModal}
                    ></AllBookingData>

                    <Modal 
                     bookingModal={bookingModal}
                    ></Modal>
                </div>
            </div>
        </div>
    );
};

export default BoolList;