'use client'

import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const metadata = {
  title: '1234',
  description: 'Generated by create next app',
}

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
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
          path: '/'
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

  const path = usePathname();
  const updatePattern = /^\/product\/update\/[^/]*$/
  const paramPattern = /\/product\/\d+/; // 숫자로 된 파라미터 패턴
  return (
    <div>
      <Head>
        <title>My App</title>
        <link rel="stylesheet" href="/static/css/style.css" />
      </Head>
      <Header headerProps={headerData} />
      <div style={{ height: '800px' }}>
        {children}
      </div>
      {!paramPattern.test(path) && path !== '/product/write' && path !== '/paying' && !updatePattern.test('/product/update') && <Footer />}    </div>
  )
};
export default CommonLayout;
