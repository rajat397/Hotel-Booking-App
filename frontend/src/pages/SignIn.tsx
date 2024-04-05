import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import {Link, useNavigate} from 'react-router-dom';

export type SignInFormData = {
    email: string;
    password: string;

}


const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

    const {showToast} = useAppContext();

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation(apiClient.signIn,{
         onSuccess: async ()=>{
            console.log("user has been signed in");
            
            showToast({
                message:"User has been signed In",
                type:"SUCCESS"
            });

            await queryClient.invalidateQueries("validateToken");
            navigate("/");
         },
         onError: (error:Error) => {
             showToast({
                message:error.message,
                type:"ERROR"
             });
         }
    });

    const onSubmit = handleSubmit((data)=>{
         mutation.mutate(data);
    });


    return (

        <form className="flex flex-col gap-5" onSubmit={onSubmit}>

            <h2 className="text-3xl font-bold">Sign In</h2>

            <label className="flex-1 font-bold">
                Email
                <input className="input-box w-full font-normal" type="email" placeholder="Enter your email"{...register("email", { required: "This field is required" })} />
                {


                    errors.email && (
                        <span className="text-red-500">{errors.email.message}</span>
                    )
                }

            </label>

            <label className="flex-1 font-bold">

                Password
                <input className="input-box w-full font-normal" type="password" placeholder="Enter your password"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        }
                    })}
                />

                {
                    errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                    )
                }
            </label>

            <div className="flex w-full space-between mt-6 justify-center items-center">
                <div className="flex-1">New User? <Link className="underline text-sm text-blue-500" to="/register">Register here</Link></div>
                <button type="submit" className="bg-blue-800 text-white font-bold px-2 py-3 border rounded-xl">Login</button>
            </div>

        </form>
    )
}

export default SignIn;