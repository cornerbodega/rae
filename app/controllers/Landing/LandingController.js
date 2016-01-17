(function(){
  angular
    .module('myApp')
    .controller('LandingController', ['$location', 'ConnectService', 'Fire',
      LandingController
    ]);

  function LandingController($location, ConnectService, Fire) {
    var vm = this;
    var formData = {}
    var dummy = {username:'luchinisupercritical@gmail.com', password:'44Million!', ubi:'603347225'}
    var accounts = Fire.accounts
    vm.signIn = function () {
        //are you registered with potnet? ie. do i have a ubi?
        //can you lcblog in with data you've provided?
        // if (!Fire.usernameExists(dummy.username)) return
        var ubi = ''
        console.log(accounts);
        // for(var key in accounts) {
        //     if(accounts.hasOwnProperty(key)) {
        //         if(accounts[key] === dummy.username) {
        //             console.log('dummy un found');
        //             ubi = accounts[ubi]
        //         }
        //     }
        // }

        if (ubi.length === 0) return vm.error = "Accountname not found."
        dummy.ubi = ubi
        ConnectService.lcbLogin(dummy, signUpLoginFail, function(loginRes){
            if(loginRes.success !=1) signUpLoginFail()
            console.log('Logged In successfully!');
            $location.path('/market')
        })

    }
    vm.signUp = function () {
        ConnectService.lcbLogin(dummy, signUpLoginFail, function(loginRes){
            if(loginRes.success !=1) signUpLoginFail(loginRes)
            console.log('Logged In successfully!');

            //todolater console.log('check if ubi already in potnet db');
            if(!!Fire.ubiExists(dummy)) {
                return vm.error = 'UBI already registered with Potnet'
            }
            Fire.addAccount(dummy, function(key){
                console.log('success! ! account added');
                $location.path('/market')
            })



        })
        // ConnectService.signUp(vm.formData, signUpFail, signInSucceed)
        // check if if ubi/un exists in accounts
        // if new, try to log in at wsclb with info
        // if successful, create firebase ACCOUNT with username password ->
            // associated with email password ubi
        // account wbat log in to potnet with username password. do this automatically.

        // ConnectService.signUp({username: vm.username, password: vm.password, license: vm.ubi}, signUpFail, signUpSucceed)
    }
    function createAccountFail(res) {
        console.log(res.error);
    }
    function signUpLoginFail(res) {
        console.log('Sign Up Failed!! ' + res.error);
    }
    function signInFail(res) {
        console.log('Sign In Failed ' + res);
    }
    function signUpSucceed(res) {
        $location.path('/market')
    }
    function signInSucceed(res) {
        $location.path('/market')
    }
  }

})();
