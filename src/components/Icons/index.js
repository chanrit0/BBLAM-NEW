import * as React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIconsC from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsC from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsC from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIconsC from 'react-native-vector-icons/SimpleLineIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial';
ZocialIcon.loadFont();
SimpleLineIconsC.loadFont();
MaterialIconsC.loadFont();
MaterialCommunityIconsC.loadFont();
IoniconsIcon.loadFont();
FoundationIcon.loadFont();
FontistoIcon.loadFont();
FontAwesomeIcon.loadFont();
FeatherIcon.loadFont();
EvilIconsC.loadFont();
EntypoIcon.loadFont();
AntDesignIcon.loadFont();

export function AntDesign(props) {
  return <AntDesignIcon {...props} />;
}

export function Entypo(props) {
  return <EntypoIcon {...props} />;
}

export function EvillIcons(props) {
  return <EvilIconsC {...props} />;
}

export function Feather(props) {
  return <FeatherIcon {...props} />;
}

export function FontAwesome(props) {
  return <FontAwesomeIcon {...props} />;
}


export function Fontisto(props) {
  return <FontistoIcon {...props} />;
}

export function Foundation(props) {
  return <FoundationIcon {...props} />;
}

export function Ionicons(props) {
  return <IoniconsIcon {...props} />;
}

export function MaterialCommunityIcons(props) {
  return <MaterialCommunityIconsC {...props} />;
}

export function MaterialIcons(props) {
  return <MaterialIconsC {...props} />;
}

export function SimpleLineIcons(props) {
  return <SimpleLineIconsC {...props} />;
}

export default function Zocial(props) {
  return <ZocialIcon {...props} />;
}
