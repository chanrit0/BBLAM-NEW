import React from 'react';
import {
  ReportPVD,
  Setting,
  MultipleUsers,
  SummaryInvestReport,
  SummaryEvaluation,
  RetireCheck,
  ChangeAccumulateIcon,
  ChangeInfo,
  Download,
} from 'components/Icons/Customs';
import {DRAWER_WIDTH_HEIGHT_ICONS} from 'styles';
import {Translate} from 'function';

import styles from './Style';
import {isTablet} from 'utils';

export function route() {
  const pre_route = [
    {
      title: Translate('textBoardDrawerHeader1').replace(
        /กองทุนสำรองเลี้ยงชีพ/,
        match => {
          return `${isTablet ? '' : '\n'}${match}`;
        },
      ),
      subtitle: [
        {
          title: Translate('textBoardDrawerHeader1_sub1'),
          route: 'Report11',
          routeType: 'navigate',
        },
        {
          title: Translate('textBoardDrawerHeader1_sub2'),
          route: 'Report12',
          routeType: 'navigate',
        },
        {
          title: Translate('textBoardDrawerHeader1_sub3'),
          route: 'Report13',
          routeType: 'navigate',
        },
        {
          title: Translate('textBoardDrawerHeader1_sub5'),
          route: 'ReportBond',
          routeType: 'navigate',
        },
        {
          title: Translate('textBoardDrawerHeader1_sub6'),
          route: 'Report',
          routeType: 'jumpTo',
        },
      ],
      icon: <ReportPVD style={styles.shifticon} />,
    },
    {
      title: Translate('textBoardDrawerHeader2'),
      subtitle: [
        {
          title: Translate('textBoardDrawerHeader2_sub1'),
          route: 'MemberProfile',
          routeType: 'jumpTo',
        },
        // {
        //   title: Translate('textBoardDrawerHeader2_sub2'),
        //   route: 'MemberProfileList',
        //   routeType: 'navigate',
        // },
        {
          title: Translate('textBoardDrawerHeader2_sub3'),
          route: 'ReportMemberSummaryInvestmentPlan',
          routeType: 'navigate',
        },
        {
          title: Translate('textBoardDrawerHeader2_sub4').replace(
            /ทางเลือกการลงทุน/,
            match => {
              return `${isTablet ? '' : '\n'}${match}`;
            },
          ),
          route: 'ChangeStrategyCondition',
          children: 'navigate',
        },
      ],
      icon: <MultipleUsers style={styles.shifticon} />,
    },
    {
      title: Translate('textBoardDrawerHeader3').replace(
        /การลงทุนของสมาชิก/,
        match => {
          return `${isTablet ? '' : '\n'}${match}`;
        },
      ),
      route: 'PlanInvestment',
      routeType: 'jumpTo',
      icon: <SummaryInvestReport style={styles.shifticon} />,
    },
    {
      title: Translate('textBoardDrawerHeader4').replace(
        /ความเสี่ยงของสมาชิก/,
        match => {
          return `${isTablet ? '' : '\n'}${match}`;
        },
      ),
      route: 'RiskProfile',
      routeType: 'jumpTo',
      icon: <SummaryEvaluation style={styles.shifticon} />,
    },
    {
      title: 'ข้อมูลสมาชิก สำหรับลงทะเบียนเข้าใช้งานระบบ Online',
      route: 'CalculateMoney',
      routeType: 'navigate',
      icon: <RetireCheck style={styles.shifticon} />,
    },
    {
      title: Translate('textBoardDrawerHeader5'),
      route: 'ResignMemberCheck',
      routeType: 'navigate',

      icon: <RetireCheck style={styles.shifticon} />,
    },
    {
      title: Translate('textBoardDrawerHeader6').replace(
        /การจ่ายเงินสะสม/,
        match => {
          return `${!isTablet ? '\n' : ''}${match}`;
        },
      ),
      subtitle: [
        {
          title: Translate('textBoardDrawerHeader6_sub1'),
          route: 'ChangeAccumulate',
          routeType: 'navigate',
        },
        {
          title: Translate('textBoardDrawerHeader6_sub2'),
          route: 'ChangeAccumulateInfo',
          routeType: 'navigate',
        },
      ],
      icon: <ChangeAccumulateIcon style={styles.shifticon} />,
    },
    {
      title: Translate('textBoardDrawerHeader7'),
      route: 'InformChangeInfo',
      routeType: 'navigate',
      icon: <ChangeInfo style={styles.shifticon} />,
    },
    {
      title: Translate('textBoardDrawerHeader8'),
      route: 'DownloadDocs',
      routeType: 'navigate',
      icon: <Download style={styles.shifticon} />,
    },
    {
      title: Translate('textSetting'),
      route: 'Setting',
      routeType: 'navigate',
      icon: <Setting style={styles.shifticon} />,
    },
  ];

  const route_final = pre_route.map(item => {
    const width = DRAWER_WIDTH_HEIGHT_ICONS;
    const height = DRAWER_WIDTH_HEIGHT_ICONS;
    return {
      ...item,
      icon: React.cloneElement(item.icon, {width, height}, null),
    };
  });

  return route_final;
}
