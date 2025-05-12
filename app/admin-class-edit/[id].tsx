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
import { useRouter, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import axiosInstance from "@/controller/admin/student/axios";
import { commonEnum } from "@/enum/keymap";
import LevelSelector from "@/components/LevelSlider";
import DropDownTeacherAdmin from "../common/DropDownTeacherAdmin";

const AdminClassEditScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState(null);
  const [teacherList, setTeacherList] = useState([]);
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [open, setOpen] = useState(false);
  const isFormValid = name.trim() && teacher && description.trim();

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axiosInstance.get(
          `/get-infor-class?classId=${id}`
        );
        console.log(response.data, "classData");
        if (response.data) {
          const classData = response.data.data;

          setName(classData.name);
          setTeacher(classData.teacherId?.toString());
          setDescription(classData.description);
          setSelectedLevel(classData.level);
          setAvatar(classData.avatar);

          const teacherResponse = await axiosInstance.get("/get-all-users");
          if (teacherResponse.data) {
            const formattedTeachers = teacherResponse.data.data
              .filter((item) => item.roleId === commonEnum.roleId.TEACHER)
              .map((teacher) => ({
                label:
                  teacher.firstName || teacher.lastName
                    ? `${teacher.firstName ?? ""} ${
                        teacher.lastName ?? ""
                      }`.trim()
                    : teacher.email,
                value: teacher.id.toString(),
                key: teacher.id.toString(),
              }));
            setTeacherList(formattedTeachers);
          }
        }
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tải dữ liệu lớp học.");
      }
    };

    fetchClassData();
  }, [id]);

  const handleChooseImage = async () => {
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

  const handleUpdateClass = async () => {
    if (!isFormValid) {
      Alert.alert(
        "Lỗi",
        "Vui lòng điền đầy đủ thông tin lớp và chọn ảnh đại diện."
      );
      return;
    }

    // setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("level", selectedLevel.toString());
    formData.append("teacherId", teacher);
    formData.append("classId", id.toString());

    console.log(teacher, "teacher");

    if (avatar) {
      try {
        if (avatar.startsWith("http")) {
          formData.append("avatarUrl", avatar);
        } else {
          const response = await fetch(avatar);
          const blob = await response.blob();
          formData.append(
            "image",
            blob,
            avatar.split("/").pop() || "image.jpg"
          );
        }
      } catch (error) {
        Alert.alert("Lỗi", "Không thể chuyển đổi ảnh thành Blob.");
        setLoading(false);
        return;
      }
    }

    // try {
    //   const response = await axiosInstance.put(`/create-new-class`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

    //   if (response.data.result) {
    //     Toast.show({ type: "success", text1: "Cập nhật lớp học thành công" });
    //     router.back();
    //   } else {
    //     Alert.alert(
    //       "Lỗi",
    //       response.data.messageVI || "Không thể cập nhật lớp. Vui lòng thử lại."
    //     );
    //   }
    // } catch (error) {
    //   Alert.alert("Lỗi", "Có lỗi khi cập nhật lớp. Vui lòng thử lại.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Chỉnh sửa lớp học</Text>

        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={handleChooseImage}
        >
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <Text style={styles.avatarPlaceholder}>Chọn ảnh đại diện</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Tên lớp học"
          value={name}
          onChangeText={setName}
        />

        <DropDownTeacherAdmin
          data={teacherList}
          value={teacher}
          setValue={setTeacher}
          placeholder="Chọn giáo viên"
          opening={open}
          onOpen={setOpen}
          loading={loading}
          setLoading={setLoading}
          useI18n={false}
        />

        <View style={{ marginTop: 15 }}>
          <TextInput
            style={styles.input}
            placeholder="Mô tả lớp học"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <LevelSelector
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.submitButton,
          !isFormValid && styles.submitButtonDisabled,
        ]}
        onPress={handleUpdateClass}
        disabled={!isFormValid || loading}
      >
        <Text style={styles.submitText}>
          {loading ? "Đang cập nhật..." : "Cập nhật lớp"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

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
  submitButton: {
    backgroundColor: "#E53935",
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

export default AdminClassEditScreen;
