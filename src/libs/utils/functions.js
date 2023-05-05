export const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);

export const handleChange = (key, value, setInputs) => {
    setInputs(prevState => ({
        ...prevState,
        [key]: value,
    }));
};


export function isImage(file) {
    let res;
    if (typeof file === "string" && (file?.split(".").includes("jpg") || file?.split(".").includes("jpeg") || file?.split(".").includes("png") || file?.split(".").includes("gif")))
        res = true
    else
        if (file?.type.split("/").includes("image") && (file?.name.endsWith(".jpg") || file?.name.endsWith(".jpeg") || file?.name.endsWith(".png") || file?.name.endsWith(".gif") || file?.name.endsWith(".bmp"))) res = true
        else res = false

    return res
}

export function isVideo(file) {
    return (
        file?.type.split("/").includes("video") &&
        (file?.name.endsWith(".mp4") ||
            file?.name.endsWith(".avi") ||
            file?.name.endsWith(".wmv") ||
            file?.name.endsWith(".flv") ||
            file?.name.endsWith(".mov"))
    );
}


export function removePhoneIndicatif(numero) {
    var indicatif1 = "+223";
    var indicatif2 = "00223";
    if (numero.startsWith(indicatif1)) {
        return numero.slice(indicatif1.length);
    } else if (numero.startsWith(indicatif2))
        return numero.slice(indicatif2.length);
    else {
        return numero;
    }
}


export function addPhoneIndicatif(numero) {
    var indicatif1 = "+223";
    var indicatif2 = "00223";
    if (!numero.startsWith(indicatif1) || !numero.startsWith(indicatif2))
        return indicatif1 + numero;
    else
        return numero;
}

export function convertDateToMillis(date) {
    return new Date(date).getTime();
}

export function getMongoDateDay(date) {
    const dateObj = new Date(date);
    return dateObj.getDate();
}

export function ExpirationVerify(date) {
    const isExpired = convertDateToMillis(date) - new Date().getTime()
    return isExpired > 0 ? false : true
}

export const areIn = (arr1, arr2) => {
    return arr1?.some((arr) => arr2?.includes(arr));
};

export const convertOctetsToMo = (octets) => {
    const megaoctets = octets / (1024 * 1024)
    return megaoctets.toFixed(0)
}