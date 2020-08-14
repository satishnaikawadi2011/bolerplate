import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import ProductOverviewScreen, { screenOptions } from '../screens/shop/ProductOverviewScreen';
import Colors from '../constants/Colors';
import { Platform, SafeAreaView, View, Button, Text } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import ProductDetailsScreen, { productDetailsScreenOptions } from '../screens/shop/ProductDetailsScreen';
import CartScreen, { cartScreenOptions } from '../screens/shop/CartScreen';
import OrderScreen, { ordersScreenOptions } from '../screens/shop/OrdersScreen';
import UserProductsScreen, { userProductsScreenOptions } from '../screens/user/UserProductsScreen';
import EditProductScreen, { editScreenOptions } from '../screens/user/EditProductScreen';
import AuthScreen, { authScreenOptions } from '../screens/user/AuthScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// TODO: particular screen options

// export const screenOptions = (navData) => {
// 	return {
// 		headerTitle : 'All Products',
// 		headerRight : () => (
// 			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
// 				<Item
// 					title="Cart"
// 					iconName={

// 							Platform.OS === 'android' ? 'md-cart' :
// 							'ios-cart'
// 					}
// 					onPress={() => {
// 						navData.navigation.navigate('Cart');
// 					}}
// 				/>
// 			</HeaderButtons>
// 		),

// 		headerLeft  : () => (
// 			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
// 				<Item
// 					title="Menu"
// 					iconName={

// 							Platform.OS === 'android' ? 'md-menu' :
// 							'ios-menu'
// 					}
// 					onPress={() => {
// 						navData.navigation.toggleDrawer();
// 					}}
// 				/>
// 			</HeaderButtons>
// 		)
// 	};
// };

// TODO: particular screen options

const defaltNavOptions = {
	headerStyle          : {
		backgroundColor :

				Platform.OS === 'android' ? Colors.primary :
				''
	},
	headerBackTitleStyle : {
		fontFamily : 'ubuntu'
	},
	headerTitleStyle     : {
		fontFamily : 'ubuntu-bold'
	},
	headerTintColor      :

			Platform.OS === 'android' ? 'white' :
			Colors.primary
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
	return (
		<ProductsStackNavigator.Navigator screenOptions={defaltNavOptions}>
			<ProductsStackNavigator.Screen
				name="ProductsOverview"
				component={ProductOverviewScreen}
				options={screenOptions}
			/>
			<ProductsStackNavigator.Screen
				name="ProductDetail"
				component={ProductDetailsScreen}
				options={productDetailsScreenOptions}
			/>
			<ProductsStackNavigator.Screen name="Cart" component={CartScreen} options={cartScreenOptions} />
		</ProductsStackNavigator.Navigator>
	);
};

// const OrdersStackNavigator = createStackNavigator();

// export const OrdersNavigator = () => {
// 	return (
// 		<OrdersStackNavigator.Navigator screenOptions={defaltNavOptions}>
// 			<OrdersStackNavigator.Screen name="Orders" component={OrderScreen} options={ordersScreenOptions} />
// 		</OrdersStackNavigator.Navigator>
// 	);
// };

// const AdminStackNavigator = createStackNavigator();

// export const AdminNavigator = () => {
// 	return (
// 		<AdminStackNavigator.Navigator screenOptions={defaltNavOptions}>
// 			<AdminStackNavigator.Screen
// 				name="UserProducts"
// 				component={UserProductsScreen}
// 				options={userProductsScreenOptions}
// 			/>
// 			<AdminStackNavigator.Screen name="EditProduct" component={EditProductScreen} options={editScreenOptions} />
// 		</AdminStackNavigator.Navigator>
// 	);
// };

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
	const dispatch = useDispatch();
	return (
		<ShopDrawerNavigator.Navigator
			drawerContent={(props) => {
				return (
					<View style={{ flex: 1, paddingTop: 30 }}>
						<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
							<DrawerItemList {...props} />
							{/* <View > */}
							<TouchableWithoutFeedback
								style={{ alignItems: 'center', flexDirection: 'row', marginTop: 10 }}
								onPress={() => {
									dispatch(logout());
									// props.navigation.navigate('Auth');
								}}
							>
								<AntDesign name="logout" size={24} color="black" style={{ marginLeft: 15 }} />
								<Text style={{ fontFamily: 'ubuntu-bold', marginLeft: 28 }}>Logout</Text>
							</TouchableWithoutFeedback>
						</SafeAreaView>
					</View>
				);
			}}
			drawerContentOptions={{
				activeTintColor : Colors.primary
			}}
		>
			<ShopDrawerNavigator.Screen
				name="Products"
				component={ProductsNavigator}
				options={{
					drawerIcon : (props) => (
						<Ionicons
							name={

									Platform.OS === 'android' ? 'md-cart' :
									'ios-cart'
							}
							color={props.color}
							size={23}
						/>
					)
				}}
			/>
			<ShopDrawerNavigator.Screen
				name="Orders"
				component={OrdersNavigator}
				options={{
					drawerIcon : (props) => (
						<Ionicons
							name={

									Platform.OS === 'android' ? 'md-list' :
									'ios-list'
							}
							color={props.color}
							size={23}
						/>
					)
				}}
			/>
			<ShopDrawerNavigator.Screen
				name="Admin"
				component={AdminNavigator}
				options={{
					drawerIcon : (props) => (
						<Ionicons
							name={

									Platform.OS === 'android' ? 'md-create' :
									'ios-create'
							}
							color={props.color}
							size={23}
						/>
					)
				}}
			/>
		</ShopDrawerNavigator.Navigator>
	);
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
	return (
		<AuthStackNavigator.Navigator screenOptions={defaltNavOptions}>
			<AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={authScreenOptions} />
		</AuthStackNavigator.Navigator>
	);
};

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export const App = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon : ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						iconName =
							focused ? 'ios-information-circle' :
							'ios-information-circle-outline';
					}
					else if (route.name === 'Settings') {
						iconName =
							focused ? 'ios-list-box' :
							'ios-list';
					}

					// You can return any component that you like here!
					return <Ionicons name={iconName} size={size} color={color} />;
				}
			})}
			tabBarOptions={tabBarOptions}
		>
			<Tab.Screen name="Home" component={HomeStack} />
			<Tab.Screen name="Settings" component={SettingsStack} />
		</Tab.Navigator>
	);
};

const tabBarOptions = {
	activeTintColor   : 'tomato',
	inactiveTintColor : 'gray'
};
