import React from 'react';
import Input from 'components/Input';
import { render, screen, cleanup } from '@testing-library/react';


afterEach(cleanup);

it('renders okay', () => {
  render(<Input text='hola' loading={false} disabled={false} />);
  expect(screen.getByTestId('input-test')).toBeInTheDocument();
});

// it('shows text when not loading', () => {
//     render(<Input text='hola' loading={false} disabled={false} />);
//     expect(screen.getByTestId('input-test')).toHaveTextContent('hola');
//   });
  
  it('doesnt show text when loading', () => {
    render(<Input text='hola' loading={true} disabled={false} />);
    expect(screen.getByTestId('input-test')).not.toHaveTextContent('hola');
  });

  it('shows loading component when loading', () => {
    render(<Input text='hola' loading={true} disabled={false} />);
    expect(screen.getByTestId('test-html-input')).toBeInTheDocument();
  });

  it('is disabled when prop is passed', () => {
    render(<Input text='hola' loading={true} disabled={true} />);
    expect(screen.getByTestId('input-test')).toHaveAttribute('disabled');
  });

  it('is enabled when disabled prop is passed as false', () => {
    render(<Input text='hola' loading={true} disabled={false} />);
    expect(screen.getByTestId('input-test')).not.toHaveAttribute('disabled');
  });

  it('loads the svg html when loading is activated', () => {
    render(<Input text='hola' loading={true} disabled={false} />);
    expect(screen.getByTestId('input-test')).toMatchSnapshot();
  });