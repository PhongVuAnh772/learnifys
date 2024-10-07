import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link, useRouter } from 'expo-router';
import i18n from '@/translations/index'
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

const categories = [
  {
    name: 'retail-revenue',
  },
  {
    name: 'agency-revenue',
  },
  {
    name: 'system-import',
  },
  {
    name: 'new-customer',
  },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

const ReportHeader = ({onCategoryChanged}: Props) => {
   
  const router = useRouter()
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name)
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f3f4' }}>
      <View style={styles.container}>
        <View style={[styles.actionRow,{paddingTop: 10}]}>
          <Text style={styles.title}>{i18n.t("report")}</Text>
          
        </View>

        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 23,
            paddingHorizontal: 16,
            paddingTop: 16,
          }}>
          {categories.map((item, index) => (
            <TouchableOpacity
              ref={(el) => (itemsRef.current[index] = el)}
              key={index}
              style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
              onPress={() => selectCategory(index)}>
              <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                {i18n.t(item.name)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(241, 243, 244)',
    height: 110,
    
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'quicksand-bold',
    color: Colors.grey,
    fontWeight: '400',
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'quicksand-bold',
    color: '#27A376',
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#27A376',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  title: {
    fontFamily:"quicksand-bold",
    fontSize: 25
  }
});

export default ReportHeader;