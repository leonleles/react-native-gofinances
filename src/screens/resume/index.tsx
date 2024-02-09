import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { VictoryPie } from "victory-native";

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
  totalFormatted: string;
  color: string;
  percent: number;
  percentFormatted: string;
}

export const Resume = () => {
  const [selectDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );
  const theme = useTheme();

  function handleDateChange(action: "next" | "prev") {
    const date = new Date(
      selectDate.getFullYear(),
      +String(selectDate.getMonth()).padStart(2, "0"),
      +String(selectDate.getDay()).padStart(2, "0")
    );

    if (action === "next") {
      setSelectedDate(addMonths(date, 1));
      return;
    }

    setSelectedDate(subMonths(date, 1));
  }

  async function loadData() {
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (acc: number, curr: TransactionData) => {
        return acc + +curr.amount;
      },
      0
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

        const percent = +((categorySum / expensivesTotal) * 100);
        const percentFormatted = `${percent.toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          percent,
          percentFormatted,
          total: categorySum,
          totalFormatted: total,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, [selectDate]);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>

      <S.Content
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          padding: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <S.MonthSelect>
          <S.MonthSelectButton onPress={() => handleDateChange("prev")}>
            <S.MonthSelectIcon name="chevron-left" />
          </S.MonthSelectButton>

          <S.Month>
            {format(selectDate, "MMMM, yyyy", { locale: ptBR })}
          </S.Month>

          <S.MonthSelectButton onPress={() => handleDateChange("next")}>
            <S.MonthSelectIcon name="chevron-right" />
          </S.MonthSelectButton>
        </S.MonthSelect>

        <S.ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percentFormatted"
            y="total"
            colorScale={totalByCategories.map((cat) => cat.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.shape,
              },
            }}
            labelRadius={50}
          />
        </S.ChartContainer>

        {totalByCategories.map((category) => (
          <HistoryCard
            key={category.name}
            title={category.name}
            amount={category.totalFormatted}
            color={category.color}
          />
        ))}
      </S.Content>
    </S.Container>
  );
};
