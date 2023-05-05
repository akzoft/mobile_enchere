import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Colors, css, } from '../../../libs'
import { Container, Encherisseur, HistoriqueItem, Loading, Reloader } from '../../../components'
import { Overlay, Switch } from 'react-native-elements'
import Fontisto from "react-native-vector-icons/Fontisto"
import { useDispatch, useSelector } from 'react-redux'
import { get_all_encheres } from '../../../libs/redux/actions/enchere.action'

const Historiques = ({ navigation }) => {
    const [visible, setVisible] = useState(false)
    const [vip, setVip] = useState(false)
    const [allEncheres, setAllEncheres] = useState([])
    const [data, setData] = useState(null)
    const [refreshing, setRefreshing] = useState(false)

    const isVIP = true

    const { encheres, loading } = useSelector(state => state?.enchere)
    const { host } = useSelector(state => state?.user)
    const { themes } = useSelector(state => state?.setting)
    const dispatch = useDispatch()

    //recuperer les encheres selon qu'il soit vip ou pas
    useEffect(() => {
        switch (vip) {
            case true:
                const matching1 = encheres?.filter(enchere => {
                    return enchere?.history?.some(historyItem => (historyItem?.buyerID === host?._id && enchere?.enchere_type === "private"))
                })
                setAllEncheres(matching1)
                break
            case false:
                const matching2 = encheres?.filter(enchere => {
                    return enchere?.history?.some(historyItem => (historyItem?.buyerID === host?._id && enchere?.enchere_type === "public"))
                })
                setAllEncheres(matching2)
                break
            default:
                const matching3 = encheres?.filter(enchere => {
                    return enchere?.history?.some(historyItem => (historyItem?.buyerID === host?._id && enchere?.enchere_type === "public"))
                })
                setAllEncheres(matching3)
                break
        }
    }, [encheres, host, vip])

    const toggleOverlay = () => setVisible(!visible)

    const onRefresh = useCallback(() => {
        dispatch(get_all_encheres(host?._id))
        setRefreshing(true)
    }, [])

    useEffect(() => {
        if (loading === false) setRefreshing(false)
    }, [refreshing, loading])

    return (
        <View style={[styles.container, { backgroundColor: themes === "sombre" ? Colors.black : Colors.white }]}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={[css.details.bottomSheet, { height: "75%", paddingHorizontal: 0 }]} animationType="slide" animationDuration={1000}>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={[css.details.sheet_header,]}>
                        <Text style={[css.details.sheet_title, { color: themes === "sombre" ? Colors.white : Colors.black }]}>Details d'historique</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={toggleOverlay}><Fontisto name="close-a" size={18} style={css.details.sheet_close} /></TouchableOpacity>
                    </View>

                    <View style={[css.creer.screen_title_line]} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[{ width: "100%", paddingHorizontal: 0 }]}>
                    <View style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
                        <Text style={{ textDecorationLine: "underline" }}>Voir les details de l'article?</Text><TouchableOpacity onPress={() => navigation.navigate("detail", { data: {} })}><Text style={{ color: Colors.main, marginLeft: 5 }}>Oui</Text></TouchableOpacity>
                    </View>

                    {data?.history?.length > 0 ?
                        data?.history?.map((enchere) => <Encherisseur data={data} enchere={enchere} own={host?._id === enchere?.buyerID ? true : false} key={enchere?._id} />) :
                        <View style={{ height: "100%", alignItems: "center", justifyContent: "center", }}>
                            <Text style={{ fontSize: 16, letterSpacing: 1, fontWeight: 300 }}>Aucune participation pour l'instant</Text>
                            <Text style={{ fontSize: 13, letterSpacing: 1, fontWeight: 300 }}>Voulez-vous bien être la première!</Text>
                        </View>
                    }
                </ScrollView>
            </Overlay>

            <View style={{ width: "100%", alignItems: "center" }}>
                <Container>
                    <View style={[css.explorer.is_auth_container, { width: "100%" }]}>
                        <Text style={[css.myAuctions.title, { marginTop: 0, padding: 0, color: themes === "sombre" ? Colors.white : Colors.black }]}>Historiques</Text>
                        {host?.vip &&
                            <View style={css.explorer.is_auth_button}>
                                <Text style={{ color: themes === "sombre" ? Colors.white : Colors.dark }}>Public</Text>
                                <Switch value={vip} onValueChange={vip => setVip(vip)} trackColor={{ false: '#767577', true: '#767577' }} thumbColor={vip ? Colors.main : '#f4f3f4'} />
                                <Text style={{ color: vip ? Colors.main : themes === "sombre" ? Colors.white : Colors.dark }}>VIP</Text>
                            </View>
                        }
                    </View>
                    <View style={[css.creer.screen_title_line, { marginTop: 0, width: "25%", alignSelf: "flex-start" }]} />
                </Container>
            </View>

            {loading ? <Loading text="chargement en cours" color="green" /> :

                <Reloader refreshing={refreshing} onRefresh={onRefresh} theme={themes}>
                    {allEncheres?.length > 0 ?
                        <Container >
                            {allEncheres?.map((data) => (<HistoriqueItem key={data?._id} data={data} setData={setData} toggleOverlay={toggleOverlay} />))}

                        </Container>
                        : <View style={{ flex: 1, alignItems: "center", width: "100%", justifyContent: "center", backgroundColor: themes === "sombre" ? Colors.home_card : Colors.white }}><Text style={{ color: themes === "sombre" ? Colors.white : Colors.black }}>Pas d'historique</Text></View>
                    }
                </Reloader>
            }
        </View>
    )
}

export default Historiques

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.white
    }
})



