import { axiosInstance } from "@/app/services/base.service";
import { Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export const CartBody = () => {
    // await axiosInstance.get('/api/cart/:id',{
    //     id: id
    // })

    //데이터 가져와서 state에 넣고 그걸로 뿌리기
    const [amount, setAmount] = useState(1);
    const [price, setPrice] = useState(1);

    const handleOnChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = parseInt(e.target.value);
        setAmount(newAmount > 0 ? newAmount : 1);
    };

    useEffect(() => {
        const result = amount * price;
        setPrice(result)
    }, [amount])

    return (
        <tbody className="text-center">
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
                <input type="text" disabled value={price} />
            </th>
        </tbody>
    )
}