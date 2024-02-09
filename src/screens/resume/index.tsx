import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { HistoryCard } from "../../components/history-card";
import { categories } from "../../utils/categories";
import * as S from "./styles";

const dataKey = "@gofinances:transactions";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export const Resume = () => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  async function loadData() {
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === "negative"
    );

    const totalByCategory = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key)
          categorySum += +expensive.amount;
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>

      <S.Content>
        {totalByCategories.map((category) => (
          <HistoryCard
            key={category.name}
            title={category.name}
            amount={category.total}
            color={category.color}
          />
        ))}
      </S.Content>
    </S.Container>
  );
};
