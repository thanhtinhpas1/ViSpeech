/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Table, Input, Button, Space } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import ResizableTitle from './components/ResizableTitle/ResizableTitle.component'
import './AntdTable.style.scss'

const AntdTable = ({ dataObj, columns, fetchData, isLoading, pageSize, scrollY }) => {
  const [pagination, setPagination] = useState({ pageSize, current: 1, total: dataObj.count })
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [tempColumns, setTempColumns] = useState([...columns])
  const [tableColumns, setTableColumns] = useState([])
  const [components] = useState({
    header: {
      cell: ResizableTitle,
    },
  })
  const searchInput = useRef(null)

  useEffect(() => {
    if (isLoading === false) {
      setPagination(p => {
        return { ...p, total: dataObj.count }
      })
    }
  }, [dataObj, isLoading])

  // eslint-disable-next-line no-shadow
  const handleTableChange = (pagination, filters, sorter) => {
    fetchData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      filters,
    })
    setPagination(pagination)
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = useCallback(
    (dataIndex, title) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Tìm kiếm ${title.toLowerCase()}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Tìm
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Bỏ tìm kiếm
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.current.select())
        }
      },
      render: text =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    }),
    [searchedColumn, searchText]
  )

  const handleResize = useCallback(
    index => {
      return (e, { size }) => {
        const nextColumns = [...tempColumns]
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        }
        setTempColumns(nextColumns)
      }
    },
    [tempColumns]
  )

  useEffect(() => {
    const cols = tempColumns.map((col, index) => {
      const defaultCol = {
        ...col,
        onHeaderCell: column => ({
          width: column.width,
          onResize: handleResize(index),
        }),
      }
      return col.canSearch ? { ...defaultCol, ...getColumnSearchProps(col.dataIndex, col.title) } : { ...defaultCol }
    })
    setTableColumns(cols)
  }, [getColumnSearchProps, tempColumns, handleResize])

  return (
    <div className="dataTables_wrapper">
      <Table
        tableLayout="auto"
        rowKey={record => record._id}
        columns={tableColumns}
        dataSource={dataObj.data}
        pagination={{
          ...pagination,
          position: ['bottomCenter'],
          hideOnSinglePage: true,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
        scroll={{ y: scrollY || 500, scrollToFirstRowOnChange: true }}
        components={components}
        loading={isLoading}
        onChange={handleTableChange}
        showSorterTooltip={false}
      />
    </div>
  )
}

export default AntdTable
