'use client'

import CommonLayout from "@/app/components/CommonLayout"
import axiosInstance from "@/app/services/base.service";
import { Button, ButtonGroup } from "@material-tailwind/react";
import axios from "axios";
import { Familjen_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AlignDropdown, Editor, EditorComposer, InsertDropdown, ToolbarPlugin } from "verbum";

export const WritePage = () => {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');
    const [user, setUser] = useState('');

    const titleRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);

    const handleContentChange = () => {
        // const parsedEditorState = JSON.parse(editorState);
        // console.log(parsedEditorState.root.children[0].children[0]?.text);
        // console.log(parsedEditorState.root.children[0].children[0]?.src);
        // console.log(parsedEditorState);
        const editor = document.querySelector('.ContentEditable__root') as HTMLDivElement;

        setContent(editor.innerHTML);
    };

    useEffect(() => {
        axiosInstance.get('/api/auth/profile', {
            headers: { Authorization: localStorage.getItem('access_token') }
        })
            .then(res => {
                setUser(res.data.id)
            })
    }, [])

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.value = title;
        }
    }, [title])

    useEffect(() => {
        if (priceRef.current) {
            priceRef.current.value = price;
        }
    }, [price])

    const [buttonDisabled, setButtonDisabled] = useState(false);


    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.includes('image')) {
                setSelectedFile(file);
            } else {
                setSelectedFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // 값 초기화
                }
                alert('이미지 파일만 선택해주세요.');
            }
        }
    };

    const handleOnClickWriteProduct = (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userId', user);
        formData.append('title', title);
        formData.append('content', content);
        if (fileInputRef.current)
            formData.append('media', fileInputRef.current.value)

        formData.append('price', price);
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        axios.post('/api/product/write', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(
                (res) => {
                    setButtonDisabled(true);
                    console.log(res?.data)
                    router.push(`/product/${res?.data.product.seq}`)
                })
            .catch((error) => console.log(error))
    }

    const handleOnClickCancel = () => {
        router.push("/product")
    }

    return (
        <CommonLayout>
            <div className="flex flex-col align-center" style={{ margin: '20px auto', alignItems: 'center' }}>
                <label>상품명</label><input className="border-solid border-black border" style={{ width: '500px' }} type="text" onChange={(e) => setTitle(e.target.value)} ref={titleRef} />
                <label>가격</label><input className="border-solid border-black border" style={{ width: '500px' }} type="number" onChange={(e) => setPrice(e.target.value)} value={price} ref={priceRef} />
                <input ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="border-solid border-black border" style={{ width: '500px' }} type="file" />
            </div>

            <EditorComposer>
                <Editor hashtagsEnabled={false} emojisEnabled={false} onChange={handleContentChange}>
                    <ToolbarPlugin defaultFontSize="20px">
                        <InsertDropdown enableTable={false} enablePoll={false} />
                        <AlignDropdown />
                    </ToolbarPlugin >
                </Editor>
            </EditorComposer>

            <div>
                <div className="flex justify-end" style={{ margin: "20px" }}>
                    <ButtonGroup color="amber">
                        <Button onClick={handleOnClickWriteProduct} disabled={buttonDisabled}>등록</Button>
                        <Button onClick={handleOnClickCancel}>취소</Button>
                    </ButtonGroup>
                </div>
            </div>
        </CommonLayout>
    )
}

export default WritePage;