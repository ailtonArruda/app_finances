import { ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import { useTheme } from 'styled-components';

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
    TransactionList,
    LogoutButton,
    LoadingContainer
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
}

interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard(){
    const theme = useTheme();

    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transctionFormatted: DataListProps[] =  transactions
        .map((item: DataListProps) => {

            if(item.type === 'positive'){
                entriesTotal += Number(item.amount);
            }else {
                expensiveTotal += Number(item.amount);
            }
            
            const amount = Number(item.amount)
            .toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
            });


            const date = Intl.DateTimeFormat('pt-br', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date
            }

        });

        setTransactions(transctionFormatted);

        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                })
            }
        });
        console.log(transctionFormatted)
        setIsLoading(false);
    }

    

    useEffect(() => {
        loadTransactions();
    },[])

    useFocusEffect(useCallback(() => {
        loadTransactions();
    },[]));

    
    return (
        <Container>
            {   
                isLoading 
                ? 
                    <LoadingContainer>
                        <ActivityIndicator 
                            color={theme.colors.primary}
                            size="large" 
                        />
                    </LoadingContainer>
                :
                <>
                    <Header>
                        <UserWrapper>
                            <UserInfo>
                                <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/44329784?v=4'}}/>
                                    <User>
                                        <UserGreeting>Olá, </UserGreeting>
                                        <UserName>Tiago</UserName>
                                    </User>
                            </UserInfo>

                            <LogoutButton onPress={() => {}}>
                                <Icon name="power"/>
                            </LogoutButton>

                        </UserWrapper>
                    </Header>
                    
                    <HighlightCards>
                        <HighlightCard
                            type="up"
                            title="Entrada"
                            amount={highlightData.entries.amount}
                            lastTransaction="Última entrada dia 13 de abril"
                        />
                    <HighlightCard
                            type="down"
                            title="Saída"
                            amount={highlightData.expensives.amount}
                            lastTransaction="Última saída dia 13 de abril"
                        />
                        <HighlightCard
                            type="total"
                            title="Total"
                            amount={highlightData.total.amount}
                            lastTransaction="01 à 13 de abril"
                        />
                    </HighlightCards>

                    <Transactions>
                        <Title>Listagem</Title>

                        <FlatList
                            data={transactions}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <TransactionCard data={item}/>}
                            showsVerticalScrollIndicator = {false}
                        />
                        
                    
                    </Transactions>
                </>
            }
        </Container>
    )
}