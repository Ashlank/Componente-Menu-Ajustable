import React, { useEffect, useState } from 'react'
import Item from './Item';

export default function Header() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'];
  const [viewWidth, setviewWidth] = useState(0)

  const marginX = 48; // m-6 24px margin Header --> 48px en total
  const paddingX = 16; // p-2 8px padding Header --> 16px en total
  const gapItems = 16; // gap-4 16px gap Ul
  const availableWidth = viewWidth - marginX - paddingX;
  const minItemWidth = 150; // min-w-[150px] Item
  const itemWidth = minItemWidth + gapItems;
  const numberOfItemsThatFits = (Math.floor(availableWidth / itemWidth) - 1) < 0 ? 0 : (Math.floor(availableWidth / itemWidth) - 1) // -1 Para guardar el lugar del "Others(n)"

  const handleResize = () => {
    setviewWidth(window.innerWidth)
  }

  useEffect(() => {
    setviewWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <header className='m-6 p-2 border-gray-600 border-solid border-[2px] rounded-[5px]'>
      <nav>
        <ul className='w-full flex gap-4'>
          {
            items.map((item, index) => {
              if(index < numberOfItemsThatFits) {
                return <Item item={item} key={item+index} />
              } else return null
            })
          }
          {
            numberOfItemsThatFits < items.length
              &&
            <Item item={`Others(${items.length - numberOfItemsThatFits})`} />
          }
        </ul>
      </nav>
    </header>
  )
}
