'use strict'
import Reflux from 'reflux';
import React, { Component, PropTypes } from 'react'
import { getFormElements } from '../components/fields';
import { getbyString, setbyString } from '../components/utils';
import  { actions } from '../store/actions';
import { mainStore} from '../store/store';
import { _ } from 'underscore'


const Education = React.createClass ({
    mixins: [
        Reflux.listenTo(actions.validateStep, 'validateStep')
    ],
    getInitialState() {
        return mainStore.data;
    },
    step : 3,
    handleFieldChanged(newEducation){
        var store = mainStore.data;
        store.education = newEducation;
        this.setState(store)  
    },
    render() {
        var fieldsContent;
        var store = mainStore.data;
        var isdisabled = (this.state.edit != "disabled" ? "" : "disabled") || this.props.edit;
        var fields = [
                {
                    "name": 'education',
                    "label": '',
                    'headLabel' : 'Education',
                    "default": store.education,
                    "type": 'tableForm',
                    "onChange": this.handleFieldChanged,
                    'span' : '',
                    'fields' : [
                            { key : 'type', name : "Examination Type"},
                            { key : 'board', name : "Board"},
                            { key : 'percentage', name : "Percentage"}
                        ],
                    "disabled" : isdisabled
                },
            ];
        this.fields = fields;
        fieldsContent  = <div className="row">{getFormElements(fields)}</div>;
        var editAction;
        if(this.state.edit){
             if(this.state.edit == "disabled"){
               editAction =  <button className="u-pull-right" onClick={this.onClickSave}>Save</button>;
            } else{
                editAction = <button className="u-pull-right" onClick={this.onClickEdit}>Edit</button>;
            }
        }
        return (
            <div>
            {fieldsContent}
            {this.state.error ? <p className="text-error text-center mt-20">{this.state.error}</p> : null}
            {editAction}
            </div>
    )},
    componentDidMount() {
        this.setState({edit : this.props.edit});    
    },
    onClickSave(){
        this.setState({edit : "enabled"});
    },
    onClickEdit(){
        this.setState({edit : "disabled"});
    },
    validateStep(step, callback){
        if(step == this.step){
            if(callback && this.validateData()){
                callback();
            }else{
                this.setState({error : "Plase fill all the fileds"});
            }
        }
    },
    validateData(){
        var valid = this.fields.every(function(field){
            if(field.name && field.default.length){
                return true;
            }else if(!field.name){
                return true;
            }
        });
        return valid
    }
})

export { Education }