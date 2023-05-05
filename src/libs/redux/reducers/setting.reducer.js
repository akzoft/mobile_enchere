
const init = {
    notifs: false,
    msgs: false,
    thems: false,
    themes: "clair",
    loading: false,
    errors: null
}

const setting_reducer = (state = init, action) => {
    switch (action.type) {

        case "_loading": return { ...state, loading: true, errors: null }

        case "_active_notif_success": return { ...state, notifs: action.payload }
        case "_active_msg_success": return { ...state, msgs: action.payload }
        case "_active_mode_success": return { ...state, themes: action.payload.mode, thems: action.payload.them }
        default: return state;
    }
}

export default setting_reducer