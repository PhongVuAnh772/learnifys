import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function SearchClassScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên lớp học để tìm kiếm.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://your-api.com/api/search-class-by-name?name=${searchQuery}`,
        {
          headers: {
            Authorization: "Bearer your_token_here",
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        if (data.length === 0) {
          Alert.alert("Không tìm thấy", "Không có lớp học nào phù hợp.");
        } else {
          setClasses(data);
        }
      } else {
        throw new Error(data.message || "Không thể tìm lớp học.");
      }
    } catch (err: any) {
      Alert.alert("Lỗi", err.message || "Có lỗi xảy ra khi tìm lớp học.");
    } finally {
      setLoading(false);
    }
  };

  const handleClassPress = (classId: string) => {
    router.push(`/classes/${classId}/detail`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm lớp học"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Tìm kiếm</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <FlatList
          data={classes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.classItem}
              onPress={() => handleClassPress(item.id)}
            >
              <Text style={styles.className}>{item.name}</Text>
              <Text style={styles.classDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  classItem: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
  className: {
    fontSize: 18,
    fontWeight: "bold",
  },
  classDescription: {
    fontSize: 14,
    color: "#777",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
