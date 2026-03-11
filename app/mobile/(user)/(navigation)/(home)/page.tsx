"use client";
import React, { useState } from 'react'
import HeroSection from './_components/HeroSection'
import CategorySection from './_components/CategorySection'
import LiveContests from './_components/LiveContests'
export default function page() {
  const [selected,setSelected] = useState("all");
  return (
    <div className='w-full grid gap-7 p-3 w-full mx-auto'>
        <HeroSection/>
        <CategorySection selected={selected} setSelected={setSelected}/>
        <LiveContests selected={selected} setSelected={setSelected}/>
    </div>
  )
}
