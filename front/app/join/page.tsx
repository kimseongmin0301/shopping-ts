'use client'

import React from 'react';
import SingleLayout from '../components/SingleLayout';
import Link from 'next/link';
import { Button, Input } from '@material-tailwind/react';
import { Postcode } from '../components/addressAPI/DaumPostcodeEmbed';

export const JoinPage = () => {

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
                            <div>
                                <div className="flex flex-col items-start">
                                    <Input
                                        type="text"
                                        name="name"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        label="아이디"
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
                                    <Postcode />
                                </div>
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <Button type="submit">
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