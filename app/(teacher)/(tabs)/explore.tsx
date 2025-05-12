import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import axiosInstance from "@/controller/admin/student/axios";
import SearchCustomer from "@/components/search-customer/SearchCustomer";
import { FetchingDataLoader } from "@/components/loading/LoadingFetch";
import StudentHeader from "@/components/customer-list/StudentHeader";
import { commonEnum } from "@/enum/keymap";
import SearchBar from "@/components/Search/SearchBar";
import searchIcon from "@/assets/icons/search.png";
import filterIcon from "@/assets/icons/filter.png";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchAllStudents = async () => {
      setLoading(true);

      try {
        const response = await axiosInstance.get("/get-all-users");
        console.log(response.data.data);
        if (response?.data?.data) {
          const studentList = response.data.data.filter(
            (user: any) => user.roleId === commonEnum.roleId.STUDENT
          );
          setStudents(studentList);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStudents();
  }, []);

  const renderItem = ({ item }: any) => {
    const name = `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim();
    const avatar =
      item.image ||
      "https://ui-avatars.com/api/?name=" + encodeURIComponent(name);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/student-detail/${item.id}`)}
      >
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.name}>{name || "Không rõ tên"}</Text>
          <Text style={styles.email}>{item.email || "Không có email"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, marginTop: Platform.OS === "ios" ? 50 : 70 }}>
      <Stack.Screen
        options={{
          header: () => <StudentHeader />, // header vẫn giữ nguyên
        }}
      />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBarContainer}>
            <SearchBar
              color="white"
              placeholder={"Tìm kiếm học sinh"}
              icon={searchIcon}
              setValue={setValue}
              value={value}
              keyboardType="default"
              handleEnterPress={() => {}}
            />
          </View>
          <View style={styles.filterContainer}>
            <Image source={filterIcon} style={styles.iconFilter} />
          </View>
        </View>

        {loading ? (
          <FetchingDataLoader />
        ) : (
          <FlatList
            data={students}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20, paddingTop: 25 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Student;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "quicksand-bold",
  },
  addContainer: {
    padding: 8,
    gap: 10,
    borderRadius: 32,
    backgroundColor: "#007AFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarContainer: {
    flex: 0.95,
  },
  filterContainer: {
    height: 48,
    width: 48,
    borderRadius: 12,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  iconFilter: {
    width: 24,
    height: 24,
  },
});
