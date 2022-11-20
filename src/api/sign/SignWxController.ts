import $http from "@/util/HttpUtil";
import {AxiosRequestConfig} from "axios";

export interface SignInPhoneCodeDTO {
    phoneCode: string // 手机号码 code
}

// 手机号 code登录
export function SignWxSignInPhoneCode(form: SignInPhoneCodeDTO, config?: AxiosRequestConfig) {
    return $http.myPost<string>('/sign/wx/sign/in/phoneCode', form, config)
}
