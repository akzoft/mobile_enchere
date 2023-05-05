//toutes les importations de routes dans libs

//constants
import { CategoriesArticle } from "./constants/CategoriesArticle";
import { Colors, PoliceSize, toastConfig } from "./constants/Typography";
import { images } from "./constants/images";
import { css } from "./styles/css";
import { fake_datas, invited_datas } from "./constants/dummyData";
import { upload_files_constants } from "./constants/uploadFile";

//navigations
import RootNavigation from "./navigations/RootNavigation";

//redux

//functions
import { ExpirationVerify, addPhoneIndicatif, areIn, convertDateToMillis, convertOctetsToMo, getMongoDateDay, handleChange, isEmpty, isImage, isVideo, removePhoneIndicatif } from "./utils/functions";
import Vitepay from "./utils/vitepay/vitepay";
import Store from "./redux/Store";
import { auth, deleteUser, forgot, getUser, getUsers, login, logout, register, reset_forgot_password, send_invitation, updateUser, user_compte_activation, verify_confirm_code, } from "./redux/actions/user.action";
import { _clear_errors, _clear_invitation, _clear_message, _clear_user_registered, _clear_user_updated, _user_update_fail, api_public } from "./redux/constants/constants";

// validations
import { validation_create_enchere } from "./utils/validations"
import { filtre_enchere, vider_filtre_enchere } from "./redux/actions/enchere.action";
import { activeMode, activeMsg, activeNotif } from "./redux/actions/setting.action";
import { notificationListener, requestUserPermission } from "./utils/notificationServices";

export {
    RootNavigation,
    CategoriesArticle, images, PoliceSize, Colors, css, fake_datas, invited_datas, toastConfig, Store, upload_files_constants,
    isEmpty, isImage, isVideo, handleChange, removePhoneIndicatif, addPhoneIndicatif, Vitepay,
    auth, login, register, updateUser, deleteUser, getUser, getUsers, logout, forgot, verify_confirm_code, reset_forgot_password,
    _clear_errors, _clear_message, _user_update_fail, convertDateToMillis, areIn, getMongoDateDay, ExpirationVerify, _clear_user_registered, api_public, _clear_user_updated, convertOctetsToMo,
    validation_create_enchere, _clear_invitation, send_invitation, filtre_enchere, user_compte_activation, vider_filtre_enchere, activeMode, activeNotif, activeMsg, requestUserPermission, notificationListener,

}
