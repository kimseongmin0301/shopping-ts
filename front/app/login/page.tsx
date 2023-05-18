'use client'

import React, { useEffect, useRef, useState } from 'react';
import { axiosInstance } from '../services/base.service';
import { useRouter } from 'next/navigation';
import SingleLayout from '../components/SingleLayout';
import Link from 'next/link';
import { Button, Input } from '@material-tailwind/react';

export default function Login() {
    const router = useRouter();
    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    const [id, setId] = useState<string>('');
    const [pw, setPw] = useState<string>('');

    const handleonClick = async () => {
        console.log(id, pw)
        await axiosInstance.post('/api/auth/login', {
            id: id,
            password: pw
        })
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('access_token', res.data.access_token)
                    router.push('/');
                } else {
                    console.log('로그인 실패');
                }
            })
            .catch((error) => console.log(error))
    }

    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    }

    const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPw(e.target.value);
    }

    useEffect(() => {
        if (idRef.current) {
            setId(idRef.current.value);
        }
        console.log(id, pw)
    }, [idRef]);

    useEffect(() => {
        if (pwRef.current)
            setPw(pwRef.current.value);
    }, [pwRef]);


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
                        <div>
                            <div className="flex flex-col items-start">
                                <Input
                                    type="text"
                                    name="name"
                                    className="block mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    label="아이디"
                                    onChange={handleIdChange}
                                    ref={idRef}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex flex-col items-start">
                                <Input
                                    type="password"
                                    name="password"
                                    className="block mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    label="비밀번호"
                                    onChange={handlePwChange}
                                    ref={pwRef}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <Button onClick={handleonClick}>
                                로그인
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </SingleLayout>
    );
}