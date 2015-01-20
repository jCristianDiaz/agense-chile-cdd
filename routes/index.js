var models  = require('../models');
var express = require('express');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

var router = express.Router();

//------------------------------------------------------------------------------------------
//view login
router.get('/', function(req, res){
  res.render('index', {title: 'Agense Chile' });
});
//------------------------------------------------------------------------------------------
//controller login
router.post('/authentication', function(req, res){
  models.User.find({where:{email:req.body.email }}).then(function(user) {
    if(user != null){
      var rs = bcrypt.compareSync(req.body.password, user.password);
      if(rs == true){
        req.session.user = user;
        res.redirect('/listarusuarios');
      }else{
        res.render('index', {title: 'Agense Chile', error:'email o password son incorrectos' });
      }
    }else{
      res.render('index', {title: 'Agense Chile', error:'email o password son incorrectos' });
    }
  });
});
//-----------------------------------------------------------------------------------------------
//view create account
router.get('/createaccount', function(req, res){
  models.Profile.findAll({}).then(function(eprofiles) {
    models.Holding.findAll({}).then(function(eholding) {
      res.render('createaccount', {
        title: 'Agense Chile Create Account',
        profiles: eprofiles,
        holdings: eholding
      });
    });
  });
});
//-------------------------------------------------------------------------------------------------
// controller create account
router.post('/new/account/save/', function(req, res){
  //is exist email
  models.User.find({where:{email:req.body.email }}).then(function(user) {
    if(user == null){
      models.Profile.find({where:{ id: req.body.Profiled }}).then(function(profile){
        models.Holding.find({where:{id:req.body.Holdingd }}).then(function(holding){
          models.User.create({
            name: req.body.name,
            last_name:req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
          }).then(function(user) {
            user.setProfile(profile).then(function(){
              user.setHolding(holding).then(function(){
                res.json({result: "USUARIO_CREADO_CORRECTAMENTE"});
              });
            });
          });
        });
      });
    }else{
      res.json({result: "WARN_YA_EXISTE_EMAIL"});
    }
  });
});
//-------------------------------------------------------------------------------------------------
// view listar usuarios
router.get('/listarusuarios', function(req, res) {
  if (req.session.user != null) {
    models.User.findAll(
        {
          where: {id: {not: req.session.user.id}},
          include: [ models.Profile, models.Holding ]
        }
    ).then(function(users) {
          res.render('admin/index', {title: 'Agense Chile', usuarios: users, user: req.session.user.name});
        });
  }else{
    res.redirect('/');
  }
});
//-------------------------------------------------------------------------------------------------------
//view update user
router.get('/update:user_id',function(req, res) {
  if (req.session.user != null) {
    models.User.find({where:{id:  req.param('user_id') }}).then(function(user) {
      if(user != null){
        models.Profile.findAll({}).then(function(eprofiles) {
          models.Holding.findAll({}).then(function(eholding) {
            res.render('admin/editar_user', {
              title: 'Agense Chile Editar Cuenta',
              usuario: user,
              profiles: eprofiles,
              holdings: eholding,
              user: req.session.user.name
            });
          });
        });
      }else{
        res.render('admin/index', {title: 'Agense Chile', error:'email o password son incorrectos' });
      }
    });
  }else{
    res.redirect('/');
  }
});
//------------------------------------------------------------------------------------------------------------
// controller update user
router.post('/updateuser', function(req, res){
  if (req.session.user != null) {
    models.User.find({where:{id: req.body.id }}).then(function(user) {

      if(user != null){

        models.Profile.find({where:{ id: req.body.profile }}).then(function(profile){
          models.Holding.find({where:{id: req.body.holding }}).then(function(holding){

            models.User.find({
              where:{
                id: {not: req.body.id},
                email:req.body.email
              }
            }).then(function(user_tmp) {

              if(user_tmp == null){ //email no existe
                user.updateAttributes({
                  name: req.body.name,
                  last_name:req.body.last_name,
                  email: req.body.email,
                  password: bcrypt.hashSync(req.body.password, salt)
                }).success(function(user) {
                  user.setProfile(profile).then(function(){
                    user.setHolding(holding).then(function(){
                      res.redirect('../listarusuarios');
                    });
                  });
                });

              }else{

                res.render('admin/editar_user',{
                  title: 'Agense Chile Editar Cuenta',
                  usuario: user,
                  profiles: profile,
                  holdings: holding,
                  user: req.session.user.name,
                  error: 'Email ya existe'
                });

              }
            });
          });
        });
      }
    });

  }else{
    res.redirect('/');
  }
});
//-------------------------------------------------------------------------------------------
//controller delete user
router.get('/delete:user_id',function(req, res) {
  if (req.session.user != null) {
    models.User.find({where:{id:  req.param('user_id') }}).then(function(user) {
      if(user != null){
        user.destroy();
        res.redirect('/listarusuarios');
      }
    });
  }else{
    res.redirect('/');
  }
});
//------------------------------------------------------------------------------------------------
//logout
router.get('/logout',function(req, res){
  req.session.destroy();
  res.redirect("/");
})
//------------------------------------------------------------------------------------------------

module.exports = router;
