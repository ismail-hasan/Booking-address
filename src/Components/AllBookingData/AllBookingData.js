import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

const AllBookingData = ({ bookingData, refetch, setBookingModal }) => {


    const handleDelete = (id) => {
        fetch(`https://addressbook-ochre.vercel.app/booking/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast.error('book deleted')
                    refetch()
                }
            })
        refetch()
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>s/n</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookingData.map((book, idx) => <tr key={book._id}>

                                <th>{idx + 1}</th>
                                <td>{book.bookName}</td>
                                <td>{book.phone}</td>
                                <td>{book.city}</td>
                                <td> <label htmlFor="my-modal-3" onClick={() => setBookingModal(book)}> <FaRegEdit className='cursor-pointer text-[21px] text-green-500'></FaRegEdit> </label></td>
                                <td> <button onClick={() => handleDelete(book._id)}> <MdDelete className='cursor-pointer text-[21px] text-red-500'></MdDelete> </button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default AllBookingData;