import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchCustomer from "../search-customer/SearchCustomer";
import OrderListContent from "./content/CustomerListContent";

const OrderList = () => {
  return (
    <View style={styles.container}>
      <SearchCustomer />
      <OrderListContent />
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  
});
