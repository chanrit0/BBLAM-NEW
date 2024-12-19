/* eslint-disable react-hooks/rules-of-hooks */
// React
import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';

// custom
import {Translate} from 'function';
import {FontScale, setSpinner} from 'utils';
import styles from './Style';
import {COLORS, FONT_SIZE} from 'styles';

// components
import Header from 'components/header/HomeHeaderOnly';
import {Container} from 'components/common';
import {KeyboardDismiss, SearchBar, TextRegular} from 'components/atoms';

import {Ionicons} from 'components/Icons';

// lib
import {ListItem} from 'react-native-elements';

// data
import {getFAQ} from 'services/api/member';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default function FAQ({navigation}) {
  const [list, setList] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [apiData, setApiData] = React.useState([]);
  const [load, setLoad] = React.useState(true);
  const [isServerError, setIsServerError] = React.useState(false);

  const handleOnSearch = value => {
    setList(
      apiData.filter(item =>
        item.faq_subtype_text.toLowerCase().includes(value),
      ),
    );
    setSearch(value);
  };

  const callapi = async () => {
    await getFAQ()
      .then(response => {
        if (response.status == 'success') {
          setApiData(response.data.detail);
          setList(response.data.detail);
          setLoad(false);
          setIsServerError(false);
        }
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      });
  };

  const handleOnPress =
    ({title, content}) =>
    () => {
      return navigation.navigate('FAQDetail', {title, content});
    };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  }, []);

  return (
    <KeyboardDismiss>
      <Header title={Translate('textFAQ')} isBackIcon={true}>
        <Container style={{flex: 0}}>
          <SearchBar value={search} onChangeText={handleOnSearch} />
        </Container>
      </Header>
      {isServerError ? (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      ) : (
        <ScrollView>
          <View style={styles.ListItemButtonContainer}>
            {!load &&
              list.length > 0 &&
              list.map((item, i) => {
                return (
                  <View key={'faqindexid' + i}>
                    <TouchableOpacity
                      onPress={handleOnPress({
                        title: item.faq_subtype_text,
                        content: item.value,
                      })}>
                      <ListItem
                        bottomDivider
                        containerStyle={styles.containerStyle}>
                        <Container style={{flexDirection: 'row'}}>
                          <ListItem.Content>
                            <TextRegular size={FONT_SIZE.BODY_2}>
                              {item.faq_subtype_text}
                            </TextRegular>
                          </ListItem.Content>
                          <Ionicons
                            name="chevron-forward-circle"
                            color={COLORS.PRIMARY}
                            size={FontScale(22)}
                          />
                        </Container>
                      </ListItem>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      )}
    </KeyboardDismiss>
  );
}
