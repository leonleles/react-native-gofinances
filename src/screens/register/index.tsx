import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import uuid from "react-native-uuid";
import * as Yup from "yup";

import { Button } from "../../components/form/button";
import { CategorySelectButton } from "../../components/form/category-select";
import { InputForm } from "../../components/form/input-form";
import { TransactionTypeButton } from "../../components/form/transation-type-button";
import { CategorySelect } from "../category-select";
import * as S from "./styles";

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

const dataKey = "@gofinances:transactions";

const defaultCategory = {
  key: "category",
  name: "Categoria",
};

export const Register = () => {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);

  const [category, setCategory] = useState(defaultCategory);

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionSelectType(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleToggleSelectCategoryModal() {
    setCategoryModalOpen(!categoryModalOpen);
  }

  async function handleRegister(form) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação!");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria!");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      setTransactionType("");
      setCategory(defaultCategory);
      reset();

      navigation.navigate("Listagem" as never);
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>

        <S.Form>
          <S.Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <S.TransactionsType>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionSelectType("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionSelectType("negative")}
                isActive={transactionType === "negative"}
              />
            </S.TransactionsType>

            <CategorySelectButton
              title={category.name}
              onPress={handleToggleSelectCategoryModal}
            />
          </S.Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </S.Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleToggleSelectCategoryModal}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
};
