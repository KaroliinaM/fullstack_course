import React from 'react'
import {shallow} from 'enzyme'
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
})
