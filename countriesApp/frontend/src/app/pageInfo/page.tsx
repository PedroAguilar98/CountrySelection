"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { CountryPage } from '../CountryPage';

interface Country{
  countryCode:string,
  commonName:string
}

const PageInfo = () => {

  const [flag, setFlag] =useState('')
  const [borderCountries, setBorderCountries] = useState([])
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [isLoading, setIsLoading] = useState(false)
  const name = searchParams.get('name');
  console.log("idd", name)
  const getCountryInfo = async () =>{
    setIsLoading(true)
    await axios
      .post("http://localhost:3001/countryInfo",{countryId:id, countryName:name},{
        headers: {
          'Content-Type': 'application/json', // This is optional as axios does it by default
        }
      })
      .then((response) => {
        setIsLoading(false)
        setFlag(response.data.flag)
        setBorderCountries(response.data.info.borders)
        console.log("response", response)
      })
      .catch((error) => {
        setIsLoading(false)
        console.error("Error fetching data:", error);
      });
  }

  useEffect(()=>{
    getCountryInfo()
  },[id])
  return (
    <>
    <div style={{display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
        <h1>
          {name}
        </h1>
        {flag?<img style={{width:'50px'}} src={flag} alt="" />:'Loading...'}
        </div>
        <div style={{marginTop:'20px'}}>
          <h2>Border countries</h2>
          <div style={{display:'flex', flexDirection:'row'}}>
          {borderCountries?.map((country:Country)=>(
            <CountryPage key={country.countryCode} name={country.commonName} id={country.countryCode}/>
          ))}
          </div>
        </div>
      </div>
      {isLoading?<h1>Retrieving data...</h1>:''}
    </>
  )
}

export default PageInfo


