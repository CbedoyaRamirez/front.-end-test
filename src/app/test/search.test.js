import { render, screen, fireEvent } from '@testing-library/react';
import Page from '../Page/page';
import { describe } from 'node:test';

describe('<Paga />', () => {
  test('Filtro de busqueda', () => {
    render(<Page />);
  
    const searchElement = screen.getByPlaceholderText("Buscar imagenes")
  
    expect(searchElement).toBeInTheDocument();
  
  });
} )