'use client'

import { Button, Input } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

export const Postcode = (props: any) => {

    const [fullAddr, setFullAddr] = useState('');
    const [zoneCode, setZoneCode] = useState('');
    const [endCode, setEndCode] = useState('');

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
                > 우편번호 찾기
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
