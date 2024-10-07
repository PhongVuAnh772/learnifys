// import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
// import { useState } from 'react';
// import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated';
// import { Ionicons } from '@expo/vector-icons';
// import { BlurView } from 'expo-blur';
// import { TextInput } from 'react-native-gesture-handler';
// import { TouchableOpacity } from '@gorhom/bottom-sheet';
// import { defaultStyles } from '@/constants/Styles';
// import Colors from '@/constants/Colors';
// import { places } from '@/assets/data/places';
// import { useRouter } from 'expo-router';      
// import i18n from '@/translations';
// // @ts-ignore
// import DatePicker from 'react-native-modern-datepicker';

// const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

// const guestsGropus = [
//   {
//     name: 'adults',
//     text: 'ages-13-or-above',
//     count: 0,
//   },
//   {
//     name: 'children',
//     text: 'ages_2-12',
//     count: 0,
//   },
//   {
//     name: 'infants',
//     text: 'under-2',
//     count: 0,
//   },
//   {
//     name: 'pets',
//     text: 'pets-allowed',
//     count: 0,
//   },
// ];

// const Page = () => {
//   const [openCard, setOpenCard] = useState(0);
//   const [selectedPlace, setSelectedPlace] = useState(0);

//   const [groups, setGroups] = useState(guestsGropus);
//   const router = useRouter();
//   const today = new Date().toISOString().substring(0, 10);

//   const onClearAll = () => {
//     setSelectedPlace(0);
//     setOpenCard(0);
//   };

//   return (
//     <BlurView intensity={70} style={styles.container} tint="light">
//       {/*  Where */}
//       <View style={styles.card}>
//         {openCard != 0 && (
//           <AnimatedTouchableOpacity
//             onPress={() => setOpenCard(0)}
//             style={styles.cardPreview}
//             entering={FadeIn.duration(200)}
//             exiting={FadeOut.duration(200)}>
//             <Text style={styles.previewText}>{i18n.t("where")}</Text>
//             <Text style={styles.previewdData}>{i18n.t("flexible")}</Text>
//           </AnimatedTouchableOpacity>
//         )}

//         {openCard == 0 && <Text style={styles.cardHeader}>{i18n.t("whereTo")}?</Text>}
//         {openCard == 0 && (
//           <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.cardBody}>
//             <View style={styles.searchSection}>
//               <Ionicons style={styles.searchIcon} name="search" size={20} color="#000" />
//               <TextInput
//                 style={styles.inputField}
//                 placeholder={i18n.t("search-destinations")}
//                 placeholderTextColor={Colors.grey}
//               />
//             </View>

//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.placesContainer}>
//               {places.map((item, index) => (
//                 <TouchableOpacity onPress={() => setSelectedPlace(index)} key={index}>
//                   <Image
//                     source={item.img}
//                     style={selectedPlace == index ? styles.placeSelected : styles.place}
//                   />
//                   <Text style={{ fontFamily: 'quicksand-light', paddingTop: 6 }}>{item.t(item.title)}</Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </Animated.View>
//         )}
//       </View>

//       {/* When */}
//       <View style={styles.card}>
//         {openCard != 1 && (
//           <AnimatedTouchableOpacity
//             onPress={() => setOpenCard(1)}
//             style={styles.cardPreview}
//             entering={FadeIn.duration(200)}
//             exiting={FadeOut.duration(200)}>
//             <Text style={styles.previewText}>{i18n.t("when")}</Text>
//             <Text style={styles.previewdData}>{i18n.t("anyweek")}</Text>
//           </AnimatedTouchableOpacity>
//         )}

//         {openCard == 1 && <Text style={styles.cardHeader}>{i18n.t("when-your-trip")}?</Text>}

//         {openCard == 1 && (
//           <Animated.View style={styles.cardBody}>
//             <DatePicker
//               options={{
//                 defaultFont: 'quicksand-light',
//                 headerFont: 'quicksand-light',
//                 mainColor: Colors.primary,
//                 borderColor: 'transparent',
//               }}
//               current={today}
//               selected={today}
//               mode={'calendar'}
//             />
//           </Animated.View>
//         )}
//       </View>

//       {/* Guests */}
//       <View style={styles.card}>
//         {openCard != 2 && (
//           <AnimatedTouchableOpacity
//             onPress={() => setOpenCard(2)}
//             style={styles.cardPreview}
//             entering={FadeIn.duration(200)}
//             exiting={FadeOut.duration(200)}>
//             <Text style={styles.previewText}>{i18n.t("who-trip")}?</Text>
//             <Text style={styles.previewdData}>{i18n.t("add-guests")}</Text>
//           </AnimatedTouchableOpacity>
//         )}

//         {openCard == 2 && <Text style={styles.cardHeader}>{i18n.t("who-trip")}?</Text>}

//         {openCard == 2 && (
//           <Animated.View style={styles.cardBody}>
//             {groups.map((item, index) => (
//               <View
//                 key={index}
//                 style={[
//                   styles.guestItem,
//                   index + 1 < guestsGropus.length ? styles.itemBorder : null,
//                 ]}>
//                 <View>
//                   <Text style={{ fontFamily: 'quicksand-light', fontSize: 14 }}>{t(item.name)}</Text>
//                   <Text style={{ fontFamily: 'quicksand-light', fontSize: 14, color: Colors.grey }}>
//                     {t(item.text)}
//                   </Text>
//                 </View>

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     gap: 10,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       const newGroups = [...groups];
//                       newGroups[index].count =
//                         newGroups[index].count > 0 ? newGroups[index].count - 1 : 0;

//                       setGroups(newGroups);
//                     }}>
//                     <Ionicons
//                       name="remove-circle-outline"
//                       size={26}
//                       color={groups[index].count > 0 ? Colors.grey : '#cdcdcd'}
//                     />
//                   </TouchableOpacity>
//                   <Text
//                     style={{
//                       fontFamily: 'quicksand-light',
//                       fontSize: 16,
//                       minWidth: 18,
//                       textAlign: 'center',
//                     }}>
//                     {item.count}
//                   </Text>
//                   <TouchableOpacity
//                     onPress={() => {
//                       const newGroups = [...groups];
//                       newGroups[index].count++;
//                       setGroups(newGroups);
//                     }}>
//                     <Ionicons name="add-circle-outline" size={26} color={Colors.grey} />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))}
//           </Animated.View>
//         )}
//       </View>

//       {/* Footer */}
//       <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
//         <View
//           style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//           <TouchableOpacity
//             style={{ height: '100%', justifyContent: 'center' }}
//             onPress={onClearAll}>
//             <Text
//               style={{
//                 fontSize: 18,
//                 fontFamily: 'cereal-light',
//                 textDecorationLine: 'underline',
//               }}>
//               {i18n.t("clear-all")}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
//             onPress={() => router.back()}>
//             <Ionicons
//               name="search-outline"
//               size={24}
//               style={defaultStyles.btnIcon}
//               color={'#fff'}
//             />
//             <Text style={defaultStyles.btnText}>{i18n.t("search")}</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.View>
//     </BlurView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 100,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     margin: 10,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     shadowOffset: {
//       width: 2,
//       height: 2,
//     },
//     gap: 20,
    
//   },
//   cardHeader: {
//     fontFamily: 'cereal-light',
//     fontSize: 24,
//     padding: 20,
//   },
//   cardBody: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   cardPreview: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 20,
//   },

//   searchSection: {
//     height: 50,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ABABAB',
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   searchIcon: {
//     padding: 10,
//   },
//   inputField: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   placesContainer: {
//     flexDirection: 'row',
//     gap: 25,
//   },
//   place: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//   },
//   placeSelected: {
//     borderColor: Colors.grey,
//     borderWidth: 2,
//     borderRadius: 10,
//     width: 100,
//     height: 100,
//   },
//   previewText: {
//     fontFamily: 'cereal-light-sb',
//     fontSize: 14,
//     color: Colors.grey,
//   },
//   previewdData: {
//     fontFamily: 'cereal-light-sb',
//     fontSize: 14,
//     color: Colors.dark,
//   },

//   guestItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 16,
//   },
//   itemBorder: {
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: Colors.grey,
//   },
// });
// export default Page;
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const booking = () => {
  return (
    <View>
      <Text>booking</Text>
    </View>
  )
}

export default booking

const styles = StyleSheet.create({})