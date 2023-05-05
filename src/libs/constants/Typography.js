import { BaseToast } from "react-native-toast-message";

export const Colors = {
    main: '#FC6210',
    home_card: "#1E1E1E",
    white: "#ffffff",
    black: "#000000",
    red: '#F01C1C91',
    star: '#ffce31',
    light: "#FBFBFB",
    dark: "#332D2D",
    primary: "#3B71CA",
    secondary: "#9FA6B2",
    danger: "#DC4C64",
    success: "#14A44D",
    warning: "#E4A11B",
    info: "#54B4D3",

    facebook: "#3b5998",


    auth_card_bg: "rgba(255,255,255,0.8)",
    input_border_color: "rgba(0,0,0,0.2)",
    modal_outside_color: "rgba(0,0,0,0.5)",
    light_gray: 'rgba(155,155,155,0.1)',
    brown: "brown",
}

export const PoliceSize = {
    auth_title_sz: 22,
    logo_header_width: 170,
    logo_header_height: 40,
}

export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: Colors.success }}
            contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: Colors.black, opacity: 1, zIndex: 999 }}
            text1Style={{
                fontSize: 17, color: Colors.white
            }}
            text2Style={{
                fontSize: 12, color: Colors.white, fontWeight: 200
            }}
        />
    ),

    danger: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: Colors.danger }}
            contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: Colors.black, opacity: 1, zIndex: 999 }}
            text1Style={{
                fontSize: 17, color: Colors.white
            }}
            text2Style={{
                fontSize: 12, color: Colors.white, fontWeight: 200
            }}
        />
    ),

    warning: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: Colors.warning }}
            contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: Colors.black, opacity: 1, zIndex: 999 }}
            text1Style={{
                fontSize: 17, color: Colors.white
            }}
            text2Style={{
                fontSize: 12, color: Colors.white, fontWeight: 200
            }}
        />
    ),

    info: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: Colors.info }}
            contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: Colors.black, opacity: 1, zIndex: 999 }}
            text1Style={{
                fontSize: 17, color: Colors.white
            }}
            text2Style={{
                fontSize: 12, color: Colors.white, fontWeight: 200
            }}
        />
    ),

};