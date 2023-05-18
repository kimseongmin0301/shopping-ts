import { Cog6ToothIcon, ShoppingBagIcon, TruckIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { Card, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react"
import { useRouter } from "next/navigation"

export const SideBar = () => {

    const router = useRouter();


    return (
        <Card className="fixed top-4 left-0 h-[calc(100vh-2rem)] w-16 max-w-[20rem] shadow-xl shadow-blue-gray-900/5 h-full" style={{ borderRight: "1px solid #eeeeee", borderRadius: "0" }}>
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    Sidebar
                </Typography>
            </div>
            <List>
                <ListItem onClick={() => router.push('/profile')}>
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Profile
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <TruckIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    배송지정보
                </ListItem>
                <ListItem onClick={() => router.push('/payment')}>
                    <ListItemPrefix>
                        <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    결제내역
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    비밀번호 변경
                </ListItem>
            </List>
        </Card>
    )
}