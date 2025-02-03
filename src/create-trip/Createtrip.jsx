import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from '@/constants/option';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseconfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';



function Createtrip() {
  const [place, setPlace] = useState();
  const [days, setDays] = useState('');
  const [opendialog, setOpendialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleplacedata = (query) => {
    setPlace(query);
    console.log(query);
    handleInputChange('place', query);
  }


  const [formdata, setFormdata] = useState([]);

  const navigate=useNavigate();
  const handleInputChange = (name, value) => {
    if (name == 'noofdays' && value > 6) {
      toast("please enter less than 6 days");
      setDays('');
      return;
    } else {
      setDays(value)
    }
    setFormdata({
      ...formdata,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formdata);
  }, [formdata])



  //login
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserInfo(codeResp),
    onError: (error) => console.log(error)
  })


  const getUserInfo = async (tokeninfo) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokeninfo?.access_token}`,
          Accept: 'Application/json'
        },
      });

      const userInfo = response.data;
      console.log("User Info:", userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      setOpendialog(false)
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };




  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpendialog(true);
      return;
    }

    if (formdata?.noofdays < 6 && formdata?.place && formdata?.budget && formdata?.traveler) {

      console.log("trip is genereated");
      toast("event has benn created.");

      setLoading(true);
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formdata?.place)
        .replace('{totalDays}', formdata?.noofdays)
        .replace('{traveler}', formdata?.traveler)
        .replace('{budget}', formdata?.budget)
        .replace('{totalDays}', formdata?.noofdays)

      console.log(FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);

      console.log(result?.response?.text());
      setLoading(false)
      saveaitrip(result?.response?.text());
    }
    else {
      toast("filled not be empty");
      return;
    }
    // console.log(formdata);

  }



  const saveaitrip = async (tripdata) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docid = Date.now().toString()
    await setDoc(doc(db, "Aitrips", docid), {
      userSelection: formdata,
      tripdata: JSON.parse(tripdata),
      userEmail: user?.email,
      id: docid
    });
    setLoading(false);
    navigate(`/view-trip/${docid}`);
  }

const GetUserProfile = (tokenInfo) =>{
     axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(userInfo));
      setOpendialog(false)
      OnGenerateTrip();
    })
  
  } 



  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized trip based on your preferences.
      </p>

      <div className="mt-20 flex-col gap-10">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          {/* <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                console.log(v);
              },
            }}
          /> */}
          <Api placedata={handleplacedata} />

        </div>

        {/* Number of Days Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <input
            type="number"
            placeholder="Ex. 3"
            value={days}
            onChange={(e) => { e.preventDefault(); handleInputChange('noofdays', e.target.value) }}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        {/* Budget Options */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={(e) => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg text-center
                  ${formdata?.budget == item.title && 'shadow-lg border-black'}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers Options */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                onClick={(e) => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg text-center
                  ${formdata?.traveler == item.people && 'shadow-lg border-black'}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Trip Button */}
      <div className="my-10 justify-end flex">
       
        <Button 
        disabled={loading} 
        onClick={OnGenerateTrip} className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          {loading ? 
          <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> :  'Generate Trip' 
        }
        </Button>
      </div>

      <Dialog open={opendialog} onOpenChange={(isOpen) => setOpendialog(isOpen)}>

        <DialogContent>
          <DialogHeader>

            <button
              onClick={() => setOpendialog(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              ✖
            </button>
            <DialogDescription>
              <img src='/logo.svg' alt="" />
              <h2 className='font-bold text-lg mt-7'>Sign in the google</h2>
              <p>Sign in to the app with google authentication secure</p>
              <Button 
              disabled={loading}
              onClick={login} 
              className="w-full mt-5 flex gap-4 items-center" varient="outline">
               
                <FcGoogle className='h-7 w-7'/>
                Sign in with google
                
                </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  );
}

export default Createtrip;
