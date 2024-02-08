import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  onPress: () => void
}

export const CategorySelectButton = ({ title, onPress, ...rest }: Props) => {
  return (
    <S.Container onPress={onPress} {...rest}>
      <S.Category>{title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  );
};
