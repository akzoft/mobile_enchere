import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { FlatList } from 'react-native'
import { Container, Loading, NoEnchere, Reloader, Small_Enchere_Card } from '../../../components'
import { Colors, ExpirationVerify, css, isEmpty } from '../../../libs'
import { StatusBar } from 'react-native'
import { useState } from 'react'
import { Switch } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { get_all_encheres } from '../../../libs/redux/actions/enchere.action'

const Tab = createMaterialTopTabNavigator()

const My_Auctions = ({ navigation }) => {

    const [vip, setVip] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [enchere_en_cours, setEnchere_en_cours] = useState([])
    const [enchere_en_rejetee, setEnchere_en_rejetee] = useState([])
    const [enchere_en_terminee, setEnchere_en_terminee] = useState([])


    const { host } = useSelector(state => state?.user)
    const { encheres, loading } = useSelector(state => state?.enchere)
    const { themes } = useSelector(state => state?.setting)
    const dispatch = useDispatch()

    //recuperer le status du vip dans asyncstore
    useEffect(() => {
        async function getData() {
            try {
                const vip_status = await AsyncStorage.getItem('vip_status')
                let isVip = vip_status === "true" ? true : false
                if (vip_status !== "") setVip(isVip)
            } catch (error) {
                console.log('Erreur lors de la récupération ou de la sauvegarde des données', error)
            }
        }

        getData()
    }, [])

    //mis a du status du vip dans asyncstore
    useEffect(() => {
        async function setData() {
            try {
                let _vip = vip ? "true" : "false"
                await AsyncStorage.setItem('vip_status', _vip)
            } catch (error) {
                console.log('Erreur lors de la récupération ou de la sauvegarde des données', error)
            }
        }
        setData()
    }, [vip])

    //recuperer les favoris du host selon qu'il soit vip ou pas
    useEffect(() => {
        switch (vip) {
            case true:
                setEnchere_en_cours(encheres?.filter(enchere => enchere?.sellerID?._id === host?._id && !ExpirationVerify(enchere?.expiration_time) && enchere?.enchere_type === "private"))
                setEnchere_en_terminee(encheres?.filter(enchere => enchere?.sellerID?._id === host?._id && ExpirationVerify(enchere?.expiration_time) && enchere?.enchere_type === "private"))
                setEnchere_en_rejetee(encheres?.filter(enchere => enchere?.sellerID?._id === host?._id && enchere?.enchere_status === "rejected" && !ExpirationVerify(enchere?.expiration_time) && enchere?.enchere_type === "private"))
                break

            case false:
                setEnchere_en_cours(encheres?.filter(enchere => enchere?.sellerID?._id === host?._id && !ExpirationVerify(enchere?.expiration_time) && enchere?.enchere_type === "public" && enchere?.enchere_status === "published"))
                setEnchere_en_terminee(encheres?.filter(enchere => enchere?.sellerID?._id === host?._id && ExpirationVerify(enchere?.expiration_time) && enchere?.enchere_type === "public" && enchere?.enchere_status === "published"))
                setEnchere_en_rejetee(encheres?.filter(enchere => enchere?.sellerID?._id === host?._id && enchere?.enchere_status === "rejected" && !ExpirationVerify(enchere?.expiration_time) && enchere?.enchere_type === "public"))
                break

            default:
                setEnchere_en_cours(encheres?.filter(enchere => enchere?.sellerID?._id === host?._id && !ExpirationVerify(enchere?.expiration_time) && enchere?.enchere_type === "public" && enchere?.enchere_status === "published"))
                setEnchere_en_terminee(encheres?.filter(enchere => enchere?.sellerID?._id === host?._id && ExpirationVerify(enchere?.expiration_time) && enchere?.enchere_type === "public" && enchere?.enchere_status === "published"))
                setEnchere_en_rejetee(encheres?.filter(enchere => enchere?.sellerID?._id === host?._id && enchere?.enchere_status === "rejected" && !ExpirationVerify(enchere?.expiration_time) && enchere?.enchere_type === "public"))
                break
        }
    }, [encheres, host, vip])


    const onRefresh = useCallback(() => {
        dispatch(get_all_encheres(host?._id))
        setRefreshing(true)
    }, [])

    useEffect(() => {
        if (loading === false) setRefreshing(false)
    }, [refreshing, loading])


    const Encours = () => {
        const RenderItem = ({ item }) => {
            return (
                <View style={styles.item_container}>
                    <Container>
                        <Small_Enchere_Card data={item} theme={themes} />
                    </Container>
                </View>
            )
        }

        return (
            loading ? <Loading text="chargement en cours" color="green" /> :

                <Reloader style={styles.screen_container} refreshing={refreshing} onRefresh={onRefresh} theme={themes}>
                    {isEmpty(enchere_en_cours) ?
                        <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 20, height: "100%", justifyContent: "center", backgroundColor: themes === "sombre" ? Colors.home_card : Colors.white }}>
                            <NoEnchere message="Aucune enchère n'existe pour le moment." />
                        </View> :
                        <>
                            {enchere_en_cours?.map(enchere => <RenderItem key={enchere._id} theme={themes} item={enchere} width={"100%"} height={200} />)}
                            <View style={css.space.spacer} />
                        </>
                    }
                </Reloader>
        )
    }

    const Terminee = () => {
        const RenderItem = ({ item }) =>
            <View style={styles.item_container}>
                <Container>
                    <Small_Enchere_Card data={item} theme={themes} type={"finished"} />
                </Container>
            </View>

        return (
            loading ? <Loading text="chargement en cours" color="green" /> :

                <Reloader style={styles.screen_container} refreshing={refreshing} onRefresh={onRefresh} theme={themes}>
                    {isEmpty(enchere_en_terminee) ?
                        <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 20, height: "100%", justifyContent: "center", backgroundColor: themes === "sombre" ? Colors.home_card : Colors.white }}>
                            <NoEnchere message="Aucune enchère n'existe pour le moment." />
                        </View> :
                        <>
                            {enchere_en_terminee?.map(enchere => <RenderItem key={enchere._id} theme={themes} item={enchere} width={"100%"} height={200} />)}
                            <View style={css.space.spacer} />
                        </>
                    }
                </Reloader>
        )
    }

    const Rejetee = () => {
        const RenderItem = ({ item }) =>
            <View style={styles.item_container}>
                <Container><Small_Enchere_Card data={item} theme={themes} type={"reject"} /></Container>
            </View>

        return (
            loading ? <Loading text="chargement en cours" color="green" /> :

                <Reloader style={styles.screen_container} refreshing={refreshing} onRefresh={onRefresh} theme={themes}>
                    {isEmpty(enchere_en_rejetee) ?
                        <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 20, height: "100%", justifyContent: "center", backgroundColor: themes === "sombre" ? Colors.home_card : Colors.white }}>
                            <NoEnchere message="Aucune enchère n'existe pour le moment." />
                        </View> :
                        <>
                            {enchere_en_rejetee?.map(enchere => <RenderItem key={enchere._id} theme={themes} item={enchere} width={"100%"} height={200} />)}
                            <View style={css.space.spacer} />
                        </>
                    }
                </Reloader>
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: themes === "sombre" ? Colors.black : Colors.white }]}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />

            <View style={{ width: "100%", alignItems: "center" }}>
                <Container>
                    <View style={[css.explorer.is_auth_container, { width: "100%" }]}>
                        <Text style={[css.myAuctions.title, { marginTop: 0, padding: 0, color: themes === "sombre" ? Colors.white : Colors.black }]}>Mes enchères</Text>

                        {host?.vip &&
                            <View style={css.explorer.is_auth_button}>
                                <Text style={{ color: Colors.dark }}>Public</Text>
                                <Switch value={vip} onValueChange={vip => setVip(vip)} trackColor={{ false: '#767577', true: '#767577' }} thumbColor={vip ? Colors.main : '#f4f3f4'} />
                                <Text style={{ color: vip ? Colors.main : Colors.dark }}>VIP</Text>
                            </View>
                        }
                    </View>
                    <View style={[css.creer.screen_title_line, { marginTop: 0, width: "25%", alignSelf: "flex-start" }]} />
                </Container>
            </View>


            <Tab.Navigator screenOptions={{ tabBarPressOpacity: 1, tabBarAndroidRipple: { borderless: false, color: Colors.light_gray, }, tabPressBehavior: 'press', tabBarIndicatorStyle: { backgroundColor: "white" }, tabBarActiveTintColor: "tomato", tabBarInactiveTintColor: "black", }} >
                <Tab.Screen name="en_cours" component={Encours} options={{ title: "En cours..", }} />
                <Tab.Screen name="terminee" component={Terminee} options={{ title: "Terminées" }} />
                <Tab.Screen name="rejetee" component={Rejetee} options={{ title: "Réjetées" }} />
            </Tab.Navigator>
        </View>
    )
}
export default My_Auctions

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white },
    screen_container: { flex: 1, paddingTop: 10 },
    item_container: { width: "100%", alignItems: "center" }
})