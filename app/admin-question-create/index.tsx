import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import axios from "axios";
import DropDownTeacherAdmin from "../common/DropDownTeacherAdmin";
import axiosInstance from "@/controller/admin/student/axios";
import { commonEnum } from "@/enum/keymap";
import Slider from "@react-native-community/slider";
import { useAuth } from "@/auth/ctx";

const AdminQuestionCreateScreen = () => {
  const router = useRouter();
  const [questionPrompt, setQuestionPrompt] = useState("");
  const [options, setOptions] = useState([{ option: "", isCorrect: false }]);
  const [answer, setAnswer] = useState("");
  const [teacher, setTeacher] = useState(null);
  const [teacherList, setTeacherList] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [typeId, setTypeId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isFormValid =
    questionPrompt.trim() && options.length > 1 && answer.trim() && teacher;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axiosInstance.get("/get-all-users");
        if (response.data) {
          const filteredData = response.data.data.filter(
            (item) => item.roleId === commonEnum.roleId.TEACHER
          );

          const formattedTeachers = filteredData.map((teacher) => ({
            label:
              teacher.firstName || teacher.lastName
                ? `${teacher.firstName ?? ""} ${teacher.lastName ?? ""}`.trim()
                : teacher.email,
            value: teacher.id.toString(),
            key: teacher.id.toString(),
          }));

          setTeacherList(formattedTeachers);
        }
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tải danh sách giáo viên.");
      }
    };
    fetchTeachers();
  }, []);

  const addOption = () => {
    if (options.length >= 4) {
      Alert.alert("Thông báo", "Chỉ được thêm tối đa 4 lựa chọn.");
      return;
    }
    setOptions([...options, { option: "", isCorrect: false }]);
  };

  const toggleCorrectOption = (index) => {
    const newOptions = options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setOptions(newOptions);
    setAnswer(newOptions[index].option);
  };

  const handleOptionChange = (text, index) => {
    const newOptions = [...options];
    newOptions[index].option = text;
    setOptions(newOptions);
  };

  const handleCreateQuestion = async () => {
    if (!isFormValid) {
      Alert.alert(
        "Lỗi",
        "Vui lòng điền đầy đủ thông tin câu hỏi và lựa chọn câu trả lời."
      );
      return;
    }

    setLoading(true);

    const questionData = {
      teacherId: teacher,
      questionPrompt,
      options,
      answer,
      typeId,
      level: selectedLevel,
    };
    try {
      const response = await axiosInstance.post(
        "/create-one-question",
        questionData
      );

      if (response.data.result) {
        Toast.show({ type: "success", text1: "Tạo câu hỏi thành công" });
        router.back();
      } else {
        Alert.alert(
          "Lỗi",
          response.data.messageVI || "Không thể tạo câu hỏi. Vui lòng thử lại."
        );
      }
    } catch (error) {
      console.error("Error creating question:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra trong quá trình tạo câu hỏi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Tạo câu hỏi mới</Text>

        {/* Câu hỏi */}
        <TextInput
          style={styles.input}
          placeholder="Câu hỏi"
          value={questionPrompt}
          onChangeText={setQuestionPrompt}
        />

        <View style={styles.dropdown}>
          <Text style={styles.label}>Chọn giáo viên:</Text>
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
        </View>

        {options.map((opt, index) => (
          <View key={index} style={styles.optionContainer}>
            <TextInput
              style={styles.optionInput}
              placeholder={`Lựa chọn ${index + 1}`}
              value={opt.option}
              onChangeText={(text) => handleOptionChange(text, index)}
            />
            <TouchableOpacity
              style={[
                styles.correctButton,
                opt.isCorrect && styles.correctButtonCorrect,
              ]}
              onPress={() => toggleCorrectOption(index)}
            >
              <Text style={styles.correctText}>
                {opt.isCorrect ? "Đúng" : "Sai"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={[
            styles.addOptionButton,
            options.length >= 4 && styles.addOptionButtonDisabled,
          ]}
          onPress={addOption}
          disabled={options.length >= 4}
        >
          <Text
            style={[
              styles.addOptionText,
              options.length >= 4 && styles.addOptionTextDisabled,
            ]}
          >
            Thêm lựa chọn
          </Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            Cấp độ câu hỏi: {selectedLevel}
          </Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={1}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#007AFF"
            value={selectedLevel}
            onValueChange={setSelectedLevel}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.submitButton,
          !isFormValid && styles.submitButtonDisabled,
        ]}
        onPress={handleCreateQuestion}
        disabled={!isFormValid || loading}
      >
        <Text style={styles.submitText}>
          {loading ? "Đang tạo câu hỏi..." : "Tạo câu hỏi"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  addOptionButtonDisabled: {
    backgroundColor: "#ccc",
  },
  addOptionTextDisabled: {
    color: "#888",
  },

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
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  optionInput: {
    flex: 1,
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  correctButton: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#E53935",
    borderRadius: 12,
  },
  correctButtonCorrect: {
    backgroundColor: "#4CAF50",
  },

  correctText: {
    color: "#fff",
  },
  addOptionButton: {
    marginTop: 16,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: "center",
  },
  addOptionText: {
    color: "#fff",
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
  dropdown: {
    marginBottom: 16,
    zIndex: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default AdminQuestionCreateScreen;
