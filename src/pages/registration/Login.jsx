import {  useContext,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MyContext from '../../context/data/myContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/Firebaseconfig'
import Loader from '../../loader/Loader'

function Login() {
   const context=useContext(MyContext)
   const {loading,setloading}=context
   const [email,setemail]=useState("")
   const [password,setpassword]=useState("")
   const navigate=useNavigate()
   const login=async()=>{
    setloading(true)
    try {
        const result=await signInWithEmailAndPassword(auth,email,password)
        toast.success("login successful",{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        localStorage.setItem('user',JSON.stringify(result))
        navigate('/')
        setloading(false)
    } catch (error) {
        console.log(error)
        setloading(false)
    }
   }
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}
                    name='email'
                    className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setpassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg' onClick={login}>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don&rsquo;t have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login