import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { authcontext } from '../ContextProvider/ContextProvider';

const Modal = ({ bookingModal, refetch, setBookingModal }) => {
    const { user } = useContext(authcontext)
    const { bookName, city, phone } = bookingModal


    const handleMOdalData = (e) => {
        e.preventDefault()
        const bookName = e.target.modalBookName.value
        const phone = e.target.modalPhone.value
        const city = e.target.modalCity.value
        const updateName = { bookName, phone, city }

        fetch(`https://addressbook-ochre.vercel.app/booking/${bookingModal._id}`, {
            method: "PATCH",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(updateName)
        })
            .then(res => res.json())
            .then(data => {
                console.log('updated data', data)
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success("book updated")
                }
            })
        setBookingModal(null)
    }


    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">UserName: {user?.displayName}</h3>
                    <form onSubmit={handleMOdalData} action="">
                        <input required name='modalBookName' type="text" defaultValue={bookName} placeholder="Type here" className="input input-bordered w-full mt-3" />
                        <input required name='modalPhone' type="phone" defaultValue={phone} placeholder="Type here" className="input input-bordered w-full mt-3" />
                        <input required name='modalCity' type="text" defaultValue={city} placeholder="Type here" className="input input-bordered w-full mt-3" />
                        <button className="btn btn-primary mt-5">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;