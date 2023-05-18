'use client'

import { useEffect, useState } from "react";
import Header from "../components/Header";
import SingleLayout from "../components/SingleLayout";
import { SideBar } from "../components/sidebar/SideBar";

export default function Payment() {
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
  return (
    <SingleLayout>
      <Header headerProps={headerData} />
      <SideBar />
    </SingleLayout>
  );
}
