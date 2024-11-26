"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CountryPage } from "./CountryPage";

interface Country{
  countryCode:string,
  name:string
}

export default function Home() {
  const [countries, setCountries] = useState([])
  const getCountries = async () =>{
    await axios
      .get("http://localhost:3001/availableCountries")
      .then((response) => {
        setCountries(response.data)
        console.log("countriess", response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(()=>{
    getCountries()
  },[])
  return (
    <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
      {
        countries.map((country:Country)=>(
          <CountryPage key={country.countryCode} name={country.name} id={country.countryCode}/>
        ))
      }
    </div>
  )
}


