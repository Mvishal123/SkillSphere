import { UserState } from "../atoms/user"
import { selector } from "recoil";

export const userIsLoading = selector({
    key: "userIsLoading",
    get: ({get}) => {
        const state = get(UserState);
        return state.isLoading;
    }
})

