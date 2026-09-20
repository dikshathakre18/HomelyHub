import { propertyAction } from "./property-slice";
import {axiosInstance} from "../../utils/axios";

//get all properties
//1. we are going to start the api request
//2. tell redux loading started
//3. Get search parameter
//4. call backened api
//5. Wait for response
//6. get property data
//7. send data to redux store
//8. If error => send error to redux
//dispatch means send to redux 
//getState is get from redux
export const getAllProperties =() => async(dispatch, getState) =>{
  try{
    console.log("API call started");
    dispatch(propertyAction.getRequest())
    const {searchParams} = getState().properties
    console.log(searchParams)
    const response = await axiosInstance.get('/v1/rent/listing',{
      params:{...searchParams}
    })

    if(!response){
      throw new Error("Could not fetch any properties")
    }

    const {data} = response;
    console.log(data);

    dispatch(propertyAction.getProperties(data))


  }catch(error){
    dispatch(propertyAction.getErrors(error.messsage))

  }
}