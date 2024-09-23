// Page.test.tsx
import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Page from '../page';
import Swal from 'sweetalert2';

jest.mock('axios');
jest.mock('sweetalert2');

describe('Page Component', () => {
  
  test('should render the Page component with search input and loader', () => {
    render(<Page />);
    
    // Verificar si el input de búsqueda se está mostrando
    expect(screen.getByPlaceholderText('Buscar imagenes')).toBeInTheDocument();
  
  });
  

});
