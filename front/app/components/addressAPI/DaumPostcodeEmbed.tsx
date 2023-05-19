'use client'

import axiosInstance from '@/app/services/base.service';
import { Button, Input } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

interface PostcodeProps {
    onAddress1Data: (e: any) => void;
    onAddress2Data: (e: any) => void;
    onAddress3Data: (e: any) => void;
    address1?: any | null;
    address2?: any | null;
    address3?: any | null;
}

export const Postcode = (props: PostcodeProps) => {

    useEffect(() => {
        axiosInstance.get('/api/auth/profile', {
            headers: { Authorization: localStorage.getItem('access_token') }
        })
            .then(res => {
                setFullAddr(res.data.UserInfo.address2)
                setZoneCode(res.data.UserInfo.address1)
                setEndCode(res.data.UserInfo.address3)
            })
    }, [])

    const [fullAddr, setFullAddr] = useState<string>('');
    const [zoneCode, setZoneCode] = useState<string>('');
    const [endCode, setEndCode] = useState<string>('');

    const add3 = useRef<HTMLInputElement>(null);

    const CURRENT_URL = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(CURRENT_URL);

    const handleComplete = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = '';
        let zoneCode = data.zonecode;

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setFullAddr(fullAddress);
        setZoneCode(zoneCode);
        props.onAddress1Data(zoneCode);
        props.onAddress2Data(fullAddress);
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    useEffect(() => {
        if (add3.current) {
            add3.current.value = endCode;

            props.onAddress3Data(endCode);
        }
    }, [endCode])
    return (
        <>
            <div className="flex justify-between m-2">
                <input
                    type="text"
                    className="block mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="우편번호"
                    disabled
                    value={zoneCode}
                />

                <Button
                    type="button"
                    className="block mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    onClick={handleClick}
                > Click
                </Button>
            </div>
            <div className="flex justify-between m-2">
                <input
                    type="text"
                    className="block mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="주소"
                    disabled
                    value={fullAddr}
                />
                <input
                    type="text"
                    className="block mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="참고항목"
                    onChange={(e: any) => setEndCode(e.target.value)}
                    ref={add3}
                />
            </div>
        </>

    );
};
