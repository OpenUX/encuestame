dojo.provide("encuestame.org.core.commons.profile.Profile");

dojo.require("dijit.form.ValidationTextBox");
dojo.require("dijit.form.Textarea");
dojo.require("dijit.form.Select");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.Form");

dojo.declare(
    "encuestame.org.core.commons.profile.Profile",
    [dijit._Widget, dijit._Templated],{
        templatePath: dojo.moduleUrl("encuestame.org.core.commons.profile", "templates/profile.inc"),

        widgetsInTemplate: true,

        _openBox : false,

        contextPath : "",

        serviceProfileInfo : encuestame.service.list.myProfile,

        postCreate : function(){
            this._getMyProfile();
        },

        /*
         * get profile.
         */
        _getMyProfile :function(){
           var load = dojo.hitch(this, function(response){
               console.debug("profile info ", response);
               var email = dijit.byId("email");
               email.set("value", response.success.profile.email);
               var username = dijit.byId("username");
               username.set("value", response.success.profile.username);
               var completeName = dijit.byId("completeName");
               completeName.set("value", response.success.profile.name);
               var bio = dijit.byId("bio");
               bio.set("value", this._emptyBio(response.success.profile.bio));
               dojo.style(this._form, "display", "block");
           });
           var error = function(error) {
               console.debug("error", error);
           };
           encuestame.service.xhrGet(this.serviceProfileInfo, {}, load, error);
        },

        _emptyBio : function(bio){
            if(bio == "" || bio == null){
                //TODO: we need show up default message if is emtpy.
                bio = "Write your bio....";
                return bio;
            } else {
                return bio;
            }
        },

        /*
         * update profile.
         */
        _updateProfile : function(event){
            dojo.stopEvent(event);
            var form = dojo.byId("profileForm");
            console.debug("form ", form);
            var formDijit = dijit.byId("profileForm");
            console.debug("form", formDijit);
            if(formDijit.isValid()){
                var load = dojo.hitch(this, function(data){
                    console.debug(data);
                });
                var error = function(error) {
                    console.debug("error", error);
                };
                //var query = {};
                //query.username =  dijit.byId("username").get("value") ;
                //query.email = dijit.byId("email").get("value");
                //var queryStr = dojo.objectToQuery(query);
                encuestame.service.xhrPost(encuestame.service.list.updateProfile, form, load, error, true);
            } else {
                console.info("form not valid");
            }
        }

});