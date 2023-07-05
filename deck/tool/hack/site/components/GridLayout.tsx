/* eslint-disable react/no-array-index-key */
import { chunk } from 'lodash'
import React, {
  useRef,
  useLayoutEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react'
import styled from 'styled-components'

const AESTHETIC_PALETTE: Record<
  string,
  Record<string, Array<Array<1>>>
> = {
  3: {
    7: [
      [1, 1, 1],
      [1, 1],
      [1, 1],
    ],
  },
  // fits 4

  4: {
    // has 7
    7: [
      [1, 1, 1],
      [1, 1],
      [1, 1],
    ],
  },
}

function chunkAestheticLayout<T>(
  items: Array<T>,
  layout: Array<Array<1>>,
): Array<Array<T>> {
  const outputRows: Array<Array<T>> = []

  let i = 0
  layout.forEach(row => {
    const outputRow: Array<T> = []
    outputRows.push(outputRow)

    row.forEach(() => {
      const item = items[i]
      outputRow.push(item)
      i += 1
    })
  })

  return outputRows
}

function findOptimalNumberPerRow(
  maxPerRow: number,
  total: number,
): number {
  let i = maxPerRow

  while (i > 0) {
    const r = total % i
    if (r >= i - 1 || r === 0) {
      return i
    }
    i -= 1
  }

  return 1
}

function chunkLayout<T>(
  items: Array<T>,
  maxPerRow: number,
): Array<Array<T>> {
  const collection = AESTHETIC_PALETTE[maxPerRow]
  if (collection) {
    const layout = collection[items.length]
    if (layout) {
      return chunkAestheticLayout(items, layout)
    }
  }

  const idealPerRow = findOptimalNumberPerRow(maxPerRow, items.length)
  return chunk(items, idealPerRow)
}

type AlignType = 'center' | 'left'

type ContainerPropsType = {
  align: AlignType
  gap: number
}

const Container = styled.div<ContainerPropsType>(props => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: props.align,
  rowGap: props.gap,
}))

const Row = styled.div<ContainerPropsType>(props => ({
  display: 'flex',
  justifyContent: props.align,
  rowGap: props.gap,
}))

type ItemPropsType = {
  marginLeft?: number
  marginRight?: number
  width: number
}

const Item = styled.div<ItemPropsType>(props => ({
  display: 'flex',
  flex: `0 0 ${props.width}px`,
  marginLeft: props.marginLeft && `${props.marginLeft}px`,
  marginRight: props.marginRight && `${props.marginRight}px`,
}))

type PropsTyp = {
  align?: AlignType
  children: ReactNode
  className?: string
  gap: number
  maxColumns: number
  minWidth: number
  rowGap?: number
}

export default function GridLayout({
  className,
  maxColumns,
  minWidth,
  gap,
  children,
  rowGap,
  align = 'left',
}: PropsTyp) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [itemWidth, setItemWidth] = useState(0)
  const rows = useRef<Array<Array<ReactNode>>>([])

  const elements = useMemo(() => {
    return React.Children.toArray(children).filter(child => {
      return React.isValidElement(child)
    })
  }, [children])

  useLayoutEffect(() => {
    const recalculate = (): void => {
      if (containerRef.current) {
        const width =
          containerRef.current?.getBoundingClientRect().width ?? 0
        let numColumns = Math.min(maxColumns, elements.length)
        let newItemWidth = 0

        while (width && numColumns > 0) {
          const totalGap = gap * (numColumns - 1)
          const itemGap = totalGap / numColumns
          newItemWidth = width / numColumns - itemGap
          if (newItemWidth >= minWidth) {
            break
          }
          numColumns -= 1
        }

        rows.current = chunkLayout(elements, numColumns)
        const numColumnsForLayout = rows.current[0].length

        if (numColumns > numColumnsForLayout) {
          // recalculated.
          const totalGap = gap * (numColumnsForLayout - 1)
          const itemGap = totalGap / numColumnsForLayout
          newItemWidth = width / numColumnsForLayout - itemGap
        }
        setItemWidth(newItemWidth)
      }
    }
    recalculate()
    window.addEventListener('resize', recalculate)
    return () => window.removeEventListener('resize', recalculate)
  }, [containerRef, elements, maxColumns, gap, minWidth, setItemWidth])

  if (!elements.length) {
    return null
  }

  const rowEls: Array<React.ReactElement> = []

  let key = 0

  rows.current.forEach((row, ri) => {
    const totalGap = gap * (row.length - 1)
    const gapSegmentCount = row.length * 2 - 2
    const gapSegment = totalGap / gapSegmentCount
    const itemEls: Array<React.ReactElement> = []
    row.forEach((child, i) => {
      if (i === 0) {
        const marginRight = gapSegment
        itemEls.push(
          <Item
            key={`${key}x`}
            marginRight={marginRight}
            width={itemWidth}
          >
            {child}
          </Item>,
        )
      } else if (i === row.length - 1) {
        const marginLeft = gapSegment
        itemEls.push(
          <Item
            key={`${key}x`}
            marginLeft={marginLeft}
            width={itemWidth}
          >
            {child}
          </Item>,
        )
      } else {
        const marginRight = gapSegment
        const marginLeft = gapSegment
        itemEls.push(
          <Item
            key={`${key}x`}
            marginLeft={marginLeft}
            marginRight={marginRight}
            width={itemWidth}
          >
            {child}
          </Item>,
        )
      }

      key += 1
    })
    rowEls.push(
      <Row
        align={align}
        gap={gap}
        key={ri}
      >
        {itemEls}
      </Row>,
    )
  })

  return (
    <Container
      align={align}
      className={className}
      ref={containerRef}
      gap={rowGap ?? gap}
    >
      {rowEls}
    </Container>
  )
}
