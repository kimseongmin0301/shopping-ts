'use client'

import { useEffect, useState } from "react";
import Header from "../components/Header";
import SingleLayout from "../components/SingleLayout";
import { SideBar } from "../components/sidebar/SideBar";
import { Card } from "@material-tailwind/react";
import axiosInstance from "../services/base.service";
import { kill } from "process";
import { kStringMaxLength } from "buffer";

const paymentHeader = ['번호', '상품명', '상품가격', '수량', '결제 가격']

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

  const [data, setData] = useState([{}]);

  useEffect(() => {
    axiosInstance.get('/api/auth/profile', {
      headers: { Authorization: localStorage.getItem('access_token') }
    })
      .then(res => {
        axiosInstance.get(`/api/payment/${res.data.id}`)
          .then((paymentRes) => {
            setData(paymentRes.data)
          })
      })
  }, [])

  return (
    <SingleLayout>
      <Header headerProps={headerData} />
      <SideBar />
      <Card style={{ marginLeft: '240px' }}>
        <div className="m-x flex flex-column">
          <div className="w-full" style={{ border: "1px solid black" }}>
            <div className="text-center w-full flex  justify-center">
              {paymentHeader?.map((val, index) =>
                <div key={index} style={{ padding: "5px 50px", width: '200px' }}>
                  {val}
                </div>
              )}
            </div>
            {data.map((item, index) => (
              <div key={index} style={{ padding: "5px 50px" }} className="w-full flex text-center w-full justify-center">
                <div style={{ padding: "5px 50px", width: '200px' }}>{item?.orderNumber}</div>
                <div style={{ padding: "5px 50px", width: '200px' }}>{item?.title}</div>
                <div style={{ padding: "5px 50px", width: '200px' }}>{item?.productPrice}</div>
                <div style={{ padding: "5px 50px", width: '200px' }}>{item?.amount}</div>
                <div style={{ padding: "5px 50px", width: '200px' }}>{item?.productPrice * item?.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </SingleLayout >
  );
}
