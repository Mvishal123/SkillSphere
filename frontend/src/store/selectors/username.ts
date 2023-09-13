import { selector } from "recoil";
import {UserState} from "../atoms/user.ts";


export const username = selector({
    key: "username",
    get: ({get}) => {
          const state = get(UserState);
          return state.username;
    }
})