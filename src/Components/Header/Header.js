import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authcontext } from '../ContextProvider/ContextProvider';

const Header = () => {
    const { user, logOut } = useContext(authcontext)

    const handleLogOut = () => {

        logOut()
            .then()
            .catch(e => console.log(e))

    }
    return (
        <div>
            <div className="navbar bg-red-500">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>

                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl">Book Address</Link >
                </div>
                <div className="navbar-center hidden lg:flex">

                </div>
                <div className="navbar-end">
                    <Link to='/login'>
                        <button class="btn btn-primary mr-4">Login</button>
                    </Link>

                    {
                        user?.email ?

                            <button onClick={handleLogOut} class="btn btn-primary mr-4">Log Out</button>
                            :
                            <Link to='/register'>
                                <button class="btn btn-primary mr-4">Register</button>
                            </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;