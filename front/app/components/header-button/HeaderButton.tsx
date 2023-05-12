'use client'

import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

interface HeaderButtonProps {
    value?: string | number;
    data?: {
        label: string;
        value: string | number;
    }[];

    onTrackable?: (value: string | number) => void;
}

export const HeaderButton = (props: HeaderButtonProps) => {
    const { value = '', data = [], onTrackable = () => { } } = props;

    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        if (value) setLocalValue(value);
    }, [value]);

    useEffect(() => {
        if (localValue) onTrackable(localValue);
    }, [localValue]);

    const onClickHeaderButton = (sValue: string | number) => () => {
        setLocalValue(sValue);
    }

    return (
        <>
            {
                data.map((item, index) => (
                    <Button key={index} color='amber' onClick={onClickHeaderButton(item.value)} className="m-1 mx-2">
                        {item.value}
                    </Button>
                ))
            }
        </>
    );
};