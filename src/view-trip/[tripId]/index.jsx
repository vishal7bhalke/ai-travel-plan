import React from 'react'
import { useParams } from 'react-router-dom';
import { db } from '@/service/firebaseconfig';
import { doc } from 'firebase/firestore';
import InfoSection from '../components/InfoSection';
import { useState,useEffect } from 'react';
import { getDoc } from 'firebase/firestore';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import { toast } from 'sonner';

function Viewtrip() {

  const {tripId}=useParams();
  const [trip,setTrip]=useState([]);

  useEffect(()=>{
    tripId && GetTripData();
  },[tripId])


  const GetTripData=async()=>{
    const docRef=doc(db,'Aitrips',tripId);
    const docSnap=await getDoc(docRef);

    if(docSnap.exists()){
      console.log("Document:",docSnap.data());
      setTrip(docSnap.data());
    }
    else{
      console.log("No Such document");
      toast('No trip found!')
    }
  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
     {/*Information section*/}
        <InfoSection trip={trip}/>
     {/*Recommended hotel */}
        <Hotels trip={trip}/>
     {/*Daily plan */}
        <PlacesToVisit trip={trip}/>
     {/*Footer */}
        <Footer trip={trip}/>
    </div>
  )
}

export default Viewtrip
