// React
import * as React from 'react';
import {
    useWindowDimensions,
    Animated,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
// lib
import { TabView, SceneMap } from 'react-native-tab-view';
// components
import { COLORS, FONT_SIZE, FONT_TYPE } from 'styles';

import ProfilePresentRatio from 'screens/Member/Profile/components/ProfilePresentRatio';
import ProfileNewRatio from 'screens/Member/Profile/components/ProfileNewRatio';


export default ({ routes, data, heightG }) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    const position = React.useRef(new Animated.Value(0)).current;

    const renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((_, i) => i);
        const translateX = position.interpolate({
            inputRange: [0, 1],
            outputRange: [0, layout.width / routes.length],
        });

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) =>
                            inputIndex === i ? 1 : 0.5
                        ),
                    });

                    return (
                        <TouchableOpacity
                            key={route.key}
                            style={styles.tabItem}
                            onPress={() => {
                                setIndex(i);
                                Animated.spring(position, {
                                    toValue: i,
                                    useNativeDriver: true,
                                }).start();
                            }}
                        >
                            <Animated.Text
                                style={[
                                    styles.tabText,
                                    index === i && styles.tabTextActive,
                                    { opacity },
                                ]}
                            >
                                {route.title}
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                })}

                <Animated.View
                    style={[
                        styles.indicator,
                        {
                            width: layout.width / routes.length,
                            transform: [{ translateX }],
                        },
                    ]}
                />

            </View>
        );
    };

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
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style={{ height: heightG }}
        />
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row', // แสดงแท็บในแนวนอน
        alignItems: 'center', // จัดให้อยู่ตรงกลางในแนวตั้ง
        justifyContent: 'space-between', // เว้นระยะระหว่างแท็บ
        backgroundColor: COLORS.WHITE, // สีพื้นหลังของแถบ Tab
        paddingHorizontal: 16, // ระยะขอบด้านข้าง
    },
    tabItem: {
        flex: 1, // แบ่งพื้นที่ให้แต่ละแท็บเท่า ๆ กัน
        alignItems: 'center', // จัดข้อความให้อยู่ตรงกลางในแนวนอน
        paddingVertical: 12, // เพิ่มระยะห่างด้านบน-ล่าง
    },
    tabText: {
        fontSize: FONT_SIZE.BODY_1, // ขนาดตัวอักษร
        fontFamily: FONT_TYPE.REGULAR, // ฟอนต์
        color: COLORS.BLACK, // สีข้อความปกติ
    },
    tabTextActive: {
        color: COLORS.PRIMARY, // สีข้อความเมื่อแท็บถูกเลือก
    },
    indicator: {
        height: 2, // ความหนาของเส้น Indicator
        backgroundColor: COLORS.PRIMARY, // สีเส้น Indicator
        position: 'absolute', // ให้อยู่ในตำแหน่งแบบ absolute
        bottom: 0, // ติดกับด้านล่างของแถบ Tab
        left: 0, // เริ่มจากด้านซ้าย
    },
});
