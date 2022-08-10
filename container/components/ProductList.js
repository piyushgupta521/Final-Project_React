
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, Text, View } from 'react-native';
import * as globals from '../../utils/globals';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartReducer';

const ProductList = ({ item }) => {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(item.qty ? item.qty : 0)
    const navigation = useNavigation();


    const goToDetail = () => {
        navigation.navigate('ProductDetail', {
            product_detail: { ...item, qty },

        });
    };

    let height = globals.deviceHeight * 0.30

    return (
        <Pressable
            style={{
                width: globals.deviceWidth * 0.45,
                height: height
            }}
            onPress={goToDetail}
        >
            <Image
                source={{ uri: item.Image }}
                style={{
                    width: '100%',
                    height: height * 0.45,
                    borderRadius: 10
                }}
            />
            <View
                style={{ marginTop: 10, marginHorizontal: 10 }}
            >
                <Text
                    style={{ fontSize: 12, color: 'black' }}
                >{item.name}</Text>
                <Text
                    style={{ marginTop: 5, color: 'grey', fontSize: 10 }}
                    numberOfLines={1}
                >{item.description}</Text>
                <Text
                    labelSize={12}
                    textColor={'black'}
                    style={{ fontSize: 12, color: 'black', marginTop: 10 }}
                >{item.price} $</Text>
            </View>
            <Pressable style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'green',
                alignSelf: 'center',
                marginTop: 10,
                borderRadius: 4,
                width: 100,
                height: 30
            }}
                onPress={() => {
                    dispatch(addToCart({
                        ...item,
                        qty: 1,
                    }));
                    setQty(1)
                }}
            >
                {
                    qty ?
                        <>
                            <Entypo
                                name='minus'
                                size={30}
                                color='white'
                                onPress={() => {
                                    dispatch(addToCart({
                                        ...item,
                                        qty: qty - 1,
                                    }));
                                    setQty(qty - 1)
                                }}
                            />
                            <Text
                                style={{ fontSize: 16, color: 'white', width: 25, textAlign: "center" }}
                            >{qty}</Text>
                            <Ionicons
                                name='ios-add'
                                size={28}
                                color='white'
                                onPress={() => {
                                    dispatch(addToCart({
                                        ...item,
                                        qty: qty + 1,
                                    }));
                                    setQty(qty + 1)

                                }}
                            />
                        </>
                        :
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 12,
                                fontWeight: '600'
                            }}
                        >ADD</Text>
                }
            </Pressable>
        </Pressable>
    );
};

export default ProductList;