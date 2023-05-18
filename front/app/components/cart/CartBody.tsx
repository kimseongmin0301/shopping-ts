import { axiosInstance } from "@/app/services/base.service";
import { Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export const CartBody = () => {
    // await axiosInstance.get('/api/cart/:id',{
    //     id: id
    // })

    //데이터 가져와서 state에 넣고 그걸로 뿌리기
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);

    const handleOnChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = parseInt(e.target.value);
        setAmount(newAmount >= 0 ? newAmount : 0);
    };

    // useEffect(() => {
    //     setPrice()
    // }, [amount])

    return (
        <tbody>
            <th>
                <input type="checkbox" />
            </th>
            <th>
                title
            </th>
            <th>
                <div>
                    <input type='number' value={amount} onChange={handleOnChangeAmount} />
                </div>
            </th>
            <th>
                <input type="text" value={100} />
            </th>
        </tbody>
    )
}