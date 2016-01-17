(function(){
  angular
    .module('myApp')
    .controller('LandingController', ['$location', 'ConnectService', 'Fire',
      LandingController
    ]);

  function LandingController($location, ConnectService, Fire) {
    var vm = this;
    var formData = {}
    var dummy = {username:'thepottingbench@outlook.com', password:'2ndCaptainBly', ubi:'602093924'}
    // var dummy = {username:'luchinisupercritical@gmail.com', password:'44Million!', ubi:'603347225'}
    var accounts = Fire.accounts
    vm.signIn = function () {
        //are you registered with potnet? ie. do i have your username associated with a ubi?
            // if not, return with error not found
        //can you lcblog in with data you've provided?
            // if not, show lcb error message (nothing to do with me)
        // if (!Fire.usernameExists(dummy.username)) return
        // var ubi = ''
        console.log(accounts);
        var loginDummy = { username: 'thepottingkbench@outlook.com', password:'2ndCaptainBly'}
        console.log(Fire.usernameExists(dummy.username));
        // if (!Fire.usernameExists(dummy.username)) return vm.error = "Incorrect Username/Password"
        // dummy.ubi =
        loginDummy.ubi = Fire.getUbiFromUsername(dummy.username)
        if (!loginDummy.ubi) return vm.error = "Incorrect Username/Password"
        console.log(loginDummy.ubi);
        ConnectService.lcbLogin(loginDummy, signUpLoginFail, function(loginRes){
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
            console.log(Fire.usernameExists(dummy));
            if(Fire.usernameExists(dummy)) {
                return vm.error = dummy.username +' is already registered with Potnet.net'
            }
            Fire.addAccount(dummy, function(key){
                console.log('success! ! account added');
                console.log('GO TO MARKET!');
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
