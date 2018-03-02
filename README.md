# NoWhere
A quick and dirty VSCode/SQL Operations Studio extension to test for WHERE clauses in potentially damaging statements.

## Usage
The extension works with SQL and MSSQL file types when working in your editor of choice, either SQL Operations Studio or VS Code. It will parse your individual SQL Statements and look for any INSERT or UPDATE statements that are missing WHERE clauses. You'll see a message in your status bar if any of your queries match the criteria.

## Installation
Maybe one day I'll publish this on the extension marketplace, but until that time, here's how you can install this extension manually:
1. Download this repository and save it to a folder on your hard drive (i.e. noWhere)
2. Copy that folder to your extensions directory for the editor you want to use. On Windows 10*:
  * You can find your VSCode extensions folder in your C:\Users\<username>\.vscode\extensions folder
  * You can find your SQL Ops Studio extensions folder in your C:\Users\<username>\.sqlops\extensions folder
3. If your editor is already running, hit Control-P and type "> Reload Window" to reload your session

`*` Note: your extension folder will vary with OS; check the official documentation for more details.

## Links
Download SQL Operations Studio: https://docs.microsoft.com/en-us/sql/sql-operations-studio/download
Doenload VS Code: https://code.visualstudio.com/

## Credits
This extension uses the superb sqlite-parser module which you can read about here: https://github.com/codeschool/sqlite-parser
Also thanks to Microsoft for making such a cool editor framework.