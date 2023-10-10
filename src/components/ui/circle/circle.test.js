import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

describe("Circle component", () => {
  it('render circle element without text', () => {
    const circleEmpty = renderer
      .create(<Circle />)
      .toJSON();

    expect(circleEmpty).toMatchSnapshot();
  });

  it('render circle element with a letter', () => {
    const circleLetter = renderer
      .create(<Circle text={'A'}/>)
      .toJSON();

    expect(circleLetter).toMatchSnapshot();
  });

  it('render circle element with head', () => {
    const circleHead = renderer
      .create(<Circle head={'head'}/>)
      .toJSON();

    expect(circleHead).toMatchSnapshot();
  });

  it('render circle element with react-element in head', () => {
    const circleHeadSubCircle = renderer
      .create(<Circle head={<Circle isSmall={true} />} />)
      .toJSON();

    expect(circleHeadSubCircle).toMatchSnapshot();
  });

  it('render circle element with tail', () => {
    const circleTail = renderer
      .create(<Circle tail={'tail'}/>)
      .toJSON();

    expect(circleTail).toMatchSnapshot();
  });

  it('render circle element with react-element in tail', () => {
    const circleTailSubCircle = renderer
      .create(<Circle tail={<Circle isSmall={true} />} />)
      .toJSON();

    expect(circleTailSubCircle).toMatchSnapshot();
  });

  it('render circle element with index', () => {
    const circleIndex = renderer
      .create(<Circle index={1}/>)
      .toJSON();

    expect(circleIndex).toMatchSnapshot();
  });

  it('render small circle element', () => {
    const circleSmall = renderer
      .create(<Circle isSmall={true}/>)
      .toJSON();

    expect(circleSmall).toMatchSnapshot();
  });

  it('render circle element with default state', () => {
    const circleStateDefault = renderer
      .create(<Circle state={ElementStates.Default}/>)
      .toJSON();

    expect(circleStateDefault).toMatchSnapshot();
  });

  it('render circle element with changing state', () => {
    const circleStateChanging = renderer
      .create(<Circle state={ElementStates.Changing}/>)
      .toJSON();

    expect(circleStateChanging).toMatchSnapshot();
  });

  it('render circle element with modified state', () => {
    const circleStateModified = renderer
      .create(<Circle state={ElementStates.Modified}/>)
      .toJSON();

    expect(circleStateModified).toMatchSnapshot();
  });
});