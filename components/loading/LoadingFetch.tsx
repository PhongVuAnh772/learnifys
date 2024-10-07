import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { StyleSheet, Text, View } from "react-native";

export const FetchingDataLoader = () => (
  <View style={{flex: 1}}>
    <ContentLoader
    height={140}
    speed={1}
    backgroundColor={'#f4f4f5'}
    foregroundColor={'gray'}
    viewBox="0 0 380 70"
  >
    <Rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    
  </ContentLoader>
  <ContentLoader
    height={140}
    speed={1}
    backgroundColor={'#f4f4f5'}
    foregroundColor={'#999'}
    viewBox="0 0 380 70"
  >
    {/* Only SVG shapes */}
    <Rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    
  </ContentLoader>
  <ContentLoader
    height={140}
    speed={1}
    backgroundColor={'#f4f4f5'}
    foregroundColor={'#999'}
    viewBox="0 0 380 70"
  >
    {/* Only SVG shapes */}
    <Rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    
  </ContentLoader>
  <ContentLoader
    height={140}
    speed={1}
    backgroundColor={'#f4f4f5'}
    foregroundColor={'#f4f4f5'}
    viewBox="0 0 380 70"
  >
    {/* Only SVG shapes */}
    <Rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    
  </ContentLoader>
  <ContentLoader
    height={140}
    speed={1}
    backgroundColor={'#f4f4f5'}
    foregroundColor={'#999'}
    viewBox="0 0 380 70"
  >
    {/* Only SVG shapes */}
    <Rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    
  </ContentLoader>
  <ContentLoader
    height={140}
    speed={1}
    backgroundColor={'#f4f4f5'}
    foregroundColor={'gray'}
    viewBox="0 0 380 70"
  >
    <Rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    
  </ContentLoader>
  </View>
)