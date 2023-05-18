'use client'

import { Button, Card } from "@material-tailwind/react";
import Header from "../components/Header";
import SingleLayout from "../components/SingleLayout";
import { SideBar } from "../components/sidebar/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../services/base.service";

const userInfo = ['아이디', '비밀번호', '이름', '주소']

export default function Profile() {
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

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    axiosInstance.get('/api/auth/profile', {
      headers: { Authorization: localStorage.getItem('access_token') }
    })
      .then(res => {
        setUserProfile(res.data)
        console.log(res.data)
      })
  }, [])

  const handleonClickAddressChange = () => {
    axiosInstance.put('')
  }


  return (
    <SingleLayout>
      <Header headerProps={headerData} />
      <div >
        <SideBar />
        <div>
          <Card style={{ marginLeft: '240px' }}>
            <table className="justify-center text-center align-center" >
              <tr>
                <td>아이디</td>
                <td>{userProfile?.id}</td>
              </tr>
              <tr>
                <td>이름</td>
                <td>{userProfile?.name}</td>
              </tr>
              <tr>
                <td>주소</td>
                <td>
                  {userProfile?.UserInfo?.address1} {userProfile?.UserInfo?.address2} {userProfile?.UserInfo?.address3}   <Button>주소 바꾸기</Button>
                </td>
              </tr>
            </table>
          </Card>
        </div>
      </div>

    </SingleLayout >
  );
}
