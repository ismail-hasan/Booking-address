import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

const AllBookingData = ({ bookingData, refetch, setBookingModal }) => {
 

    const handleDelete = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/booking/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast.success('delete done')
                    refetch()
                }
            })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookingData.map((book, idx) => <tr key={book._id}>

                                <th>{idx + 1}</th>
                                <td>{book.fullName}</td>
                                <td>{book.email}</td>
                                <td>{book.city}</td>
                                <td> <label htmlFor="my-modal-3" onClick={() => setBookingModal(book)}> <FaRegEdit></FaRegEdit> </label></td>
                                <td> <button onClick={() => handleDelete(book._id)}> <MdDelete></MdDelete> </button></td>
                               
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default AllBookingData;