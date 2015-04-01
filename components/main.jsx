/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react'),
  mui = require('material-ui'),
  RaisedButton = mui.RaisedButton,
  FlatButton = mui.FlatButton;


var filterOptions = [
  { payload: '1', text: 'All Broadcasts' },
  { payload: '2', text: 'All Voice' },
  { payload: '3', text: 'All Text' },
  { payload: '4', text: 'Complete Voice' },
  { payload: '5', text: 'Complete Text' },
  { payload: '6', text: 'Active Voice' },
  { payload: '7', text: 'Active Text' },
];
var iconMenuItems = [
  { payload: '1', text: 'Download' },
  { payload: '2', text: 'More Info' }
];

/*var Main = React.createClass({

  render: function() {

    return (
      <div className="example-page">

        <h1>Eva Home</h1>
        <h2>Eva project</h2>

        <RaisedButton label="Ok submit" secondary={true} />
      </div>
    );
  },

  _handleTouchTap: function() {
    
  }
});*/
var Toolbar = mui.Toolbar,
ToolbarGroup = mui.ToolbarGroup,
DropDownMenu = mui.DropDownMenu, 
FontIcon = mui.FontIcon,
DropDownIcon = mui.DropDownIcon,
IconButton = mui.IconButton,
Paper = mui.Paper,
TextField = mui.TextField,
Dialog = mui.Dialog,
FlatButton = mui.FlatButton,
Snackbar = mui.Snackbar;

var COMMONS = {
  LIST_CHANGE_EVENT : 'splistchangeevent'
};

var SpTile = React.createClass({

  render : function(){
    console.log("locs : ",this.props.data.location);
    var locations = this.props.data.location.map(function(loc){
      return (
        <span className="eva-location-title">{loc}</span>
      )
    });
    var socialplugins = this.props.data.social.map(function(soc){
      var classname = "";
      if(soc == "facebook"){
        classname = "icon-facebook";
      }else if(soc == "googleplus"){
        classname = "icon-google-plus";
      }else if(soc == "twiter"){
        classname = "icon-twitter";
      }
      return (
        <li>
          <a>
            <i className={classname}></i>
          </a>
        </li>
      )
    }); 
    return(
      <div className="spviewitem">
        <Paper zDepth={1}>
            <div className="img-wrapper">
              <img src={this.props.data.photo} className="spitemimage"/>
            </div>
            <article className="data-wrapper">
              <header className="data-info">
                <div className="info-icons">

                </div>
                <h1>
                  {this.props.data.name}
                </h1>
                <div className="info-date">

                </div>
                <div className="location-details">
                  <a>
                    <i className="location-icon"><span className="icon-map-marker"></span></i>
                    <span>{locations}</span>
                  </a>
                </div>

              </header>
              <p>
                  {this.props.data.description}
              </p>
               <footer className="data-footer">
                <ul>{socialplugins}</ul>
              </footer>
            </article>
           
        </Paper>
      </div>
    );
  }
});
var EvaSportsSPList = React.createClass({
  getInitialState: function() {
      return {list: []};
  },
  getDefaultProps : function(){
    return {
      list : []
    }
  },
  loadListFromServer: function(criteria) {
    /*  $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });*/
    console.log("getting list from server");
    console.log(this.props);
    var dataList = [],
    _this = this;
    $.ajax({
      url : _this.props.geturl,
      method : 'get',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(data) {
         this.setState({list: data});
         console.log('data list : ',data);
        }.bind(this),
        error: function(xhr, status, err) {
         // console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
    return {
      list : dataList
    }
  },
  componentDidMount: function() {
      this.loadListFromServer();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
        var _this = this;
    $(document).on(COMMONS.LIST_CHANGE_EVENT,function(e,data){
      console.log("args : ",arguments);
      _this.setState({list: data.list});
      data.fun();
    });
  },
  render : function(){
    //console.log("lsit : ",)
      var items = this.state.list.map(function(item){
        return (
          <SpTile data={item}  key={item._id}>
          </SpTile>
          );
      });
      return (
        <div className="spList">
        {items}
        </div>
      );
  }
});


var EvaForm = React.createClass({
  getDefaultProps : function(){
    return {
            fields : [
              {label : 'Name',id : 'name',key:'1'},
              {label : 'Email',id : 'email',key:'2'},
              {label : 'Address',id : 'address',key:'3'},
              {label : 'Zip',id : 'zip',key:'4'},
              /*{label : 'Phone',id : 'phone',key:'5'}*/
            ]
          }
  },
  handleFormSubmit : function(e){
    e.preventDefault();
    console.log("Form submit request received");

  },

  getFormData : function(){
    var data = null;
    _this = this;
    //console.log('refs : ',this.refs);
   /* this.props.fields.map(function(field){
     // console.log("field : ",field);
      data[field.id] = _this.refs[field.id].getValue();
    });*/
    data = {
      name: _this.refs.name.getValue(),
      email:_this.refs.email.getValue(),
      phone:7982093210,
      address:[_this.refs.address.getValue()],
      social:['facebook','googleplus','twiter'],
      description:'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.',
      photo:'http://www.motorbeam.com/wp-content/uploads/2013_Fiat_500L.jpg',
      location : ['Bangalore']
    };
    //  console.log("data :  ",data);
    return {data : data};
  },
  getTextInput : function(id,label){
    return (
      <li>
        <TextField  ref={id} hintText={label}  floatingLabelText={label} />
      </li>
    );
  },
  render : function(){
      /* <li>
            <TextField  hintText="facebook"  floatingLabelText="facebook" />
          </li>
           <li>
            <TextField  hintText="google plus"  floatingLabelText="google plus" />
          </li>
           <li>
            <TextField  hintText="twitter"  floatingLabelText="twitter" />
          </li>
           <li>
            <TextField  ref="name" hintText="Name"  floatingLabelText="Name" />
          </li>
           <li>
            <TextField  ref="email" hintText="Email"  floatingLabelText="Email" />
          </li>
           <li>
            <TextField  ref="adress" hintText="Address"  floatingLabelText="Address" />
          </li>
           <li>
            <TextField  ref="zip" hintText="Zip"  floatingLabelText="Zip" />
          </li>
          */
          console.log('props : ',this.props);

          //var inputs = 
    return (
      <form className="eva-add-sp-form" >
        <ul className="input-fields-wrapper">
          {this.props.fields.map(function(field){
            return (
              <li>
                <TextField key={field.key} ref={field.id} hintText={field.label}  floatingLabelText={field.label} />
              </li>
            );
          })}
        </ul>
      </form>
    );
  }
});
var EvaDialoge = React.createClass({
  _handleCustomDialogCancel : function(e){
    console.log("dialoge cancel");
    this.refs.evaDialog.dismiss();
  },
  _updateListState : function(list){
    //this.props.linktoother.setState({list:list});
    $(document).trigger(COMMONS.LIST_CHANGE_EVENT,{list:list,fun:function(){
      this.refs.evaDialog.dismiss();
      //this.refs.snakbarman.show();
    }.bind(this)});
  },
  _handleCustomDialogSubmit : function(e){
    console.log("dialoge submit");
    e.preventDefault();
    //this.refs.evaDialog.dismiss();
    var data = this.refs.evaForm.getFormData()||{};
    console.log("form data : ",data);
   // console.log('urls : ',this.props);
    $.ajax({
      url : 'save',
      data : JSON.stringify(data),
      method : 'post',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(data) {
         /* this.setState({data: data});*/
        // console.log('data : ',data);
         this._updateListState(data);
        }.bind(this),
        error: function(xhr, status, err) {
         // console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
  },
  _show : function(){
    this.refs.evaDialog.show();
  },
  render : function(){
     var customActions = [
            <RaisedButton
              label="Cancel"
              secondary={true}
              onTouchTap={this._handleCustomDialogCancel} />,
            <RaisedButton
              label="Submit"
              primary={true}
              onTouchTap={this._handleCustomDialogSubmit} />
      ];
    return(
      <Dialog ref="evaDialog" title="Add Service provider" actions={customActions}>
        <section className="form-container">
            <EvaForm ref="evaForm"/>
        </section>
      </Dialog>
    );
  }
});

var Main = React.createClass({
  showAddSpDialog : function(){
    console.log("show dialoge");
    //console.log
    this.refs.dialoge._show();
  },
  handleGlobalSearch : function(e){
    e.preventDefault();
    console.log($(e.target).find('input').val());
  },
  render: function() {
    return (
      <div className="eva-home-container">
      <div className="toolbar-container">
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <form className="eva-searchform" onSubmit={this.handleGlobalSearch}>
              <TextField hintText="Search" name="searchtext"/>
            </form>
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <DropDownIcon iconClassName="icon-navigation-expand-more" menuItems={iconMenuItems} />
            <span className="mui-toolbar-separator">&nbsp;</span>
             <RaisedButton secondary={true} onClick={this.showAddSpDialog}>
                <span className="mui-raised-button-label example-icon-button-label" >Add</span>
            </RaisedButton>
          </ToolbarGroup>
        </Toolbar>
      </div>
      <div className="eva-sp-list">
        <EvaSportsSPList ref="splistccontainer" geturl="get"/>
      </div>
      <div class="dialoge-container">
        <EvaDialoge ref="dialoge" linktoother={this.refs.splistccontainer}/>
       
      </div>
      </div>
    );
  },

  _handleTouchTap: function() {
    
  }
});
/* <Paper zDepth={1} className="add-sp-form-container">
        <p>
          <section className="form-container">
            <EvaForm />
          </section>
        </p>
      </Paper>*/

module.exports = Main;