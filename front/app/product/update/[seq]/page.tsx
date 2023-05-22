'use client'

import CommonLayout from "@/app/components/CommonLayout";
import axiosInstance from "@/app/services/base.service";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AlignDropdown, Editor, EditorComposer, InsertDropdown, ToolbarPlugin } from "verbum";
import { $createParagraphNode, $createTextNode, $getRoot, createEditor } from 'lexical';



// const initialState = (data: string) => {
//   const root = $getRoot();
//   const editor = createEditor({ root });
//   root.append(editor);
// };


export const UpdatePage = () => {
    const router = useRouter();
    const path = usePathname();

    const pathSegments = path.split('/');
    const seq = pathSegments[pathSegments.length - 1];

    const [data, setData] = useState(null);
    const [content, setContent] = useState(null);

    const ref = useRef();
    useEffect(() => {
        axiosInstance.get(`/api/product/list/${seq}`)
            .then((res) => {
                setData(res?.data);
                setContent(res?.data?.content);
            })
    }, [])

    const handelOnClickUpdate = () => {
        // const formData = new FormData();
        // formData.append('userId', user);
        // formData.append('title', title);
        // formData.append('content', content);
        // if (fileInputRef.current)
        //     formData.append('media', fileInputRef.current.value)

        // formData.append('price', price);
        // if (selectedFile) {
        //     formData.append('file', selectedFile);
        // }

        // axios.put(`/api/product/list/${seq}`, formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     }
        // })

        router.push(`/product/${seq}`)
    }

    return (
        <CommonLayout>
            <div className="flex flex-col align-center" style={{ margin: '20px auto', alignItems: 'center' }}>
                <label>상품명</label><input className="border-solid border-black border" style={{ width: '500px' }} type="text" value={data?.title} />
                <label>가격</label><input className="border-solid border-black border" style={{ width: '500px' }} type="text" value={data?.price} />
                <input accept="image/*" className="border-solid border-black border" style={{ width: '500px' }} type="file" />
            </div>


            {/* {다른 라이브러리를 사용해야함,,,} */}
            {/* initialEditorState={() => initialState(content)} */}
            <EditorComposer  >
                <Editor hashtagsEnabled={false} emojisEnabled={false}>
                    <ToolbarPlugin defaultFontSize="20px">

                        <InsertDropdown enableTable={false} enablePoll={false} />
                        <AlignDropdown />
                    </ToolbarPlugin >
                </Editor>
            </EditorComposer>


            <div>
                <div className="flex justify-end" style={{ margin: "20px" }}>
                    <ButtonGroup color="amber">
                        <Button onClick={handelOnClickUpdate}>수정</Button>
                        <Button onClick={() => router.push(`/product/${data?.seq}`)}>취소</Button>
                    </ButtonGroup>
                </div>
            </div>
        </CommonLayout>
    )
}

export default UpdatePage;

