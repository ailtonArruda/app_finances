import React, { useEffect, useState } from "react";
import { 
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useForm } from "react-hook-form";

import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Forms/Button";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton"; 

import { CategorySelect } from "../CategorySelect";
import { InputForm } from "../../components/Forms/InputForm";

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from './styles'; 





interface FormData {
    name: string;
    amount: string;
};

const schema = yup.object().shape({
    name: yup
    .string()
    .required('Nome é obrigatório'),
    amount: yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório')  
})


  
export function Register() {
    
    const [transactionType, setTransactionType] = useState('');
    const [CATEGORY_MODAL_OPEN, SET_CATEGORY_MODAL_OPEN] = useState(false);

    const dataKey = '@gofinances:transactions';

    const [categoty, setCategoty] = useState({
        key: 'category',
        name: 'Category',
    });

    const navegation = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors}
     } = useForm({
        resolver: yupResolver(schema)
     }); 

    function handleTransactionTypesSelect(type: 'positive' | 'negative'){
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        SET_CATEGORY_MODAL_OPEN(true)
    }

    function handleCloseSelectCategoryModal() {
        SET_CATEGORY_MODAL_OPEN(false)
    }

    async function handleRegister(form: FormData) {
        if(!transactionType){
            return Alert.alert('Selecione o tipo de transação')
        }

        if(categoty.key === 'category'){
            return Alert.alert('Selecione uma categoria')
        }



        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            CATEGORY: categoty.key,
            date: new Date()
        }

        try {
            //listar itens salvos
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [
                ...currentData,
                newTransaction
            ];
            
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            //limpar campos após submit
            reset();
            setTransactionType('');
            setCategoty({
                key: 'category',
                name: 'Category',
            });

            
            //voltar para home
            navegation.navigate('Listagem');

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possivel salvar");
            
            
        }
    }


    // visualizar item
    // useEffect(() => {
    //     async function loadData() {
    //         const data = await AsyncStorage.getItem(dataKey);
    //         console.log(JSON.parse(data!));
            
    //     }

    //     loadData();

    //     // limpar itens

    //     // async function removeAll() {
    //     //     await AsyncStorage.removeItem(dataKey);
    //     // }

    //     // removeAll();
    // },[])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
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

                    <TransactionTypes>
                        <TransactionTypeButton 
                            type="down"
                            title="Entrada"
                            onPress={() => handleTransactionTypesSelect('positive')}
                            isActive={transactionType === 'positive'}
                        />
                        <TransactionTypeButton 
                            type="up"
                            title="Saída"
                            onPress={() => handleTransactionTypesSelect('negative')}
                            isActive={transactionType === 'negative'}
                        />

                    </TransactionTypes>
                    <CategorySelectButton 
                        title={categoty.name}
                        onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>
               
                <Button 
                    title="Enviar"
                    onPress={handleSubmit(handleRegister)}    
                />
            </Form>

            <Modal visible={CATEGORY_MODAL_OPEN}>
                <CategorySelect
                    category={categoty}
                    setCategory={setCategoty}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
                
               
            </Modal>
            
        </Container>
        </TouchableWithoutFeedback>
    )
}