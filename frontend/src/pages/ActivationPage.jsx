import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { server } from "../server";
import axios from 'axios';

const ActivationPage = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios
                        .post(`${server}/user/activation`, {
                            activation_token
                        })
                    console.log(res.data.message);
                    setSuccess(true);
                    setTimeout(() => {
                        navigate("/login");
                    }, 3000);
                } catch (err) {
                    console.log(err.response.data.message);
                    setError(true);
                }
            }
            activationEmail();
        }
    }, [activation_token, navigate]);

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4">
            <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                {error ? (
                    <div>
                        <div className="text-red-400 text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-white mb-4">Activation Failed</h2>
                        <p className="text-gray-300 mb-6">Your activation token has expired or is invalid.</p>
                        <button 
                            onClick={() => navigate("/sign-up")}
                            className="bg-green-400 hover:bg-green-500 text-black font-semibold py-2 px-6 rounded-lg transition-all duration-300"
                        >
                            Sign Up Again
                        </button>
                    </div>
                ) : success ? (
                    <div>
                        <div className="text-green-400 text-6xl mb-4">✅</div>
                        <h2 className="text-2xl font-bold text-white mb-4">Account Activated!</h2>
                        <p className="text-gray-300 mb-6">Your Bull-Mart account has been created successfully!</p>
                        <p className="text-green-400 text-sm">Redirecting to login page...</p>
                    </div>
                ) : (
                    <div>
                        <div className="text-green-400 text-6xl mb-4 animate-spin">⏳</div>
                        <h2 className="text-2xl font-bold text-white mb-4">Activating Account</h2>
                        <p className="text-gray-300">Please wait while we activate your account...</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ActivationPage