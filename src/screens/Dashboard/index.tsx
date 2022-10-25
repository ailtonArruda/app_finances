import React from "react";
import { HighlightCard } from "../../components/HighlightCard";

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
} from './styles';

export function Dashboard(){
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
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>
            </Transactions>
        </Container>
    )
}