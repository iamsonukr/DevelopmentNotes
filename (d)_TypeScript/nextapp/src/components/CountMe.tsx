"use client"
import React, { useState } from 'react'
type Props = {}

const CountMe = (props: Props) => {
    const [count, setCount] = useState<number>(0)

    const addCount = (action: string): void => {
        if (action == "add") {
            setCount(count + 1);
        } else {
            setCount(count - 1)
        }
    }

    return (
        <div className='flex flex-col'>
            <h1>{count}</h1>
            <button onClick={() => addCount("add")}>Add</button>
            <button onClick={() => addCount("remove")}>Sub</button>
        </div>
    )
}

export default CountMe