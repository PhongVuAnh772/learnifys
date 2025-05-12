import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axiosInstance from "@/controller/admin/student/axios";
import DropDownTeacherAdmin from "../common/DropDownTeacherAdmin";
import { commonEnum } from "@/enum/keymap";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from "dayjs";

export default function AdminExamEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState("60");
  const [dateFinish, setDateFinish] = useState("");
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
  const [showDatePicker, setShowDatePicker] = useState(false);

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
    if (id) {
      loadInitialData(id);
    }
  }, [id]);

  const loadInitialData = async (examId: string | string[]) => {
    try {
      const [examRes, classRes, teacherRes, questionRes] = await Promise.all([
        axiosInstance.get("/get-infor-exam", { params: { examId } }),
        axiosInstance.get("/get-all-class"),
        axiosInstance.get("/get-all-users"),
        axiosInstance.get("/get-all-question"),
      ]);

      if (examRes.data?.result) {
        const exam = examRes.data.data;
        setName(exam.name);
        setDescription(exam.description);
        setTimeLimit(exam.timeLimit);
        setDateFinish(exam.dateFinish);
        setClassId(exam.classId);
        setTeacherId(exam.teacherId);
        setTypeId(Number(exam.typeId));
        setStatusId(Number(exam.statusId));
        const defaultQuestions = (exam.questionsOfExamData || []).map(
          (q: any) => q.id
        );
        setListQuestionId(defaultQuestions);
      }

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

      if (questionRes.data?.result) {
        setQuestions(questionRes.data.data);
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestion = (id: number) => {
    setListQuestionId((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.put("/update-exam-by-admin", {
        id: Number(id),
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
        Alert.alert("Thành công", "Cập nhật bài thi thành công");
        router.back();
      } else {
        Alert.alert("Lỗi", response.data.messageVI || "Cập nhật thất bại");
      }
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Có lỗi xảy ra");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          Chỉnh sửa bài thi
        </Text>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
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
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                placeholder="Ngày kết thúc"
                value={dateFinish}
                editable={false}
                style={styles.input}
              />
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={showDatePicker}
              mode="date"
              onConfirm={(date) => {
                setShowDatePicker(false);
                setDateFinish(dayjs(date).format("YYYY-MM-DD"));
              }}
              onCancel={() => setShowDatePicker(false)}
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

            {questions.map((q: any) => {
              const isSelected = listQuestionId.includes(q.id);
              return (
                <TouchableOpacity
                  key={q.id}
                  onPress={() => toggleQuestion(q.id)}
                  style={{
                    borderWidth: 1,
                    borderColor: isSelected ? "#007AFF" : "#ccc",
                    padding: 10,
                    marginVertical: 4,
                    borderRadius: 8,
                    backgroundColor: isSelected ? "#e6f0ff" : "#f9f9f9",
                  }}
                >
                  <Text style={{ fontWeight: isSelected ? "bold" : "normal" }}>
                    {q.questionPrompt}
                  </Text>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={{
                backgroundColor: isFormValid ? "#007AFF" : "#ccc",
                padding: 16,
                borderRadius: 8,
                alignItems: "center",
                marginTop: 24,
              }}
              onPress={handleUpdate}
              disabled={!isFormValid || loading}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {loading ? "Đang cập nhật..." : "Cập nhật bài thi"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
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
};
