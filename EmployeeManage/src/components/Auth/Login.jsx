import React from 'react'
import { useState } from 'react';

function Login({ handlelogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const submithandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        // Basic password validation
        if (password.length < 3) {
            alert('Password must be at least 3 characters long');
            setIsLoading(false);
            return;
        }

        handlelogin(email, password);
        setIsLoading(false);
    }

    return (
        <div className='flex justify-center items-center min-h-screen w-screen bg-gradient-to-br from-gray-900 to-gray-800'>
            <div className='border-2 border-emerald-600 rounded-xl p-8 bg-gray-800 shadow-2xl'>
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">Employee Management</h1>
                    <p className="text-gray-400">Sign in to your account</p>
                </div>
                
                <form onSubmit={submithandler} className='flex flex-col gap-4'>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className='w-full border-2 text-white outline-none bg-transparent border-emerald-600 text-lg rounded-lg p-3 placeholder:text-gray-400 focus:border-emerald-400 transition-colors' 
                            type="email" 
                            placeholder='Enter your email' 
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            className='w-full border-2 text-white outline-none bg-transparent border-emerald-600 text-lg rounded-lg p-3 placeholder:text-gray-400 focus:border-emerald-400 transition-colors' 
                            type="password" 
                            placeholder='Enter your password' 
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className='w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 border-2 border-emerald-600 hover:border-emerald-700 text-white rounded-lg p-3 text-lg font-medium transition-colors disabled:cursor-not-allowed' 
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                
                
            </div>
        </div>
    )
}

export default Login
