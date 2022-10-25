import React from 'react'

const ListView = ({ list }) => {
  return (
    <div>
        {list.map(item => {
            return <div key={item.id}>
                <div>
                    {item.name}  id: {item.id}
                </div>
            </div>
        })}
    </div>
  )
}

export default ListView