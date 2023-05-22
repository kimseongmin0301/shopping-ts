'use client'
import { Button, Card, Typography } from "@material-tailwind/react";
import CommonLayout from "../components/CommonLayout";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../services/base.service";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CartProps {

}
const options = Array.from({ length: 10 }, (_, index) => index + 1);
export default function Cart(props: CartProps) {
  const [data, setData] = useState([{}]);
  const [disabled, setDisabled] = useState<boolean[]>([true]);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const handleToggle = (cart: {}, index: number) => {
    setDisabled((prevDisabled) => {
      const updatedDisabled = [...prevDisabled];
      updatedDisabled[index] = !prevDisabled[index];

      if (!prevDisabled[index]) {
        axiosInstance.put('/api/cart/update', {
          seq: cart?.seq,
          count: parseInt(cart?.count)
        })
      }

      return updatedDisabled;
    });
  };

  useEffect(() => {
    axiosInstance.get('/api/auth/profile', {
      headers: { Authorization: localStorage.getItem('access_token') }
    })
      .then(res => {
        axiosInstance.get(`/api/cart/${res?.data?.id}`)
          .then(res => {
            setData(res?.data)
            setDisabled(Array(res?.data.length).fill(true));
          })
      })
  }, [])

  const [price, setPrice] = useState(1);

  const handleOnChangeAmount = (e: any, index: number) => {
    let value = e.target.value;
    if (value < 1) {
      value = 1;
    }
    setData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], count: value };
      return newData;
    });
  };

  const handleSelectAll = (e: any) => {
    const { checked } = e.target;
    setChecked(checked); // 전체 선택 상태 업데이트

    setData((prevData) => {
      return prevData.map((item) => {
        return { ...item, checked }; // 모든 아이템의 checked 상태를 전체 선택 상태로 설정
      });
    });
  };

  const handleSelect = (index: number) => {
    setData((prevData) => {
      return prevData.map((item, itemIndex) => {
        if (itemIndex === index) {
          return { ...item, checked: !item?.checked }; // 선택한 아이템의 checked 상태를 반전
        }
        return item;
      });
    });
  };

  const handleDelete = () => {
    const checkedItems = data.filter((item) => item?.checked);
    const cartDtos = checkedItems.map((item) => ({
      seq: item?.seq,
    }));
    console.log(cartDtos);
    axiosInstance.delete('/api/cart/delete', { data: cartDtos })
      .then(res => {

      })
  }

  const handleBuy = () => {
    const checkedItems = data.filter((item) => item?.checked);
    const paymentDtos = checkedItems.map((item) => ({
      userId: item?.userId,
      productPrice: parseInt(item?.product?.price),
      title: item?.product?.title,
      amount: item?.count,
    }));

    const cartDtos = checkedItems.map((item) => ({
      seq: item?.seq,
    }));

    axiosInstance
      .post('/api/payment', paymentDtos)
      .then((response) => {
        // console.log(response);
        axiosInstance.delete('/api/cart/delete', { data: cartDtos })
          .then(res => { router.push('/payment') })
      })
      .catch((error) => {
        // 오류 처리 로직
      });
  }

  const TABLE_HEAD = [<div><input type='checkbox' onChange={handleSelectAll} />전체선택</div>, "상품", "수량", "가격"];

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
          {data.map((cart, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" checked={cart?.checked} onChange={() => handleSelect(index)} />
              </td>
              <td>{cart?.product?.title}</td>
              <td>
                <div>
                  <input type='number' value={cart?.count} onChange={(e) => handleOnChangeAmount(e, index)} disabled={disabled[index]} />
                  <button key={index} onClick={() => handleToggle(cart, index)}>
                    {disabled[index] ? "수정" : "완료"}
                  </button>

                </div>
              </td>
              <td>
                <input type="text" disabled value={price} />
              </td>
            </tr>
          ))}
        </table>
        <div className="flex justify-end" style={{ margin: '10px' }}>
          <Button color="amber" onClick={handleBuy}>구매하기</Button>
          <Button color="amber" onClick={handleDelete}>삭제하기</Button>
        </div>
      </Card>
    </CommonLayout >
  );
}
