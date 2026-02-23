import React, { useState } from 'react'
import debounce from 'lodash/debounce'

const Sample = () => {
    const [searchText,setSearchText]=useState('')

    const theDebounceFunction=()=>{
        const result = debounce(async()=>{
            try {
                const res=await axios.get(`/this-is-url/${searchText}`)
                console.log(res)
            } catch (error) {
                
            }
        },5000) 
    }

    const handleChange=(text)=>{
        setSearchText(text);
        theDebounceFunction()
    }
    
  return (
    <div>
        <input type='text' onChange={()=>handleChange(e.target.value)} value={searchText} />
    </div>
  )
}

export default Sample