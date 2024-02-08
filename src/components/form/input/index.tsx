import * as S from "./styles";
import { TextInputProps } from "react-native";

type Props = TextInputProps;

export const Input = ({ ...rest }: Props) => {
  return <S.Container {...rest} />;
};
