const obs = require("data/observable");
const frame = require("ui/frame");

let context;

exports.pageLoaded = (args) => {
    let page = args.object;
    let gotData = page.navigationContext;
    context = new obs.fromObject({
        id: gotData.message_id,
        name: gotData.name,
        message: gotData.message
    });
    page.bindingContext = context;
}

exports.goHome = () => {
    let topmost = frame.topmost();
    topmost.navigate("views/home/home");
}

exports.goSave = () => {
    fetch('http://surachai.rvc.ac.th/native/editMessage2.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: context.id,
            name: context.name,
            message: context.message
        })
    })
    .then ( res => res.json() )
    .then ( (data) => {
        if (data.success == true) {
            let topmost = frame.topmost();
            topmost.navigate("views/home/home");            
        } else {
            alert("Fail to update");
        }
    })
    .catch ( (err) => {
        console.log(err.message);
    }) 
}