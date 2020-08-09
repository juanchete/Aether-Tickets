import React, {useState} from 'react'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import 'firebase/auth'
import { useFirebaseApp } from 'reactfire'

function LoginClientes() {

    const firebase = useFirebaseApp()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        }, 
        validationSchema: Yup.object({
            email: Yup.string()
                        .email('El email no es válido')
                        .required('El email no puede ir vacio'),
            password: Yup.string()
                        .required('El password es obligatorio')
        }),
        

        onSubmit: async valores => {
            // console.log(valores);
            const {email, password} = valores;
            try {
                await firebase.auth().signInWithEmailAndPassword(email,password)
            } catch (error) {
               
            }
        }
        
    })

    return (
<div class="bg-black h-screen font-sans">
    <div class="container mx-auto h-full flex justify-center items-center">

        <div className='bg-white w-1/3 h-2/3 rounded-full'>

            <div className='border-teal p-8 border-t-12 bg-white mb-6 rounded-lg'>

            <h1 className='text-center text-6xl'>Login</h1>

            <div className='flex justify-center my-6'>
                   <button className=' border-2 border-red-300 rounded'>Sign Up With Google</button>
            </div>

            <hr/>

            <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >

            <div class="mb-4 my-5 border-b-2 border-red-300">
                    <label class="text-center font-bold text-grey-darker block mb-2" htmlFor='email'>Email</label>
                    <input  class="block appearance-none bg-transparent border-none w-full px-2 focus:outline-none " 
                            id="email"
                            type="email"
                             placeholder="Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}/>
            </div>

            { formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
            ) : null  }

            <div class="mb-4 border-b-2 border-red-300">
                    <label class="text-center font-bold text-grey-darker block mb-2" htmlFor='password'>Password</label>
                    <input class="block appearance-none bg-transparent border-none w-full px-2 focus:outline-none "
                           id="password"
                           type="password"
                           placeholder="Password"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.password}/>
            </div>

            { formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
            ) : null  }

                <div class="flex justify-center ">
                    <button class="border-2 border-red-500 bg-teal-dark hover:bg-teal text-black font-bold py-2 px-4 rounded-full mt-6 py-6 my-4">
                        Login
                    </button>
                </div>

                </form>

                <h1 className='text-center font-bold text-red-500 pt-16'>Sign In</h1>

            </div>

        </div>
        
    </div>
</div>
    )
}

export default LoginClientes
