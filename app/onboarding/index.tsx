import useOnboardingNative from '@/hooks/useOnboardingNative';
import { Image, TouchableOpacity, View, Text } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useAuth } from '@/auth/ctx';

const OnboardingScreen = () => {
    const { usingI18n, animation } = useOnboardingNative()
    const { authStateChecking } = useAuth()
    const NextButton = ({ ...props }) => (
        <TouchableOpacity style={{ marginRight: 16 }} {...props}>
            <Text style={{ fontSize: 16 }} >{usingI18n('onboarding_next')}</Text>
        </TouchableOpacity>
    );

    const SkipButton = ({ ...props }) => (
        <TouchableOpacity style={{ marginLeft: 16 }} {...props}>
            <Text style={{ fontSize: 16 }}>{usingI18n('onboarding_skip')}</Text>
        </TouchableOpacity>
    )
    return (<>
        <Onboarding
            NextButtonComponent={NextButton}
            SkipButtonComponent={SkipButton}
            onDone={authStateChecking}
            pages={[
                {
                    backgroundColor: '#a7f3d0',
                    image:
                        <LottieView source={require('@/assets/animations/onboarding-1.json')} autoPlay loop style={{ width: 300, height: 300 }} ref={animation} />
                    ,
                    title: usingI18n('onboarding_title_first'),
                    subtitle: usingI18n('onboarding_description_first'),
                },
                {
                    backgroundColor: '#fef3c7',
                    image: <LottieView source={require('@/assets/animations/onboarding-2.json')} autoPlay loop style={{ width: 300, height: 300 }} />,
                    title: usingI18n('onboarding_title_second'),
                    subtitle: usingI18n('onboarding_description_second'),
                },
                {
                    backgroundColor: '#b3b7c9',
                    image: <LottieView source={require('@/assets/animations/onboarding-3.json')} autoPlay loop style={{ width: 300, height: 300 }} />,
                    title: usingI18n('onboarding_title_third'),
                    subtitle: usingI18n('onboarding_description_third'),
                },
            ]}

        />
    </>)
}

export default OnboardingScreen