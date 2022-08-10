import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import ProductsArray from '../../utils/ProductsArray.json';
import ProductList from '../components/ProductList';

const Home = ({
    navigation
}) => {
    const itemsLoadPerPage = 10

    const [productList, setProductList] = useState(ProductsArray.data)
    const [page, setPage] = useState(0)
    const [isLoadMore, setIsLoadMore] = useState(false)
    const { dataCart } = useSelector((state) => state.cart)

    const pagination = (currentPageIndex, lastPageIndex) => {
        const productList = ProductsArray.data.slice(currentPageIndex, lastPageIndex)
        return productList;
    }

    useEffect(() => {
        setPage(0)
        const productList = pagination(0, itemsLoadPerPage)
        setProductList(productList)
    }, [])

    const onLoadMore = () => {
        setIsLoadMore(true)
        let currentPageIndex = itemsLoadPerPage * (page + 1)
        let lastPageIndex = currentPageIndex + itemsLoadPerPage;
        const productList = pagination(currentPageIndex, lastPageIndex)
        setTimeout(() => {
            setIsLoadMore(false)
            if (productList.length) {
                setPage((page) => page + 1)
                setProductList((prev) => [...prev, ...productList])
            }
        }, 1500)
    }

    const _renderProducts = ({ item }) => {
        return (
            <ProductList item={item} />
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
        }} >
            <Text
                style={{ fontSize: 30, color: 'black', marginHorizontal: 15, marginTop: 40 }}
            >Groceries</Text>
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
                    top: 48,
                    color: 'green',
                    display: dataCart?.length ? 'flex' : 'none'
                }}
                onPress={() => navigation.navigate('Basket')}
            >View Cart</Text>
            < FlatList
                data={productList}
                renderItem={_renderProducts}
                ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
                onEndReached={onLoadMore}
                ListFooterComponent={() => {
                    return (
                        <ActivityIndicator
                            animating={isLoadMore}
                            size={30}
                            color='green'
                            style={{ paddingVertical: 20 }}
                        />
                    )
                }}
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
            />
        </View>
    )
}

export default Home;