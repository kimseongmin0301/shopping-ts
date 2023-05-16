import { Card, List, ListItem } from "@material-tailwind/react";

interface CartProps {
    children: React.ReactNode;
}

export const Cart = (props: CartProps) => {
    return (
        <Card className="w-full">
            <List>
                <ListItem>
                    123
                </ListItem>
            </List>
        </Card>
    )
}