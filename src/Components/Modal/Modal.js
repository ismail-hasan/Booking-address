import React, { useContext } from 'react';
import { authcontext } from '../ContextProvider/ContextProvider';

const Modal = ({ bookingModal }) => {
    const { user } = useContext(authcontext)
    console.log(user)
    const { fullName } = bookingModal
    console.log('done', bookingModal)
    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">UserName: {user?.displayName}</h3>
                    <form action="">
                        <input type="text" defaultValue={fullName} placeholder="Type here" className="input input-bordered w-full mt-3" />
                        <input type="text" placeholder="Type here" className="input input-bordered w-full mt-3" />
                        <input type="text" placeholder="Type here" className="input input-bordered w-full mt-3" />
                        <input type="text" placeholder="Type here" className="input input-bordered w-full mt-3" />
                        <button className="btn btn-ghost">Button</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;