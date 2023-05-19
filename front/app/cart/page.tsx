'use client'
import { Card, Typography } from "@material-tailwind/react";
import CommonLayout from "../components/CommonLayout";
import { CartBody } from "../components/cart/CartBody";

interface CartProps {

}

export default function Cart(props: CartProps) {
  const TABLE_HEAD = [<div><input type='checkbox' />  전체선택</div>, "상품", "수량", "가격"];

  return (
    <CommonLayout>
      <Card className="overflow-scroll w-full" style={{ height: '500px' }}>
        <table className="w-full min-w-max table-auto text-center">
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
          <CartBody />
        </table>
      </Card>
    </CommonLayout>
  );
}
