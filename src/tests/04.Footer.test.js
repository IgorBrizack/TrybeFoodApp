import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Teste o Componente Footer', () => {
  it('Verifique o funcionaento dos botoes: food e drink' , async()=>{
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Footer />
      </Router>
    );

    const drinkButton = screen.getByRole('img', {  name: /drinkIcon/i});
    expect(drinkButton).toBeInTheDocument();
    userEvent.click(drinkButton);

    const mealButton = screen.getByRole('img', {  name: /mealIcon/i});
    expect(mealButton).toBeInTheDocument();
    userEvent.click(mealButton);
  })
})