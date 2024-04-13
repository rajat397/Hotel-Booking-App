import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {

    const { register, formState: { errors } } = useFormContext<HotelFormData>();


    return (
        <div className="flex flex-col gap-4">

            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>

            <label className="flex-1 font-bold">
                Name
                <input className="input-box w-full font-normal" type="text" placeholder="Enter Hotel Name"{...register("name", { required: "This field is required" })} />
                {


                    errors.name && (
                        <span className="text-red-500">{errors.name.message}</span>
                    )
                }

            </label>

            <div className="flex gap-4">

                <label className="flex-1 font-bold">
                    City
                    <input className="input-box w-full font-normal" type="text" placeholder="Enter City Name"{...register("city", { required: "This field is required" })} />
                    {


                        errors.city && (
                            <span className="text-red-500">{errors.city.message}</span>
                        )
                    }

                </label>


                <label className="flex-1 font-bold">
                    Country
                    <input className="input-box w-full font-normal" type="text" placeholder="Enter Country Name"{...register("country", { required: "This field is required" })} />
                    {


                        errors.country && (
                            <span className="text-red-500">{errors.country.message}</span>
                        )
                    }

                </label>


            </div>


            <label className="flex-1 font-bold">
                Description
                <textarea rows={10} className="input-box w-full font-normal "  {...register("description", { required: "This field is required" })} ></textarea>
                {


                    errors.description && (
                        <span className="text-red-500">{errors.description.message}</span>
                    )
                }

            </label>

            <label className="max-w-[50%] font-bold">

                Price Per Night
                <input className="input-box w-full font-normal"
                    type="number" min={1}
                    placeholder="Enter Price Per Night"{...register("pricePerNight", { required: "This field is required" })} />

                {


                    errors.pricePerNight && (
                        <span className="text-red-500">{errors.pricePerNight.message}</span>
                    )
                }


            </label>





            <label className="max-w-[50%] font-bold flex flex-col ">

                Star Rating
                    
                    <select {
                     ...register("starRating",{ required: "This field is required",})

                    } 
                    
                     className="border-rounded w-full p-2 text-gray-700 bg-gray-100"
                    >
                       <option  value="" className="text-sm font-bold">
                        Select a Star Rating 
                      </option>

                      {[1,2,3,4,5].map((num)=>{

                            return (
                               
                               <option value={num}>
                                   {num}
                               </option>
                                   
                            )


                      })}

                    </select>


                     {


                    errors.starRating && (
                        <span className="text-red-500">{errors.starRating.message}</span>
                      )
                  
                   }


            </label>

        </div>
    )

}


export default DetailsSection;