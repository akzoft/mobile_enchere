import { Linking, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import WebView from 'react-native-webview';
import { Container, Vitepay_cards } from '../../../components';
import { Colors, css } from '../../../libs';

const Vitepay_confirm = ({ route }) => {
    const datas = route?.params;
    const [process, setProcess] = useState(true)
    const [status, setStatus] = useState({ success: false, failed: false, cancel: true })

    useEffect(() => {
        Linking.addEventListener("url", (event) => {
            const { url } = event;
            console.log(url)
            console.log(event)
            // if (url.includes('meyere://main/vitepay_success')) {
            //     setProcess(false)
            //     setStatus({ success: true, failed: false, cancel: false })

            // } else
            //     if (url.includes('meyere://main/vitepay_failed')) {
            //         setProcess(false)
            //         setStatus({ success: false, failed: true, cancel: false })
            //     }
            //     else if (url.includes('meyere://main/vitepay_cancel')) {
            //         setProcess(false)
            //         setStatus({ success: false, failed: false, cancel: true })
            //     }
        });
    }, [])

    console.log(datas?.link)
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />
            {/* <View style={{ width: "100%", alignItems: "center", backgroundColor: Colors.white }}>
                <Container>
                    <View style={[css.explorer.is_auth_container, { width: "100%" }]}>
                        <Text style={[css.myAuctions.title, { marginTop: 0, padding: 0 }]}>
                            {
                                process ? "Confirmer le paiement" :
                                    status.success ? "Opération reussie" :
                                        status.cancel ? "Opération annulée" :
                                            status.failed && "Opération échouée"
                            }
                        </Text>
                    </View>
                    <View style={[css.creer.screen_title_line, { marginTop: 0, width: "25%", alignSelf: "flex-start" }]} />
                </Container>
            </View> */}
            {/* { */}
            {/* process ?
            datas?.link &&  */}
            <WebView source={{ uri: datas?.link }} />
            {/* //         : status.success ?
            //             <View style={styles.cancel}><Vitepay_cards type={"success"} text={"Votre operation de paiement a reussie."} /></View> :
            //             status.cancel ?
            //                 <View style={styles.cancel}>
            //                     <Vitepay_cards type={"cancel"} text={"Vous venez d'annuler l'operation de paiement."} />
            //                 </View> :
            //                 status.failed ?
            //                     <View style={styles.cancel}><Vitepay_cards type={"failed"} text={"Votre operation de paiement a échouée."} /></View> :
            //                     <View style={styles.cancel}><Text>Aucune opération effectuée</Text></View>
            // } */}
        </View>

    )
}

export default Vitepay_confirm

const styles = StyleSheet.create({


    cancel: {
        flex: 1, alignItems: "center", justifyContent: "center"
    },

})