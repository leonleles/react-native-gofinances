import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
}

export const CategorySelect = ({ title, ...rest }: Props) => {
  return (
    <S.Container {...rest}>
      <S.Category>{title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  );
};
