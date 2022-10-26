import React from "react";
import {
    Container,
    Title,
    Amount,
    Footer,
    Categoria,
    Icon,
    CategoryName,
    Date

} from "./styles";

export function TransactionCard(){
    return (
        <Container>
            <Title>Deselvolvimento de site</Title>
            <Amount>R$ 12000</Amount>
            <Footer>
                <Categoria>
                    <Icon name="dollar-sign"/>
                    <CategoryName>Vendas</CategoryName>
                </Categoria>
                <Date>14/09/2020</Date>
            </Footer>
        </Container>
    )
}