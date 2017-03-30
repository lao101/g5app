const obs = require("data/observable");
const obsArr = require("data/observable-array").ObservableArray;
const frame = require("ui/frame");
const dialog = require("ui/dialogs");

exports.pageLoad = (args) => {
    fetch("http://surachai.rvc.ac.th/native/getMessage.php")
    .then( res => res.json() )
    .then( (data) => {
        let page = args.object;
        let context = new obs.fromObject({
            app: 'กลุ่ม 5 App',
            list: new obsArr(data)
        })
        page.bindingContext = context;
    })
    .catch( (err) => {
        console.log("Fetch Error.");
    })
}

exports.btnLoaded = function (args) {
    var btn = args.object;
    btn.android.setFocusable(false);
};

exports.goHome = () => {
    let topmost = frame.topmost();
    topmost.navigate("views/home/home");
}

exports.onAdd = () => {
    let topmost = frame.topmost();
    topmost.navigate("views/add/add");
}

exports.onEdit = (obj) => {
    let target = obj.object;
    let _id = target.index;
    fetch("http://surachai.rvc.ac.th/native/editMessage1.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message_id: _id
        })        
    })
    .then( res => res.json() )
    .then( (data) => {
        let options = {
            moduleName:'views/edit/edit',
            context:{
                message_id: data[0].message_id,
                name: data[0].name,
                message: data[0].message
            }
        }
        let topmost = frame.topmost().navigate(options);
        // console.dump(data);
    })
    .catch( (err) => {
        console.log("Fetch Error : " + err.message);
    })
    
}

exports.onDelete = (obj) => {
    let target = obj.object;
    let _id = target.index;
    dialog.confirm({
        title: "คำเตือน",
        message: "ท่านต้องการลบข้อมูลชุดนี้",
        okButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก"
    }).then( (result) => {
        if (result) {
            fetch('http://surachai.rvc.ac.th/native/deleteMessage.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message_id: _id
                })
            })
            .then ( res => res.json() )
            .then ( (data) => {
                if (data.success == true) {
                    let topmost = frame.topmost();
                    topmost.navigate("views/home/home");
                }
            })
            .catch( (err) => {
                alert("Error");
            })
            
        }

    });
}