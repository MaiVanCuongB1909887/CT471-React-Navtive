import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {ListItem} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../footer/style';

export default function ContentMenuDrawer(props) {
  const [token, setToken] = useState(false);
  const [isLogout, setIsLogout] = useState({});
  const [expanded, setExpanded] = useState(false);

  AsyncStorage.getItem('sessionToken').then(res => {
    return setIsLogout(res);
  });

  async function checkLogout() {
    setToken((await AsyncStorage.getItem('sessionToken')) ? true : false);
  }

  useEffect(() => {
    checkLogout();
  }, [isLogout]);

  const handle = () => {
    props.navigation.navigate('Login');
  };
  const logout = async () => {
    await AsyncStorage.removeItem('sessionToken');
    await AsyncStorage.removeItem('user');
    props.navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <View style={{margin: 0, padding: 0}}>
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    color: 'rgb(28, 28, 30)',
                    fontSize: 14,
                    marginLeft: 2,
                  }}>
                  Danh mục
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          icon={<Icon name={'chevron-down'} color={'#000000'} />}
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}>
          <ListItem
            topDivider
            bottomDivider
            style={{color: 'rgb(28, 28, 30)', fontSize: 14, marginLeft: 2}}>
            <ListItem.Content>
              <ListItem.Subtitle onPress={() => handle()}>
                Nấm Trường Sinh
              </ListItem.Subtitle>
              <ListItem.Subtitle onPress={() => handle()}>
                Nấm Đông Cô
              </ListItem.Subtitle>
              <ListItem.Subtitle onPress={() => handle()}>
                Nấm Rơm
              </ListItem.Subtitle>
              <ListItem.Subtitle onPress={() => handle()}>
                Nấm mốc
              </ListItem.Subtitle>
              <ListItem.Subtitle onPress={() => handle()}>
                Nấm mộ
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </View>

      <DrawerItem label="Tiếng Hàn sẻng" />
      {token && <DrawerItem label="Logout" onPress={logout}></DrawerItem>}
    </DrawerContentScrollView>
  );
}
