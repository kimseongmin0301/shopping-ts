'use client'

import CommonLayout from "@/app/components/CommonLayout";
import axiosInstance from "@/app/services/base.service";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlignDropdown, Editor, EditorComposer, InsertDropdown, ToolbarPlugin } from "verbum";

type Props = {
    params: {
        id: number;
    }
}

export const ProductId = ({params: {id}}: Props) => {
    const [data, setData] = useState({});


    const [login, setLogin] = useState('');

    useEffect(() => {
        axiosInstance.get('/api/auth/profile', {
            headers: { Authorization: localStorage.getItem('access_token') }
        })
        .then((res) => {
            setLogin(res.data.id);
        })   
    }, [])


    useEffect(() => {
        axiosInstance.get(`api/product/list/${id}`)
        .then(res => {
            const result = res?.data;
            console.log(result)
            setData(result);
        })    
        .catch(error => {
        console.error('Failed to fetch data:', error);
    });

  }, [])
  const router = useRouter();

  const [amount, setAmount] = useState(1);

  const handleOnChangeAmount = (e: any) => {
    const inputValue = parseFloat(e.target.value);
        if (inputValue > 1) {
        setAmount(inputValue);
        } else {
        setAmount(1);
        }
  }

  const handleOnClickPaying = () => {
    const buy = confirm('결제하시겠습니까?')
  
    if(buy) {
        const result = [{
                userId: login,
                productPrice: parseInt(data?.price, 10),
                amount: amount,
                title: data?.title,
        }]

        axiosInstance.post("/api/payment", result)
        .then(
            (res) => {
                router.push('/payment')
            }
        )
    }
}


  return (
        <CommonLayout>
                    <div className="flex flex-col align-center" style={{ margin: '20px auto', alignItems: 'center' }}>
                        <label>상품명</label><input className="border-solid border-black border" style={{ width: '500px' }} type="text" value={data?.title} disabled/>
                        <label>가격</label><input className="border-solid border-black border" style={{ width: '500px' }} type="text"  value={data?.price} disabled/>
                        <label>수량</label><input className="border-solid border-black border" style={{width: '500px'}} type="number" onChange={handleOnChangeAmount} value={amount}  min='1' />
                    </div>
                               
                    <div className="w-full">
                         <div className="" style={{width:"500px"}} dangerouslySetInnerHTML={{ __html: data?.content }} />
                    </div>
                    
                    <div>
                        <div className="flex justify-end" style={{ margin: "20px" }}>
                            <ButtonGroup color="amber">
                                <Button onClick={handleOnClickPaying}>구매</Button>
                                <Button onClick={() => router.push('/product')}>목록</Button>
                            </ButtonGroup>
                        </div>
                    </div>
        </CommonLayout>
  );
}

export default ProductId;
