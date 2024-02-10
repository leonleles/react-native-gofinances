import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";

import * as S from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export const SignInSocialButton = ({ title, svg: Svg }: Props) => {
  return (
    <S.Button>
      <S.IconContainer>
        <Svg />
      </S.IconContainer>

      <S.Text>{title}</S.Text>
    </S.Button>
  );
};
