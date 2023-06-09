import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {ListItem} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {logoutA} from '../store/auth/AuthSlice';
import {logoutU} from '../store/user/UserSlice';
import cateAPI from '../services/cateAPI';

export default function ContentMenuDrawer(props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const [stop, setStop] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [categories, setCategories] = useState([]);

  const logoutHandle = async () => {
    await dispatch(logoutA());
    await dispatch(logoutU());
    if (isLoggedIn) {
      props.navigation.navigate('UserLogin');
    }
  };
  const handleCategory = async id => {
    const response = await dispatch(searchByCategory(id));
    if (!!response) {
      props.navigation.navigate('Search');
    }
  };

  const getAllCate = async (delay = 1000, maxAttempts = 20) => {
    let attempts = 0;
    while (attempts < maxAttempts) {
      try {
        const response = await cateAPI.getAllCate();
        if (response) {
          console.log('may vao day chua');
          setCategories(response.category);
          console.log(categories);
        }
      } catch (error) {
        console.log(`Error calling API: ${error}`);
      }
      attempts++;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    throw new Error(`API call failed after ${maxAttempts} attempts`);
  };

  useEffect(() => {
    const response = getAllCate();
  }, []);

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
          {categories?.map(category => (
            <ListItem
              key={category.id}
              topDivider
              bottomDivider
              style={{color: 'rgb(28, 28, 30)', fontSize: 14, marginLeft: 2}}>
              <ListItem.Content>
                <ListItem.Subtitle onPress={() => handleCategory(category.id)}>
                  {category?.name}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </ListItem.Accordion>
      </View>

      {isLoggedIn && (
        <DrawerItem label="Logout" onPress={logoutHandle}></DrawerItem>
      )}
    </DrawerContentScrollView>
  );
}
