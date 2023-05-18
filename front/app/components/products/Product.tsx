import { axiosInstance } from "@/app/services/base.service";
import { Card, List, ListItem } from "@material-tailwind/react"
import { useEffect, useState } from "react";

interface ProductProps {
    children: React.ReactNode;
}

const productData = [
    { name: "Product 1", description: "Description 1" },
    { name: "Product 2", description: "Description 2" },
    { name: "Product 2", description: "Description 2" },
    { name: "Product 2", description: "Description 2" },
    { name: "Product 2", description: "Description 2" },
    { name: "Product 2", description: "Description 2" },
    { name: "Product 2", description: "Description 2" },
    { name: "Product 2", description: "Description 2" },
    { name: "Product 2", description: "Description 2" },
    { name: "Product 2", description: "Description 2" },
    { name: "Product 2", description: "Description 2" },
    // ... 추가적인 상품 데이터
];

export const Product = (props: ProductProps) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/product/list')
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
    }, [])

    return (
        <Card className="w-64">
            <List className="flex-wrap" style={{ "flexDirection": "row" }}>
                {data?.map((product, index) => (
                    <ListItem style={{ width: '49%' }} className="w-1/2 justify-center" key={index}>
                        {product.seq}
                        {product.userId}
                        {props.children}
                    </ListItem>
                ))}
            </List>
        </Card >
    )
}