import { axiosInstance } from "@/app/services/base.service";
import { Card, List, ListItem } from "@material-tailwind/react"
import { useEffect, useState } from "react";

interface ProductProps {
    children: React.ReactNode;
}

export const Product = (props: ProductProps) => {

    const [data, setData] = useState([]);
    const [seq, setSeq] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/product/list')
            .then(res => {
                setData(res?.data);
            })
    }, [])



    // data Seq값만 받아와야함
    // useEffect(() => {
    //     if (data) {
    //         setSeq(prevSeq => [...prevSeq, ...data]);
    //     }
    //     console.log(seq)
    // }, [data]);

    return (
        <div style={{ height: '800px', overflowY: 'scroll' }}>
            <style>
                {`
                ::-webkit-scrollbar {
                    width: 0.5em;
                    background-color: transparent;
                }
                
                ::-webkit-scrollbar-thumb {
                    background-color: transparent;
                }
                `}
            </style>
            <Card className="w-64">
                <List className="flex-wrap" style={{ "flexDirection": "row" }}>
                    {data?.map((product, index) => (
                        <ListItem style={{ width: '49%', height: '150px' }} className="w-1/2 justify-center" key={index}>

                            {product?.title}

                            {props?.children}
                        </ListItem>
                    ))}
                </List>
            </Card >
        </div >
    )
}