import * as S from "./styles";

type Category = {
  name: string;
  icon: string;
};

export interface TransactionCardProps {
  type: "positive" | "negative";
  title: string;
  amount: string;
  category: Category;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export const TransactionCard = ({ data }: Props) => {
  return (
    <S.Container>
      <S.Title>{data.title}</S.Title>
      <S.Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.CategoryIcon name={data.category.icon} />
          <S.CategoryName>{data.category.name}</S.CategoryName>
        </S.Category>
        <S.Date>{data.date}</S.Date>
      </S.Footer>
    </S.Container>
  );
};
