import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'



const { persistAtom } = recoilPersist()


interface ProfileStateType {
    open: boolean
}

interface Headertype {
    type: string | null
}

export const navLinkState = atom<ProfileStateType>({
    key: "navLinkState",
    default: {
        open: false
    }
})

export const profileState = atom<ProfileStateType>({
    key: "profileState",
    default: {
        open: false
    }
})

export const HeaderType = atom({
    key: "HeaderType",
    default: {
        type: ""
    },
    effects_UNSTABLE: [persistAtom],
})