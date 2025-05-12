import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const CompleteProfileScreen = ({ navigation }) => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState(null);
  const { registerEmail, registerPassword, roleId } = useLocalSearchParams();

  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    phoneNumber.trim() &&
    gender &&
    avatar;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Quyền truy cập bị từ chối",
            "Ứng dụng cần quyền truy cập thư viện ảnh để chọn ảnh đại diện"
          );
        }
      }
    })();
  }, []);

  const handleChooseAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image pick error:", error);
    }
  };

  const handleSubmit = async () => {
    const profileData = {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      genderId: gender,
      avatar,
      phoneNumber,
      id: 15,
      email: registerEmail,
      password: registerPassword,
      roleId: roleId,
      language: "vi",
    };

    console.log(profileData, "profileData");

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/register-information",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        Alert.alert("Lỗi", "Không thể gửi hồ sơ. Vui lòng thử lại.");
        return;
      }

      const result = await response.json();
      if (!result.result) {
        Toast.show({
          type: "error",
          text1: "Đăng ký thất bại, vui lòng thử lại",
        });
        return;
      }
      router.replace("/(modals)/login");
      Toast.show({
        type: "success",
        text1: "Đăng ký thành công! Vui lòng đăng nhập lại",
      });
      // router.replace("/(modals)/login");
    } catch (error) {
      console.error("Submit error:", error);
      Alert.alert("Lỗi mạng", "Vui lòng kiểm tra kết nối và thử lại.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Hoàn thiện hồ sơ</Text>

        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={handleChooseAvatar}
        >
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <Text style={styles.avatarPlaceholder}>Chọn ảnh đại diện</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Họ"
          value={lastName}
          onChangeText={setLastName}
        />

        <TextInput
          style={styles.input}
          placeholder="Tên"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <View style={styles.genderContainer}>
          {["Nam", "Nữ", "Khác"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.genderOption,
                gender === option && styles.genderOptionSelected,
              ]}
              onPress={() => setGender(option)}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === option && styles.genderTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.submitButton,
          !isFormValid && styles.submitButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!isFormValid}
      >
        <Text style={styles.submitText}>Tiếp tục</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default CompleteProfileScreen;

const RED = "#E53935";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 32,
    textAlign: "center",
    color: "#333",
  },
  avatarContainer: {
    alignSelf: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 100,
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  avatar: {
    width: 120,
    height: 120,
    resizeMode: "cover",
  },
  avatarPlaceholder: {
    color: "#888",
    textAlign: "center",
    fontSize: 14,
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  genderOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: RED,
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: "center",
  },
  genderOptionSelected: {
    backgroundColor: RED,
  },
  genderText: {
    fontSize: 16,
    color: RED,
  },
  genderTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: RED,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: "center",
    margin: 24,
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
