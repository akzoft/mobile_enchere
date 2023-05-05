import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    _clear_errors, _send_invitation_success, _user_auth_request, _user_auth_success,
    _user_compte_activation_success,
    _user_delete_success, _user_error, _user_forgot_success, _user_get_request, _user_get_success,
    _user_gets_success, _user_loading, _user_login_success, _user_logout, _user_register_success,
    _user_reset_forgot_password_success,
    _user_update_success, _user_verify_confirm_code_success, api
} from "../constants/constants";
import { isEmpty } from "../../utils/functions";
import axios from "axios";


export const isLoading = () => {
    return (dispatch) => {
        dispatch({ type: _user_loading })
    }
}

export const user_error = (error) => {
    return (dispatch) => {
        dispatch({ type: _user_error, payload: error?.response?.data?.message })
    }
}

export const checking = () => async (dispatch) => {
    try {
        const token = await AsyncStorage.getItem('cookie');
        if (!token) throw ""
        const res = await axios.post(`${api}/api/user/checking`, null, { headers: { token } });
        if (!res.data) dispatch(logout())
    } catch (error) {
        dispatch(logout())
    }
}


export const auth = () => async (dispatch) => {
    try {
        dispatch(isLoading());
        const token = await AsyncStorage.getItem('cookie');

        if (!token) throw ""
        const res = await axios.post(`${api}/api/user/checking`, null, { headers: { token } });
        if (res.data) {
            const ans = await axios.get(`${api}/api/user/get/profile`, { headers: { token } });

            if (!isEmpty(ans.data))
                dispatch({ type: _user_auth_success, payload: { ans: ans.data.response } });
        } else dispatch(logout())
    } catch (error) {
        dispatch(user_error(error))
    }
}

export const login = (data) => async (dispatch) => {
    try {
        dispatch(isLoading());
        const ans = await axios.post(`${api}/api/user/login`, data);
        console.log("key: ", ans.data.response.licenseKey)
        if (!isEmpty(ans.data)) {
            await AsyncStorage.setItem('cookie', ans.data.token);
            dispatch({ type: _user_login_success, payload: { ans: ans?.data?.response, message: ans.data.message } });
        }
    } catch (error) {
        dispatch(user_error(error))
    }
}

export const user_compte_activation = (data) => async (dispatch) => {
    try {
        dispatch(isLoading());
        const token = await AsyncStorage.getItem('cookie');
        const ans = await axios.post(`${api}/api/user/activation-license`, data, { headers: { token } });
        if (!isEmpty(ans.data)) {
            dispatch({ type: _user_compte_activation_success, payload: { ans: ans?.data?.response, message: ans.data.message } });
        }
    } catch (error) {
        dispatch(user_error(error))
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch(isLoading());
        await AsyncStorage.removeItem("cookie")
        dispatch({ type: _user_logout, payload: { message: "Vous êtes deconnecté!" } })
    } catch (error) {
        dispatch(user_error(error))
    }
}

export const forgot = (data) => async (dispatch) => {
    try {
        dispatch(isLoading());
        const ans = await axios.post(`${api}/api/user/forgot_password`, data)
        console.log("Code:", ans.data)
        if (!isEmpty(ans.data)) {
            await AsyncStorage.setItem('forgot_password_token', ans.data.response.token);
            dispatch({ type: _user_forgot_success, payload: { ans: ans?.data?.response, message: ans.data.message } });
        }
    } catch (error) {
        dispatch(user_error(error))
    }
}

export const verify_confirm_code = (data) => async (dispatch) => {
    try {
        dispatch(isLoading());
        const ans = await axios.post(`${api}/api/user/confirm_forgot_recovery_code`, data)

        if (!isEmpty(ans.data)) {
            dispatch({ type: _user_verify_confirm_code_success, payload: { ans: ans.data.response, message: ans.data.message } })
        }
    } catch (error) {
        dispatch(user_error(error))
    }
}

export const reset_forgot_password = (data) => async (dispatch) => {
    try {
        dispatch(isLoading());
        const ans = await axios.post(`${api}/api/user/reset_forgot_password`, data)
        if (!isEmpty(ans.data))
            dispatch({ type: _user_reset_forgot_password_success, payload: { ans: ans.data.response, message: ans.data.message } })
    } catch (error) {
        dispatch(user_error(error))
    }
}

export const register = (data) => async (dispatch) => {
    try {
        dispatch(isLoading());
        const ans = await axios.post(`${api}/api/user`, data)

        if (!isEmpty(ans.data))
            dispatch({ type: _user_register_success, payload: { ans: ans.data.response, message: ans.data.message } })
    } catch (error) {
        dispatch(user_error(error))
    }
}

export const send_invitation = (data) => async (dispatch) => {
    try {
        dispatch(isLoading());
        const token = await AsyncStorage.getItem('cookie');
        const ans = await axios.patch(`${api}/api/user/send-invitation/${data?.id}/${data?.hostID}`, data, { headers: { token: token } })
        if (!isEmpty(ans.data))
            dispatch({ type: _send_invitation_success, payload: { ans: ans.data.response, message: ans.data.message } })
    } catch (error) {
        dispatch(user_error(error))
    }
}

export const updateUser = (data) => async (dispatch) => {
    try {
        dispatch(isLoading());
        const token = await AsyncStorage.getItem('cookie');
        const ans = await axios.put(`${api}/api/user/${data?.id}/${data?.hostID}`, data, { headers: { token: token } })
        if (!isEmpty(ans.data)) {
            dispatch({ type: _user_update_success, payload: { ans: ans.data.response, message: ans.data.message } })
        }
    } catch (error) {
        dispatch(user_error(error))
    }
}

export const deleteUser = (data) => async (dispatch) => {
    try {
        dispatch(isLoading());
        const ans = await axios.delete(`${api}/api/user/${data?.id}/${data?.hostID}`, { headers: { token: data?.token } })

        if (!isEmpty(ans.data)) {
            dispatch({ type: _user_delete_success, payload: { ans: ans.data.response, message: ans.data.message } })
        }
    } catch (error) {
        dispatch(user_error(error))
    }
}

