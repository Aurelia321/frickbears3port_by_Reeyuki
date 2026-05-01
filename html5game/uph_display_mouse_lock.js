function display_mouse_lock(x, y, w, h) {
    return 0;
}

function display_mouse_unlock() {
    return 0;
}

function display_mouse_lock_init_raw(handle) {
    return 0;
}

function display_mouse_bounds_raw(address) {
    return 0;
}

function web_storage_set(key, value) {
    localStorage.setItem(key, value);
    return 1;
}

function web_storage_get(key) {
    var val = localStorage.getItem(key);
    return val === null ? "" : val;
}

function web_storage_exists(key) {
    return localStorage.getItem(key) !== null ? 1 : 0;
}

var _import_status = 0;
var _import_content = "";

function web_storage_export(filename, content) {
    var blob = new Blob([content], {type: 'text/plain'});
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;        
    document.body.appendChild(elem);
    elem.click();        
    document.body.removeChild(elem);
    return 1;
}

function web_storage_import_start() {
    _import_status = 0;
    _import_content = "";
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => { 
        var file = e.target.files[0]; 
        var reader = new FileReader();
        reader.readAsText(file,'UTF-8');
        reader.onload = readerEvent => {
            _import_content = readerEvent.target.result;
            _import_status = 1;
        }
        reader.onerror = () => {
            _import_status = -1;
        }
    }
    input.click();
    return 1;
}

function web_storage_import_get_status() {
    return _import_status;
}

function web_storage_import_get_content() {
    return _import_content;
}


