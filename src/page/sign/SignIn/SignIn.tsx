import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormCheckbox, ProFormText,} from '@ant-design/pro-components';
import {Tabs} from 'antd';
import {useState} from 'react';
import ViteSvg from '../../../../public/vite.svg'
import SignLayout from "@/layout/SignLayout/SignLayout";
import CommonConstant from "@/model/constant/CommonConstant";
import {SignInFormHandler} from "@/page/sign/SignIn/SignInUtil";
import {getAppNav} from "@/App";
import PathConstant from "@/model/constant/PathConstant";
import {SIGN_UP_FLAG} from "@/page/sign/SignUp/SignUp";
import Link from 'antd/es/typography/Link';

type TSignInType = 'account'; // 登录方式

export interface ISignInForm {
    account: string // 账号
    password: string // 密码
}

export const ACCOUNT_PLACEHOLDER = "登录名/手机号";

// 登录
export default function () {
    const [signInType, setSignInType] = useState<TSignInType>('account');
    return (
        <SignLayout className={"Theme-Geek-Blue"}>
            <LoginForm<ISignInForm>
                logo={ViteSvg}
                title={CommonConstant.SYS_NAME}
                subTitle="Will have the most powerful !"
                actions={
                    <>
                        {
                            SIGN_UP_FLAG ?
                                <div>或者 <Link title={"注册"}
                                              onClick={() => getAppNav()(PathConstant.SIGN_UP_PATH)}>注册</Link>
                                </div> : null
                        }
                    </>
                }
                onFinish={async (form) => {
                    await SignInFormHandler(form)
                    return true
                }}
            >
                <Tabs activeKey={signInType} onChange={(activeKey) => setSignInType(activeKey as TSignInType)}
                      items={[{key: "account", label: "账号密码登录"}]}>
                </Tabs>
                {signInType === 'account' && (
                    <>
                        <ProFormText
                            name="account"
                            fieldProps={{
                                size: 'large',
                                allowClear: true,
                                prefix: <UserOutlined/>,
                            }}
                            placeholder={ACCOUNT_PLACEHOLDER}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入' + ACCOUNT_PLACEHOLDER
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                allowClear: true,
                                prefix: <LockOutlined/>,
                            }}
                            placeholder={'密码'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码'
                                },
                            ]}
                        />
                    </>
                )}
                <div
                    className={"m-b-24 flex jc-sb"}
                >
                    {/* TODO：记住我 */}
                    <ProFormCheckbox noStyle>
                        记住我
                    </ProFormCheckbox>
                    {/*<UserForgotPasswordModalForm/>*/}
                </div>
            </LoginForm>
        </SignLayout>
    )
}

// const UserForgotPasswordModalTitle = "忘记密码了"
//
// export function UserForgotPasswordModalForm() {
//
//     const formRef = useRef<ProFormInstance<SignEmailForgotPasswordDTO>>();
//
//     return <ModalForm<SignEmailForgotPasswordDTO>
//         modalProps={{
//             maskClosable: false
//         }}
//         formRef={formRef}
//         width={CommonConstant.MODAL_FORM_WIDTH}
//         title={UserForgotPasswordModalTitle}
//         trigger={<a>{UserForgotPasswordModalTitle}</a>}
//         onFinish={async (form) => {
//             const formTemp = {...form}
//             formTemp.origNewPassword = RSAEncrypt(formTemp.newPassword)
//             formTemp.newPassword = PasswordRSAEncrypt(formTemp.newPassword)
//             await SignEmailForgotPassword(formTemp).then(res => {
//                 ToastSuccess(res.msg)
//             })
//             return true
//         }}
//     >
//         <ProFormText
//             name="email"
//             fieldProps={{
//                 allowClear: true,
//             }}
//             required
//             label="邮箱"
//             placeholder={'请输入邮箱'}
//             rules={[{validator: ValidatorUtil.emailValidate}]}
//         />
//         <ProFormCaptcha
//             fieldProps={{
//                 maxLength: 6,
//                 allowClear: true,
//             }}
//             required
//             label="验证码"
//             placeholder={'请输入验证码'}
//             name="code"
//             rules={[{validator: ValidatorUtil.codeValidate}]}
//             onGetCaptcha={async () => {
//                 await formRef.current?.validateFields(['email']).then(async res => {
//                     await SignEmailForgotPasswordSendCode({email: res.email}).then(res => {
//                         ToastSuccess(res.msg)
//                     })
//                 })
//             }}
//         />
//         <ProFormText
//             label="新密码"
//             placeholder={'请输入新密码'}
//             name="newPassword"
//             required
//             fieldProps={{
//                 allowClear: true,
//             }}
//             rules={[{validator: ValidatorUtil.passwordValidate}]}/>
//     </ModalForm>
// }
