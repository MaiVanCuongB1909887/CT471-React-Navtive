import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  ImageBackground,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState, useEffect} from 'react';
import style from './style';
import Footer from '../footer';
import axios from 'axios';

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const img =
    'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';

  useEffect(() => {
    axios
      .get('http://192.168.1.9:5000/product/list1', {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      .then(response => {
        setProducts(response.data.product.items);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const renderProductItem = ({item}) => (
    <TouchableOpacity
      key={item.id}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          productId: item.sku,
        })
      }>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          backgroundColor: 'white',
          margin: 10,
          padding: 10,
          borderRadius: 5,
        }}>
        <Image
          style={{width: 80, height: 80, marginRight: 16, borderRadius: 5}}
          source={{
            uri:
              img +
              '' +
              item.custom_attributes?.find(
                attr => attr.attribute_code === 'image',
              ).value,
          }}
        />
        <View style={{flex: 1}}>
          <Text style={{fontSize: 16}} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={{fontSize: 14, color: 'green'}} numberOfLines={1}>
            {item.price?.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
          {/* <Text>
                    <Icon name="cube" /> {item.qty} sản phẩm có
                    sẵn
                  </Text> */}
          {/*Thêm các thuộc tính khác của sản phẩm tại đây*/}
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderProductItem1 = ({item}) => (
    <TouchableOpacity
      key={item.id}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          productId: item.sku,
        })
      }>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          backgroundColor: 'white',
          margin: 10,
          padding: 10,
          borderRadius: 5,
        }}>
        <Image
          style={{width: 80, height: 80, marginRight: 16, borderRadius: 5}}
          source={{
            uri:
              img +
              '' +
              item.custom_attributes?.find(
                attr => attr.attribute_code === 'image',
              ).value,
          }}
        />
        <View style={{flex: 1}}>
          <Text style={{fontSize: 16}} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={{fontSize: 14, color: 'green'}} numberOfLines={1}>
            {item.price?.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
          {/* <Text>
                    <Icon name="cube" /> {item.qty} sản phẩm có
                    sẵn
                  </Text> */}
          {/*Thêm các thuộc tính khác của sản phẩm tại đây*/}
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderProductItem2 = ({item}) => (
    <TouchableOpacity
      key={item.id}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          productId: item.sku,
        })
      }>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 10,
          backgroundColor: 'white',
          margin: '5%',
          padding: '5%',
          width: '95%',
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#d0ced6',
        }}>
        <Image
          style={{width: 100, height: 150, marginRight: 16}}
          source={{
            uri:
              img +
              '' +
              item.custom_attributes?.find(
                attr => attr.attribute_code === 'image',
              ).value,
          }}
        />
        {/* numberOfLines={1} */}
        <View>
          <Text
            style={{fontSize: 20, width: 100, color: 'black'}}
            numberOfLines={1}>
            {item.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <IonIcon name="star" size={20} />
            <IonIcon name="star" size={20} />
            <IonIcon name="star" size={20} />
            <IonIcon name="star" size={20} />
            <IonIcon name="star" size={20} />
          </View>
          <Text style={{fontSize: 20, color: 'green'}} numberOfLines={1}>
            {item.price?.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: '#E9EDF4'}}>
        {/* <View style={style.container}>
        <ImageBackground style={style.imageBg}
          source={require('../../assets/hero1-image.jpg')}
          resizeMode="cover">
          <View style={style.containerHeader}>
            <Text style={style.headerText}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                Developer World
              </Text>
              {'\n'}
              {'\n'}

              <Text style={{color: '#A7A8B6'}}>
                Welcome to Sony's Developer World! Find everything you need to
                develop for Sony products.
              </Text>
            </Text>
          </View>
        </ImageBackground>
      </View> */}
        <View>
          <Image
            style={style.imageBg}
            source={require('../../assets/hero1-image.jpg')}
            resizeMode="cover"></Image>
        </View>

        <View style={{height: 110, flex: 1, backgroundColor: '#E2E2E2'}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            contentOffset={{x: 0, y: 0}}
            contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
            horizontal={true}
            style={style.Scroll}>
            <View
              style={{
                borderRadius: 5,
                height: 90,
                width: 200,
                backgroundColor: '#B180B7',
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IonIcon
                name="md-search-circle-outline"
                size={60}
                color={'white'}
              />
              <Text>Dễ Dàng Tìm kiếm</Text>
            </View>
            <View
              style={{
                borderRadius: 5,
                height: 90,
                width: 200,
                backgroundColor: '#8353FA',
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IonIcon name="wallet-outline" size={60} color={'white'} />
              <Text>Dễ Dàng Tìm kiếm</Text>
            </View>
            <View
              style={{
                borderRadius: 5,
                height: 90,
                width: 200,
                backgroundColor: '#FF727D',
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IonIcon name="chatbubbles-outline" size={60} color={'white'} />
              <Text>Dễ Dàng Tìm kiếm</Text>
            </View>
            <View
              style={{
                borderRadius: 5,
                height: 90,
                width: 200,
                backgroundColor: '#58B1FF',
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IonIcon name="car-outline" size={60} color={'white'} />
              <Text>Dễ Dàng Tìm kiếm</Text>
            </View>
            <View
              style={{
                borderRadius: 5,
                height: 90,
                width: 200,
                backgroundColor: '#FC950B',
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IonIcon name="calendar-outline" size={60} color={'white'} />
              <Text>Dễ Dàng Tìm kiếm</Text>
            </View>
          </ScrollView>
        </View>
        {/* <List navigation={navigation}/> */}

        {/* code moi */}

        <View>
          <View
            style={{
              margin: 5,
              backgroundColor: '#e9edf2',
              padding: 5,
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Sản phẩm nổi bật
            </Text>
          </View>
          <FlatList
            key={'#'}
            data={products}
            renderItem={renderProductItem}
            keyExtractor={item => item.id.toString()}
            horizontal
          />
        </View>

        <View>
          <View
            style={{
              margin: 5,
              backgroundColor: '#e9edf2',
              padding: 5,
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Deal Sốc Mỗi Ngày
            </Text>
          </View>
          <FlatList
            key={'@'}
            data={products}
            renderItem={renderProductItem1}
            keyExtractor={item => item.id.toString()}
            horizontal
          />
        </View>
        <View>
          <Image
            style={style.imageB}
            source={require('../../assets/hero2-image.jpg')}
            resizeMode="cover"></Image>
          <Image
            style={style.imageB}
            source={require('../../assets/hero3-image.jpg')}
            resizeMode="cover"></Image>
        </View>
        <View>
          <View
            style={{
              margin: 5,
              backgroundColor: '#e9edf2',
              padding: 5,
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Dành Cho Bạn Hôm Nay
            </Text>
          </View>
          <FlatList
            key={'!'}
            data={products}
            renderItem={renderProductItem2}
            keyExtractor={item => item.id.toString()}
            // horizontal
            numColumns={2}
            style={{}}
          />
        </View>

        <View style={{marginVertical: 20, flex: 1, backgroundColor: '#ffffff'}}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: 'black',
                marginVertical: 20,
              }}>
              Mua Sắm Theo Thương Hiệu
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: 100,
                width: '30%',
                margin: '1.5%',
                borderRadius: 5,
                borderWidth: 3,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#42454a',
              }}>
              <Image
                source={require('../../assets/cty1.jpg')}
                style={{height: '100%', width: '100%', resizeMode: 'cover'}}
              />
            </View>
            <View
              style={{
                height: 100,
                width: '30%',
                margin: '1.5%',
                borderRadius: 5,
                borderWidth: 3,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#42454a',
              }}>
              <Image
                source={require('../../assets/cty2.jpg')}
                style={{height: '100%', width: '100%', resizeMode: 'cover'}}
              />
            </View>
            <View
              style={{
                height: 100,
                width: '30%',
                margin: '1.5%',
                borderRadius: 5,
                borderWidth: 3,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#42454a',
              }}>
              <Image
                source={require('../../assets/cty3.jpg')}
                style={{height: '100%', width: '100%', resizeMode: 'cover'}}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: 100,
                width: '30%',
                margin: '1.5%',
                borderRadius: 5,
                borderWidth: 3,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#42454a',
              }}>
              <Image
                source={require('../../assets/cty4.jpg')}
                style={{height: '100%', width: '100%', resizeMode: 'cover'}}
              />
            </View>
            <View
              style={{
                height: 100,
                width: '30%',
                margin: '1.5%',
                borderRadius: 5,
                borderWidth: 3,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#42454a',
              }}>
              <Image
                source={require('../../assets/cty5.jpg')}
                style={{height: '100%', width: '100%', resizeMode: 'cover'}}
              />
            </View>
            <View
              style={{
                height: 100,
                width: '30%',
                margin: '1.5%',
                borderRadius: 5,
                borderWidth: 3,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#42454a',
              }}>
              <Image
                source={require('../../assets/cty6.jpg')}
                style={{height: '100%', width: '100%', resizeMode: 'cover'}}
              />
            </View>
          </View>
        </View>
        <Footer />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
export default Home;
