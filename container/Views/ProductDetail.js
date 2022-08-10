import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartReducer';
import { currency_symbol } from '../../utils/globals';

const ProductDetail = ({
    route,
    navigation
}) => {

    const dispatch = useDispatch()
    const { dataCart } = useSelector((state) => state.cart)

    const { width } = useWindowDimensions();
    const { product_detail } = route.params

    const [qty, setQty] = useState(product_detail?.qty || 0);

    const source = {
        html: ` <div style='margin:10px' >
        <img src=${product_detail.Image} alt="Italian Trulli" style='margin:20px;' />

      <p style='font-size:20px; margin-top:10px'>
        ${product_detail.name}
      </p>
      <p style='font-size:14px; margin-top:2px;'>
       Manufacture By ${product_detail.manufacturer}
      </p>
      <p style='font-size:20px; margin-top:2px'>
      ${product_detail.description}
    </p>
    <p style='font-size:20px; margin-top:2px'>
    ${product_detail.price} ${currency_symbol}
  </p>
    </div>`,
    };

    const addQty = () => {
        dispatch(addToCart({
            ...product_detail,
            qty: qty + 1,
        }));
        setQty(qty + 1)
    };

    const removeQty = () => {
        dispatch(addToCart({
            ...product_detail,
            qty: qty - 1,
        }));
        setQty(qty - 1)
    };


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <Ionicons
                name='arrow-back-circle'
                size={40}
                color='black'
                style={{ marginTop: 40, marginHorizontal: 10 }}
                onPress={() => {
                    navigation.goBack()
                }}
            />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5
            }}>
                <Text
                    style={{ fontSize: 30, color: 'black', marginHorizontal: 15 }}
                >Product Detail</Text>
                <Text
                    style={{
                        borderColor: 'green',
                        borderWidth: 1,
                        borderRadius: 50,
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        fontSize: 12,
                        position: 'absolute',
                        right: 20,
                        top: 10,
                        color: 'green',
                        display: dataCart?.length ? 'flex' : 'none'
                    }}
                    onPress={() => navigation.navigate('Basket')}
                >View Cart</Text>
            </View>
            <RenderHtml
                contentWidth={width}
                source={source}
            />
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
                onPress={() => setQty(1)}
            >
                {
                    qty ?
                        <>
                            <Entypo
                                name='minus'
                                size={30}
                                color='white'
                                onPress={removeQty}
                            />
                            <Text
                                style={{ fontSize: 16, color: 'white', width: 25, textAlign: "center" }}
                            >{qty}</Text>
                            <Ionicons
                                name='ios-add'
                                size={28}
                                color='white'
                                onPress={addQty}
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
        </View>
    )
}

export default ProductDetail;