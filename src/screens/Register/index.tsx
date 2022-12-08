import React, { useState } from "react";
import { 
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton"; 

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from './styles'; 

import { CategorySelect } from "../CategorySelect";
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form";

interface FormData {
    name: string;
    amount: string;
    error?: string;
}

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

    const [TRANSACTION_TYPE, SET_TRANSACTION_TYPE] = useState('');
    const [CATEGORY_MODAL_OPEN, SET_CATEGORY_MODAL_OPEN] = useState(false);

    const [CATEGORY, SET_CATEGORY] = useState({
        key: 'category',
        name: 'Category',
    });

    const {
        control,
        handleSubmit,
        formState: {errors}
     } = useForm({
        resolver: yupResolver(schema)
     }); 

    function handleTransactionTypesSelect(type: 'up' | 'down'){
        SET_TRANSACTION_TYPE(type);
    }

    function handleOpenSelectCategoryModal() {
        SET_CATEGORY_MODAL_OPEN(true)
    }

    function handleCloseSelectCategoryModal() {
        SET_CATEGORY_MODAL_OPEN(false)
    }

    function handleRegister(form: FormData) {
        if(!TRANSACTION_TYPE){
            return Alert.alert('Selecione o tipo de transação')
        }

        if(CATEGORY.key === 'category'){
            return Alert.alert('Selecione uma categoria')
        }



        const data = {
            name: form.name,
            amount: form.amount,
            TRANSACTION_TYPE,
            CATEGORY: CATEGORY.key
        }
        console.log(data)
    }

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
                            onPress={() => handleTransactionTypesSelect('up')}
                            isActive={TRANSACTION_TYPE === 'up'}
                        />
                        <TransactionTypeButton 
                            type="up"
                            title="Saída"
                            onPress={() => handleTransactionTypesSelect('down')}
                            isActive={TRANSACTION_TYPE === 'down'}
                        />

                    </TransactionTypes>
                    <CategorySelectButton 
                        title={CATEGORY.name}
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
                    category={CATEGORY}
                    setCategory={SET_CATEGORY}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
                
               
            </Modal>
            
        </Container>
        </TouchableWithoutFeedback>
    )
}