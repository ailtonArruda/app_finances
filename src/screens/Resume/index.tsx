import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryCard } from "../../components/HistoryCard";

import {
  Container,
  Header,
  Title,
  Content
} from './styles'
import { categories } from "../../utils/categories";

export interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
  percentFormatted: string;
  percent: number;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  
  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];
    
    const expensives = responseFormatted
    .filter((expensive: TransactionData) => expensive.type === 'negative')
  
    //building graph data
    const expensivesTotal = expensives
    .reduce((accumulator: number, expensive: TransactionData) => {
      return accumulator + Number(expensive.amount)
    },0);
    
    //listing totals by category
    const totalByCategory: CategoryData[] = [];
    
    categories.forEach(category => {

      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount);
          console.log(expensive.amount)
        }
      });

      if(categorySum > 0){
        const total = categorySum
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = (categorySum / expensivesTotal * 100);
        const percentFormatted = `${percent.toFixed(0)}%`;
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
          percent,
          percentFormatted
        })
      }

      
    })
    console.log(totalByCategory);

    setTotalByCategories(totalByCategory)
  }

  useEffect(() => {
    loadData();
  },[])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      
      <Content >
        {
          totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              color={item.name}
              title={item.total}
              amount={item.color}
            />
          ))
          
        }
      </Content>
     
    </Container>
  )
}