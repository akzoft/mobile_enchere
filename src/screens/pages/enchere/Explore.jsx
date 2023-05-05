import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Colors, ExpirationVerify, css, isEmpty } from '../../../libs'
import { Favorite, Loading, NoEnchere, Reloader } from '../../../components'
import { Switch } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { get_all_encheres } from '../../../libs/redux/actions/enchere.action'

const Explorer = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [vip, setVip] = useState(false)
    const { encheres, loading } = useSelector(state => state?.enchere)
    const { host } = useSelector(state => state?.user)
    const dispatch = useDispatch()
    const [allEncheres, setAllEncheres] = useState([])
    const { themes } = useSelector(state => state?.setting)



    //recuperer les encheres selon qu'il soit vip ou pas
    useEffect(() => {
        switch (vip) {
            case true: setAllEncheres(encheres?.filter(enchere => !ExpirationVerify(enchere?.expiration_time) && enchere?.enchere_type === "private" && enchere?.enchere_status === "published")); break;
            case false: setAllEncheres(encheres?.filter(enchere => !ExpirationVerify(enchere?.expiration_time) && enchere?.enchere_type === "public" && enchere?.enchere_status === "published")); break;
            default: setAllEncheres(encheres?.filter(enchere => !ExpirationVerify(enchere?.expiration_time) && enchere?.enchere_type === "public" && enchere?.enchere_status === "published")); break;
        }
    }, [encheres, host, vip])

    const onRefresh = useCallback(() => {
        dispatch(get_all_encheres(host?._id))
        setRefreshing(true)
    }, [])

    useEffect(() => {
        if (loading === false) setRefreshing(false)
    }, [refreshing, loading])

    return (
        <View style={css.explorer.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />

            <View style={[css.explorer.main_content, { backgroundColor: themes === "sombre" ? Colors.black : Colors.white }]}>
                <View style={css.explorer.is_auth_container}>

                    <Text style={[css.myAuctions.title, { marginTop: 0, padding: 0, color: themes === "sombre" ? Colors.white : Colors.black }]}>Enchères</Text>

                    {host?.vip &&
                        <View style={css.explorer.is_auth_button}>
                            <Text style={{ color: themes === "sombre" ? Colors.white : Colors.dark }}>Public</Text>
                            <Switch value={vip} onValueChange={vip => setVip(vip)} trackColor={{ false: '#767577', true: '#767577' }} thumbColor={vip ? Colors.main : '#f4f3f4'} />
                            <Text style={{ color: vip ? Colors.main : themes === "sombre" ? Colors.white : Colors.dark }}>VIP</Text>
                        </View>
                    }
                </View>
                <View style={[css.creer.screen_title_line, { marginTop: 0, width: "20%" }]} />

                {loading ? <Loading text="chargement en cours" color="green" /> :

                    <Reloader refreshing={refreshing} onRefresh={onRefresh} theme={themes}>
                        {allEncheres?.length <= 0 ?
                            <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 20, height: "100%", justifyContent: "center", backgroundColor: themes === "sombre" ? Colors.home_card : Colors.white }}>
                                <NoEnchere style={{ textAlign: "center" }} theme={themes} message="Aucune enchère n'existe pour le moment." />
                            </View> :
                            <>
                                {allEncheres?.map(enchere => <Favorite key={enchere._id} theme={themes} data={enchere} width={"100%"} height={200} />)}
                                <View style={css.space.spacer} />
                            </>
                        }
                    </Reloader>
                }
            </View>
        </View>
    )
}

export default Explorer

const styles = StyleSheet.create({})