'use client'

import Footer from "./components/Footer"
import Header from "./components/Header"
import SliderComponent from "./components/slider/Slider"

export default function Home() {

  return (
    <>
      <Header />
      <div>
        <SliderComponent />
      </div>
      <Footer />
    </>
  )
}
