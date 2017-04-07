'use strict'
import Reflux from 'reflux';
import React, { Component, PropTypes } from 'react'
import { getFormElements } from '../components/fields';
import { getbyString, setbyString } from '../components/utils';
import  { actions } from '../store/actions';
import { mainStore} from '../store/store';
import { _ } from 'underscore';

const Experience = React.createClass ({
    mixins: [
        Reflux.listenTo(actions.validateStep, 'validateStep')
    ],
    getInitialState() {
        return mainStore.data;
    },
     handleFieldChanged(newExperience){
        var store = mainStore.data;
        store.experience = newExperience;
        this.setState(store)  
    },
    render() {
        var store = mainStore.data;
        var fieldsContent;
        var isdisabled = (this.state.edit != "disabled" ? "" : "disabled") || this.props.edit;
        var fields = [
                {
                    "name": 'experience',
                    'headLabel' : 'Experience',
                    "label": '',
                    "default": store.experience,
                    "type": 'tableForm',
                    "onChange": this.handleFieldChanged,
                    'span' : '',
                    'fields' : [
                        { key : 'company', name : "Company"},
                        {key : 'years', name : 'No. of Years'}
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
            <div className="row">
                {fieldsContent}
                {this.state.error ? <p className="text-error text-center mt-20">{this.state.error}</p> : null}
                {editAction}
            </div>
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

export { Experience }

