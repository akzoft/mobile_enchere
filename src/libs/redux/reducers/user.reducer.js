import { _clear_errors, _clear_invitation, _clear_message, _clear_user_updated, _send_invitation_success, _user_auth_success, _user_compte_activation_success, _user_delete_success, _user_error, _user_forgot_success, _user_get_success, _user_gets_success, _user_loading, _user_login_success, _user_logout, _user_register_success, _user_reset_forgot_password_success, _user_update_success, _user_verify_confirm_code_success } from "../constants/constants"

const init = {
    isAuth: false,
    host: null,
    user: null,
    message: null,
    errors: null,
    loading: false,
    user_updated: null,
    user_deleted: null,
    compte_active: null,
    invitation_data: null,
    code_de_recuperation: null,
    phone: null,
    code_is_correct: null,
    reset_succeed: null,
    register_succeed: null,
    login_succeed: false,
    license: null,
}

const user_reducer = (state = init, action) => {
    switch (action.type) {

        case _user_loading: return { ...state, loading: true, errors: null }

        case _user_auth_success: return { ...state, loading: false, errors: null, host: action.payload.ans, isAuth: true }
        case "_user_auth_failed": return { ...state, loading: false, errors: null, host: null, isAuth: action.payload }

        case _user_login_success: return { ...state, loading: false, errors: null, host: action.payload.ans, login_succeed: true, isAuth: true, message: action.payload.message }

        case _user_compte_activation_success: return { ...state, loading: false, errors: null, compte_active: action.payload.ans, message: action.payload.message }

        case _user_logout: return { ...init, message: action.payload.message };

        case _user_forgot_success: return { ...state, loading: false, errors: null, code_de_recuperation: action.payload.ans.token, phone: action.payload.ans.phone, message: action.payload.message };

        case _user_verify_confirm_code_success: return { ...state, loading: false, errors: null, code_is_correct: action.payload.ans.code_status, phone: action.payload.ans.phone, message: action.payload.message }

        case _user_reset_forgot_password_success: return { ...state, loading: false, errors: null, reset_succeed: action.payload.ans, message: action.payload.message }

        case _user_register_success: return { ...state, loading: false, errors: null, register_succeed: action.payload.ans, phone: action.payload.ans.phone, message: action.payload.message }

        case _user_update_success: return { ...state, loading: false, errors: null, host: action.payload.ans, user_updated: action.payload.ans }

        case _user_delete_success: return { ...state, loading: false, errors: null, user_deleted: action.payload.ans }

        case _send_invitation_success: return { ...state, host: action.payload.ans, invitation_data: action.payload.ans, message: action.payload.message, loading: false, errors: null, }

        case _user_error: return { ...state, loading: false, errors: action.payload }

        //clears
        case _clear_errors: return { ...state, errors: null, };
        case _clear_message: return { ...state, message: null, };
        case _clear_user_updated: return { ...state, user_updated: null, };
        case _clear_invitation: return { ...state, invitation_data: null, };
        case "_clear_login_succeed": return { ...state, login_succeed: false, };

        default: return state;
    }
}

export default user_reducer