/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {TextRegular} from 'components/atoms';
import {ViewScale} from 'utils';
import {DownloadBold, SearchDocument} from 'components/Icons/Customs';
import {TouchableOpacity} from 'react-native';
import {COLORS} from 'styles';

const ICON_SIZE = ViewScale(18);

function index({
  title = '????',
  previewCallback,
  downloadCallback,
  date,
  downloadIcon,
}) {
  return (
    <View style={{paddingHorizontal:20, borderColor: COLORS.BORDER, borderBottomWidth: 1,backgroundColor:COLORS.WHITE}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: ViewScale(70),
          justifyContent: 'space-between',
        }}>
        <TextRegular numberOfLines={2} style={{flex: 1}}>{title}</TextRegular>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextRegular style={{marginRight: ViewScale(50)}}>{date}</TextRegular>
          <TouchableOpacity onPress={previewCallback}>
            <SearchDocument width={ICON_SIZE} height={ICON_SIZE} />
          </TouchableOpacity>
          <View style={{marginLeft: ViewScale(20)}}>
            <TouchableOpacity onPress={downloadCallback}>
              {downloadIcon ? (
                downloadIcon
              ) : (
                <DownloadBold width={ICON_SIZE} height={ICON_SIZE} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export const ListThatCanWatchPDF = React.memo(index);
