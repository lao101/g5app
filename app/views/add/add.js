const obs = require("data/observable").Observable;

let page;

let str = new obs({
    name: "",
    message: ""
});

exports.pageLoaded = (args) => {
    page = args.object;
    page.bindingContext = str;
}

exports.setMessage = function() {
    fetch('http://surachai.rvc.ac.th/native/setMessage.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: str.name,
            message: str.message
        })
    })
    .then ( res => res.json() )
    .then ( (data) => {
        if (data.success == true) {
            let obj1 = page.getViewById("name");
            let obj2 = page.getViewById("message");

            obj1.text = "";
            obj2.text = "";
            obj1.focus();
        } else {
            console.log("Error on save.");
        }
    })
    .catch( (err) => {
        console.dump(err.message);
    })
} //exports.setMessage