import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, css } from '../../../libs';
import { Container, } from '../../../components';
import { Switch } from 'react-native-elements';


const MyPurchases = ({ navigation, route }) => {
    const [vip, setVip] = useState(false);
    const isVIP = true;


    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />

            {isVIP &&
                <View style={{ width: "100%", alignItems: "center" }}>
                    <Container>
                        <View style={[css.explorer.is_auth_container, { width: "100%" }]}>
                            <Text style={[css.myAuctions.title, { marginTop: 0, padding: 0 }]}>Mes achats</Text>

                            <View style={css.explorer.is_auth_button}>
                                <Text style={{ color: Colors.dark }}>Public</Text>
                                <Switch value={vip} onValueChange={vip => setVip(vip)} trackColor={{ false: '#767577', true: '#767577' }} thumbColor={vip ? Colors.main : '#f4f3f4'} />
                                <Text style={{ color: vip ? Colors.main : Colors.dark }}>VIP</Text>
                            </View>
                        </View>
                        <View style={[css.creer.screen_title_line, { marginTop: 0, width: "25%", alignSelf: "flex-start" }]} />
                    </Container>
                </View>
            }

            <ScrollView>
                <Container>
                    <Text>ok</Text>
                </Container>
            </ScrollView>
        </View>
    )
}

export default MyPurchases

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.white
    }
})