const vscode = require('vscode');
const sqlliteParser = require('sqlite-parser')

class noWhereController {
    constructor(nw) {
        this.nw = new noWhere()
        this.disposable = vscode.Disposable

        var subscriptions = []
        vscode.window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions)
        vscode.window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions)

        this.nw.updateWhereStatus()

        this.disposable = vscode.Disposable.from(...subscriptions)
    }
    dispose() {
        this.disposable.dispose()
    }
    _onEvent () {
        this.nw.updateWhereStatus()
    }
}

class noWhere {
    constructor() {
        this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
    }

    checkStatements(doc) {
        var statementsICareAbout = ['UPDATE','DELETE']
        var missing = false
        var docContent = doc.getText()
        var ast = sqlliteParser(docContent)
        ast.statement.forEach(function(element) {
            if (statementsICareAbout.indexOf(element.variant.toUpperCase()) > -1) {
                if (!element.hasOwnProperty('where')) missing = true
            }
        })
        return missing
    }

    updateWhereStatus() {
        var message = null
        var messagecolor = null
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide()
            return
        }
       
        var doc = editor.document;
        
        if (doc.languageId === "sql")
        {
            var whereStatus = this.checkStatements(doc)
            if (whereStatus) {
                message = "Missing WHERE clause detected!"
            } else {
                message = "No missing WHERE clauses detected"
            }
            this._statusBarItem.text = message
            this._statusBarItem.show()
        } else {
            this._statusBarItem.hide()
        }
        
    }
}



function activate(context) {
    let noWh = new noWhere()
    let controller = new noWhereController(noWh)

    context.subscriptions.push(controller);
    context.subscriptions.push(noWh)
}
exports.activate = activate;


function deactivate() {
}
exports.deactivate = deactivate;