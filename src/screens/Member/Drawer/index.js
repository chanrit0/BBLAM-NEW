/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
// React
import React from 'react';
import {View, TouchableOpacity} from 'react-native';

// custom
import {isTablet, ViewScale} from 'utils';
import {SPACING} from 'styles';

// components

import {LinearGradient} from 'components/atoms';
import {
  Download,
  Menu,
  News,
  Question,
  Target,
  Taxes,
  User,
  RetireCheck,
} from 'components/Icons/Customs';
import {ListItemAccordion, List} from 'components/Drawer';

// recoil
import {useRecoilState, useRecoilValue} from 'recoil';
import {languageState, userInfoState} from 'recoil-state';
import BackToBBLAMONE from 'components/Drawer/BackToBBLAMONE';
import {Translate} from 'function';

export default function index({navigation}) {
  useRecoilValue(languageState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const pre_route = React.useMemo(() => {
    let route = [
      {
        title: Translate('textProfileMember'),
        subtitle: [
          {
            title: Translate('textProfileMember'),
            route: 'Profile',
            routeType: 'jumpTo',
          },
          {
            title: Translate('textRemittanceTitle'),
            route: 'Remittance',
            routeType: 'jumpTo',
          },
          {
            title: Translate('textSummaryTitle'),
            route: 'Summary',
            routeType: 'jumpTo',
          },
          {
            title: Translate('textSummaryInvestment'),
            route: 'SummaryInvestPolicy',
            routeType: 'navigate',
          },
          {
            title: Translate('textRiskProfileTitle'),
            route: 'RiskProfile',
            routeType: 'jumpTo',
          },
        ],
        icon: <User style={styles.shifticon} />,
      },
      {
        title: Translate('textTryNewPlan'),
        route: 'TryNewPlan',
        routeType: 'navigate',

        icon: <Target style={styles.shifticon} />,
      },
      {
        title: Translate('textMember_payment'),
        route: 'MemberPayment',
        routeType: 'navigate',

        icon: <RetireCheck style={styles.shifticon} />,
      },
      {
        title: Translate('textCalculateMoney').replace(
          /กองทุนสำรองเลี้ยงชีพ/,
          g1 => {
            if (!isTablet) {
              return '\n' + g1;
            } else {
              return g1;
            }
          },
        ),
        route: 'CalculateMoney',
        routeType: 'navigate',

        icon: <Taxes style={styles.shifticon} />,
      },
      {
        title: Translate('textDownloadDocs'),
        route: 'DownloadDocs',
        routeType: 'navigate',

        icon: <Download style={styles.shifticon} />,
      },
      {
        title: Translate('textFAQ'),
        route: 'FAQ',
        routeType: 'navigate',

        icon: <Question style={styles.shifticon} />,
      },
      {
        title: Translate('textNews'),
        route: 'News',
        routeType: 'navigate',

        icon: <News style={styles.shifticon} />,
      },
    ];

    if (userInfo.change_fund_status) {
      route[0].subtitle.splice(2, 0, {
        title: Translate('textChangeFundTitle'),
        route: 'ChangeFund',
        routeType: 'jumpTo',
      });
    }

    if (userInfo.deposit_status) {
      route[0].subtitle.splice(route[0].subtitle.length, 0, {
        title: Translate('textChangeCumulativeRate'),
        route: 'ChangeCumulativeRate',
        routeType: 'navigate',
      });
    }

    return route;
  }, [userInfo.change_fund_status, userInfo.deposit_status]);

  const convertRoute = pre_route.map(item => {
    const width = SPACING.DRAWER_WIDTH_HEIGHT_ICONS;
    const height = SPACING.DRAWER_WIDTH_HEIGHT_ICONS;
    return {
      ...item,
      icon: React.cloneElement(item.icon, {width, height}, null),
    };
  });

  const _onPressBBLAMONE = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'BBLAMONERoute'}],
    });
  };

  return (
    <View style={{flex: 1}}>
      {/* header */}
      <LinearGradient type="Drawer">
        {/* hamburger */}
        <View style={{height: SPACING.HEADER_HEIGHT, justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-start',
              height: SPACING.HEADER_HEIGHT,
              paddingHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.closeDrawer()}>
            <Menu width={ViewScale(25)} height={ViewScale(25)} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {/* header */}

      <View style={{flex: 1}}>
        {/* List พับได้ */}
        <View style={{flex: 1}}>
          <ListItemAccordion
            navigation={navigation}
            icon={convertRoute[0].icon}
            title={convertRoute[0].title}
            content={convertRoute[0].subtitle}
          />

          {/* List กดอย่างเดียว */}
          {convertRoute.map((item, index) => {
            if (index === 0) {
              return null;
            } else {
              return (
                <View key={'idListDrawer-' + index}>
                  <List
                    onPress={() => {
                      if (item.routeType === 'jumpTo') {
                        navigation.jumpTo('Drawer', {
                          screen: item.route,
                        });
                      } else {
                        navigation.navigate('Drawer', {
                          screen: item.route,
                        });
                      }
                    }}
                    icon={item.icon}
                    title={item.title}
                  />
                </View>
              );
            }
          })}
        </View>
        <BackToBBLAMONE onPress={_onPressBBLAMONE} />
      </View>
    </View>
  );
}
