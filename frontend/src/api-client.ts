import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL||" ";

export const register = async (formData:RegisterFormData) => {

      const response = await fetch(`${API_BASE_URL}/api/users/register`,{
        method:'POST',
        credentials:"include",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData),
      });
      
      console.log("response is :- ",response);

      const responseBody = await response.json();

      console.log("responseBody is :- ", responseBody);

      if(!response.ok){
        throw new Error(responseBody.message)
      }

}

export const validateToken = async ()=>{
     
  const response = await fetch(`${API_BASE_URL}/api/auth/validateToken`,{
    credentials:"include"
  });

  if(!response.ok){
    throw new Error("Token Invalid");
  }

  return response.json();
      
}


export const signIn = async (data:SignInFormData)=>{
  
   const response = await fetch(`${API_BASE_URL}/api/auth/login`,
   {
      method:"POST",
      credentials:"include",
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
   },
   )


   const responseBody = await response.json();

   if(!response.ok){
     throw new Error(responseBody.message)
   }

   return responseBody;  

};


export const signOut =async ()=>{
   const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
        method:"POST",
        credentials:"include",
        
   }
   );

   if(!response.ok){
    throw new Error("Error during sign out");
   }
}


export const addMyHotel = async (hotelFormData: FormData)=>{

     const response = await fetch(`${API_BASE_URL}/api/my-hotels`,
     
     {

        method:"POST",
        credentials:"include",
        body: hotelFormData,

     });

     if(!response.ok){
      throw new Error("Failed to add Hotel");
     }

     return response.json();
}