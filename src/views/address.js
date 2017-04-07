'use strict'
import React, { Component, PropTypes } from 'react'
import Reflux from 'reflux';
import { getFormElements } from '../components/fields';
import { getbyString, setbyString } from '../components/utils';
import  { actions } from '../store/actions';
import { mainStore} from '../store/store';

// const store = { 
//     presentAddress : {
//         address : "",
//         street1 : "",
//         street2 : "",
//         city : "",
//         state : "",
//         pincode : ""
//     },
//     permenantAddress : {
//         address : "",
//         street1 : "",
//         street2 : "",
//         city : "",
//         state : "",
//         pincode : ""
//     }
// }

const Address = React.createClass ({
    mixins: [
        Reflux.listenTo(actions.validateStep, 'validateStep')
    ],
    getInitialState() {
        return mainStore.data;
    },
    step : 2,
    handleFieldChanged(field, value){
        var store = mainStore.data;
        setbyString(store, field, value);
        // actions.updateView();
        this.setState(store);
    },
    render() {
        var store = mainStore.data;
        var isdisabled = (this.state.edit != "disabled" ? "" : "disabled") || this.props.edit;
         var fields = [
                    {
                        "name": 'presentAddress.address',
                        "headLabel" : "Present Address",
                        "label": 'Address',
                        "placeholder" : "Present Address",
                        "default": this.state.presentAddress.address,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "six",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'presentAddress.street1',
                        "label": 'Street',
                        "placeholder" : "Street",
                        "default": this.state.presentAddress.street1,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "six",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'presentAddress.street2',
                        "label": 'Street2',
                        "placeholder" : "Street2",
                        "default": this.state.presentAddress.street2,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "five",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'presentAddress.city',
                        "label": 'City',
                        "placeholder" : "City",
                        "default": this.state.presentAddress.city,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "three",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'presentAddress.state',
                        "label": 'State',
                        "placeholder" : "State",
                        "default": this.state.presentAddress.state,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "three",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'presentAddress.pincode',
                        "label": 'Pincode',
                        "placeholder" : "Pincode",
                        "default": this.state.presentAddress.pincode,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "three",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'permenantAddress.address',
                        "headLabel" : "Permenant Address",
                        "label": 'Address',
                        "placeholder": 'Permenant Address',
                        "default": this.state.permenantAddress.address,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "six",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'permenantAddress.street1',
                        "label": 'Street1',
                        "placeholder" : "Street1",
                        "default": this.state.permenantAddress.street1,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "six",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'permenantAddress.street2',
                        "label": 'Street2',
                        "placeholder" : "Street2",
                        "default": this.state.permenantAddress.street2,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "five",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'permenantAddress.city',
                        "label": 'City',
                        "placeholder" : "City",
                        "default": this.state.permenantAddress.city,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "three",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'permenantAddress.state',
                        "label": 'State',
                        "placeholder" : "State",
                        "default": this.state.permenantAddress.state,
                        "type": 'text',
                        "onChange": this.handleFieldChanged,
                        "span" : "three",
                        "disabled" : isdisabled
                    },
                    {
                        "name": 'permenantAddress.pincode',
                        "label": 'Pincode',
                        "placeholder" : "Pincode",
                        "default": this.state.permenantAddress.pincode,
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
            {editAction}
            {this.state.error ? <p className="text-error text-center mt-20">{this.state.error}</p> : null}
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

export { Address }