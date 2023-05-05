import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const EnchereCard = ({ data }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate("detail")} key={data?.id} style={{ padding: 20, marginVertical: 10, backgroundColor: "gray", borderWidth: 1, borderColor: "red" }} >
            <View style={{ gap: 4 }}>
                <Text>{data?.name}</Text>
                <Text >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio molestiae exercitationem corporis culpa? Numquam voluptas architecto soluta dolore ratione quam illum, delectus vel cumque eveniet tenetur error nam, enim repellat?
                    Id dolore necessitatibus perspiciatis impedit nemo, repudiandae ex totam distinctio ea ab, quia inventore ut quam velit. Qui, quos! Tempora exercitationem voluptatem optio saepe voluptatibus ad obcaecati iure sint et.
                    Laborum iure hic suscipit! Eum unde ducimus consequuntur, quos veritatis quidem vitae et, dicta exercitationem, omnis tempore beatae quae adipisci quaerat laboriosam! Aspernatur hic quisquam explicabo, neque ea repudiandae libero.
                    Nam cupiditate in dolore iste cumque ut illum recusandae, rerum maiores molestiae culpa assumenda expedita eos at, asperiores debitis nemo magni, neque ad. Esse eos quasi, totam corrupti quo deleniti.
                    Tempore exercitationem, harum earum nisi deserunt commodi quod illum animi qui itaque autem omnis cum debitis laudantium neque officia fuga pariatur voluptatibus corrupti illo? Non unde dignissimos est provident dolorem.
                    Corrupti reiciendis ex, totam incidunt enim ipsum vero quibusdam atque nisi. Earum labore non, tempore beatae natus repudiandae dignissimos, accusantium corrupti facere nostrum tempora odit, a maxime voluptatibus iusto repellendus!
                    Consequatur dolores rerum, libero voluptatem aspernatur voluptates laboriosam nemo optio temporibus nesciunt veniam obcaecati soluta minima quasi nam sequi suscipit, in magni tempora! Dolores voluptatem, iusto odio ea deleniti perspiciatis!
                    Enim optio reprehenderit quae odit exercitationem ex voluptate quibusdam ratione eveniet aperiam? Mollitia aperiam earum incidunt repellat iusto eius necessitatibus culpa dolores modi possimus sint, nisi laborum corporis at qui.
                    Autem impedit sint reprehenderit nesciunt enim ex reiciendis magnam exercitationem praesentium natus quia officia, ullam aliquid adipisci expedita quo? Eaque commodi blanditiis incidunt suscipit placeat, laboriosam doloremque itaque quis harum.
                    Magnam asperiores animi ad eius error ullam fugiat ea eos iusto dolore saepe, iure repudiandae, necessitatibus reprehenderit similique. In rerum quia nesciunt eaque blanditiis voluptatem dignissimos ipsam, dicta voluptates nisi.
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default EnchereCard

