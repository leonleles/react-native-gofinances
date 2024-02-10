import { RectButtonProps } from "react-native-gesture-handler";
import { categories } from "../../utils/categories";
import * as S from "./styles";
import { SvgProps } from "react-native-svg";

interface Props extends RectButtonProps {
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
