import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authcontext } from '../ContextProvider/ContextProvider';

const Login = () => {

    const { signInUser } = useContext(authcontext)
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)

        signInUser(email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                form.reset()
                navigate('/')
            })
            .catch(e => setError(e.message))



    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col w-full">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <p className='text-center text-3xl pb-4'>Login</p>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="text" placeholder="email" required className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="password" required className="input input-bordered" />
                            <p className='pt-2'>already have't acount <Link className='underline' to='/register'> register</Link> </p>
                        </div>
                        <p className='text-red-500'>{error}</p>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className=' text-center'>
                        <p className=''>OR</p>
                        {/* <button onClick={handleGoogle} className='border mb-10 py-2 px-4 w-1/2 mt-5 mx-auto font-semibold'>Google</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;