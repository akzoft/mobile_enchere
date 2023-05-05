import { _error_notification, _get_all_user_fb_token, _loading_notification, _send_notification } from "../constants/constants"


const init = {
    all_firebase_token: [],
    send_msg: [],
    errors: null,
    loading_notif: false
}

const notification_reducer = (state = init, action) => {
    switch (action.type) {
        case _loading_notification:
            return { ...state, loading: true }

        case _error_notification:
            return { ...state, errors: action.payload }

        case _get_all_user_fb_token:
            return { ...state, all_firebase_token: action.payload, send_msg: "", errors: null, loading: false }

        case _send_notification:
            return {
                ...state,
                send_msg: [...state.send_msg, ...action.payload],
                errors: null, loading: false
            }


        default:
            return state
    }
}

export default notification_reducer