'use strict'
import React from 'react'
import Reflux from 'reflux';
import { getFormElements } from '../components/fields';
import { getbyString, setbyString } from '../components/utils';
import  { actions } from '../store/actions';
import { mainStore} from '../store/store';
import { _ } from 'underscore'
// const store = { firstName: '', lastName: '', fatherName : '', motherName : '', dob : '' }

const PersonalInfo = React.createClass ({
    mixins: [
        Reflux.listenTo(actions.validateStep, 'validateStep')
    ],
    step : 1,
    getInitialState() {
        return mainStore.data;
    },
    handleFieldChanged(field, value){
        var store = mainStore.data;
        setbyString(store, field, value);
        // actions.updateView();
        this.setState(store)  
    },
    render() {
        var store = mainStore.data;
        var isdisabled = (this.state.edit != "disabled" ? "" : "disabled") || this.props.edit;
        var fields = [
                    {'headLabel' : 'Personal Information'},
                    {
                        "name": 'firstName',
                        "label": 'First Name:',
                        "default": this.state.firstName,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "five",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'lastName',
                        "label": 'Last Name:',
                        "default": this.state.lastName,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "five",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'fatherName',
                        "label": 'Father Name:',
                        "default": this.state.fatherName,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "five",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'motherName',
                        "label": 'Mother Name:',
                        "default": this.state.motherName,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "five",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'dob',
                        "label": 'Date of Birth',
                        "default": this.state.dob,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "three",
                        "disabled" : isdisabled
                    }
                ];
            this.fields = fields;
        var fieldsContent = getFormElements(fields);

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
                </div>
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
            if(field.name && field.default){
                return true;
            }else if(!field.name){
                return true;
            }
        });
        return valid
    }
})

export { PersonalInfo }
