var modelAccount = Backbone.Model.extend({
    urlRoot : "/new/account/save/",
    initialize: function(){

    },
    validate: function(attrs, options) {

        var error = new Array();

        /*
         id: null,
         name: null,
         last_name: null,
         email: null,
         password: null,
         Holdingd: null,
         Profiled: null
         */


        if(attrs.name == null || attrs.name == ''){
            error.push({cod:'100', msg:'Debe ingresar un nombre'}); //ok
        }

        if(attrs.last_name == null || attrs.last_name == '' ){
            error.push({cod:'101', msg:'Debe ingresar su apellido'});
        }

        if(attrs.email == null || attrs.email == ''){
            error.push({cod:'102', msg:'Debe ingresar su email'}); //ok
        }
        if(attrs.password == null || attrs.password == ''){
            error.push({cod:'103', msg:'Debe ingresar un password'}); //ok
        }
        if(attrs.Holdingd == null || attrs.Holdingd == ''){
            error.push({cod:'104', msg:'Debe seleccionar un holding'}); //ok
        }

        if(attrs.Profiled == null || attrs.Profiled == ''){
            error.push({cod:'105', msg: 'Debe seleccionar un profile' });
        }

        if(error.length > 0){
            return error;
        }
    },
    defaults: {
        id: null,
        name: null,
        last_name: null,
        email: null,
        password: null,
        Holdingd: null,
        Profiled: null
    }
});