import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";

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

export function Dashboard(){
    const data = [{
        title: "Desenvolvimento",
        amount: "R$ 100",
        category: {
        name: 'Vendas',
        icon: 'dollar-sign'
        },
        date: "13/04/2020"
    },
    {
        title: "Desenvolvimento",
        amount: "R$ 100",
        category: {
        name: 'Vendas',
        icon: 'dollar-sign'
        },
        date: "13/04/2020"
    },
    {
        title: "Desenvolvimento",
        amount: "R$ 100",
        category: {
        name: 'Vendas',
        icon: 'dollar-sign'
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

                <TransactionList 
                    data={data}
                    renderItem={({ item }) => <TransactionCard data={item}/>}
                    showsVerticalScrollIndicator={false}
                />

                
            </Transactions>
        </Container>
    )
}