import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../libs'
import { useNavigation } from '@react-navigation/native'

const CardEnchere = ({ profile, en_cours, terminate, rejected, data }) => {
    const navigation = useNavigation()



    const height = Dimensions.get("window").height

    const styles = StyleSheet.create({
        // pour l'image de l'enchère
        enchere_container: { backgroundColor: Colors.home_card, flexDirection: profile ? "row" : "column", alignItems: profile ? "center" : "flex-start", marginTop: 10, padding: profile ? 10 : 0, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTopLeftRadius: 10, borderTopRightRadius: 10, elevation: 8 },
        img_container: { height: profile ? 65 : height / 4, width: profile ? 70 : "100%" },
        img: { height: "100%", width: "100%", resizeMode: "cover", borderTopLeftRadius: 8, borderTopRightRadius: 8 },

        // pour la partie information de l'enchère
        info_container: { padding: profile ? 0 : 10, paddingLeft: profile && 10, width: profile && "78%" },
        title: { fontWeight: "bold", color: Colors.white },
        description: { color: Colors.white },

        // pour le prix et la date d'expiration
        price_date_expiration_container: {},
        price_container: { flexDirection: "row", justifyContent: "space-between" },
        date_exp_container: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    })

    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.enchere_container} onPress={() => navigation.navigate('detail', { data })}>
            {data?.medias?.length > 0 && <View style={styles.img_container}>
                <Image source={data?.medias[0]} style={styles.img} />
            </View>}

            <View style={styles.info_container}>
                <Text style={styles.title} numberOfLines={1}> {data?.title} </Text>
                {!profile && <Text style={styles.description} numberOfLines={6}> {data?.description} </Text>}

                {profile &&
                    (<View style={styles.price_date_expiration_container}>
                        <View style={styles.price_container}>
                            <Text style={styles.title}>Prix : </Text>
                            <Text style={styles.description}> 350000 FCFA </Text>
                        </View>

                        {en_cours &&
                            (<View style={styles.date_exp_container}>
                                <Text style={styles.title}> Date expiration : </Text>
                                <Text style={styles.description}> {data?.expiration_time} </Text>
                                {/* <TimeCounter size={10} expiration={'2023-12-23 04:00:45'} /> */}
                            </View>)
                        }

                        {terminate &&
                            (<View style={styles.date_exp_container}>
                                <Text style={styles.title}> Etat : </Text>
                                <Text style={styles.description}> Terminée </Text>
                            </View>)
                        }

                        {rejected &&
                            (<View style={styles.date_exp_container}>
                                <Text style={styles.title}> Etat : </Text>
                                <Text style={styles.description}> Rejetée </Text>
                            </View>)
                        }
                    </View>)
                }
            </View>
        </TouchableOpacity>
    )
}

export default CardEnchere

