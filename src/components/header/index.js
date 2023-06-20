import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar, Badge, Icon as Abc, withBadge} from '@rneui/themed';
import Search from '../search/search';

const Header = ({navigation}) => {
  const cartItems = useSelector(state => state.cart.cart);
  const [token, setToken] = useState(false);
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState({});

  // input search
  const [searchText, setSearchText] = useState(null);

  const BadgedIcon = withBadge(cartItems.length)(Abc);
  // Luu tru token de check trang thai cua token
  AsyncStorage.getItem('sessionToken').then(res => {
    return setIsLogin(res);
  });

  //Luu tru trang thai cua token de check Login va User
  async function checkLogin() {
    setUser(JSON.parse(await AsyncStorage.getItem('user')));
    setToken((await AsyncStorage.getItem('sessionToken')) ? true : false);
  }

  //useEffect tranh checkLogin() loop bang trang thai isLogin cua token
  useEffect(() => {
    checkLogin();
  }, [isLogin]);

  const thongbao = () => {
    alert('Đăng nhập để xem giỏ hàng !');
    navigation.navigate('Login');
  };

  return (
    <>
      <View>
        <View style={styles.nav}>
          <View style={styles.navContent}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigation.openDrawer()}>
                <Text style={styles.menuButtonText}>
                  <Icon name="bars" size={20} color={'black'} />
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image
                source={require('../../../assets/logo.jpg')}
                style={styles.logo}
              />
              <Text style={styles.logoText}>Mekong</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              {!token && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => thongbao()}>
                    {/* <Icon name="shopping-cart" size={20} /> */}
                    <BadgedIcon type="fontawesome" name="shopping-cart" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginButtonText}>Log in</Text>
                  </TouchableOpacity>
                </View>
              )}

              {token && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => navigation.getParent().openDrawer()}>
                    {/* <Icon name="shopping-cart" size={20} /> */}
                    <BadgedIcon type="fontawesome" name="shopping-cart" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>
                      {user?.firstname}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#c4c7cc',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ebedf0',
            }}>
            <TextInput
              style={{width: '70%'}}
              placeholder="Tìm kiếm sản phẩm"
              onChangeText={text => setSearchText(text)}
              value={searchText}
            />
            <TouchableOpacity
              key={searchText}
              onPress={() => navigation.navigate('Search', {searchText})}>
              <View
                style={{
                  backgroundColor: '#29B1B0',
                  height: 35,
                  width: 80,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IonIcon name="search" size={20} color={'#000000'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  nav: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // paddingVertical: 10,
    paddingHorizontal: 20,
    minHeight: 90,
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginRight: 5,
    marginTop: 5,
    height: 60,
    width: 60,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    // backgroundColor: 'white',
    // borderRadius: 20,
    // borderWidth: 1,
    // borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 15,
    marginRight: 5,
  },
  loginButtonText: {
    fontSize: 14,
    color: 'black',
  },
  cartButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  menuButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 5,
  },
  menuButtonText: {
    fontSize: 14,
    color: 'black',
  },
  mobileMenu: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  mobileMenuItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  mobileMenuText: {
    fontSize: 14,
    color: 'black',
  },
  itemStyle: {
    padding: 10,
  },
  search: {
    height: 35,
    marginTop: 5,
    marginBottom: 0,
    paddingVertical: 0,
    padding: 0,
    backgroundColor: '#ffffff',
  },
  searchInputContainer: {
    height: 33,
    margin: 0,
    padding: 0,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    height: 1,
    paddingBottom: 8,
  },
  avatar: {
    backgroundColor: '#aaaaaa',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 15,
    marginRight: 5,
  },
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
});

export default Header;
