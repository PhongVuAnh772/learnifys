import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AdminSystemSettingsScreen() {
  const [appName, setAppName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSaveSettings = () => {
    if (!appName || !supportEmail || !contactNumber) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin hệ thống.");
      return;
    }

    // Call API to save settings here (axios.post)
    Alert.alert("Thành công", "Đã lưu cấu hình hệ thống.");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          Cài đặt hệ thống
        </Text>

        <Text style={styles.label}>Tên ứng dụng</Text>
        <TextInput
          placeholder="Nhập tên ứng dụng"
          value={appName}
          onChangeText={setAppName}
          style={styles.input}
        />

        <Text style={styles.label}>Email hỗ trợ</Text>
        <TextInput
          placeholder="support@example.com"
          value={supportEmail}
          onChangeText={setSupportEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        <Text style={styles.label}>Số điện thoại liên hệ</Text>
        <TextInput
          placeholder="0123456789"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Chế độ bảo trì</Text>
        <TouchableOpacity
          onPress={() => setMaintenanceMode(!maintenanceMode)}
          style={[styles.toggleButton, maintenanceMode && styles.toggleActive]}
        >
          <Text style={{ color: "#fff" }}>
            {maintenanceMode ? "Đang bảo trì" : "Đang hoạt động"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity onPress={handleSaveSettings} style={styles.saveButton}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Lưu cài đặt</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = {
  label: {
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  toggleButton: {
    backgroundColor: "#999",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  toggleActive: {
    backgroundColor: "#007AFF",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 16,
    borderRadius: 8,
    alignItems: "center" as const,
    width: "92%" as const,
    alignSelf: "center" as const,
  },
};
