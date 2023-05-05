import AsyncStorage from "@react-native-async-storage/async-storage";
import { isEmpty } from "../../utils/functions";

export const isLoading = () => {
    return (dispatch) => {
        dispatch({ type: "_loading" })
    }
}

export const activeNotif = (data) => async (dispatch) => {
    try {
        dispatch(isLoading());
        if (!isEmpty(data)) {
            await AsyncStorage.setItem('notif', data.toString());
            dispatch({ type: "_active_notif_success", payload: data });
        }
    } catch (error) {
        console.log(error)
    }
}

export const activeMsg = (data) => async (dispatch) => {
    try {
        dispatch(isLoading());
        if (!isEmpty(data)) {
            await AsyncStorage.setItem('msg', data.toString());
            dispatch({ type: "_active_msg_success", payload: data });
        }
    } catch (error) {
        console.log(error)
    }
}

export const activeMode = (data) => async (dispatch) => {
    try {
        dispatch(isLoading());
        if (!isEmpty(data)) {
            await AsyncStorage.setItem('theme', data.mode);
            dispatch({ type: "_active_mode_success", payload: { mode: data.mode, them: data.them } });
        }

    } catch (error) {
        console.log(error)
    }
}


export const settings = () => async (dispatch) => {
    try {

        dispatch(isLoading());


        AsyncStorage.getItem('notif').then(ans => {
            let res = ans === "true" ? true : false
            if (!isEmpty(ans)) dispatch(activeNotif(res))
        })

        AsyncStorage.getItem('msg').then(ans => {
            let res2 = ans === "true" ? true : false
            if (!isEmpty(ans)) dispatch(activeMsg(res2))
        })

        AsyncStorage.getItem('theme').then(ans => {
            let res3 = ans === "clair" ? "clair" : "sombre"
            if (!isEmpty(ans)) dispatch(activeMode({ mode: res3, them: res3 === "clair" ? true : false }))
        })

    } catch (error) {
        console.log(error)
    }
}





