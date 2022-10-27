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

interface Category {
    name: string;
    icon: string;
}

interface Props {
    data: {
        title: string;
        amount: string;
        category: Category;
        date: string;
    }
}

export function TransactionCard({ data } : Props){
    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount>{data.amount}</Amount>
            <Footer>
                <Categoria>
                    <Icon name="dollar-sign"/>
                    <CategoryName>{data.category.name}</CategoryName>
                </Categoria>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    )
}