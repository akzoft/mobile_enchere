import { upload_files_constants } from "../constants/uploadFile"
import { convertOctetsToMo, isEmpty } from "./functions"

export const validation_create_enchere = (data) => {
    const init_error = { sellerID: "", title: "", files: "", description: "", started_price: "", reserve_price: "", increase_price: "", categories: "", hostID: "" }
    let error = init_error

    const { sellerID, title, files, description, started_price, reserve_price, increase_price, categories, hostID } = data

    if (isEmpty(files)) error = { ...error, files: "Veuillez choisir au moins une image ou video" }
    else {
        files.forEach(img_vid => {
            if (!img_vid?.type && !img_vid?.size) {
                if (!upload_files_constants.FILES_ALLOW_TYPES_2.includes(img_vid?.substring(img_vid?.length - 4))) {
                    error = { ...error, files: "Seuls les fichiers JPEG, PNG, MP4 et MOV sont autorisés" }
                }
            } else {
                if ((img_vid.type && !upload_files_constants.FILES_ALLOW_TYPES.includes(img_vid.type))) {
                    error = { ...error, files: "Seuls les fichiers JPEG, PNG, MP4 et MOV sont autorisés" }
                } else {
                    const size = parseInt(convertOctetsToMo(img_vid.size), 10)
                    if (img_vid.size && size >= parseInt(convertOctetsToMo(upload_files_constants.MAX_SIZE))) {
                        error = { ...error, files: `La taille d'un fichier ne doit pas depasser ${convertOctetsToMo(upload_files_constants.MAX_SIZE)} Mo` }
                    }
                }
            }
        })
    }

    if (isEmpty(categories)) error = { ...error, categories: "Veuillez choisir au moins une categorie" }
    else if (categories.length > 3) error = { ...error, categories: "Le nombre maximal de choix doit être : 3" }
    else error = { ...error, categories: "" }

    if (isEmpty(sellerID)) error = { ...error, sellerID: "Veuillez renseigner le sellerID" }

    if (isEmpty(title)) error = { ...error, title: "Veuillez renseigner le title" }
    else error = { ...error, title: "" }

    if (isEmpty(description)) error = { ...error, description: "Veuillez renseigner la description" }
    else error = { ...error, description: "" }


    if (isEmpty(started_price)) error = { ...error, started_price: "Veuillez renseigner le prix de depart" }
    else if (parseInt(started_price, 10) < 500) error = { ...error, started_price: "Le prix doit être superieur ou égale à 500 fcfa" }
    else error = { ...error, started_price: "" }

    if (isEmpty(reserve_price)) error = { ...error, reserve_price: "Veuillez renseigner le prix de reserve" }
    else if (parseInt(reserve_price, 10) < 500) error = { ...error, reserve_price: "Le prix doit être superieur ou égale à 500 fcfa" }
    else error = { ...error, reserve_price: "" }

    if (isEmpty(increase_price)) error = { ...error, increase_price: "Veuillez renseigner le prix d'incrementation" }
    else if (parseInt(increase_price, 10) < 500) error = { ...error, increase_price: "Le prix doit être superieur ou égale à 500 fcfa" }
    else error = { ...error, increase_price: "" }

    if (isEmpty(hostID)) error = { ...error, hostID: "Veuillez renseigner le hostID" }

    return { init_error, error }
}