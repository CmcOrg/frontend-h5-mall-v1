import {PropsWithChildren} from "react";
import LocalStorageKey from "@/model/constant/LocalStorageKey";
import {Navigate} from "react-router-dom";
import {CopyrightOutlined} from "@ant-design/icons/lib";

interface ISignLayout extends PropsWithChildren {
    className?: string
}

export function GetCopyright() {
    return `2021-${new Date().getFullYear()} Cmc Org. All Rights Reserved.`
}

export function GetBeiAnHref() {
    return `https://beian.miit.gov.cn`
}

export function GetBeiAnNumber() {
    return "渝ICP备2022000851号-1"
}

// 登录注册页面布局
export default function SignLayout(props: ISignLayout) {

    if (localStorage.getItem(LocalStorageKey.JWT)) {
        return <Navigate to={"/"}/>
    }

    return (
        <div className={props.className}>
            <>
                {props.children}

                <div className={"abs w100 flex-center"} style={{bottom: '10px'}}>
                    <div className={"m-r-10"}>
                        <CopyrightOutlined/> {GetCopyright()}
                    </div>
                    <a
                        href={GetBeiAnHref()}
                        target={"_blank"}
                        title={GetBeiAnNumber()}
                    >
                        渝ICP备2022000851号-1
                    </a>
                </div>
            </>
        </div>
    )
}