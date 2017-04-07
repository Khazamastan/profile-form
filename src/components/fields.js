import React, { Component, PropTypes } from 'react'
import { TableForm } from './table';

const getFormElements = function (fields, callback, refresh) {
    var fieldElems = [];
    for (var i = 0; i < fields.length; i++) {
        var item = fields[i];
        var defaultValue = item.default || "";
        fieldElems.push(<InputWrap span={item.span} defaultValue={defaultValue} callback={callback}
                                   ref={"input_" + item.name} refresh={refresh}
                                   key={item.name} {...item} onChange={item.onChange} warning={item.warning}/>);
    }
    return fieldElems;
};

var InputWrap = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.defaultValue || null,
        };
    },
    render: function () {
        var isdisabled = ((this.props.disabled == "disabled") || !this.props.disabled) ? false : true;
        var inputElem;
        switch (this.props.type) {
            case 'text':
                inputElem =
                    <div className="control-group flex">
                        <input type="text" className="u-full-width" value={this.state.value || ""} 
                               onChange={this.onInputChange} placeholder={this.props.placeholder}
                               disabled={isdisabled}/>
                        {this.props.warning}
                    </div>
                ;
                break;
            case 'tableForm':
                inputElem = <TableForm {...this.props} disabled={isdisabled}/>
                break;
            case 'constant':
                inputElem = <p className="constant-text info-area">{this.state.value}</p>;
                break;
        }
        var infoLink = this.props.info_link ? <a className="icon-info settings inline-block"></a> : "";
        return (
                <div className={"columns " + this.props.span + (this.props.headLabel ? " clearfix" : "")}>
                    <div className="row">{this.props.headLabel ? <h5 className="clearfix">{this.props.headLabel}</h5> : null}</div>
                    <label>{this.props.label}</label>
                    <div className={this.props.type == 'html' ? "input-wrap  uitype-wrap" : "input-wrap"}>
                        {inputElem}
                    </div>
                </div>
        );
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            value: nextProps.defaultValue || null,
            disabled : this.props.disabled
        });
    },
    onInputChange: function (e) {
        var value = e.target.value;
        this.setState({value: value});
        if (this.props.onChange) {
            this.props.onChange(this.props.name , value)
        }
    },
    getValue: function () {
        return this.state.value;
    }
});

export { getFormElements }

