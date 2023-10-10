import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import {Button} from "./button";

describe('Button component', () => {
  it('render button with text content', () => {
    const buttonWithText = renderer
      .create(<Button text={"there's some text"}/>)
      .toJSON();

    expect(buttonWithText).toMatchSnapshot();
  });

  it('render button without text content', () => {
    const buttonEmpty = renderer
      .create(<Button />)
      .toJSON();

    expect(buttonEmpty).toMatchSnapshot();
  });

  it('render button loader', () => {
    const buttonLoading = renderer
      .create(<Button isLoader={true}/>)
      .toJSON();

    expect(buttonLoading).toMatchSnapshot();
  });

  it('render disabled button', () => {
    const buttonDisabled = renderer
      .create(<Button disabled={true}/>)
      .toJSON();

    expect(buttonDisabled).toMatchSnapshot();
  });

  it('invoke a callback on click', () => {
    const mockCb = jest.fn();

    render(<Button text={'buttonTest'} onClick={mockCb} />)

    const buttonTest = screen.getByText('buttonTest');
    fireEvent.click(buttonTest);

    expect(mockCb).toHaveBeenCalledTimes(1)
  });
});