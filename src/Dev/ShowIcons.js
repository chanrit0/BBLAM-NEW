/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {View, Text} from 'react-native';

import {
  Menu,
  Setting,
  News,
  Question,
  Download,
  Taxes,
  Target,
  PlanRetire,
  User,
  CheckGradient,
  Company,
  Fund,
  MultipleUsers,
  Filter,
  SearchDocument,
  DownloadBold,
  Upload,
  ReportPVD,
  ChangeAccumulateIcon,
  ChangeInfo,
  RetireCheck,
  SummaryEvaluation,
  SummaryInvestReport,
  Lock,
  Globe,
  Logout,
  DuoUsers,
  PadLock,
  TouchId,
  BFT,
  Star,
} from 'components/Icons/Customs';

import {Container} from 'components/common';
import {ViewScale} from 'utils';
import {ScrollView} from 'react-native';

export default function ShowIcons({navigation}) {
  const SIZE = 30;

  return (
    <ScrollView style={{backgroundColor: 'gray'}}>
      <Container style={{marginTop: ViewScale(20)}}>
        <Wrapper width={SIZE} height={SIZE}>
          <BFT />
          <CheckGradient />
          <Company />
          <Download />
          <DownloadBold />
          <Filter />
          <Fund />
          <Menu />
          <MultipleUsers />
          <News />
          <PlanRetire />
          <Question />
          <ReportPVD />
          <SearchDocument />
          <Setting />
          <Target />
          <Taxes />
          <Upload />
          <User />
          <ChangeInfo />
          <ChangeAccumulateIcon />
          <RetireCheck />
          <SummaryEvaluation />
          <SummaryInvestReport />
          <Lock />
          <Globe />
          <DuoUsers />
          <Logout />
          <PadLock />
          <TouchId />
        </Wrapper>
      </Container>
    </ScrollView>
  );
}

const Wrapper = ({children, ...props}) =>
  React.Children.map(children, child => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: ViewScale(10),
      }}>
      {React.cloneElement(child, props, null)}
      <Text style={{marginLeft: ViewScale(20)}}>{child.type.name}</Text>
    </View>
  ));
