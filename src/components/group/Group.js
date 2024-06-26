import React, { Suspense } from 'react'
import GroupList from './GroupList'
import GroupDetail from './GroupDetail'
import GroupCreation from './GroupCreation'
import "../group/group.css"
import { lazy } from 'react'

const GroupAddition = lazy(()=>import('./GroupAddition'))

export default function Group() {
  
  return (
    <div className='group-container'>
        <GroupDetail/>
    </div>
  )
}
