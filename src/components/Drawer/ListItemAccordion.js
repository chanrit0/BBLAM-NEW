import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Container} from 'components/common';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import {TextMedium, TextRegular} from 'components/atoms';
import {
  DRAWER_BODY_CONTAINER,
  DRAWER_PADDING_VERTICAL,
  DRAWER_SHIFT_ICONS,
  COLORS,
  FONT_SIZE,
} from 'styles';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {Badge} from 'react-native-paper';

export default function ListItemAccordion({
  icon,
  title,
  content = [],
  navigation,
  toggleGlobalExpand,
  globalExpand,
  index,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const userInfo = useRecoilValue(userInfoState);

  React.useEffect(() => {
    setExpanded(false);
  }, [globalExpand]);

  return (
    <>
      <ListItem.Accordion
        content={
          <>
            <Container
              style={{
                paddingVertical: DRAWER_PADDING_VERTICAL,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {icon}
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: ViewScale(10),
                  }}>
                  {userInfo.deposit_count_member > 0 &&
                    userInfo.role == 'committee' &&
                    index == 6 && (
                      <Badge>{userInfo.deposit_count_member}</Badge>
                    )}
                </View>
                <TextMedium
                  color={COLORS.PRIMARY}
                  style={{marginLeft: DRAWER_SHIFT_ICONS}}>
                  {title}
                </TextMedium>
              </View>
            </Container>
          </>
        }
        containerStyle={[
          styles.ListItemContainerStyle,
          expanded ? null : styles.bottomBorder,
        ]}
        isExpanded={expanded}
        onPress={() => {
          toggleGlobalExpand?.();
          setExpanded(!expanded);
        }}>
        {expanded && (
          <>
            <Container style={styles.ContentContainer}>
              {content.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{marginTop: ViewScale(10)}}
                    key={'idDrawer-' + index}
                    onPress={() => {
                      if (item.routeType === 'jumpTo') {
                        navigation.jumpTo('Drawer', {
                          screen: 'Home',
                          params: {
                            screen: item.route,
                          },
                        });
                      } else if (item.routeType === 'Alert') {
                        navigation.navigate('Alert', {
                          children: item.children,
                          textBtn: Translate('textConfirm2'),
                        });
                      } else {
                        navigation.navigate('Drawer', {
                          screen: item.route,
                        });
                      }
                      navigation.closeDrawer();
                    }}>
                    <TextRegular size={FONT_SIZE.BODY_2}>
                      {item.title}
                    </TextRegular>
                  </TouchableOpacity>
                );
              })}
            </Container>
            <View
              style={{borderBottomWidth: 0.5, borderColor: COLORS.PRIMARY}}
            />
          </>
        )}
      </ListItem.Accordion>
    </>
  );
}

const styles = StyleSheet.create({
  ContentContainer: {
    flex: 0,
    marginLeft: wp(12),
    marginRight: ViewScale(20),
    paddingBottom: ViewScale(20),
  },
  ListItemContainerStyle: {
    paddingLeft: 0,
    paddingVertical: 0,
  },
  bottomBorder: {borderBottomWidth: 0.5, borderColor: COLORS.PRIMARY},
  ListItemHeaderContainer: {
    marginHorizontal: DRAWER_BODY_CONTAINER,
    paddingVertical: DRAWER_PADDING_VERTICAL,
  },
  contentContainer: {
    flex: 0,
    marginHorizontal: wp(12),
    paddingBottom: ViewScale(20),
  },
});
