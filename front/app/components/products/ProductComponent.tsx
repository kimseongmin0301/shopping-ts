import { axiosInstance } from "@/app/services/base.service";
import { Card, List, ListItem } from "@material-tailwind/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductProps {
    children: React.ReactNode;
}

export const Product = (props: ProductProps) => {

    const [data, setData] = useState([]);
    const [imageData, setImageData] = useState([]);

    const router = useRouter();

    useEffect(() => {
        axiosInstance.get('/api/product/list')
            .then(res => {
                const data = res?.data;
                setData(data);
                data?.map((key: any) => {
                    axiosInstance.get(`/api/product/image/${key?.media}`, { responseType: 'arraybuffer' })
                        .then((res): any => {
                            const blob = new Blob([res?.data], { type: 'image/jpeg' });
                            const imageUrl = URL.createObjectURL(blob);
                            setImageData((prevImageData): any => [...prevImageData, imageUrl]);
                        })
                })
            })
    }, [])

    const handleOnClickProduct = (e: any) => {
        router.push(`/product/${e.target.dataset.seq}`);
    }


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
                        <ListItem style={{ width: '49%', height: '300px' }} className="w-1/2 justify-center flex-col" key={index} data-seq={product?.seq} onClick={handleOnClickProduct}>
                            <img src={imageData[index]} style={{ height: '100%' }} data-seq={product?.seq} />
                            <span className="font-bold text-lg" style={{ margin: '10px' }}>{product?.title}</span>
                            {props?.children}
                        </ListItem>
                    ))}
                </List>
            </Card >
        </div >
    )
}