import React, { Component, PropTypes } from 'react'
const TableForm = React.createClass({
    getInitialState() {
        return {
            data : this.props.default,
            newFormData :  {
                type : '',
                board : '',
                percentage : '',
            },
            showAddNew : true
        }
    },
    render(){
        var isdisabled = this.props.disabled;
        var form = <div className="row">
                    <table className="u-full-width">
                        {!this.props.default.length ? 
                            <thead>
                                <tr>
                                { 
                                    this.props.fields.map(function(field){
                                        return <th key={field.name}>{field.name}</th>
                                    })
                                }
                                <th></th>
                                </tr>
                            </thead>  : null
                        }
                        <tbody>
                            <tr>
                           { 
                            this.props.fields.map(function(field){
                                return <td key={field.key} className="">
                                        <input type="text" disabled={this.props.disabled} className="u-full-width" value={this.state.newFormData[field.key] || ""} 
                                       onChange={this.onInputChange.bind(null,field.key)} placeholder={field.name}
                                       disabled={this.props.disabled}/>
                                    </td>
                            }.bind(this))
                          }
                            <td>
                                <button type="button" className="u-pull-right" onClick={this.onSave}> Save</button>
                            </td>
                          </tr>
                        </tbody>
                    </table>
                    {this.state.error ? <p className="text-error text-center mt-20">{this.state.error}</p> : null}
                    </div>
        return  <div>
                {this.props.default.length ? 
                    <table className="u-full-width">
                        <thead>
                            <tr>
                                { 
                                    this.props.fields.map(function(field){
                                        return <th key={field.key}>{field.name}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.default.map(function(row,i){
                            return  <tr className="row" key={row+i}>
                                   { this.props.fields.map(function(field){
                                            return  <td key={field.key}>
                                                    <p>{row[field.key] || ""}</p>
                                                </td>
                                    })
                                  }
                                </tr>
                            }.bind(this))
                        }
                        </tbody>
                    </table> : null
                }
                {this.state.showAddNew ? 
                    <form onSubmit={this.onSave} id="submitForm" action="">{form}</form> : 
                    <button type="button" disabled={isdisabled} onClick={this.addNew}> Add {this.props.headLabel}</button>}
                
                </div>
    },
    onInputChange(field, e){
        var value = e.target.value;
        var newFormData = this.state.newFormData;
        newFormData[field] = value;
        this.setState({newFormData : newFormData});
    },
    onSave(e){
        e.preventDefault();
        var valid = this.isValid();
        if(valid){
            var data = this.state.data;
            data.push(this.state.newFormData);
            this.setState({showAddNew : false, newFormData : {}, error : null});  
            this.props.onChange(this.state.data);
        }else{
            this.setState({error : "please fill all values"});
        }
    },
    isValid(){
        var valid = this.props.fields.every(function(field){
            if(this.state.newFormData[field.key]){
                return true;
            }
        }.bind(this));
        return valid;
    },
    componentWillReceiveProps(nextProps) {
        this.setState({data : nextProps.default, showAddNew : (this.props.default.length ?  false : true)});
    },
    componentDidMount() {
      this.setState({showAddNew : (this.props.default.length ?  false : true)});   
    },
    addNew(){
        this.setState({showAddNew : true});   
    }
})

export { TableForm }