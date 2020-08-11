import React, { useState } from 'react'
import { useFormik} from 'formik'
import {
    useUser, useFirebaseApp
} from 'reactfire'
import * as Yup from 'yup'
import 'firebase'


function RegistroClientes() {

    const [flag, setFlag] = useState(false)

    const firebase = useFirebaseApp()

    const db = firebase.firestore()

    const user = useUser()

    

    
 

    const formik = useFormik({
        initialValues: {
            email: 'prueba1@email.com',
            password: 'password',
            name:'prueba',
            lastName:'test',
            telephone: '555'
        }, 
        validationSchema: Yup.object({
            email: Yup.string()
                        .email('El email no es válido')
                        .required('El email no puede ir vacio'),
            password: Yup.string()
                        .required('El password es obligatorio')
                        .min(6,'La contraseña debe ser de al menos 6 caracteres'),
            name: Yup.string()
                     .required('El nombre es obligatorio'),
            lastName: Yup.string()
                          .required('El apellido es obligatorio'),
            telephone: Yup.number()
            
        }),
        

        onSubmit: async valores => {
            // console.log(valores);
            const {email, password,name, lastName, telephone} = valores;
            try {
                await firebase.auth().createUserWithEmailAndPassword(email,password).then(
                     db.collection("usuarios").add({
                        name,
                        email,
                        lastName,
                        telephone
                      })
                ).then(console.log('Creado con exito'))

                

            } catch (error) {
               console.log(error);
            }
        }})

    return (
<div class="bg-black h-screen font-sans">
    <div class="container mx-auto h-full flex justify-center items-center">

        <div className='w-1/3 h-2/3'>

            <div className='border-teal p-8 border-t-12 bg-white py-8 rounded-lg '>

            <h1 className='text-center text-6xl'>Sign Up</h1>

            <div className='flex justify-center my-6'>
                   <button className=' border-2 border-red-300 rounded'>Sign Up With Google</button>
            </div>

            <hr/>

            <form
                            
                            onSubmit={formik.handleSubmit}
                        >
            
            <div class="mb-4 my-5 border-b-2 border-red-300">
                    <label class="text-center font-bold text-grey-darker block mb-2" htmlFor='name'>Name</label>
                    <input  class="block appearance-none bg-transparent border-none w-full px-2 focus:outline-none " 
                            id="name"
                            type="name"
                             placeholder="Nombre"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}/>
            </div>

            { formik.touched.name && formik.errors.name ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.name}</p>
                                </div>
            ) : null  }

            <div class="mb-4 my-5 border-b-2 border-red-300">
                    <label class="text-center font-bold text-grey-darker block mb-2" htmlFor='lastName'>Last Name</label>
                    <input  class="block appearance-none bg-transparent border-none w-full px-2 focus:outline-none " 
                            id="lastName"
                            type="lastName"
                             placeholder="Apellido"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}/>
            </div>

            { formik.touched.lastName && formik.errors.lastName ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.lastName}</p>
                                </div>
            ) : null  }

            <div class="mb-4 my-5 border-b-2 border-red-300">
                    <label class="text-center font-bold text-grey-darker block mb-2" htmlFor='telephone'>Telephone</label>
                    <input  class="block appearance-none bg-transparent border-none w-full px-2 focus:outline-none " 
                            id="telephone"
                            type="telephone"
                             placeholder="Telefono"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.telephone}/>
            </div>

            { formik.touched.telephone && formik.errors.telephone ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.telephone}</p>
                                </div>
            ) : null  }

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

                <h1 className='text-center font-bold text-red-500 pt-6'>Sign In</h1>

            </div>

        </div>
        
    </div>
</div>
    )
}

export default RegistroClientes
