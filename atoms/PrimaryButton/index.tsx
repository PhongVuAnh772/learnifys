import {Button, ButtonProps} from "react-native-paper";
import {StyleSheet} from "react-native";

interface PrimaryButtonProps extends ButtonProps {
}

const PrimaryButton = ({children, mode = "contained", ...props}: PrimaryButtonProps) => {
  const styles = useStyles();

  return (
    <Button mode={mode} {...props}
      style={[styles.outer, StyleSheet.flatten(props.style)]}>
      {children}
    </Button>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    outer: {
      borderRadius: 8,
    },
  });
};

export default PrimaryButton;
