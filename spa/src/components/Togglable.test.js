import React from 'react'
import {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Note from './Note'
import Togglable from './Togglable'

describe('<Togglable />', ()=> {
  let togglableComponent

  beforeEach(()=>{
    togglableComponent=shallow(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    )
    console.log(togglableComponent.debug())
  })
  it('renders its children', ()=>{
    expect(togglableComponent.contains(<div className="testDiv" />)).toEqual(true)
  })

  it('atStart the children are not displayed', ()=> {
    const div=togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({display:'none'})
  })

  it('after clicking the button, children are diplayed', ()=> {
    const button=togglableComponent.find('button')

    button.at(0).simulate('click')
    const div=togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({display:''})
  })

  it('shallow renders only one level', ()=> {
    const note1={
      content: 'komponenttitestaus tapahtuu jestillä ja enzymellä',
      important: true
    }
    const note2={
      content: 'shallow ei renderöi alikomponentteja',
      important: true
    }
    const togglableComponent=mount(
      <Togglable buttonLabel="show...">
        <Note note={note1} />
        <Note note={note2} />
      </Togglable>
    )
  })
})
