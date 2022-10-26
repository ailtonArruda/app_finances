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

interface InfoCard {
  title: string;
  amount: string;
  lastTransaction: string;
  type: 'up' | 'down' | 'total';
}

const icon = {
  down: 'arrow-down-circle',
  up: 'arrow-up-circle',
  total: 'dollar-sign'
}

export function HighlightCard({ 
  title,
  amount,
  lastTransaction,
  type
} : InfoCard) {
  return (
    <Container type={type}>
        <Header>
            <Title type={type}>
              {title}
            </Title>
            <Icon name={icon[type]} type={type}/>
        </Header>

        <Footer>
          <Amount type={type}>
            {amount}
          </Amount>
          <LastTransaction type={type}>
            {lastTransaction}
          </LastTransaction>
        </Footer>
    </Container>
  );
}