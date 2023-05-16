'use client'

import React, { useEffect, useRef, useState } from 'react';
import SingleLayout from '../components/SingleLayout';
import Link from 'next/link';
import { Button, Input } from '@material-tailwind/react';
import { Postcode } from '../components/addressAPI/DaumPostcodeEmbed';
import { axiosInstance } from '../services/base.service';
import { useRouter } from 'next/navigation';

export const JoinPage = () => {
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        axiosInstance.post('/api/users/join', {
            id: userId,
            password: pw,
            name: name,
            address1: address1,
            address2: address2,
            address3: address3
        })
            .then(res => {
                console.log(res.status)
                if (res.status === 200) {
                    router.push('/login');
                } else {
                    // 가입 요청이 실패한 경우
                    console.log('가입 실패');
                    // 실패에 대한 처리를 추가할 수 있습니다.
                }
            })
            .catch(error => {
                console.log(error);
                // 가입 요청 중에 오류가 발생한 경우
                console.log('가입 오류');
                // 오류에 대한 처리를 추가할 수 있습니다.
            });
    }

    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    const [userId, setUserId] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');

    const handleAddress1Received = (data: any) => {
        setAddress1(data);
    }
    const handleAddress2Received = (data: any) => {
        setAddress2(data);
    }
    const handleAddress3Received = (data: any) => {
        setAddress3(data);
    }

    useEffect(() => {
        if (idRef.current) {
            idRef.current.value = userId;
        }
    }, [userId]);

    useEffect(() => {
        if (pwRef.current) {
            pwRef.current.value = pw;
        }
    }, [pw]);

    const handleIdChange = (e: any) => {
        setUserId(e.target.value);
    }

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    }

    const handlePwChange = (e: any) => {
        setPw(e.target.value);
    }

    return (
        <SingleLayout>
            <div>
                <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                    <div>
                        <Link href="/">
                            <h3 className="text-4xl font-bold text-purple-600">
                                Logo
                            </h3>
                        </Link>
                    </div>
                    <div className="w-96 px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                        <form method='post'>
                            <div className="mt-4">
                                <div className="flex flex-col items-start">
                                    <input
                                        type="text"
                                        name="name"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="아이디"
                                        onChange={handleIdChange}
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex flex-col items-start">
                                    <input
                                        type="text"
                                        name="name"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="이름"
                                        onChange={handleNameChange}
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex flex-col items-start">
                                    <Input
                                        type="password"
                                        name="password"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        label="비밀번호"
                                        onChange={handlePwChange}
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex flex-col items-start">
                                    <Input
                                        type="password"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        label="비밀번호 확인"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex flex-col items-start">
                                    <Postcode onAddress1Data={handleAddress1Received} onAddress2Data={handleAddress2Received} onAddress3Data={handleAddress3Received} />
                                </div>
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <Button type="submit" onClick={handleSubmit}>
                                    회원가입
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </SingleLayout>
    )
}

export default JoinPage;