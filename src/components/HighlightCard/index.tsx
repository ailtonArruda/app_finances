import React from 'react';

import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction
} from './styles';

export function HighlightCard() {
  return (
    <Container>
        <Header>
            <Title>Entrada</Title>
            <Icon name="arrow-down-circle"/>
        </Header>

        <Footer>
          <Amount>R$ 100</Amount>
          <LastTransaction>Última entrada dia 13 de agosto</LastTransaction>
        </Footer>
    </Container>
  );
}