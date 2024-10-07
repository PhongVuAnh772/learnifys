import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect,useState,useMemo } from 'react';
import NoneLogin from '@/components/non-login/NoneLogin';
import { defaultStyles } from '@/constants/Styles';
import { useRouter } from "expo-router";
import Loading from '@/assets/animations/loading';
import i18n from '@/translations';
import { Stack } from 'expo-router';
import ReportHeader from '@/screens/tabs/report/Header/ReportHeader';
import ContentReport from '@/screens/tabs/report/content/ContentReport';
const Report = () => {
  const router = useRouter();
  const [category, setCategory] = useState<string>('retail-revenue');

  const onDataChanged = (category: string) => {
    setCategory(category);
  };
  if (false) {
    return <Loading />
  }


  return (
    <View style={{ flex: 1, backgroundColor:'#f1f3f4' }}>
      <Stack.Screen
        options={{
          header: () => <ReportHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <ContentReport category={category}/>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({});
