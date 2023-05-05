import { StyleSheet } from "react-native"
import { Colors, PoliceSize } from "../constants/Typography"


const auth = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    auth_container: {
        width: "100%",
        backgroundColor: Colors.auth_card_bg,
        padding: 15,
        shadowColor: Colors.black,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2, },
        shadowRadius: 4,
        elevation: 2,
        borderRadius: 10
    },
    scroll_container: {
        flexGrow: 1, paddingVertical: 50, width: "100%",
    },
    main_content: {
        alignItems: "center", justifyContent: "center", flex: 1
    },
    //title
    auth_title: {
        fontSize: PoliceSize.auth_title_sz,
        color: Colors.home_card,
        marginBottom: 20
    },
    //inputs
    input_container: {
        marginVertical: 5
    },
    input_label: {
        fontSize: 15,
        marginBottom: 5
    },
    phone_input_container: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: Colors.input_border_color, borderRadius: 5
    },
    indicatif_input: {
        width: "22%", backgroundColor: "transparent", alignItems: "center", justifyContent: "center", borderRightColor: "red"
    },
    phone_input: { width: "78%", borderWidth: 0, paddingHorizontal: 5 },
    input: {
        borderWidth: 1,
        borderColor: Colors.input_border_color, borderRadius: 5
        , paddingHorizontal: 5
    }
    ,
    auth_forgot_container: {
        flexDirection: "row",
        justifyContent: "space-between", alignItems: "center",
        marginTop: 15
    },
    auth_remember: {
        margin: 0
    },
    auth_forgot: {
        color: Colors.input_border_color
    },
    checkboxContainer: {
        backgroundColor: "transparent",
        borderWidth: 0,
        padding: 1,
        margin: 0,
    },
    checkboxText: {
        color: "rgba(0,0,0,0.35)"
    },


    //auth bottom
    auth_bottom_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 5, flexWrap: "wrap"
    },
    auth_bottom_label: {

    },
    auth_bottom_register_link: {

    },
    auth_bottom_register_link_text: {
        color: Colors.main, marginLeft: 4
    },


    //button
    auth_submit_btn: {
        width: "100%",
        backgroundColor: Colors.main,
        padding: 15, borderRadius: 5, alignItems: "center", justifyContent: "center", marginVertical: 15
    },
    auth_submit_btn_text: {
        fontSize: 17, color: Colors.white, fontWeight: "bold"
    },
    separator: {
        width: "100%", height: 1, backgroundColor: Colors.main, marginTop: 30
    },

    //require
    require: {
        marginLeft: 2,
        fontSize: 12,
        color: Colors.danger
    },
    code_items: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    code_item: {
        width: "23%",
        height: 70, borderRadius: 5,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.5)"
    }
    , code_input: {
        textAlign: "center",
        width: "100%", height: "100%", padding: 5, fontSize: 18, borderWidth: 0
    },
    facebook: {
        width: "100%",
        paddingVertical: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: "row",
    },
    info_text: {
        fontSize: 12,
        marginBottom: 20, textAlign: "justify"
    },
})

const home = StyleSheet.create({
    container: { flex: 1 },
    // pour la partie image de haut
    img_container: { height: 230 },
    img: { height: "100%", width: "100%", resizeMode: "cover" },

    // pour la partie enchere en vedette
    enchere_container: { marginVertical: 55, paddingHorizontal: 10 },

    // pour la partie categorie
    category_container: { paddingLeft: 10, paddingBottom: 20 },
    categories_lists: { flexDirection: "row", flexWrap: "wrap" },


    // pour les attributs communs au deux enchere et categories
    enchere_category_title: { color: Colors.black, fontSize: 18, fontWeight: "bold", marginBottom: 10 },
})

const creer = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white },
    label: { marginBottom: 4 },
    upload: { height: 100, width: "100%", marginVertical: 10, alignItems: "center", justifyContent: "center", },
    article_img_container: { flexDirection: "row", alignItems: "center", gap: 15, justifyContent: "space-between" },
    article_img: { width: 100, height: 100, marginHorizontal: 4, resizeMode: "cover" },
    screen_title: { marginTop: 20, fontSize: 20, fontWeight: "400", color: Colors.home_card, letterSpacing: 1.5 },
    screen_title_line: { width: "60%", height: 4, backgroundColor: Colors.main, borderRadius: 50, marginVertical: 15, marginBottom: 5 },
    scrollable_content: { alignItems: "center" },
    title_container: { width: "100%", justifyContent: "center", marginTop: 20 },
    categorie: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", padding: 10, margin: 0 },
    selected_categorie_display_container: { width: "100%", flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
    selected_categorie_display: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
    title: { fontSize: 16, fontWeight: "300", color: Colors.black, letterSpacing: 1 },
    input_container: { width: "100%", marginVertical: 5 },
    input: { width: "100%", borderWidth: 1, borderColor: Colors.input_border_color, borderRadius: 5 },
    button: { width: "100%", padding: 15, backgroundColor: Colors.main, justifyContent: "center", alignItems: "center", marginVertical: 10 },
    text: { color: Colors.white },
    require: { marginLeft: 2, fontSize: 12, color: Colors.danger },
    checkboxContainer: { backgroundColor: 'transparent', borderWidth: 0, padding: 2, margin: 2, },
    checkboxText: { fontSize: 12, fontWeight: 'normal', },
    contentContainer: { justifyContent: 'center', alignItems: 'center', },
    modal: { alignItems: "center", justifyContent: "center", backgroundColor: Colors.modal_outside_color, height: "100%", },
    update_img_modal_btn: { width: "75%", backgroundColor: Colors.black, alignItems: "center", justifyContent: "center", borderRadius: 5 },
    close_update_img_modal_container: { padding: 10, paddingBottom: 0, alignItems: "center", alignSelf: "flex-end" },
    video_display_container: { position: "relative", alignItems: "center", justifyContent: "center" },
    video_display_item: { position: "absolute", width: "60%", height: "60%", },
    video: { width: "100%", height: "100%", resizeMode: "contain", },
})

const myAuctions = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white },
    title_container: { backgroundColor: Colors.white },
    title: { padding: 20, fontSize: 24, color: Colors.dark, fontWeight: 300, letterSpacing: 1 },
})

const profile = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile_infos: {
        width: "100%",
        backgroundColor: Colors.main,
        flexDirection: "row",
        alignItems: "center", paddingLeft: 20, gap: 20,
        height: 250,
        borderBottomRightRadius: 120,
        borderTopLeftRadius: 50
    },
    profile_image_container: {
        height: "60%",
        width: "38%", borderRadius: 9999999, backgroundColor: Colors.white, alignItems: "center", justifyContent: "center"
    },
    profile_image: {
        height: "95%", width: "95%", borderRadius: 9999999, resizeMode: "contain"
    },
    profile_details: {
        alignItems: "center"
    },
    profile_details_text: {
        fontSize: 16, letterSpacing: 1, color: Colors.white, fontWeight: 200
    },
    profile_main_content: {
        marginTop: 5,
        marginBottom: 40
    },
    profile_item: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        padding: 10,
        paddingRight: 25,
        backgroundColor: Colors.white,

    },
    left: {
        flexDirection: "row", alignItems: "center", gap: 10,
        padding: 5,
    },
    profile_item_icon_box: {
        backgroundColor: "rgba(0,0,0,0.1)", alignItems: "center",
        borderRadius: 10,
        padding: 5,
        paddingVertical: 8,
        width: 40, height: 40
    },
    separator: {
        height: 1, width: "65%", backgroundColor: Colors.input_border_color, alignSelf: "flex-end"
    },

    section: {
        marginBottom: 20
    },
})

const search = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.white
    },
    card: {
        width: "100%",
        padding: 20,
    },


})

const settings = StyleSheet.create({
    screen_title_container: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20, gap: 15 },
    screen_title: { fontSize: 20, fontWeight: "400", color: Colors.home_card, letterSpacing: 1.5 },
    theme: { flexDirection: "row", gap: 10, alignItems: "center" }
})

const explorer = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white, },
    main_content: { flex: 1, paddingHorizontal: 10, },
    is_auth_container: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10 },
    is_auth_button: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 },
})

const details = StyleSheet.create({
    container: { flex: 1, alignItems: "center", paddingBottom: 20 },
    bottomSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingVertical: 10, width: "100%", position: "absolute", height: "50%", bottom: 0 },
    sheet_header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", },
    sheet_title: { color: Colors.dark, fontWeight: 300, letterSpacing: 1.5, fontSize: 22 },
    sheet_close: { color: Colors.danger },
    desc_container: { flexGrow: 1, paddingVertical: 15 },
    desc: { fontWeight: 300, textAlign: "justify" },
    desc_button_container: { position: "absolute", top: 5, left: "70%", backgroundColor: Colors.white, borderRadius: 25, width: 25, height: 25, alignItems: "center", justifyContent: "center" },
    desc_button: { borderRadius: 30, alignItems: "center", justifyContent: "center" },
    detail_image_container: { height: 250, width: "100%", alignItems: "center", justifyContent: "center", padding: 5, backgroundColor: Colors.white },
    detail_image_box: { width: "95%", flexDirection: "row", gap: 10, height: "100%" },
    image: { height: "100%", resizeMode: "contain", width: "80%", backgroundColor: Colors.light_gray, alignItems: "center", justifyContent: "center", borderRadius: 5 },
    others_images: { height: "100%", width: "30%", },
    others_images_image: { height: "22%", width: "50%", marginVertical: 4, backgroundColor: Colors.light_gray, borderRadius: 5, resizeMode: "contain" },
    main_content: { backgroundColor: Colors.white, marginTop: 5, width: "100%", padding: 10, borderRadius: 5 },
    detail_title_container: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
    left: { width: "70%" },
    detail_title_text: { fontSize: 20, fontWeight: 200, letterSpacing: 1 },
    location: { flexDirection: "row", alignItems: "center", },
    detail_text: { fontSize: 11, paddingTop: 5 },
    detail_categorie_text: { fontSize: 16, letterSpacing: 1.5, fontWeight: 100 },
    detail_categorie_item: { flexDirection: "row", flexWrap: "wrap", gap: 2, paddingLeft: 4 },
    categorie: { fontSize: 10, color: Colors.brown },
    right: { width: "30%", },
    detail_price_container: { flexDirection: "row", justifyContent: "space-between" },
    detail_label: { fontWeight: 300, color: Colors.dark, fontSize: 14 },
    price: { color: Colors.black, fontWeight: "300" },
    detail_bid_info: { flexDirection: "row", justifyContent: "space-between", },
    detail_bid_left: { alignItems: "center", gap: 5 },
    detail_bid_right: { alignItems: "center" },
    detail_bid_button: { padding: 15, backgroundColor: Colors.main, alignItems: "center", justifyContent: "center", borderRadius: 5 },
    detail_bid_button_text: { color: Colors.white },
    separateur: { marginVertical: 5 },
    delai: { flexDirection: "row" }
})

const filter = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.white, paddingBottom: 20
    },
    card: {
        width: "100%",
        padding: 20,
    },

    item: {
        flexDirection: 'row',
        marginVertical: 8,
        justifyContent: 'space-between',
    },
    categories: {
        paddingVertical: 20,

        backgroundColor: Colors.white,
    },
    categorie_item: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    cat_item: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        marginHorizontal: 5,
        marginBottom: 15,
        borderRadius: 15,
    },
    notes: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: Colors.light_gray,
        borderWidth: 0,
        padding: 10,
    },
});

const space = StyleSheet.create({
    spacer: { height: 60 },
})

export const css = { auth, creer, myAuctions, home, profile, search, settings, explorer, details, filter, space }

