import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import SearchCustomer from "../search-customer/SearchCustomer";
import CustomerListContent from "./content/CustomerListContent";
import { getCustomer } from "@/services/customer.service";
import { FetchingDataLoader } from "../loading/LoadingFetch";

const CustomerList = () => {
  const [customers, setCustomers] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const tokens = "" as string;
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = (await getCustomer(tokens, 20)) as any;
      if (response && response?.listData) {
        setCustomers(response.listData);
        setLoading(false);
      } else {
        setCustomers([]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <SearchCustomer />

      {loading ? (
        <FetchingDataLoader />
      ) : (
        <CustomerListContent customer={customers} />
      )}
    </View>
  );
};

export default CustomerList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
