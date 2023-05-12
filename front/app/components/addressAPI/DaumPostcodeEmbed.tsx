'use client'

import { Button, Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

export const Postcode = () => {

    const [fullAddr, setFullAddr] = useState('');
    const [zoneCode, setZoneCode] = useState('');

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
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <>
            <div className="flex justify-between m-2">
                <Input
                    type="text"
                    className="block mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    label="우편번호"
                    onChange={(e: any) => setFullAddr(e.target.value)}
                    value={zoneCode}
                />
                <Button
                    type="button"
                    className="block mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    onClick={handleClick}
                > 우편번호 찾기
                </Button>
            </div>
            <div className="flex justify-between m-2">
                <Input
                    type="text"
                    className="block mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    label="주소"
                    onChange={(e: any) => setZoneCode(e.target.value)}
                    value={fullAddr}
                />
                <Input
                    type="text"
                    className="block mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    label="참고항목"
                />
            </div>
        </>

    );
};
