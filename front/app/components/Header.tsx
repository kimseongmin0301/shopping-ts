'use client'

import { useRouter, usePathname } from "next/navigation";
import { HeaderButton } from "./header-button/HeaderButton";

const headerData = [
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
    {
        label: '프로필',
        value: 'profile',
        path: '/profile',
    },
]

const Header = () => {
    const router = useRouter();

    const currentPath = usePathname();

    const currentButton = () => {
        const btn = headerData.find((data) => data.path === currentPath);
        return btn ? btn.value : '';
    }


    const onClickHeaderButton = (value: string | number) => {
        const clickButton = headerData.find((btn) => btn.value === value);

        if (clickButton) {
            router.push(clickButton.path)
        }
    }

    return (
        <div className='header'>
            <div className="flex items-center justify-between p-2 border-b">
                <div className="flex gap-4">
                    <span>로고</span>
                </div>
                <div className="flex m-2">
                    <HeaderButton value={currentButton()} data={headerData} onTrackable={onClickHeaderButton} />
                </div>
            </div>
        </div>
    )

}
export default Header;
