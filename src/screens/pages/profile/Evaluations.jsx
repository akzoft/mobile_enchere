import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, css } from '../../../libs';
import { Commentaires, Container } from '../../../components';
import { Switch } from 'react-native-elements';

const Evaluations = ({ navigation }) => {
    const [vip, setVip] = useState(false);
    const isVIP = true;


    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />

            {isVIP &&
                <View style={{ width: "100%", alignItems: "center" }}>
                    <Container>
                        <View style={[css.explorer.is_auth_container, { width: "100%" }]}>
                            <Text style={[css.myAuctions.title, { marginTop: 0, padding: 0 }]}>Evaluations</Text>

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
                {/* related products down */}
                <View style={[css.details.separateur, { marginTop: 40 }]} />

                <View style={{ width: "100%", backgroundColor: Colors.white, padding: 10, justifyContent: "center", alignItems: "center" }}>
                    <Container>
                        <Text style={[css.details.detail_title_text, { textAlign: "center" }]}>Que pensez vous de notre application?</Text>
                        <View style={[css.creer.screen_title_line, { height: .5 }]} />

                        <Commentaires commentaire={true} />
                    </Container>
                </View>

            </ScrollView>
        </View>
    )
}

export default Evaluations

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.white
    }
})