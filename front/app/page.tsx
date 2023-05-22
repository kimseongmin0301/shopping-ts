'use client'

import { List, ListItem } from "@material-tailwind/react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import SliderComponent from "./components/slider/Slider"
import { useEffect, useState } from "react"
import Modal from "./components/popup/Popup"
import Popup from "./components/popup/Fixed"
import axiosInstance from "./services/base.service"
export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [headerData, setHeaderData] = useState([{
    label: '로그인',
    value: 'login',
    path: '/login',
  },
  {
    label: '회원가입',
    value: 'join',
    path: '/join',
  }]);

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      setHeaderData([
        {
          label: '로그아웃',
          value: 'logout',
          path: ''
        },
        {
          label: '프로필',
          value: 'profile',
          path: '/profile',
        },
      ])
    } else {
      setHeaderData([
        {
          label: '로그인',
          value: 'login',
          path: '/login',
        },
        {
          label: '회원가입',
          value: 'join',
          path: '/join',
        },
      ])
    }
  }, [])
  // const [data, setData] = useState();

  // useState(()=>{
  //   axiosInstance.get('/api/product/list')
  //   .then(res => setData(res?.data))
  // })

  return (
    <>
      <Header headerProps={headerData} />
      <div style={{ height: '800px' }}>
        <div className="m-2">
          <Modal />
          <Popup />
            <img src="https://picsum.photos/1500/600" />
        </div>
      </div>
      <Footer />
    </>
  )
}
