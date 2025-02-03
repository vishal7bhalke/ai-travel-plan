import React from 'react'
import { Button } from '../ui/button'
import { useState,useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import MyTrips from '@/my-trips';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function Header() {

  const user=JSON.parse(localStorage.getItem('user'));
  const [opendailog, setOpendialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    console.log(user)
  },[])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserInfo(codeResp),
    onError: (error) => console.log(error)
  })

  const getUserInfo= (tokenInfo) =>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
     headers: {
       Authorization: `Bearer ${tokenInfo?.access_token}`,
       Accept: 'Application/json'
     }
   }).then((resp)=>{
    console.log(resp);
   localStorage.setItem('user', JSON.stringify(resp.data));
   setOpendialog(false);
   window.location.reload()
   })
   
   
 } 



  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
      <img src="/logo.svg" alt="" />
      <div>
        {user?
        <div className='flex items-center gap-3'>
             <a href='/create-trip'>
          <Button variant="outline" 
          className="rounded-full">+Add Trip</Button>
          </a>
          <a href='/my-trips'>
          <Button variant="outline" 
          className="rounded-full">MyTrip</Button>
          </a>
          <Popover>
          <PopoverTrigger>
          <img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/>

          </PopoverTrigger>
          <PopoverContent>
            <h2 className='cursor-pointer'onClick={()=>{
              googleLogout();
              localStorage.clear();
            
              window.location.reload();
            }}>Logout</h2>
          </PopoverContent>
        </Popover>

        </div>
        :
        <Button onClick={()=>setOpendialog(true)}> Sign in</Button>

        }
      </div>
      <Dialog open={opendailog} onOpenChange={(isOpen) => setOpendialog(isOpen)}>

        <DialogContent>
        <DialogHeader>
  <DialogTitle>Sign In</DialogTitle>
  <button
    onClick={() => setOpendialog(false)}
    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
  >
    ✖
  </button>
  <DialogDescription>

              <img src='/logo.svg' alt="" />
              <h2 className='font-bold text-lg mt-7'>Sign in the google</h2>
              <span>Sign in to the app with google authentication secure</span>
              <Button 
              disabled={loading}
              onClick={login} 
              className="w-full mt-5 flex gap-4 items-center" variant="outline">
              
                <FcGoogle className='h-7 w-7'/>
                Sign in with google
                
                </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
        </Dialog>

            </div>
  )
}

export default Header
