import i18n from "@/translations";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";

const useOnboardingNative = () => {
    const usingI18n = (stringRevert: string) => {
        return i18n.t(stringRevert)
    }
    useEffect(() => {
        animation.current?.play();
    }, []);
    const animation = useRef<LottieView>(null);
    return { usingI18n, animation }
}
export default useOnboardingNative