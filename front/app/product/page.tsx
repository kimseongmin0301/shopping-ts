'use client'

import { Button } from "@material-tailwind/react";
import CommonLayout from "../components/CommonLayout";
import { useRouter } from "next/navigation";
import { Product } from "../components/products/ProductComponent";
import axiosInstance from "../services/base.service";
import { useEffect, useState } from "react";


export default function ProductPage() {
  const router = useRouter();

  const handleOnClick = () => {
    router.push('/product/write')
  }

  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    axiosInstance.get('/api/auth/profile', {
      headers: { Authorization: localStorage.getItem('access_token') }
    })
      .then(res => {
        setIsLogined(true);
      })
      .catch(error => {
        setIsLogined(false)
        console.log(error.response)
      })
  }, [])

  return (
    <CommonLayout>
      <div className="flex w-full flex-col">
        <div className="w-full justify-end flex">
          {isLogined && (
            <Button className="m-0.5" onClick={handleOnClick}>
              글쓰기
            </Button>
          )}

        </div>

        <Product>
        </Product>
      </div>
    </CommonLayout>
  );
}
