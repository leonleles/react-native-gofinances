import { HighLightCard } from "../../components/highlight-card";
import { TransactionCard, TransactionCardProps } from "../../components/transaction-card";
import * as S from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "13/04/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Hambuguer Pizy",
      amount: "R$ 59,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "05/04/2020",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel apartamento",
      amount: "R$ 1200,00",
      category: {
        name: "Alimentação",
        icon: "shopping-bag",
      },
      date: "01/04/2020",
    },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserInfo>
            <S.Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/34039694?v=4.png",
              }}
            />

            <S.User>
              <S.UserGreeting>Olá, </S.UserGreeting>
              <S.UserName>Leonardo</S.UserName>
            </S.User>
          </S.UserInfo>

          <S.Icon name="power" />
        </S.UserWrapper>
      </S.Header>

      <S.HighLightCards>
        <HighLightCard />
        <HighLightCard />
        <HighLightCard />
      </S.HighLightCards>

      <S.Transactions>
        <S.Title>Listagem</S.Title>

        <S.TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </S.Transactions>
    </S.Container>
  );
}
