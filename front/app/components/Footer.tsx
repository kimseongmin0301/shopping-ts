'use clinet'

import { useRouter, usePathname } from "next/navigation";
import { CustomTab } from "./tab/CustomTab";

const tabData = [
    {
        label: '메인',
        value: 'main',
        path: '/',
    },
    {
        label: '상품목록',
        value: 'product',
        path: '/product',
    },
    {
        label: '장바구니',
        value: 'cart',
        path: '/cart',
    },
];

export const Footer = () => {

    const router = useRouter();

    const currentPath = usePathname();

    const currentTab = (): (string | number) => {
        const currentTab = tabData.find((tab) => tab.path === currentPath);
        return currentTab ? currentTab.value : '';
    }

    const onClickTab = (value: string | number) => {
        const nextTab = tabData.find((item) => item.value === value);

        if (nextTab) {
            router.push(nextTab.path);
        }
    };

    return (
        <CustomTab value={currentTab()} data={tabData} onTrackable={onClickTab} />
    );
};

export default Footer;
