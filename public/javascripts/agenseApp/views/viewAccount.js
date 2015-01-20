var viewAccount = Backbone.View.extend({

    template: new _.template( $(".container").html() ),

    initialize: function(){



    },
    events:{
        'blur #inputName': 'setName',
        'blur #inputLastName': 'setLastName',
        'blur #inputEmail': 'setEmail',
        'blur #inputPassword': 'setPassword',
        'change #inputProfile': 'setProfile',
        'change #inputHolding': 'setHolding',
        'click #btn-create-account': 'saveModel'

    },
    valid:function(arg){
    },
    reload:function(arg){
    },
    setName: function (event) {
        var $_element = $(event.target);
        this.model.set('name', $.trim($_element.val()) );
    },
    setLastName: function (event) {
        var $_element = $(event.target);
        this.model.set('last_name', $.trim($_element.val()) );
    },
    setEmail: function (event) {
        var $_element = $(event.target);
        this.model.set('email', $.trim($_element.val()) );
    },
    setPassword: function (event) {
        var $_element = $(event.target);
        this.model.set('password', $.trim($_element.val()) );
    },
    setProfile: function (event) {
        var $_element = $(event.target);
        this.model.set('Profiled', $.trim($_element.val()) );
    },
    setHolding: function (event) {
        var $_element = $(event.target);
        this.model.set('Holdingd', $.trim($_element.val()) );
    },
    render: function(){

        this.$el.html( this.template() );
        return this;
    },
    saveModel: function(){


        var valido = true;
        var arr_error = new Array();


        $("#inputName").removeClass('error');
        $('#inputLastName').removeClass('error');
        $('#inputEmail').removeClass('error');
        $('#inputPassword').removeClass('error');
        $('#inputProfile').removeClass('error');
        $('#inputHolding').removeClass('error');


        if(this.model.isValid() == false ){

            _.each(modelAccount.validationError, function(error) {
                switch(error.cod){
                    case "100":
                        $('#inputName').addClass('error');
                        arr_error.push(error.msg);
                        break;
                    case "101":
                        $('#inputLastName').addClass('error');
                        arr_error.push(error.msg);
                        break;
                    case "102":
                        $('#inputEmail').addClass('error');
                        arr_error.push(error.msg);
                        break;
                    case "103":
                        $('#inputPassword').addClass('error');
                        arr_error.push(error.msg);
                        break;
                    case "104":
                        $('#inputHolding').addClass('error');
                        arr_error.push(error.msg);
                        break;
                    case "105":
                        $('#inputProfile').addClass('error');
                        arr_error.push(error.msg);
                        break;
                }
            });

            valido = false;
        }

        if(valido){
            modelAccount.set('');
            modelAccount.save({}, {
                success: function(model, response){
                    if(response != null && response.result != undefined){
                        if(response.result == "USUARIO_CREADO_CORRECTAMENTE"){
                            $(".form-signin")[0].reset();
                            modelAccount.clear();
                            alert('Su cuenta fue creado correctamente.');
                            window.location = '/';
                        }else if(response.result == "WARN_YA_EXISTE_EMAIL"){
                            alert('La cuenta de correo ya esta registrada.');
                        }
                    }
                },
                error: function(){
                    console.log('error');
                }
            });
        }else{
            //alert(arr_error.toString())
        }


    }
});