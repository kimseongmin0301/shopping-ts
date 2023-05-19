'use client'

import { Button } from "@material-tailwind/react";
import CommonLayout from "../components/CommonLayout";
import { useRouter } from "next/navigation";
import { Product } from "../components/products/ProductComponent";


export default function ProductPage() {
  const router = useRouter();

  const handleOnClick = () => {
    router.push('/product/write')
  }

  return (
    <CommonLayout>
      <div className="flex w-full flex-col">
        <div className="w-full justify-end flex">
          <Button className="m-0.5" onClick={handleOnClick}>
            글쓰기
          </Button>
        </div>

        <Product>
        </Product>
      </div>
    </CommonLayout>
  );
}
