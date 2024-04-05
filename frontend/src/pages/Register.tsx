import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {

    firstName: string,
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const navigate = useNavigate();
    const {showToast} = useAppContext();
    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
    
    const queryClient=useQueryClient();
    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({message:"Registration Successful!", type:"SUCCESS"});

            await queryClient.invalidateQueries("validateToken");
            navigate("/")
        },

        onError: (error: Error) => {
            showToast({message:error.message,type:"ERROR"})
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);

    });


    return (
        <form className="conatiner mx-auto flex flex-col gap-5 shadow-2xl ring-slate-gray ring-1 justify-center p-10 "
            onSubmit={onSubmit}
        >

            <h2 className="text-3xl font-bold">Create an Account</h2>

            <div className="flex flex-col md:flex-row gap-6  w-full ">
                <label className="font-bold  text-gray-700 flex-1">
                    First name
                    <input type="text" placeholder="Enter First Name" className="input-box w-full font-normal" {...register("firstName", { required: "This field is required" })} />


                    {


                        errors.firstName && (
                            <span className="text-red-500">{errors.firstName.message}</span>
                        )
                    }
                </label>

                <label className="flex-1 font-bold">
                    Last name
                    <input type="text" placeholder="Enter Last Name" className="input-box  w-full font-normal" {...register("lastName", { required: "This field is required" })} />

                    {


                        errors.lastName && (
                            <span className="text-red-500">{errors.lastName.message}</span>
                        )
                    }
                </label>
            </div>



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





            <label className="flex-1 font-bold">


                Confirm Password
                <input className="input-box w-full font-normal " type="password" placeholder="Enter your password"

                    {...register("confirmPassword", {
                        validate: (val) => {
                            if (!val) {
                                return "This field is required"
                            }
                            else if (watch("password") !== val) {
                                return "Your passwords do not match";
                            }
                        },

                    })}

                />

                {


                    errors.confirmPassword && (
                        <span className="text-red-500">{errors.confirmPassword.message}</span>
                    )
                }

            </label>

            <div className="flex w-full space-between mt-6">
                <div className="flex-1">Already registered? <span className="underline">Sign In here</span></div>
                <button type="submit" className="bg-blue-800 text-white font-bold px-2 py-3 border rounded-xl">Create Account</button>
            </div>

        </form>
    );
};


export default Register;