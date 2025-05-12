import React, { useEffect, useState } from "react";
import { Modal, Portal, Text, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import axiosInstance from "@/controller/admin/student/axios";
import DropDownTeacherAdmin from "@/app/common/DropDownTeacherAdmin";
import { commonEnum } from "@/enum/keymap";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "@/helpers/ToastHelpers";

const ModalGetInformationChildOfParents = () => {
  const [visible, setVisible] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null
  );
  const [openDropdown, setOpenDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    width: "90%",
    alignSelf: "center",
  };

  useEffect(() => {
    fetchRelationship();
  }, []);

  const fetchRelationship = async () => {
    try {
      const res = await axiosInstance.get(
        "/get-list-data-relationship-account"
      );
      if (!res.data?.data || res.data.data.length === 0) {
        const users = await axiosInstance.get("/get-all-users");
        console.log("users", users.data);
        const studentList = users.data.data.filter(
          (u: any) => u.roleId === commonEnum.roleId.STUDENT
        );
        setStudents(
          studentList.map((s: any) => ({
            label:
              s.firstName || s.lastName
                ? `${s.firstName ?? ""} ${s.lastName ?? ""}`.trim()
                : s.email,
            value: s.id,
          }))
        );
      } else {
        setVisible(false); // Already has relationships
      }
    } catch (err) {
      console.error("Error fetching relationships or users", err);
    }
  };

  const handleCreateRelationship = async () => {
    if (!selectedStudentId || !userInfo?.id) return;
    try {
      const res = await axiosInstance.post("/create-relationship-account", {
        studentId: selectedStudentId,
        parentsId: userInfo.id,
      });
      if (res.data?.result) {
        hideModal();
        showToast({
          msg: "Thêm liên hệ thành công",
          type: "success",
        });
      }
    } catch (err) {
      console.error("Failed to create relationship", err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const user = await AsyncStorage.getItem("userData");
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserInfo(parsedUser.data);
      }
      fetchRelationship();
    };
    fetchData();
  }, []);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle as any}
      >
        <Text style={styles.title}>Chọn học sinh để tạo liên hệ:</Text>
        <View style={{ zIndex: 2000, marginBottom: 20 }}>
          <DropDownTeacherAdmin
            opening={openDropdown}
            onOpen={setOpenDropdown}
            data={students}
            value={selectedStudentId}
            setValue={setSelectedStudentId}
            placeholder="Chọn học sinh"
            useI18n={false}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleCreateRelationship}
          disabled={!selectedStudentId}
        >
          Xác nhận liên hệ
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    fontWeight: "600",
    color: "#000",
  },
});

export default ModalGetInformationChildOfParents;
