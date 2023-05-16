'use client'

import { List, ListItem } from "@material-tailwind/react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import SliderComponent from "./components/slider/Slider"
import { useState } from "react"
import { Popup } from "./components/popup/Popup"
export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <>
      <Header />
      <div>
        <h1>My Page</h1>
        <button onClick={openPopup}>Open Popup</button>

        {isPopupOpen && (
          <Popup onClose={closePopup}>
            <img className="object-scale-down w-96 h-48 flex justify-center relation z-80"
              src="https://velog.velcdn.com/images/sssssssssy/post/f7383259-1e51-4cb2-b958-c5b85956fb45/image.png"
            />
          </Popup>
        )}
      </div>
      <div className="m-2">
        <ListItem>
          <List>123</List>
          <List>1234</List>
        </ListItem>
      </div>
      <Footer />
    </>
  )
}
