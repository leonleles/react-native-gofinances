import * as S from "./styles";

interface Props {
  title: string
  amount: string
  color: string
}

export const HistoryCard = ({title, color, amount} : Props) => {
  return (
    <S.Container color={color}>
      <S.Title>{title}</S.Title>
      <S.Amount>{amount}</S.Amount>
    </S.Container>
  );
};
