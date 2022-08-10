import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../store/cartReducer';
import { currency_symbol, discount_on_first, discount_on_second } from '../../utils/globals';
import ProductList from '../components/ProductList';

const Basket = ({
    navigation
}) => {
    const dispatch = useDispatch();

    const { dataCart } = useSelector((state) => state.cart)
    const [cartAmount, setCartAmount] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (dataCart.length) {
            let cart_amount = 0;
            let discount = 0;

            for (const item of dataCart) {
                cart_amount += item.qty * item.price
            }
            if (cart_amount >= 80) {
                if (cart_amount >= 100) {
                    discount = (cart_amount * discount_on_second) / 100
                } else {
                    discount = (cart_amount * discount_on_first) / 100
                }
            }
            let total = (cart_amount - discount).toFixed(0)
            setCartAmount(cart_amount.toFixed(0))
            setDiscount(discount.toFixed(0))
            setTotal(total)
        } else {
            setCartAmount(0)
            setDiscount(0)
            setTotal(0)
        }
    }, [dataCart])

    const _renderProducts = ({ item }) => {
        return (
            <ProductList item={item} />
        )
    }

    const _renderFooter = () => {
        return (
            <View style={{
                marginTop: 10,
                marginHorizontal: 15,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
                display: dataCart?.length ? 'flex' : 'none'
            }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text style={{ fontSize: 16, color: 'black' }} >Cart Price:</Text>
                    <Text style={{ fontSize: 14, color: 'black' }} >{cartAmount} {currency_symbol}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }} >
                    <Text style={{ fontSize: 16, color: 'black' }} >Discount Price:</Text>
                    <Text style={{ fontSize: 14, color: 'green', }} >{discount} {currency_symbol}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }} >
                    <Text style={{ fontSize: 16, color: 'black' }} >Total Price:</Text>
                    <Text style={{ fontSize: 14, color: 'black', }} >{total} {currency_symbol}</Text>
                </View>
            </View>
        )
    }

    const onPurchase = () => {
        dispatch(clearCart())
        navigation.replace('Home')
        Alert.alert('', `Successfully purchased item for ${total} ${currency_symbol}`,)
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
        }} >
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
                >My Basket</Text>
                <Text
                    style={{
                        borderColor: 'green',
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        fontSize: 12,
                        position: 'absolute',
                        right: 20,
                        color: 'green'
                    }}
                    onPress={() => {
                        onPurchase()
                    }}
                >Purchase</Text>
            </View>
            <View style={{
                marginHorizontal: 15
            }} >
                <Text style={{ fontSize: 12, marginTop: 5 }} >On 80 {currency_symbol} or more  {discount_on_first}% discount</Text>
                <Text style={{ fontSize: 12, marginTop: 2 }}  >On 100 {currency_symbol} or more {discount_on_second}% discount</Text>
            </View>
            < FlatList
                data={dataCart}
                renderItem={_renderProducts}
                ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
                numColumns={2}
                contentContainerStyle={{
                    paddingBottom: 20
                }}
                columnWrapperStyle={{
                    marginTop: 10,
                    justifyContent: 'space-between',
                    marginHorizontal: 15
                }}
                style={{ marginTop: 5 }}
                ListFooterComponent={_renderFooter}
            />
        </View>
    )
}

export default Basket;