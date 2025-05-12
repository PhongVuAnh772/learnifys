import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import DropDownTeacherAdmin from "../common/DropDownTeacherAdmin";
import axiosInstance from "@/controller/admin/student/axios";
import Toast from "react-native-toast-message";
import { commonEnum } from "@/enum/keymap";
import Slider from "@react-native-community/slider";

const AdminQuestionEditScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

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
    const fetchData = async () => {
      try {
        const [resQuestion, resTeachers] = await Promise.all([
          axiosInstance.get("/get-one-question-by-id", {
            params: { questionId: id },
          }),
          axiosInstance.get("/get-all-users"),
        ]);

        const data = resQuestion.data.data;
        const parsedOptions = data.options.map((opt) => JSON.parse(opt));

        setQuestionPrompt(data.questionPrompt);
        setOptions(parsedOptions);
        setAnswer(data.answer);
        setTeacher(data.teacherId.toString());
        setSelectedLevel(data.level || 1);
        setTypeId(data.typeId || 1);

        if (resTeachers.data) {
          const filtered = resTeachers.data.data.filter(
            (t) => t.roleId === commonEnum.roleId.TEACHER
          );

          const formattedTeachers = filtered.map((teacher) => ({
            label:
              teacher.firstName || teacher.lastName
                ? `${teacher.firstName ?? ""} ${teacher.lastName ?? ""}`.trim()
                : teacher.email,
            value: teacher.id.toString(),
            key: teacher.id.toString(),
          }));
          setTeacherList(formattedTeachers);
        }
      } catch (err) {
        Alert.alert("Lỗi", "Không thể tải dữ liệu câu hỏi hoặc giáo viên.");
      }
    };

    if (id) fetchData();
  }, [id]);

  const addOption = () => {
    if (options.length >= 4) {
      Alert.alert("Thông báo", "Chỉ được thêm tối đa 4 lựa chọn.");
      return;
    }
    setOptions([...options, { option: "", isCorrect: false }]);
  };

  const toggleCorrectOption = (index: number) => {
    const newOptions = options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setOptions(newOptions);
    setAnswer(newOptions[index].option);
  };

  const handleOptionChange = (text: string, index: number) => {
    const newOptions = [...options];
    newOptions[index].option = text;
    setOptions(newOptions);
  };

  const handleUpdateQuestion = async () => {
    if (!isFormValid) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const questionData = {
      questionSelectedId: Number(id),
      teacherId: teacher,
      questionPrompt,
      options: options.map((o) => JSON.stringify(o)),
      answer,
      typeId,
      level: selectedLevel,
    };

    try {
      setLoading(true);
      const response = await axiosInstance.put(
        "/update-one-question",
        questionData
      );
      if (response.data.result) {
        Toast.show({ type: "success", text1: "Cập nhật thành công" });
        router.back();
      } else {
        Alert.alert("Lỗi", response.data.messageVI || "Cập nhật thất bại");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Lỗi", "Không thể cập nhật câu hỏi.");
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
        <Text style={styles.title}>Chỉnh sửa câu hỏi</Text>

        <TextInput
          style={styles.input}
          placeholder="Câu hỏi"
          value={questionPrompt}
          onChangeText={setQuestionPrompt}
        />

        <View style={styles.dropdown}>
          <Text style={styles.label}>Giáo viên:</Text>
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

        <Text style={{ fontSize: 16, marginBottom: 8, marginTop: 25 }}>
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
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.submitButton,
          !isFormValid && styles.submitButtonDisabled,
        ]}
        onPress={handleUpdateQuestion}
        disabled={!isFormValid || loading}
      >
        <Text style={styles.submitText}>
          {loading ? "Đang cập nhật..." : "Cập nhật câu hỏi"}
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

export default AdminQuestionEditScreen;
