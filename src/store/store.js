import  Reflux  from 'reflux';
import  { actions } from './actions'

var mainStore = Reflux.createStore({
     listenables: [actions],
     init : function(){
        this.data =  {
                firstName: '', 
                lastName: '', 
                fatherName : '', 
                motherName : '', 
                dob : '',
                presentAddress : {
                    address : "",
                    street1 : "",
                    street2 : "",
                    city : "",
                    state : "",
                    pincode : ""
                },
                permenantAddress : {
                    address : "",
                    street1 : "",
                    street2 : "",
                    city : "",
                    state : "",
                    pincode : ""
                },
                education : [],
                experience : []
             }
    }
});

export { mainStore }