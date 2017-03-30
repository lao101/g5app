const obs = require("data/observable").Observable;


exports.pageLoaded = (args) => {
    let page = args.object;
    let data = page.navigationContext;
    let mid = data.message_id;
}
