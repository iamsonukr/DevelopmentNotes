import React, { useMemo } from 'react'
const lazy=React.lazy(()=>import('./LazyComponent'))
const LazyComponent=React.lazy(()=>import('/'))
const expensive=useMemo(()=>{

},[])

const Sample = () => {
  return (
    <div>Sample</div>
  )
}

export default Sample