// 아이디 체크(소문자 영,숫자)
export const regId = (id: string) => {
    const regId = /^[0-9a-z]{4,12}$/g;

    return regId.test(id)
}

// 비밀번호 체크(영어, 숫자)
export const regPw = (pw: string) => {
    const regPw = /^[a-zA-Z0-9]{8,12}$/g

    return regPw.test(pw);
}
