'use client'

import { useRouter, usePathname } from "next/navigation";
import { HeaderButton } from "./header-button/HeaderButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "../services/base.service";

interface HeaderProps {
    headerProps: {
        label: string;
        value: string;
        path: string;
    }[];
}

const Header = ({ headerProps }: HeaderProps) => {
    const router = useRouter();

    const currentPath = usePathname();

    const currentButton = () => {
        const btn = headerProps?.find((data) => data.path === currentPath);
        return btn ? btn.value : '';
    }


    const onClickHeaderButton = (value: string | number) => {
        const clickButton = headerProps?.find((btn) => btn.value === value);

        if (clickButton) {
            router.push(clickButton.path)
        }
    }

    return (
        <div className='header'>
            <div className="flex items-center justify-between p-2 border-b">
                <div className="flex gap-4">
                    <Link href='/'><span>Logo</span></Link>
                </div>
                <div className="flex m-2">
                    <HeaderButton value={currentButton()} data={headerProps} onTrackable={onClickHeaderButton} />
                </div>
            </div>
        </div>
    )

}
export default Header;
