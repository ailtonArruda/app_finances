import React from "react";
import { FlatList } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions, 
    Title,
    TransactionList
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard(){

    const data: DataListProps[] = [
    {
        id: '1',
        type: 'positive',
        title: "Desenvolvimento",
        amount: "R$ 100",
        category: {
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date: "13/04/2020"
    },
    {
        id: '2',
        type: 'negative',
        title: "Hambugueria",
        amount: "R$ 100",
        category: {
            name: 'Alimentação',
            icon: 'coffee'
        },
        date: "13/04/2020"
    },
    {
        id: '3',
        type: 'negative',
        title: "Aluguel",
        amount: "R$ 100",
        category: {
            name: 'Casa',
            icon: 'shopping-bag'
        },
        date: "13/04/2020"
    }];

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/44329784?v=4'}}/>
                            <User>
                                <UserGreeting>Olá, </UserGreeting>
                                <UserName>Tiago</UserName>
                            </User>
                    </UserInfo>
                    <Icon name="power"/>
                </UserWrapper>
            </Header>
            
            <HighlightCards>
                <HighlightCard
                    type="up"
                    title="Entrada"
                    amount="R$ 100"
                    lastTransaction="Última entrada dia 13 de abril"
                />
               <HighlightCard
                    type="down"
                    title="Saída"
                    amount="R$ 100"
                    lastTransaction="Última saída dia 13 de abril"
                />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="R$ 100"
                    lastTransaction="01 à 13 de abril"
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item}/>}
                    showsVerticalScrollIndicator = {false}
                />
                
              
            </Transactions>
        </Container>
    )
}