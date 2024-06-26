import React from 'react'
import GroupList from './GroupList'
import GroupDetail from './GroupDetail'
import GroupCreation from './GroupCreation'
import "../group/group.css"
import GroupAddition from './GroupAddition'

export default function Group() {
  
  return (
    <div className='group-container'>
        <GroupDetail/>
        <GroupAddition/>
    </div>
  )
}
