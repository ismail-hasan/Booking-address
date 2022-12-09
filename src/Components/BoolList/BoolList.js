import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import BookingData from '../BookingData/BookingData';

const BoolList = () => {
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
                }
            })
    }

    // get all booking data 



    // delete data 




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
                <div>
                    <BookingData></BookingData>
                </div>
            </div>

        </div>
    );
};

export default BoolList;