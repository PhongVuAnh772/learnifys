import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchAllUsers,
  createNewUserByAdmin,
  updateOneUserByAdmin,
  deleteUserById,
  User,
} from "@/controller/admin/student/slice";

const AdminUserScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector(
    (state: RootState) => state.admin
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roleId, setRoleId] = useState("STUDENT");
  const [genderId, setGenderId] = useState("M");

  const [editing, setEditing] = useState<any | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchAllUsers());

    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.log("Error fetching user data from AsyncStorage:", error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleSave = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !genderId ||
      !phoneNumber
    ) {
      return Alert.alert("Vui lòng điền đầy đủ thông tin");
    }

    const payload = {
      firstName,
      lastName,
      email,
      password,
      genderId,
      phoneNumber,
      roleId,
    };

    try {
      if (editing) {
        await dispatch(updateOneUserByAdmin({ id: editing.id, data: payload }));
        setEditing(null);
      } else {
        await dispatch(createNewUserByAdmin(payload));
      }

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setRoleId("STUDENT");
      setGenderId("M");
    } catch (error) {
      console.log("Error submitting user:", error);
    }
  };

  const handleEdit = (user: User) => {
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setEmail(user.email || "");
    setPhoneNumber(user.phoneNumber || "");
    setGenderId(user.genderId || "M");
    setRoleId(user.roleId || "STUDENT");
    setEditing(user);
  };

  const handleDelete = (id: number) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa người dùng này?", [
      { text: "Hủy" },
      {
        text: "Xóa",
        onPress: () => dispatch(deleteUserById(id)),
        style: "destructive",
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Quản lý người dùng</Text>

        {userData && (
          <Text style={styles.userInfo}>
            Xin chào, {userData.firstName} {userData.lastName}
          </Text>
        )}

        <TextInput
          placeholder="Họ"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Tên"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Số điện thoại"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Giới tính (M/F)"
          value={genderId}
          onChangeText={setGenderId}
          style={styles.input}
        />
        <TextInput
          placeholder="Vai trò (ADMIN, TEACHER, STUDENT, PARENTS)"
          value={roleId}
          onChangeText={setRoleId}
          style={styles.input}
        />

        <Button title={editing ? "Cập nhật" : "Thêm"} onPress={handleSave} />

        {status === "loading" ? (
          <Text>Đang tải...</Text>
        ) : error ? (
          // <Text style={styles.errorText}>{error}</Text>
          <></>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.email}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>
                  {item.firstName} {item.lastName}
                </Text>
                <View style={styles.actions}>
                  <Button title="Sửa" onPress={() => handleEdit(item)} />
                  <Button
                    title="Xóa"
                    onPress={() => handleDelete(item.id)}
                    color="red"
                  />
                </View>
              </View>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminUserScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 20,
    marginTop: 15,
    backgroundColor: "red",
  },
  actions: { flexDirection: "row", gap: 10 },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
    color: "green",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
});
