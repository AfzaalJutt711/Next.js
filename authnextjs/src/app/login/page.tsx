'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'



export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const resposne = await axios.post("/api/users/login", user)
            console.log(resposne)
            toast.success("Login success")
            router.push("/profile")
        } catch (error: any) {
            console.log("Login falied", error.message);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="">{loading ? "Processing" : "login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input
                className='p-2 text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                type="email"
                id='email'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder='email'
            />
            <label htmlFor="password">password</label>
            <input
                className='p-2 text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                type="password"
                id='password'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder='password'
            />
            <button
                onClick={onLogin}
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            >Login</button>
            <Link href="/signup">Visit signup page</Link>
        </div>
    )
}