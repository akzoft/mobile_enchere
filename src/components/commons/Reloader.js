import React from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native';
import { Colors } from '../../libs';

const Reloader = ({ children, onRefresh, refreshing, theme }) => {

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1, backgroundColor: theme === "sombre" ? Colors.black : Colors.white }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} showsVerticalScrollIndicator={false} >
            {children}
        </ScrollView>
    );
};

export default Reloader
