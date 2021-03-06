
angular
.module('myApp')
.factory('Fire', [ '$firebaseObject',
Fire
]);

function Fire($firebaseObject) {
    // var FIREBASE_LOCATION =
    var rootRef = new Firebase("https://potnet.firebaseio.com")
    var accounts =  $firebaseObject(rootRef.child('accounts'))

    // var accounts = new Firebase("https://potnet.firebaseio.com/accounts")
    // var accounts = $firebaseObject(accountsRef);
    function getUbiFromUsername(username) {
        console.log(username);
        return usernameExists({username:username})
    }
    function addAccount(account, cb) {
        if (!accounts[account.ubi]) accounts[account.ubi] = { users: []}
        accounts[account.ubi].users.push(account.username)
        console.log(accounts);
        accounts.$save()
            .then(function(ref) {
                // ref.key() === obj.$id; // true
                cb(ref.key)
            }, function(error) {
                console.log("Error:", error);
        });
    }

    function usernameExists(account) {
        // var accountsRef = new Firebase("https://potnet.firebaseio.com/accounts")
        console.log(accounts);
        console.log(account);
        var r = false
        _.each(accounts, function(a){
            if (!!a && !!a.users) {
                _.each(a.users, function (u){
                    console.log(u);
                    console.log(account.username);
                    if (u === account.username) {
                        console.log('exists!!');
                        r = u
                    }
                })
            }
            // console.log();

        })
        return r

        // var accountsRef = accounts
    // accountsRef.orderByChild("email").on("child_added", function(snapshot){
    //     console.log(snapshot.val().email);
    // })

        // if (!!accounts[account.ubi]) return true
        // return false


        // console.log(accounts);

        // return accountsRef.orderByChild("username").equalTo('account.username').on("child_added", function(snapshot) {
        //     defer.resolve()
        //     if (!!snapshot.key()) return true
        //     else return false
        //     // accountsRef.push(account)
        //     //
        // });
        // console.log(account);


        // var accountsRef = rootRef.child("accounts")
        // var accountsRef = new Firebase(USERS_LOCATION);
        // var rootRef = new Firebase('https://potnet.firebaseio.com/');
        // var accounts

        // if (accountsRef)
        // accountsRef.orderByChild("username").equalTo(account.username).on("child_added", function(snapshot) {

        // accountsRef.push(account)

        // var potnet = rootRef.child('potnet')
        // if (new)+account.username);
        // if (!!accounts.child(account.ubi)) return {success:0, error: 'Account Already Exists!'}
        // var u = {}
        // u[account.ubi] = account
        // Attach an asynchronous callback to read the data at our posts reference



    }

    return {
        usernameExists: usernameExists,
        addAccount: addAccount,
        accounts: accounts,
        getUbiFromUsername: getUbiFromUsername,
    }
}
