// React
import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

// components
import { TabView, TabBar } from 'components/atoms';
import ProfilePresentRatio from 'screens/Member/Profile/components/ProfilePresentRatio';
import ProfileNewRatio from 'screens/Member/Profile/components/ProfileNewRatio';

//lib
import { SceneMap } from 'react-native-tab-view';

export default ({
    routes,
    data,
    heightG,
}) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    const renderScene = SceneMap({
        0: () => (
            <ProfilePresentRatio
                data={data?.ProfilePresentRatio}
                date={data?.investmentOverview?.date}
                total={data?.investmentOverview?.total}
            />
        ),
        1: () => <ProfileNewRatio data={data?.ProfileNewRatio} />,
    });
    return (
        <TabView
            renderTabBar={props => <TabBar {...props} />}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style={{ height: heightG }}
        />
    )
};

const styles = StyleSheet.create({

});
