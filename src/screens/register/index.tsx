import { useState } from "react";
import { Button } from "../../components/form/button";
import { Input } from "../../components/form/input";
import { TransactionTypeButton } from "../../components/form/transation-type-button";
import * as S from "./styles";
import { CategorySelect } from "../../components/form/category-select";

export const Register = () => {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionSelectType(type: "up" | "down") {
    setTransactionType(type);
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <S.TransactionsType>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionSelectType("up")}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionSelectType("down")}
              isActive={transactionType === 'down'}
            />
          </S.TransactionsType>

          <CategorySelect title="Categoria" />
        </S.Fields>
        <Button title="Enviar" />
      </S.Form>
    </S.Container>
  );
};
