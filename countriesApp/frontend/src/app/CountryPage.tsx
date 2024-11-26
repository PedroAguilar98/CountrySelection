"use client";
import React from 'react'
import  './CountryPageStyles.css'
import Link from 'next/link';

export const CountryPage = (props:{name:string, id:string}) => {

  return (
    <Link href={`/pageInfo?id=${props.id}&name=${props.name}`} className='card' >
        {props.name}
    </Link>
  )
}
