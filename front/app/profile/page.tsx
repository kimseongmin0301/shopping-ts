'use client'

import { Button, Card } from "@material-tailwind/react";
import Header from "../components/Header";
import SingleLayout from "../components/SingleLayout";
import { SideBar } from "../components/sidebar/SideBar";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../services/base.service";
import { Postcode } from "../components/addressAPI/DaumPostcodeEmbed";

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

  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    axiosInstance.get('/api/auth/profile', {
      headers: { Authorization: localStorage.getItem('access_token') }
    })
      .then(res => {
        setUserProfile(res.data)
      })
  }, [])

  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');

  const handleAddress1Received = (data: any) => {
    console.log(data)
    setAddress1(data);
  }
  const handleAddress2Received = (data: any) => {
    setAddress2(data);
  }
  const handleAddress3Received = (data: any) => {
    setAddress3(data);
  }

  const handleOnClickUpdateAddress = () => {
    axiosInstance.put('/api/users/updateAddress', {
      id: userProfile.id,
      address1: address1 as string,
      address2: address2 as string,
      address3: address3 as string,
      modDt: new Date(),
    })
      .then((res) => { console.log(res) })
      .catch((error) => console.log(error))
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
                  <Postcode onAddress1Data={handleAddress1Received} onAddress2Data={handleAddress2Received} onAddress3Data={handleAddress3Received}
                    address1={userProfile?.UserInfo?.address1} address2={userProfile?.UserInfo?.address2} address3={userProfile?.UserInfo?.address3}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td className="flex justify-end">
                  <Button color="green" onClick={handleOnClickUpdateAddress}>
                    수정
                  </Button>
                </td>
              </tr>
            </table>
          </Card>
        </div>
      </div>

    </SingleLayout >
  );
}
