import { atom } from "recoil";

interface UserStateType {
    isLoading: boolean;
    username: string;
}
export const UserState = atom<UserStateType>({
    key: "UserState",
    default: {
        isLoading: true,
        username: ""
    }
})

