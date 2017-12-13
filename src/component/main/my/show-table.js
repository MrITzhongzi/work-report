import React from 'react'
import {Table, Input, Button, Icon,Pagination  } from 'antd'
import './show-table.css'
import serveDate from './tabele-date'

let data = serveDate;  //table的数据源

class ShowTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filterDropdownVisible: false,
            data,
            searchText: '',
            filtered: false,
        }
    }

    onInputChange = (e) => {
        this.setState({searchText: e.target.value});
    }
    onSearch = () => {
        const {searchText} = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: data.map((record) => {

                const match = record.name.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    name: (
                        <span>
              {record.name.split(reg).map((text, i) => (
                  i > 0 ? [<span key={i} className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    }

    render() {

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisible: visible,
                }, () => this.searchInput && this.searchInput.focus());
            },
        }, {
            title: 'job-number',
            dataIndex: 'job-number',
            key: 'job-number',
        }, {
            title: 'department',
            dataIndex: 'department',
            key: 'department',
            filters: [{
                text: 'London',
                value: 'London',
            }, {
                text: 'New York',
                value: 'New York',
            }],
            onFilter: (value, record) => {

                return record.department.indexOf(value) === 0
            },
        }];
        return (
            <div className="show-table">
                <Table columns={columns}
                       dataSource={this.state.data}
                       pagination={{
                           total :  data.length,
                           pageSize: 10,
                           defaultPageSize: 10,
                           // showSizeChanger: true, //
                           // onShowSizeChange(current, pageSize){
                           //     console.log('onshowSizeCHange')
                           //
                           //      console.log(current)
                           //      console.log(pageSize)
                           // },
                           showTotal(total, range){
                               console.log("showTotal")
                               console.log(total, range)

                           },
                           onChange (page, pageSize){
                               console.log('page change')
                               console.log(page,pageSize)
                           }
                       }}
                       onChange={(current)=>{
                          console.log('table')
                          console.log(current)

                       }}
                        />
                {/*<Pagination />*/}
            </div>
        );
    }

}

export default ShowTable