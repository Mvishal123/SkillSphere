import { atom } from "recoil";

interface headerStateType {
    open: boolean
}

export const navLinkState = atom<headerStateType>({
    key: "navLinkState",
    default: {
        open: false
    }
})

export const profileState = atom<headerStateType>({
    key: "profileState",
    default: {
        open: false
    }
})