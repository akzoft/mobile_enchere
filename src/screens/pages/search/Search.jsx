import { StatusBar, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Colors, css, isEmpty } from '../../../libs'
import { Container, Header, SearchedItem } from '../../../components'
import { useSelector } from 'react-redux'

const Search = ({ navigation }) => {

    const [text, setText] = useState("")

    const { search_result } = useSelector(state => state?.enchere)
    const encheres = useSelector(state => state?.enchere?.encheres)

    // extraction des encheres en cours de toutes les encheres
    let encheres_encours = []
    const today = new Date().getTime()

    const { themes } = useSelector(state => state?.setting)




    !isEmpty(encheres) && encheres.forEach(enchere => {
        let expiration_date = new Date(enchere.expiration_time).getTime()
        if (expiration_date >= today) encheres_encours.push(enchere)
    })

    // condition pour afficher les encheres en fonction de la recherche ou du filter
    const datas = !isEmpty(search_result) ? search_result : encheres_encours

    const filteredData = datas?.filter(data => {
        if (isEmpty(text) || text.trim() === "") {
            if (isEmpty(search_result)) return
        }
        const searchString = text.trim().toLowerCase()
        const titleMatches = data?.title?.trim().toLowerCase().includes(searchString)
        const descriptionMatches = data?.description?.trim().toLowerCase().includes(searchString)
        const reserve_priceMatches = data?.reserve_price?.toString().trim().toLowerCase().includes(searchString)
        const locationMatches = data?.town?.trim().toLowerCase().includes(searchString)
        const categoriesMatches = data?.categories?.some(category => category.trim().toLowerCase().includes(searchString))

        return titleMatches || descriptionMatches || reserve_priceMatches || locationMatches || categoriesMatches
    })

    return (
        <View style={[css.search.container, { backgroundColor: themes === "sombre" ? Colors.black : Colors.white }]}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />
            <Header navigation={navigation} searchHeader={true} text={text} setText={setText} filter={search_result?.length > 0 && true} />
            <Container >
                <Text style={[css.creer.screen_title, { color: themes === "sombre" ? Colors.white : Colors.black }]}>Resultat(s) des recherches</Text>
                <View style={css.creer.screen_title_line} />
            </Container>

            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: "100%" }}>

                <Container >
                    {filteredData?.map((data) => (<SearchedItem theme={themes} key={data?._id} data={data} />))}
                    {filteredData?.length > 0 && <View style={css.space.spacer} />}
                </Container>

                {filteredData?.length <= 0 && <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: themes === "sombre" ? Colors.home_card : Colors.white }}><Text style={{ fontSize: 18, fontWeight: 300, color: themes === "sombre" ? Colors.white : Colors.black }}>Aucun resultat trouvé</Text></View>}
            </ScrollView>
        </View>
    )
}

export default Search

