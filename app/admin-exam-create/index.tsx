import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axiosInstance from "@/controller/admin/student/axios";
import { commonEnum } from "@/enum/keymap";
import DropDownTeacherAdmin from "../common/DropDownTeacherAdmin";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useAuth } from "@/auth/ctx";

export default function AdminExamCreateScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState("60");
  const [dateFinish, setDateFinish] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [classId, setClassId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [typeId, setTypeId] = useState(1);
  const [statusId, setStatusId] = useState(1);
  const [listQuestionId, setListQuestionId] = useState<number[]>([]);
  const [openClassDropdown, setOpenClassDropdown] = useState(false);
  const [openTeacherDropdown, setOpenTeacherDropdown] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const isFormValid =
    name &&
    description &&
    classId &&
    teacherId &&
    dateFinish &&
    typeId &&
    statusId &&
    timeLimit &&
    listQuestionId.length > 0;

  useEffect(() => {
    loadInitialData();
  }, []);

  const fetchClassesForTeacher = async () => {
    try {
      const res = await axiosInstance.get("/get-list-classes-by-teacher");
      if (res.data?.result) {
        setClasses(
          res.data.data.map((c: any) => ({
            label: c.name,
            value: c.id,
          }))
        );
      }
    } catch (err) {
      Alert.alert("Lỗi", "Không thể kết nối đến server");
    }
  };

  const loadInitialData = async () => {
    try {
      const questionRes = await axiosInstance.get("/get-all-question");
      if (questionRes.data?.result) setQuestions(questionRes.data.data);

      if (user?.roleId === commonEnum.roleId.TEACHER) {
        setTeacherId(user.id);
        await fetchClassesForTeacher();
      } else {
        const [classRes, teacherRes] = await Promise.all([
          axiosInstance.get("/get-all-class"),
          axiosInstance.get("/get-all-users"),
        ]);

        if (classRes.data?.result) {
          setClasses(
            classRes.data.data.map((c: any) => ({
              label: c.name,
              value: c.id,
            }))
          );
        }

        if (teacherRes.data?.data) {
          const teacherList = teacherRes.data.data
            .filter((t: any) => t.roleId === commonEnum.roleId.TEACHER)
            .map((t: any) => ({
              label:
                t.firstName || t.lastName
                  ? `${t.firstName ?? ""} ${t.lastName ?? ""}`.trim()
                  : t.email,
              value: t.id,
            }));
          setTeachers(teacherList);
        }
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải dữ liệu cần thiết.");
    }
  };

  const toggleQuestion = (id: number) => {
    setListQuestionId((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const handleDateConfirm = (date: Date) => {
    setDateFinish(moment(date).format("YYYY-MM-DD"));
    setDatePickerVisible(false);
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      Alert.alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/create-new-exam-by-admin", {
        name,
        description,
        classId,
        teacherId,
        dateFinish,
        typeId,
        statusId,
        timeLimit: Number(timeLimit),
        listQuestionId,
      });

      if (response.data.result) {
        Alert.alert("Thành công", "Tạo bài thi thành công");
        router.back();
      } else {
        Alert.alert("Lỗi", response.data.messageVI || "Tạo bài thi thất bại");
      }
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
            Tạo bài thi
          </Text>

          <TextInput
            placeholder="Tên bài thi"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Mô tả"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <TextInput
            placeholder="Thời gian làm bài (phút)"
            value={timeLimit}
            onChangeText={setTimeLimit}
            keyboardType="numeric"
            style={styles.input}
          />

          <TouchableOpacity
            onPress={() => setDatePickerVisible(true)}
            style={[styles.input, styles.datePicker]}
          >
            <Text style={{ color: dateFinish ? "#000" : "#999" }}>
              {dateFinish || "Chọn ngày kết thúc"}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setDatePickerVisible(false)}
          />

          <View style={{ zIndex: 3000 }}>
            <DropDownTeacherAdmin
              opening={openTeacherDropdown}
              onOpen={setOpenTeacherDropdown}
              data={teachers}
              value={teacherId}
              setValue={setTeacherId}
              placeholder="Chọn giáo viên"
              useI18n={false}
              disabled={user?.roleId === commonEnum.roleId.TEACHER}
            />
          </View>

          <View style={{ zIndex: 2000, marginTop: 20 }}>
            <DropDownTeacherAdmin
              opening={openClassDropdown}
              onOpen={setOpenClassDropdown}
              data={classes}
              value={classId}
              setValue={setClassId}
              placeholder="Chọn lớp"
              useI18n={false}
            />
          </View>

          <Text style={{ fontWeight: "bold", marginTop: 20 }}>
            Chọn câu hỏi ({listQuestionId.length} đã chọn):
          </Text>

          {questions.map((q: any) => (
            <TouchableOpacity
              key={q.id}
              onPress={() => toggleQuestion(q.id)}
              style={{
                borderWidth: 1,
                borderColor: listQuestionId.includes(q.id) ? "#007AFF" : "#ccc",
                padding: 10,
                marginVertical: 4,
                borderRadius: 8,
                backgroundColor: listQuestionId.includes(q.id)
                  ? "#e6f0ff"
                  : "#f9f9f9",
              }}
            >
              <Text>{q.questionPrompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={{
            backgroundColor: isFormValid ? "#007AFF" : "#ccc",
            padding: 16,
            borderRadius: 8,
            alignItems: "center",
            margin: 16,
          }}
          onPress={handleSubmit}
          disabled={!isFormValid || loading}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {loading ? "Đang tạo..." : "Tạo bài thi"}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  datePicker: {
    height: 48,
  },
};
