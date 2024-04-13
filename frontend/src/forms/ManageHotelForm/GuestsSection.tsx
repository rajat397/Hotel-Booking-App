import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const GuestsSection = () => {

    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (

        <div className="flex flex-col">

            <h2 className="text-2xl font-bold mb-3">Guests</h2>

            <div className="flex px-5 py-8 bg-gray-200 gap-8">

                <label className="flex flex-col flex-1 text-gray-700 text-sm font-semibold">
                    Adults
                    <input type="number" min={1}
                        {
                        ...register("adultCount", {
                            required: "This field is required"
                        })
                        }

                        className="border rounded-lg"
                    />

                    {
                        errors.adultCount && (
                            <span className="text-red-500 text-sm font-bold">
                                {errors.adultCount.message}
                            </span>
                        )
                    }

                </label>



                <label className="flex flex-col flex-1 text-gray-700 text-sm font-semibold">
                    Children
                    <input type="number" min={0}
                        {
                        ...register("childCount", {
                            required: "This field is required"
                        })
                        }

                        className="border rounded-lg"
                    />

                    {
                        errors.childCount && (
                            <span className="text-red-500 text-sm font-bold">
                                {errors.childCount.message}
                            </span>
                        )
                    }
                </label>


            </div>



        </div>

    )
}


export default GuestsSection