const records = compileRows()

console.log(JSON.stringify(records, null, 2))

function compileRows() {
  const rows = document.querySelectorAll(
    '.x.wikitable thead tr, .x.wikitable tbody tr',
  )

  const compiledRows = []

  let i = 0
  for (const row of rows) {
    addRow(i, false)
    const rowData = compiledRows[i]
    const cols = row.querySelectorAll(':scope > th, :scope > td')
    let el_j = 0
    let j = 0
    col_label: while (j < 100) {
      const col = cols[el_j++]
      if (!col) {
        break col_label
      } else {
        while (true) {
          if (rowData.data[j]?.virtual) {
            j++
          } else {
            break
          }
        }
      }
      let val = col.textContent.trim().replace(/\s+/g, ' ')

      const rowSpan = parseInt(col.getAttribute('rowspan') ?? 1, 10)
      const rowEnd = rowSpan + i

      const colSpan = parseInt(col.getAttribute('colspan') ?? 1, 10)
      const colEnd = colSpan + j

      let ri = i
      while (ri < rowEnd) {
        let ci = j
        while (ci < colEnd) {
          let v = val
          if (i === 0) {
            v = `${v} ${ci + 1}`
          }
          setRowColumn(ri, ci, v, ri !== i, ci !== j)

          ci++
        }

        ri++
      }

      j += colSpan
    }

    i++
  }

  function addRow(i, isVirtualRow) {
    compiledRows[i] = compiledRows[i] ?? {
      virtual: isVirtualRow,
      data: [],
    }
  }

  function setRowColumn(i, j, v, isVirtualRow, isVirtualCol) {
    addRow(i, isVirtualRow)
    compiledRows[i].data[j] ??= {
      virtual: isVirtualRow || isVirtualCol,
      data: v,
    }
  }

  const headers = compiledRows.shift()
  const records = compiledRows.map(row => {
    const record = {}
    let i = 0
    while (i < row.data.length) {
      const col = row.data[i]
      console.log(row.data, i, headers)
      const header = headers.data[i]?.data
      record[header] ??= col.data
      i++
    }
    return record
  })

  return records
}
