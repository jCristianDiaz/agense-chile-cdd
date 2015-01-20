/**
 * Created by cdiaz on 19-01-15.
 */


$(function(){

    iniViewAccount();

});



function iniViewAccount(){

    modelAccount = new modelAccount();

    if(viewAccount.$el != undefined ){
        viewAccount.remove();
    }

    viewAccount = new viewAccount({
        el:$(".container"),
        model:modelAccount
    });

    viewAccount.render();

}