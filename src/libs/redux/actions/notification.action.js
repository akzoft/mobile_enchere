import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { _error_notification, _get_all_user_fb_token, _loading_notification, _send_notification, api } from "../constants/constants"

export const isLoading = () => {
    return (dispatch) => {
        dispatch({ type: _loading_notification })
    }
}

export const error_notification = (error) => {
    return (dispatch) => {
        dispatch({ type: _error_notification, payload: error.response ? error.response.data?.message : error.message })
    }
}

export const get_all_user_fb_token = (hostID) => async (dispatch) => {
    try {
        dispatch(isLoading())

        const token = await AsyncStorage.getItem('cookie')

        const response = await axios.get(`${api}/api/user/all-fb-token/${hostID}`, { headers: { token } })

        dispatch({ type: _get_all_user_fb_token, payload: response?.data?.response })
    } catch (error) {
        dispatch(error_notification(error))
    }
}

export const send_notification = (data) => async (dispatch) => {
    try {
        dispatch(isLoading())

        const token = await AsyncStorage.getItem('cookie')

        const response = await axios.post(`${api}/api/notification/send-notification`, data)

        dispatch({ type: _send_notification, payload: response?.data?.response })
    } catch (error) {
        dispatch(error_notification(error))
    }
}