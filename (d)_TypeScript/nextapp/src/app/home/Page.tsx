import React, { useState } from 'react'

type Props = {}

const Page = (props: Props) => {
    const [count, setCount] = useState(0)

    const addCount = (action: string): void => {
        if (action == "add") {
            setCount(count + 1);
        } else {
            setCount(count - 1)
        }
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => addCount("add")}>Add</button>
            <button onClick={() => addCount("remove")}>Add</button>
        </div>
    )
}