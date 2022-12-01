import React, { useState } from "react";
import { Modal } from "react-native";
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
}

export function Register() {

    const [TRANSACTION_TYPE, SET_TRANSACTION_TYPE] = useState('');
    const [CATEGORY_MODAL_OPEN, SET_CATEGORY_MODAL_OPEN] = useState(false);

    const [CATEGORY, SET_CATEGORY] = useState({
        key: 'category',
        name: 'Category',
    });

    const {
        control,
        handleSubmit
     } = useForm(); 

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
        const data = {
            name: form.name,
            amount: form.amount,
            TRANSACTION_TYPE,
            CATEGORY: CATEGORY.key
        }
        console.log(data)
    }

    return (
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
                    />

                    <InputForm
                        name="amount"
                        control={control}
                        placeholder="Preço"
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
    )
}